# 部署到 GitHub Pages

本项目通过 GitHub Actions 自动构建并部署到 GitHub Pages，工作流文件为 `.github/workflows/deploy.yml`。

## 触发条件

- 推送到 `main` 分支时自动触发
- 也可以在 Actions 页面手动触发（`workflow_dispatch`）

## 工作流做了什么

1. 检出仓库代码（`actions/checkout`，`fetch-depth: 0` 以便获取完整的 Git 历史用于「最后更新于」）
2. 安装 Node.js 并缓存 npm 依赖（`actions/setup-node`）
3. 配置 Pages（`actions/configure-pages`）
4. `npm ci` 安装依赖
5. `npm run docs:build` 构建，产物在 `docs/.vitepress/dist`
6. 上传构建产物为 Pages 制品（`actions/upload-pages-artifact`）
7. 部署到 GitHub Pages（`actions/deploy-pages`）

## 关键配置

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false
```

- `pages: write` 与 `id-token: write` 是 `deploy-pages` 必需的权限
- 并发组保证同一时间只有一次 Pages 部署，避免相互覆盖
- `cancel-in-progress: false` 表示不取消正在进行的部署，防止站点处于中间状态

## 仓库设置

GitHub Pages 的 **Source** 需要设置为 **GitHub Actions**（Settings → Pages → Build and deployment → Source）。本项目已通过 API 完成该配置。

## base 路径

项目站点（`https://<user>.github.io/<repo>/`）必须配置 `base`，否则静态资源会 404：

```ts
export default defineConfig({
  base: '/LV/'
})
```

::: warning 注意
如果以后把仓库改名为 `LV7se.github.io` 或绑定自定义域名，需要把 `base` 改为 `'/'`。
:::

## 访问地址

- 站点：https://lv7se.github.io/LV/
- Actions：https://github.com/LV7se/LV/actions

## 如何更新网站

修改 `docs/` 下的 Markdown 或配置后，提交并推送到 `main`：

```bash
git add .
git commit -m "docs: 更新内容"
git push origin main
```

推送后 Actions 会自动重新构建并发布，通常一两分钟内生效。浏览器若有缓存，可用 `Ctrl/Cmd + Shift + R` 强制刷新。
