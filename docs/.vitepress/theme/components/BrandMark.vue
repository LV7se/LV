<script setup lang="ts">
// 品牌图形标
//
// 与 apple.com 导航条的做法一致：直接把 <svg> 写在 DOM 里，
// 用 fill="currentColor" 让图形跟着文字颜色走。
// 好处：随主题变色（不需要 filter 补丁）、省一次请求、不闪烁。
import { BRAND_PATH, BRAND_TRANSFORM, BRAND_VIEWBOX } from '../../logo'

withDefaults(
  defineProps<{
    /** 边长，默认与导航条图标高度一致 */
    size?: number | string
    /** 传了才作为可访问名称；纯装饰时请留空 */
    label?: string
  }>(),
  { size: 24 }
)
</script>

<template>
  <svg
    class="brand-mark"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="BRAND_VIEWBOX"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <g :transform="BRAND_TRANSFORM">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        :d="BRAND_PATH"
      />
    </g>
  </svg>
</template>
