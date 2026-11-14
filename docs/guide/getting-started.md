# 快速开始

## 前置条件

- Node.js 18 或更高版本（推荐 20+）
- npm（本项目使用 npm 管理依赖）

当前项目要求：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

## 安装依赖

在仓库根目录执行：

```bash
npm install
```

## 本地开发

启动带热更新的开发服务器：

```bash
npm run docs:dev
```

默认地址为 `http://localhost:5173/LV/`。注意 `base` 已经配置为 `/LV/`，所以访问路径带 `/LV/` 前缀。

## 生产构建

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist`，这是可以直接部署的纯静态文件。

## 本地预览构建产物

```bash
npm run docs:preview
```

`preview` 会以生产模式预览 `dist` 目录，便于在推送前确认最终效果。

## 添加新页面

1. 在 `docs/` 下新建 `.md` 文件，例如 `docs/guide/faq.md`。
2. 在 `docs/.vitepress/config.mts` 的 `themeConfig.sidebar` 中加入对应条目。
3. 若需要出现在顶部导航，把条目加到 `themeConfig.nav`。

::: tip 提示
文件路径即路由路径。`docs/guide/faq.md` 对应 `/LV/guide/faq`（本项目开启了 `cleanUrls`，链接不带 `.html`）。
:::
