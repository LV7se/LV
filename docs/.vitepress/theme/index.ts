// 站点主题：沿用默认主题，只处理功能中心的跳转
// 功能中心是独立应用，链接必须整页加载；VitePress 路由会跳过带 target 属性的链接
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './cta.css'

function markExternalLinks() {
  document.querySelectorAll('a[href$="/Box/"]').forEach((link) => {
    link.setAttribute('target', '_self')
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }: EnhanceAppContext) {
    if (typeof window === 'undefined') return
    markExternalLinks()
    router.onAfterRouteChanged?.(markExternalLinks)
  }
}
