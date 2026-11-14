<script setup lang="ts">
// 显示控制：分辨率、密度、按键模拟与截屏
import { computed, onMounted, ref } from 'vue'
import { state, run, runBytes, getLine } from '../../lib/adb'

const size = ref('')
const density = ref('')
const width = ref('')
const height = ref('')
const dpi = ref('')
const message = ref('')

const currentSize = computed(() => size.value.replace('Physical size:', '').trim())

async function refresh() {
  if (!state.serial) return
  try {
    size.value = await getLine('wm size')
    density.value = await getLine('wm density')
    const match = currentSize.value.match(/(\d+)x(\d+)/)
    if (match && !width.value) {
      width.value = match[1]
      height.value = match[2]
    }
    if (!dpi.value) {
      const d = density.value.match(/(\d+)/)
      dpi.value = d ? d[1] : ''
    }
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function exec(command: string) {
  message.value = ''
  try {
    message.value = (await run(command)).trim() || '已执行'
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function applySize() {
  if (!width.value || !height.value) return
  await exec(`wm size ${width.value}x${height.value}`)
  refresh()
}

async function applyDensity() {
  if (!dpi.value) return
  await exec(`wm density ${dpi.value}`)
  refresh()
}

async function key(code: string, label: string) {
  await exec(`input keyevent ${code}`)
  message.value = `已发送${label}`
}

async function screenshot() {
  message.value = '正在截屏…'
  try {
    const bytes = await runBytes('screencap -p')
    const blob = new Blob([bytes], { type: 'image/png' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `lvbox-${Date.now()}.png`
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 10000)
    message.value = `已保存截图（${(blob.size / 1024).toFixed(0)} KB）`
  } catch (error) {
    message.value = (error as Error).message
  }
}

onMounted(refresh)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>显示</h2>
      <button class="btn small" :disabled="!state.serial" @click="refresh">刷新</button>
    </div>

    <p class="hint">当前：{{ currentSize || '—' }} / {{ density || '—' }}</p>

    <div class="row">
      <input v-model="width" class="input narrow" inputmode="numeric" placeholder="宽" />
      <span class="times">×</span>
      <input v-model="height" class="input narrow" inputmode="numeric" placeholder="高" />
      <button class="btn" :disabled="!state.serial" @click="applySize">修改分辨率</button>
      <button class="btn" :disabled="!state.serial" @click="exec('wm size reset').then(refresh)">恢复</button>
    </div>

    <div class="row">
      <input v-model="dpi" class="input narrow" inputmode="numeric" placeholder="DPI" />
      <button class="btn" :disabled="!state.serial" @click="applyDensity">修改密度</button>
      <button class="btn" :disabled="!state.serial" @click="exec('wm density reset').then(refresh)">恢复</button>
    </div>

    <div class="panel-head" style="margin-top: 20px"><h2>按键</h2></div>
    <div class="row">
      <button class="btn" :disabled="!state.serial" @click="key('3', '主页键')">主页</button>
      <button class="btn" :disabled="!state.serial" @click="key('4', '返回键')">返回</button>
      <button class="btn" :disabled="!state.serial" @click="key('187', '多任务键')">多任务</button>
      <button class="btn" :disabled="!state.serial" @click="key('26', '电源键')">电源</button>
      <button class="btn" :disabled="!state.serial" @click="key('24', '音量加')">音量 +</button>
      <button class="btn" :disabled="!state.serial" @click="key('25', '音量减')">音量 −</button>
      <button class="btn" :disabled="!state.serial" @click="key('164', '静音')">静音</button>
    </div>

    <div class="row" style="margin-top: 12px">
      <button class="btn primary" :disabled="!state.serial" @click="screenshot">截屏并下载</button>
    </div>

    <p v-if="message" class="hint">{{ message }}</p>
  </section>
</template>
