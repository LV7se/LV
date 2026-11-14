<script setup lang="ts">
// 终端：逐条执行 shell 命令并保留输出
import { nextTick, ref } from 'vue'
import { state, run } from '../../lib/adb'

const command = ref('')
const log = ref<{ type: 'cmd' | 'out' | 'err'; text: string }[]>([])
const busy = ref(false)
const box = ref<HTMLElement | null>(null)

async function exec() {
  const cmd = command.value.trim()
  if (!cmd || !state.serial || busy.value) return
  log.value.push({ type: 'cmd', text: cmd })
  command.value = ''
  busy.value = true
  try {
    const output = await run(cmd)
    if (output.trim()) log.value.push({ type: 'out', text: output.trimEnd() })
  } catch (error) {
    log.value.push({ type: 'err', text: (error as Error).message })
  } finally {
    busy.value = false
    await nextTick()
    box.value?.scrollTo({ top: box.value.scrollHeight })
  }
}

function clear() {
  log.value = []
}
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>终端</h2>
      <button class="btn small" @click="clear">清屏</button>
    </div>

    <div ref="box" class="console">
      <p v-if="!log.length" class="hint">输入 shell 命令，例如 <code>getprop ro.product.model</code>。</p>
      <p v-for="(line, index) in log" :key="index" :class="line.type">
        <span v-if="line.type === 'cmd'" class="prompt">$</span>
        <span v-if="line.type === 'err'" class="prompt">!</span>
        {{ line.text }}
      </p>
      <p v-if="busy" class="hint">执行中…</p>
    </div>

    <form class="row" style="margin-top: 12px" @submit.prevent="exec">
      <input
        v-model="command"
        class="input mono"
        placeholder="shell 命令"
        :disabled="!state.serial || busy"
        autocomplete="off"
      />
      <button class="btn primary" type="submit" :disabled="!state.serial || busy">执行</button>
    </form>

    <p class="hint">
      命令直接在设备上执行，返回标准输出与错误输出。交互式会话（如 vi、top）需要真实 TTY，此处不支持。
    </p>
  </section>
</template>
