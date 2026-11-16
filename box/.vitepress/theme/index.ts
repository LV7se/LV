// 站点主题：沿用默认主题，补充布局与功能中心的样式
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './box.css'

export default {
  extends: DefaultTheme,
  Layout
}
