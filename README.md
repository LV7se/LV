# LV

LV 项目的文档站点，基于 [VitePress](https://vitepress.dev/zh/) 官方默认主题构建。

- 站点地址：https://lv7se.github.io/LV/
- 官方文档：https://vitepress.dev/zh/

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
├─ .vitepress/config.mts   # 站点配置（base: /LV/）
├─ guide/                  # 指南页面
└─ index.md                # 首页
.github/workflows/deploy.yml  # 推送 main 自动部署到 GitHub Pages
```

## 更新网站

修改 `docs/` 下的内容后提交并推送到 `main`，GitHub Actions 会自动构建并部署。
