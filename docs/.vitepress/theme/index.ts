// 站点主题：沿用默认主题，只处理功能中心的跳转
// 功能中心是独立应用，必须整页加载：给链接补 target 属性，路由见 target 会直接放行
import DefaultTheme from 'vitepress/theme'
import './logo.css'

const SELECTOR = 'a[href$="/Box/"]'

function patchLinks() {
  document.querySelectorAll<HTMLAnchorElement>(SELECTOR).forEach((link) => {
    if (!link.hasAttribute('target')) link.setAttribute('target', '_self')
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window === 'undefined') return

    // 兜底：单击时强制整页跳转，避免路由把独立应用当成站内页面
    document.addEventListener(
      'click',
      (event) => {
        const link = (event.target as Element)?.closest?.(SELECTOR)
        if (!link) return
        event.preventDefault()
        event.stopImmediatePropagation()
        window.location.assign(link.getAttribute('href') as string)
      },
      true
    )

    const start = () => {
      patchLinks()
      new MutationObserver(patchLinks).observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start)
    } else {
      start()
    }
  }
}
