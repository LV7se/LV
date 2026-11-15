// 站点主题：沿用默认主题，只接管功能中心的跳转
// 功能中心是独立应用，必须整页加载；否则前端路由会把它当成站内页面并落到 404
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'

let installed = false

export default {
  extends: DefaultTheme,
  enhanceApp({}: EnhanceAppContext) {
    if (installed || typeof window === 'undefined') return
    installed = true

    // 捕获阶段先于路由的冒泡监听执行，避免出现 404 闪屏
    document.addEventListener(
      'click',
      (event) => {
        const link = (event.target as Element)?.closest?.('a[href$="/Box/"]')
        if (!link) return
        event.preventDefault()
        event.stopImmediatePropagation()
        window.location.assign(link.getAttribute('href') as string)
      },
      true
    )
  }
}
