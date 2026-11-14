// LV Box 主题：沿用默认主题，只额外挂载功能中心组件
// 功能中心按需加载，避免首页也背上 ADB 相关代码
// 维护：LV7
import type { EnhanceAppContext } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './box.css'

const BoxApp = defineAsyncComponent(() => import('./components/BoxApp.vue'))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('BoxApp', BoxApp)
  }
}
