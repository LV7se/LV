# LV Box

LV Box 的官方网站，使用 VitePress 构建并发布到 GitHub Pages。

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
├─ .vitepress/config.mts   # 站点配置（base: /LV/）
├─ public/logo.svg         # 品牌图标（favicon + 导航栏 Logo）
├─ index.md                # 首页
├─ about.md                # 关于
└─ changelog.md            # 更新日志
.github/workflows/deploy.yml  # 推送 main 自动部署到 GitHub Pages
```

## 更新网站

修改 `docs/` 下的内容后提交并推送到 `main`，GitHub Actions 会自动构建并部署。
