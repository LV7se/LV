<script setup lang="ts">
// 系统界面：状态栏图标、时钟、沉浸模式与网络检测设置
import { onMounted, ref } from 'vue'
import { state, run, getLine } from '../../lib/adb'

const slots = [
  { key: 'clock', label: '时间' },
  { key: 'location', label: '定位' },
  { key: 'headset', label: '耳机' },
  { key: 'cast', label: '投射' },
  { key: 'alarm_clock', label: '闹钟' },
  { key: 'volume', label: '声音' },
  { key: 'mobile', label: '信号' },
  { key: 'airplane', label: '飞行' },
  { key: 'bluetooth', label: '蓝牙' },
  { key: 'battery', label: '电池' },
  { key: 'wifi', label: '无线' },
  { key: 'nfc', label: 'NFC' }
]

const hidden = ref<string[]>([])
const clockSeconds = ref(false)
const rotationHint = ref(true)
const message = ref('')

async function refresh() {
  if (!state.serial) return
  try {
    const list = await getLine('settings get secure icon_blacklist')
    hidden.value = list === 'null' ? [] : list.split(',').filter(Boolean)
    clockSeconds.value = (await getLine('settings get secure clock_seconds')) === '1'
    rotationHint.value = (await getLine('settings get secure show_rotation_suggestions')) !== '0'
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function applyIcons() {
  try {
    const value = hidden.value.length ? hidden.value.join(',') : 'null'
    await run(`settings put secure icon_blacklist ${value}`)
    message.value = '状态栏图标已更新'
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function toggle(key: string, enabled: boolean, command: string) {
  try {
    await run(command)
    message.value = enabled ? `${key} 已开启` : `${key} 已关闭`
    refresh()
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function immersive(kind: string) {
  try {
    const value = kind === 'reset' ? 'null' : `immersive.${kind}`
    await run(`settings put global policy_control ${kind === 'reset' ? 'immersive.full=null' : `${value}=*`}`)
    message.value = kind === 'reset' ? '已恢复系统栏' : `已启用沉浸：${value}`
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function wifiFix() {
  try {
    await run('settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204')
    await run('settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204')
    await run('settings put global captive_portal_detection_enabled 0')
    message.value = '已关闭网络检测，Wi-Fi 图标将不再显示感叹号'
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function quickPanel() {
  try {
    await run('cmd statusbar expand-settings')
    message.value = '已展开快捷设置'
  } catch (error) {
    message.value = (error as Error).message
  }
}

onMounted(refresh)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>系统界面</h2>
      <button class="btn small" :disabled="!state.serial" @click="refresh">刷新</button>
    </div>

    <p class="label">隐藏状态栏图标</p>
    <div class="chips">
      <label v-for="slot in slots" :key="slot.key" class="chip" :class="{ on: hidden.includes(slot.key) }">
        <input v-model="hidden" type="checkbox" :value="slot.key" style="display: none" />
        {{ slot.label }}
      </label>
    </div>
    <div class="row" style="margin-top: 10px">
      <button class="btn" :disabled="!state.serial" @click="applyIcons">应用</button>
    </div>

    <div class="row">
      <label class="check">
        <input
          v-model="clockSeconds"
          type="checkbox"
          @change="toggle('时钟秒数', clockSeconds, `settings put secure clock_seconds ${clockSeconds ? 1 : 0}`)"
        />
        时钟显示秒
      </label>
      <label class="check">
        <input
          v-model="rotationHint"
          type="checkbox"
          @change="toggle('旋转建议', rotationHint, `settings put secure show_rotation_suggestions ${rotationHint ? 1 : 0}`)"
        />
        旋转建议
      </label>
    </div>

    <div class="panel-head" style="margin-top: 20px"><h2>沉浸与快捷设置</h2></div>
    <div class="row">
      <button class="btn" :disabled="!state.serial" @click="immersive('status')">沉浸状态栏</button>
      <button class="btn" :disabled="!state.serial" @click="immersive('navigation')">沉浸导航栏</button>
      <button class="btn" :disabled="!state.serial" @click="immersive('full')">全部沉浸</button>
      <button class="btn" :disabled="!state.serial" @click="immersive('reset')">全部恢复</button>
      <button class="btn" :disabled="!state.serial" @click="quickPanel">展开快捷设置</button>
    </div>

    <div class="panel-head" style="margin-top: 20px"><h2>网络检测</h2></div>
    <div class="row">
      <button class="btn" :disabled="!state.serial" @click="wifiFix">关闭检测（去除叹号）</button>
    </div>

    <p v-if="message" class="hint">{{ message }}</p>
    <p class="hint">以上设置写入系统配置，需要 shell 具备写入权限；恢复方式为对应开关重新设置。</p>
  </section>
</template>
