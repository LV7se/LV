<script setup lang="ts">
// 功能中心挂载点：注入应用结构与样式，再加载应用脚本
// 应用是整体初始化的，必须在 DOM 就绪后按顺序加载
import { onBeforeUnmount, onMounted, ref } from 'vue'
import markup from '../box/markup.html?raw'
import css from '../box/app.css?raw'

const host = ref<HTMLElement | null>(null)
let styleEl: HTMLStyleElement | null = null
let booted = false

// 终端组件是 UMD 包，先挂到全局再初始化应用
function loadXterm(): Promise<void> {
  if ((window as any).Terminal) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = import.meta.env.BASE_URL + 'box/xterm.umd.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('终端组件加载失败'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  if (!host.value || booted) return
  booted = true

  styleEl = document.createElement('style')
  styleEl.dataset.lvbox = 'app'
  styleEl.textContent = css
  document.head.appendChild(styleEl)

  host.value.innerHTML = markup

  try {
    await loadXterm()
    await import('../box/app.js')
  } catch (error) {
    console.error('[LV Box]', error)
  }
})

onBeforeUnmount(() => {
  styleEl?.remove()
  styleEl = null
  // 应用会改写 body 属性与根变量，离开时还原
  document.body.removeAttribute('data-connected')
  document.documentElement.style.removeProperty('--ui-scale')
})
</script>

<template>
  <div ref="host" class="lvbox-app" />
</template>
