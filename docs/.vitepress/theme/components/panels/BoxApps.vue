<script setup lang="ts">
// 应用管理：列表、启停、卸载与信息读取
import { computed, onMounted, ref } from 'vue'
import { state, run } from '../../lib/adb'

const apps = ref<string[]>([])
const keyword = ref('')
const selected = ref('')
const onlyThirdParty = ref(true)
const loading = ref(false)
const message = ref('')

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return k ? apps.value.filter((name) => name.includes(k)) : apps.value
})

async function load() {
  if (!state.serial) return
  loading.value = true
  message.value = ''
  try {
    const flag = onlyThirdParty.value ? '-3' : ''
    const text = await run(`pm list packages ${flag}`)
    apps.value = text
      .split('\n')
      .map((line) => line.replace('package:', '').trim())
      .filter(Boolean)
      .sort()
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    loading.value = false
  }
}

async function act(command: string, confirmText?: string) {
  if (!selected.value) return
  if (confirmText && !confirm(confirmText)) return
  message.value = ''
  try {
    const output = await run(command)
    message.value = output.trim() || '已执行'
    if (/uninstall|disable|clear/.test(command)) load()
  } catch (error) {
    message.value = (error as Error).message
  }
}

function withPkg(template: string) {
  return template.replace('{pkg}', selected.value)
}

onMounted(load)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>应用</h2>
      <button class="btn small" :disabled="loading || !state.serial" @click="load">
        {{ loading ? '读取中…' : '刷新' }}
      </button>
    </div>

    <div class="row">
      <input v-model="keyword" class="input" placeholder="搜索包名" />
      <label class="check">
        <input v-model="onlyThirdParty" type="checkbox" @change="load" />
        仅第三方应用
      </label>
    </div>

    <div class="list">
      <button
        v-for="app in filtered"
        :key="app"
        class="list-item"
        :class="{ active: selected === app }"
        @click="selected = app"
      >
        {{ app }}
      </button>
      <p v-if="!filtered.length" class="hint">没有匹配的应用，连接设备后点击刷新。</p>
    </div>

    <div class="row" style="margin-top: 12px">
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm enable {pkg}'))">启用</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm disable-user --user 0 {pkg}'), '禁用该应用？')">禁用</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('monkey -p {pkg} -c android.intent.category.LAUNCHER 1'))">启动</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('am force-stop {pkg}'))">强制停止</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm clear {pkg}'), '清除该应用数据？')">清除数据</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm uninstall -k {pkg}'), '卸载但保留数据？')">保留数据卸载</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm uninstall {pkg}'), '彻底卸载该应用？')">卸载</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('pm path {pkg}'))">安装包路径</button>
      <button class="btn" :disabled="!selected" @click="act(withPkg('dumpsys package {pkg} | head -n 40'))">软件信息</button>
    </div>

    <p v-if="message" class="hint">{{ message }}</p>
    <p class="hint">系统应用与受保护应用的启停、卸载结果取决于系统权限。</p>
  </section>
</template>
