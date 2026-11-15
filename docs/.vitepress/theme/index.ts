// 站点主题：沿用默认主题，只接管功能中心的跳转
// 功能中心是独立应用，不能让前端路由把它当成站内页面（否则会落到 404）
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'

let installed = false

export default {
  extends: DefaultTheme,
  enhanceApp({ router }: EnhanceAppContext) {
    if (installed || typeof window === 'undefined') return
    installed = true

    document.addEventListener('click', (event) => {
      const link = (event.target as Element)?.closest?.('a[href$="/Box/"]')
      if (!link) return
      event.preventDefault()
      // 整页跳转，交给静态服务器返回独立应用
      window.location.assign(link.getAttribute('href') as string)
    })

    // 支持浏览器前进/后退到该地址时也整页加载
    router.onAfterRouteChanged?.((to: string) => {
      if (to.endsWith('/Box/')) window.location.assign(to)
    })
  }
}
