// 站点主题：沿用默认主题，额外接管两件事
// 1. 品牌图标以内联 <svg> 渲染（见 Layout.vue 的插槽），不再走 <img> + 滤镜
// 2. 功能中心是独立应用，必须整页加载：给链接补 target 属性，路由见 target 会直接放行
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './logo.css'

const SELECTOR = 'a[href$="/Box/"]'

function patchLinks() {
  document.querySelectorAll<HTMLAnchorElement>(SELECTOR).forEach((link) => {
    if (!link.hasAttribute('target')) link.setAttribute('target', '_self')
  })
}

export default {
  extends: DefaultTheme,
  Layout,
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
