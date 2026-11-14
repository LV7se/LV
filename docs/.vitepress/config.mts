import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LV',
  description: 'LV 项目官方网站',

  // GitHub Pages 项目站点：https://lv7se.github.io/LV/
  base: '/LV/',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/LV/logo.svg' }],
    ['link', { rel: 'alternate icon', type: 'image/svg+xml', href: '/LV/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],

  themeConfig: {
    // 新品牌图标：正方形 1:1，按 24×24 等比缩放，不拉伸
    logo: {
      src: '/logo.svg',
      alt: 'LV',
      width: 24,
      height: 24
    },

    nav: [
      { text: '关于', link: '/about' },
      { text: '更新日志', link: '/changelog' }
    ],

    sidebar: {
      '/': [
        {
          text: 'LV',
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

    editLink: {
      pattern: 'https://github.com/LV7se/LV/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

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

    footer: {
      message: '保留所有权利',
      copyright: '版权所有 © 2026 LV'
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
