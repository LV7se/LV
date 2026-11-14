# 使用 Vue

VitePress 页面本质上是一个 Vue 单文件组件的模板，因此可以直接在 Markdown 中使用 Vue 语法与组件。

## 插值

```md
{{ 1 + 1 }}
```

渲染结果：{{ 1 + 1 }}

## 使用内置组件

VitePress 提供了一些内置组件，例如 `ClientOnly`：

```md
<ClientOnly>
  仅在浏览器端渲染的内容
</ClientOnly>
```

## 引入自定义组件

1. 新建 `docs/.vitepress/theme/index.ts`：

```ts
import DefaultTheme from 'vitepress/theme'
import MyComponent from './MyComponent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyComponent', MyComponent)
  }
}
```

2. 在任意 Markdown 页面中直接使用：

```md
<MyComponent />
```

::: tip 保持默认主题
上面的写法是 **扩展** 官方默认主题（`extends: DefaultTheme`），布局、导航、侧边栏和搜索等能力保持不变。本项目当前未添加自定义主题，页面全部使用官方默认样式。
:::

## 路由

- 页面之间的链接直接写相对路径或绝对路径即可，VitePress 会自动处理 `base`。
- 需要访问当前路由信息时，可以引入 `useRoute`：

```ts
import { useRoute } from 'vitepress'

const route = useRoute()
console.log(route.path)
```
