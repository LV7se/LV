<script setup lang="ts">
// 本地偏好设置，保存在浏览器中
import { onMounted, ref } from 'vue'

const startPage = ref('device')
const note = ref('')
const screenshotAuto = ref(true)

const pages = [
  { key: 'device', label: '设备' },
  { key: 'apps', label: '应用' },
  { key: 'display', label: '显示' },
  { key: 'battery', label: '电池' },
  { key: 'terminal', label: '终端' }
]

function save() {
  localStorage.setItem('lvbox:page', startPage.value)
  localStorage.setItem('lvbox:screenshotDownload', String(screenshotAuto.value))
  note.value = '已保存'
  setTimeout(() => (note.value = ''), 1500)
}

function reset() {
  localStorage.removeItem('lvbox:page')
  localStorage.removeItem('lvbox:screenshotDownload')
  startPage.value = 'device'
  screenshotAuto.value = true
  note.value = '已恢复默认'
  setTimeout(() => (note.value = ''), 1500)
}

onMounted(() => {
  startPage.value = localStorage.getItem('lvbox:page') || 'device'
  screenshotAuto.value = localStorage.getItem('lvbox:screenshotDownload') !== 'false'
})
</script>

<template>
  <section class="panel">
    <div class="panel-head"><h2>设置</h2></div>

    <div class="row">
      <label class="label">默认打开的面板</label>
      <select v-model="startPage" class="input">
        <option v-for="page in pages" :key="page.key" :value="page.key">{{ page.label }}</option>
      </select>
    </div>

    <div class="row">
      <label class="check">
        <input v-model="screenshotAuto" type="checkbox" />
        截图后直接下载
      </label>
    </div>

    <div class="row" style="margin-top: 12px">
      <button class="btn primary" @click="save">保存</button>
      <button class="btn" @click="reset">恢复默认</button>
      <span v-if="note" class="hint">{{ note }}</span>
    </div>

    <p class="hint">
      设置保存在当前网站的浏览器本地存储中，清理站点数据会一并删除。ADB 授权密钥由浏览器 IndexedDB 保存，
      可在系统弹出的授权记录中撤销。
    </p>
  </section>
</template>
