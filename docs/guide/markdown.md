# Markdown 扩展

VitePress 在标准 Markdown 之外提供了若干扩展能力，无需额外配置即可使用。

## 代码块

支持行高亮、行号、聚焦与差异标注：

```js{1,4,6-7}
export default {
  name: 'MyComponent',
  data() {
    return {
      msg: 'Hello VitePress'
    }
  }
}
```

```ts
// :line-numbers 开启行号
interface User {
  name: string
  age: number
}

const greet = (user: User): string => `Hello, ${user.name}`
```

## 自定义容器

::: info 信息
这是一条信息提示。
:::

::: tip 提示
这是一条提示。
:::

::: warning 注意
这是一条警告。
:::

::: danger 危险
这是一条危险提示。
:::

::: details 点击展开
这里是可折叠的详细内容。
:::

## 表格

| 功能 | 是否内置 | 说明 |
| --- | --- | --- |
| 本地搜索 | ✅ | 默认主题内置，零配置 |
| 深色模式 | ✅ | 跟随系统或手动切换 |
| 侧边栏 | ✅ | 通过 `themeConfig.sidebar` 配置 |
| 编辑此页 | ✅ | 通过 `themeConfig.editLink` 配置 |

## 目录锚点

页面右侧会自动生成当前页的标题大纲（本项目配置为 `h2`-`h3`）。

## Emoji 与链接

- 行内代码 `code`
- 链接：[VitePress 官方文档](https://vitepress.dev/zh/)
- 自动识别外部链接并显示图标
