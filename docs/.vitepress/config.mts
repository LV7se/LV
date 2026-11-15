// LV Box 站点配置
// 维护：LV7
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',

  // 用于浏览器标签页标题与 SEO
  title: 'LV Box 官网',
  description: '玩机，可以更简单。在浏览器中运行的 ADB 图形化工具',

  // 页面部署在 GitHub Pages 的子路径下，资源与路由都要带上这个前缀
  base: '/LV/',

  // 功能中心是独立应用：给它的链接补 target，让前端路由直接放行
  transformHtml(code) {
    return code.replace(
      /<a((?:(?!>)[\s\S])*?)href="\/LV\/Box\/"((?:(?!>)[\s\S])*?)>/g,
      (match, head, tail) =>
        /\starget=/.test(head + tail)
          ? match
          : `<a${head}href="/LV/Box/"${tail} target="_self">`
    )
  },

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/LV/logo.svg' }],
    ['link', { rel: 'alternate icon', type: 'image/svg+xml', href: '/LV/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],

  themeConfig: {
    // 导航栏显示的文字，与标签页标题分开配置
    siteTitle: 'LV Box',

    // 品牌图标：1:1 正方形，24×24 等比缩放，不拉伸
    logo: {
      src: '/logo.svg',
      alt: 'LV Box',
      width: 24,
      height: 24
    },

    // 顶部导航与侧边栏共用同一组入口
    nav: [
      { text: '关于', link: '/about' },
      { text: '更新日志', link: '/changelog' }
    ],

    sidebar: {
      '/': [
        {
          text: 'LV Box',
          items: [
            { text: '关于', link: '/about' },
            { text: '更新日志', link: '/changelog' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LV7se/LV' }
    ],

    // 本地搜索（默认主题内置能力）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 「在 GitHub 上编辑此页」直达本仓库对应文件
    editLink: {
      pattern: 'https://github.com/LV7se/LV/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 依赖完整 Git 历史，CI 中 checkout 需 fetch-depth: 0
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'medium' }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    // 页脚：许可证与版权信息
    footer: {
      message: '以 GPL-3.0 许可开源',
      copyright: '© 2026 LV Box'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',
    externalLinkIcon: true
  }
})
