# 介绍

VitePress 是一个基于 [Vite](https://vite.dev/) 构建的静态站点生成器，专为技术文档而设计。它使用 [Vue 3](https://vuejs.org/) 渲染 Markdown 内容，并内置了官方默认主题。

本站点即使用 VitePress **官方默认主题**搭建，配置与结构尽量贴近官方推荐方式，没有引入第三方模板。

## 为什么选择 VitePress

- **快**：基于 Vite，开发服务器冷启动极快，热更新近乎即时；构建产物是纯静态 HTML。
- **专注内容**：用 Markdown 写作，代码块高亮、页面导航、搜索等能力开箱即用。
- **可扩展**：需要时可以用 Vue 组件扩展 Markdown，也可以完全自定义主题。
- **默认主题完善**：导航栏、侧边栏、深色模式、本地搜索、上一页/下一页、编辑链接等均已内置。

## 本站结构

```text
LV/
├─ docs/                        # 文档根目录（VitePress 的 srcDir）
│  ├─ .vitepress/
│  │  └─ config.mts             # 站点与主题配置
│  ├─ guide/                    # 指南页面
│  │  ├─ index.md               # 本页
│  │  ├─ getting-started.md
│  │  ├─ markdown.md
│  │  ├─ using-vue.md
│  │  └─ deploy.md
│  ├─ public/                   # 原样拷贝到产物根目录的静态资源
│  └─ index.md                  # 首页（layout: home）
├─ package.json
└─ .github/workflows/deploy.yml # GitHub Pages 自动部署
```

## 站点信息

| 项目 | 值 |
| --- | --- |
| 站点标题 | LV |
| 语言 | `zh-CN` |
| base | `/LV/` |
| 部署地址 | https://lv7se.github.io/LV/ |
| 官方文档 | https://vitepress.dev/zh/ |

## 继续阅读

- [快速开始](./getting-started) —— 安装依赖、本地预览与构建
- [Markdown 扩展](./markdown) —— 代码块、容器、表格等
- [使用 Vue](./using-vue) —— 在 Markdown 中嵌入组件
- [部署到 GitHub Pages](./deploy) —— 自动部署工作流说明
