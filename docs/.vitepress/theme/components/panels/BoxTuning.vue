<script setup lang="ts">
// 系统参数调节：字体缩放、动画倍率与锁屏时间
import { onMounted, ref } from 'vue'
import { state, run, getLine } from '../../lib/adb'

const fontScale = ref('1.0')
const windowScale = ref('1.0')
const transitionScale = ref('1.0')
const animatorScale = ref('1.0')
const timeout = ref('30000')
const message = ref('')

async function refresh() {
  if (!state.serial) return
  try {
    fontScale.value = await getLine('settings get system font_scale')
    windowScale.value = await getLine('settings get global window_animation_scale')
    transitionScale.value = await getLine('settings get global transition_animation_scale')
    animatorScale.value = await getLine('settings get global animator_duration_scale')
    timeout.value = await getLine('settings get system screen_off_timeout')
  } catch (error) {
    message.value = (error as Error).message
  }
}

async function apply(command: string) {
  message.value = ''
  try {
    await run(command)
    message.value = '已应用'
    refresh()
  } catch (error) {
    message.value = (error as Error).message
  }
}

onMounted(refresh)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>调节</h2>
      <button class="btn small" :disabled="!state.serial" @click="refresh">刷新</button>
    </div>

    <div class="row">
      <label class="label">字体缩放</label>
      <input v-model="fontScale" class="input narrow" inputmode="decimal" />
      <button class="btn" :disabled="!state.serial" @click="apply(`settings put system font_scale ${fontScale}`)">应用</button>
    </div>

    <div class="row">
      <label class="label">窗口动画</label>
      <input v-model="windowScale" class="input narrow" inputmode="decimal" />
      <label class="label">过渡动画</label>
      <input v-model="transitionScale" class="input narrow" inputmode="decimal" />
      <label class="label">程序动画</label>
      <input v-model="animatorScale" class="input narrow" inputmode="decimal" />
      <button
        class="btn"
        :disabled="!state.serial"
        @click="apply(`settings put global window_animation_scale ${windowScale}; settings put global transition_animation_scale ${transitionScale}; settings put global animator_duration_scale ${animatorScale}`)"
      >
        应用
      </button>
    </div>

    <div class="row">
      <label class="label">锁屏时间（毫秒）</label>
      <input v-model="timeout" class="input narrow" inputmode="numeric" />
      <button class="btn" :disabled="!state.serial" @click="apply(`settings put system screen_off_timeout ${timeout}`)">应用</button>
    </div>

    <p v-if="message" class="hint">{{ message }}</p>
    <p class="hint">写入系统设置需要 shell 具备写入权限，部分机型或企业策略会拒绝执行。</p>
  </section>
</template>
