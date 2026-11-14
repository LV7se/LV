<script setup lang="ts">
// 设备信息与电源操作
import { onMounted, ref } from 'vue'
import { state, run, getLine } from '../../lib/adb'

const info = ref<Record<string, string>>({})
const loading = ref(false)
const message = ref('')

async function load() {
  if (!state.serial) return
  loading.value = true
  message.value = ''
  try {
    const [model, brand, release, sdk, abi, storage, screen] = await Promise.all([
      getLine('getprop ro.product.model'),
      getLine('getprop ro.product.brand'),
      getLine('getprop ro.build.version.release'),
      getLine('getprop ro.build.version.sdk'),
      getLine('getprop ro.product.cpu.abi'),
      run("df -h /data | tail -n 1"),
      run('wm size')
    ])
    const battery = await getLine("dumpsys battery | grep -E 'level|temperature'")
    info.value = {
      型号: model,
      品牌: brand,
      Android: `${release}（API ${sdk}）`,
      ABI: abi,
      存储: storage.trim().replace(/\s+/g, ' '),
      屏幕: screen.trim().split('\n').pop() || '',
      电池: battery.replace(/\n/g, ' · ')
    }
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    loading.value = false
  }
}

async function reboot(mode: string) {
  const label = mode || '正常重启'
  if (!confirm(`确定要${label}吗？设备会立即断开连接。`)) return
  try {
    await run(mode ? `reboot ${mode}` : 'reboot')
  } catch (error) {
    message.value = (error as Error).message
  }
}

onMounted(load)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>设备</h2>
      <button class="btn small" :disabled="loading || !state.serial" @click="load">
        {{ loading ? '读取中…' : '刷新' }}
      </button>
    </div>

    <dl v-if="Object.keys(info).length" class="kv">
      <template v-for="(value, key) in info" :key="key">
        <dt>{{ key }}</dt>
        <dd>{{ value || '—' }}</dd>
      </template>
    </dl>
    <p v-else class="hint">连接设备后显示硬件与系统信息。</p>

    <div class="panel-head" style="margin-top: 24px">
      <h2>电源与重启</h2>
    </div>
    <div class="row">
      <button class="btn" @click="reboot('')">重启</button>
      <button class="btn" @click="reboot('bootloader')">重启到 Bootloader</button>
      <button class="btn" @click="reboot('recovery')">重启到 Recovery</button>
      <button class="btn" @click="reboot('fastboot')">重启到 Fastbootd</button>
      <button class="btn" title="部分设备需要 root 权限" @click="reboot('edl')">重启到 EDL</button>
    </div>
    <p class="hint">重启类操作只发送系统命令，不提供刷机；EDL 在多数设备上需要 root。</p>
    <p v-if="message" class="hint warn">{{ message }}</p>
  </section>
</template>
