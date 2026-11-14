<script setup lang="ts">
// 电池信息读取
import { onMounted, ref } from 'vue'
import { state, run } from '../../lib/adb'

const rows = ref<{ label: string; value: string }[]>([])
const raw = ref('')
const showRaw = ref(false)
const message = ref('')

const STATUS: Record<string, string> = {
  '1': '未知',
  '2': '充电中',
  '3': '放电中',
  '4': '未充电',
  '5': '已充满'
}

const HEALTH: Record<string, string> = {
  '1': '未知',
  '2': '良好',
  '3': '过热',
  '4': '损坏',
  '5': '过压',
  '6': '故障',
  '7': '过冷'
}

async function refresh() {
  if (!state.serial) return
  message.value = ''
  try {
    const text = await run('dumpsys battery')
    raw.value = text
    const pick = (key: string) => {
      const match = text.match(new RegExp(`\\b${key}:\\s*(.+)`))
      return match ? match[1].trim() : ''
    }
    const temperature = pick('temperature')
    rows.value = [
      { label: '电量', value: pick('level') ? `${pick('level')} %` : '—' },
      { label: '状态', value: STATUS[pick('status')] || pick('status') || '—' },
      { label: '健康度', value: HEALTH[pick('health')] || pick('health') || '—' },
      {
        label: '温度',
        value: temperature ? `${(Number(temperature) / 10).toFixed(1)} ℃` : '—'
      },
      { label: '电压', value: pick('voltage') ? `${pick('voltage')} mV` : '—' },
      { label: '电流', value: pick('current now') ? `${pick('current now')} µA` : '—' },
      { label: '充电方式', value: pick('USB powered') === 'true' ? 'USB' : pick('AC powered') === 'true' ? '电源适配器' : pick('Wireless powered') === 'true' ? '无线' : '—' }
    ]
  } catch (error) {
    message.value = (error as Error).message
  }
}

onMounted(refresh)
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>电池</h2>
      <button class="btn small" :disabled="!state.serial" @click="refresh">刷新</button>
    </div>

    <dl v-if="rows.length" class="kv">
      <template v-for="row in rows" :key="row.label">
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </template>
    </dl>
    <p v-else class="hint">连接设备后读取电池状态。</p>

    <div class="row" style="margin-top: 12px">
      <button class="btn" :disabled="!raw" @click="showRaw = !showRaw">
        {{ showRaw ? '收起原始数据' : '查看原始数据' }}
      </button>
    </div>
    <pre v-if="showRaw" class="raw">{{ raw }}</pre>

    <p class="hint">
      参数模拟与电池曲线记录需要写入系统节点，依赖 root 或厂商开放接口，当前版本不提供。
    </p>
    <p v-if="message" class="hint warn">{{ message }}</p>
  </section>
</template>
