import { defineConfig } from 'vitepress'

// 官方中文文档：https://vitepress.dev/zh/
export default defineConfig({
  lang: 'zh-CN',
  title: 'LV',
  description: 'LV 项目的官方文档站点，使用 VitePress 默认主题构建',

  // GitHub Pages 项目站点：https://lv7se.github.io/LV/
  base: '/LV/',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/LV/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide/' },
      {
        text: '相关链接',
        items: [
          { text: 'VitePress 官方文档', link: 'https://vitepress.dev/zh/' },
          { text: 'VitePress 源码仓库', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'Markdown 扩展', link: '/guide/markdown' },
            { text: '使用 Vue', link: '/guide/using-vue' },
            { text: '部署到 GitHub Pages', link: '/guide/deploy' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LV7se/LV' }
    ],

    // 官方默认主题内置的本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
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
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    footer: {
      message: '基于 MIT 许可证发布',
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
