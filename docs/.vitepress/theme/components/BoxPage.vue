<script setup lang="ts">
// 功能中心：把应用结构与脚本挂到 VitePress 页面里
// 应用自带样式按需注入，离开页面时移除，避免污染站点其它页面
import { onBeforeUnmount, onMounted, ref } from 'vue'
import markup from '../box/markup.html?raw'
import css from '../box/app.css?raw'

const host = ref<HTMLElement | null>(null)
let styleEl: HTMLStyleElement | null = null
let booted = false

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
    // 应用在导入时自行初始化，需等结构就绪后再加载
    await import('../box/app.js')
  } catch (error) {
    console.error('[LV Box]', error)
  }
})

onBeforeUnmount(() => {
  styleEl?.remove()
  styleEl = null
  // 应用会改写 body 与根变量，离开时还原，避免影响站点其它页面
  document.body.removeAttribute('data-connected')
  document.documentElement.style.removeProperty('--ui-scale')
})
</script>

<template>
  <div ref="host" class="lvbox-app" />
</template>

<style>
/* 站点 chrome 已有品牌与导航，这里隐去应用自带的标题 */
.lvbox-app .brand-copy {
  display: none;
}

.lvbox-app .topbar {
  border-radius: 12px;
  margin-bottom: 8px;
}

.lvbox-app .app-shell {
  max-width: none;
}
</style>
