<script setup lang="ts">
// 演示测试：没有真机时用来预览已连接界面
// 只切换应用的连接状态标记，不伪造任何设备数据
import { onBeforeUnmount, ref } from 'vue'

const on = ref(false)
let timer: number | undefined

function toggle() {
  on.value = !on.value

  if (on.value) {
    // 应用会周期性同步连接状态，这里持续压住，并把状态文案改成演示
    timer = window.setInterval(() => {
      document.body.dataset.connected = 'true'
      const label = document.querySelector('#connection-label')
      if (label) label.textContent = '演示模式'
    }, 100)
    document.documentElement.classList.add('lvbox-demo-on')
  } else {
    window.clearInterval(timer)
    document.body.dataset.connected = 'false'
    const label = document.querySelector('#connection-label')
    if (label) label.textContent = '未连接设备'
    document.documentElement.classList.remove('lvbox-demo-on')
  }
}

onBeforeUnmount(() => {
  window.clearInterval(timer)
  document.documentElement.classList.remove('lvbox-demo-on')
})
</script>

<template>
  <button class="demo-btn" :class="{ on }" type="button" @click="toggle">
    {{ on ? '退出演示' : '演示测试' }}
  </button>

  <Teleport to="body">
    <p v-if="on" class="demo-banner">演示模式：仅预览界面，所有数据为占位，未连接任何设备</p>
  </Teleport>
</template>
