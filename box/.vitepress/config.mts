// LV Box 独立站点配置（与 /LV 主站互不依赖）
import { defineConfig } from 'vitepress'
import { LOGO_DATA_URI } from './logo'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LV Box',
  description: '在浏览器中运行的 ADB 工具',

  // 部署在 GitHub Pages 的独立子目录
  base: '/LV/Box/',

  // 构建产物放进主站的 public 目录，由主站一起发布
  outDir: '../docs/public/Box',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: LOGO_DATA_URI }],
    ['meta', { name: 'theme-color', content: '#3451b2' }]
  ],

  themeConfig: {
    logo: { src: LOGO_DATA_URI, alt: 'LV Box', width: 24, height: 24 },

    nav: [
      { text: '功能中心', link: '/' },
      { text: '使用说明', link: '/guide' }
    ],

    sidebar: false,

    socialLinks: [{ icon: 'github', link: 'https://github.com/LV7se/LV' }],

    outline: { label: '本页目录' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: { text: '最后更新于' },

    editLink: {
      pattern: 'https://github.com/LV7se/LV/edit/main/box/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '以 GPL-3.0 许可开源',
      copyright: '© 2026 LV Box'
    },

    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言'
  }
})
