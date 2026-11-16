<script setup lang="ts">
// 功能中心挂载点：注入应用结构与样式，再加载应用脚本
// 应用是整体初始化的，必须在 DOM 就绪后按顺序加载
import { onBeforeUnmount, onMounted, ref } from 'vue'
import markup from '../box/markup.html?raw'
import css from '../box/app.css?raw'

const host = ref<HTMLElement | null>(null)
let styleEl: HTMLStyleElement | null = null
let booted = false


// 应用原本把「连接设备」放在页面中部的连接引导里，这里把它移到顶部状态卡中，
// 并把应用自带的「断开」改名为「断开设备」，两枚按钮都还由应用自己绑定事件。
function relocateControls(host: HTMLElement) {
  const actions = host.querySelector<HTMLElement>('.topbar .top-actions')
  const connect = host.querySelector<HTMLButtonElement>('#connect-device')
  const disconnect = host.querySelector<HTMLButtonElement>('#disconnect')
  const pickDevice = host.querySelector<HTMLButtonElement>('#connect-usb')
  if (!actions || !connect) return

  // 卡片里已有「选择设备」，避免重复
  pickDevice?.setAttribute('hidden', '')
  connect.classList.add('primary')
  actions.append(connect)

  if (disconnect) {
    disconnect.textContent = '断开设备'
    connect.after(disconnect)
  }
}

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
    relocateControls(host.value)
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
