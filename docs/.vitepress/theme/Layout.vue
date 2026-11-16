<script setup lang="ts">
// 布局：沿用默认主题，只插入两处内联品牌标
// - 导航条标题前：与站点名并排，颜色继承 .title 的 color
// - 首页 hero 图位：交给 VitePress 自己的 .image-src 尺寸规则（192/256/320）
import DefaultTheme from 'vitepress/theme'
import BrandMark from './components/BrandMark.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-before>
      <BrandMark class="nav-brand-mark" :size="24" />
    </template>

    <template #home-hero-image>
      <BrandMark class="image-src hero-brand-mark" :size="320" label="LV Box" />
    </template>
  </DefaultTheme.Layout>
</template>
