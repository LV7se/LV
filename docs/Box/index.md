---
# 功能中心：独立的 VitePress 页面，不套文档排版
layout: page
sidebar: false
aside: false
outline: false
pageClass: box-page
title: LV Box
---

<script setup>
import BoxPage from '../.vitepress/theme/components/BoxPage.vue'
</script>

<ClientOnly>
  <BoxPage />
</ClientOnly>
