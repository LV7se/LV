# LV Box

LV Box 的官方网站，使用 VitePress 构建并发布到 GitHub Pages。

维护：LV7

- 站点地址：https://lv7se.github.io/LV/

## 本地开发

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地预览 http://localhost:5173/LV/
npm run docs:build # 构建到 docs/.vitepress/dist
npm run docs:preview
```

## 目录结构

```text
docs/
├─ .vitepress/
│  ├─ config.mts           # 站点配置（base: /LV/）
│  ├─ logo.ts              # 品牌图形路径数据，内联 SVG 与 favicon 共用
│  └─ theme/
│     ├─ index.ts          # 主题入口：注册 Layout、处理功能中心跳转
│     ├─ Layout.vue        # 用插槽把内联 <svg> 放进导航条与首页 hero
│     ├─ logo.css          # 图形标尺寸（颜色交给 currentColor）
│     └─ components/
│        └─ BrandMark.vue  # 内联 SVG 组件
├─ public/Box/index.html   # 功能中心（独立应用）
├─ index.md                # 首页
├─ about.md                # 关于
└─ changelog.md            # 更新日志
.github/workflows/deploy.yml  # 推送 main 自动部署到 GitHub Pages
```

## 品牌图标

图形标**不落地成图片文件**，而是把 `<svg>` 直接写进页面（和 apple.com 导航条同一种做法）：

- 路径数据只有一份，在 `docs/.vitepress/logo.ts`；
- 由 `BrandMark.vue` 渲染成内联 `<svg>`，`fill="currentColor"`，颜色自动跟随深浅色主题，不需要滤镜反色；
- 导航条与首页 hero 通过 `Layout.vue` 的插槽插入，尺寸由 `logo.css` 与 VitePress 自带的 `.image-src` 规则控制；
- 只有浏览器标签页图标（favicon）无法内联，仍由 `logo.ts` 生成 data URI。

要改图标，只改 `logo.ts` 里的 `BRAND_PATH`（以及 favicon 需要的配色），全站同步生效。

## 更新网站

修改 `docs/` 下的内容后提交并推送到 `main`，GitHub Actions 会自动构建并部署。

## 功能中心

`box/` 是独立的 VitePress 站点，有自己的配置、导航与 base，构建产物由主站一起发布：

- 站点根目录：`box/`
- 配置：`box/.vitepress/config.mts`（`base: '/LV/Box/'`）
- 构建：`npm run box:build`（输出到 `docs/public/Box`）
- 页面：`box/index.md`（功能中心）、`box/guide.md`（使用说明）
- 应用代码：`box/.vitepress/theme/box/`，终端组件：`box/public/box/xterm.umd.js`

完整构建用 `npm run build`（先 Box 后主站）。
