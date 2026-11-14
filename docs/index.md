---
# https://vitepress.dev/zh/reference/default-theme-home-page
layout: home

hero:
  name: LV
  text: 官方文档站点
  tagline: 使用 VitePress 官方默认主题构建，简洁、快速、开箱即用
  image:
    src: /logo.svg
    alt: LV
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 什么是 VitePress？
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/LV7se/LV

features:
  - icon: ⚡️
    title: 极速构建
    details: 基于 Vite 的静态站点构建，冷启动与热更新都保持在毫秒级别。
  - icon: 📝
    title: 专注内容
    details: 使用 Markdown 编写，内置代码块高亮、目录、搜索等能力，无需分心配置。
  - icon: 🎨
    title: 默认主题开箱即用
    details: 官方默认主题自带导航、侧边栏、深色模式和本地搜索，无需额外设计。
  - icon: 🔧
    title: 可定制
    details: 支持自定义主题与 Vue 组件，需要时再扩展，不用一开始就背负复杂度。
---

## 本站说明

本站是 [LV](https://github.com/LV7se/LV) 项目的文档站点，完全基于 [VitePress](https://vitepress.dev/zh/) 官方默认主题与官方基础结构搭建：

- 文档源码位于 `docs/` 目录
- 站点配置位于 `docs/.vitepress/config.mts`
- 通过 GitHub Actions 自动构建并发布到 GitHub Pages

## 下一步

| 目标 | 入口 |
| --- | --- |
| 本地编写与预览 | [快速开始](/guide/getting-started) |
| 了解 Markdown 能力 | [Markdown 扩展](/guide/markdown) |
| 在页面中使用组件 | [使用 Vue](/guide/using-vue) |
| 自动部署 | [部署到 GitHub Pages](/guide/deploy) |
