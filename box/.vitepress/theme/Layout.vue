<script setup lang="ts">
// 布局：沿用默认主题，只在导航栏右侧加一个演示开关
import DefaultTheme from 'vitepress/theme'
import DemoButton from './components/DemoButton.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <DemoButton />
    </template>
  </DefaultTheme.Layout>
</template>
