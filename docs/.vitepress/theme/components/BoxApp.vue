<script setup lang="ts">
// 功能中心主框架：连接状态、功能导航与面板切换
import { computed, ref } from 'vue'
import { state, connect, disconnect } from '../lib/adb'
import BoxDevice from './panels/BoxDevice.vue'
import BoxApps from './panels/BoxApps.vue'
import BoxDisplay from './panels/BoxDisplay.vue'
import BoxSystem from './panels/BoxSystem.vue'
import BoxBattery from './panels/BoxBattery.vue'
import BoxTuning from './panels/BoxTuning.vue'
import BoxFiles from './panels/BoxFiles.vue'
import BoxTerminal from './panels/BoxTerminal.vue'
import BoxSettings from './panels/BoxSettings.vue'

const tabs = [
  { key: 'device', label: '设备', icon: '📱', component: BoxDevice },
  { key: 'apps', label: '应用', icon: '📦', component: BoxApps },
  { key: 'display', label: '显示', icon: '🖥️', component: BoxDisplay },
  { key: 'system', label: '系统', icon: '🎛️', component: BoxSystem },
  { key: 'files', label: '安装', icon: '📥', component: BoxFiles },
  { key: 'battery', label: '电池', icon: '🔋', component: BoxBattery },
  { key: 'tuning', label: '调节', icon: '🎚️', component: BoxTuning },
  { key: 'terminal', label: '终端', icon: '⌨️', component: BoxTerminal },
  { key: 'settings', label: '设置', icon: '⚙️', component: BoxSettings }
]

const current = ref(localStorage.getItem('lvbox:page') || 'device')

const panel = computed(() => tabs.find((t) => t.key === current.value)?.component || BoxDevice)

function select(key: string) {
  current.value = key
  localStorage.setItem('lvbox:page', key)
}

const connected = computed(() => !!state.serial)
</script>

<template>
  <div class="box">
    <header class="box-head">
      <div class="box-brand">
        <span class="dot" :class="{ on: connected }" />
        <strong>LV Box</strong>
        <span class="serial">{{ connected ? state.serial : '未连接设备' }}</span>
      </div>

      <div class="box-actions">
        <button v-if="!connected" class="btn primary" :disabled="state.connecting" @click="connect">
          {{ state.connecting ? '连接中…' : '连接设备' }}
        </button>
        <button v-else class="btn" @click="disconnect">断开</button>
      </div>
    </header>

    <p v-if="!state.supported" class="hint warn">
      当前浏览器不支持 WebUSB，请使用 Chrome / Edge 等 Chromium 内核浏览器打开。
    </p>
    <p v-else-if="!state.secureContext" class="hint warn">
      需要通过 HTTPS 或 localhost 访问，浏览器才允许使用 WebUSB。
    </p>
    <p v-if="state.error" class="hint warn">{{ state.error }}</p>

    <nav class="box-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab"
        :class="{ active: current === tab.key }"
        @click="select(tab.key)"
      >
        <span aria-hidden="true">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </nav>

    <main class="box-body">
      <component :is="panel" />
    </main>
  </div>
</template>
