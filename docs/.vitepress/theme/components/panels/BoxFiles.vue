<script setup lang="ts">
// 安装与文件传输：APK 安装、拆分安装、推送、提取
import { ref } from 'vue'
import { state, run, runBytes, runWithInput } from '../../lib/adb'

const busy = ref(false)
const message = ref('')
const progress = ref(0)
const packageName = ref('')
const remotePath = ref('/sdcard/')

function pick(accept: string, multiple = false) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  input.multiple = multiple
  return new Promise<File[]>((resolve) => {
    input.onchange = () => resolve(Array.from(input.files || []))
    input.click()
  })
}

async function pushFile(file: File) {
  const target = `${remotePath.value.replace(/\/?$/, '/')}${file.name}`
  await runWithInput(`cat > '${target}'`, file, (p) => (progress.value = p))
  return target
}

async function installSingle() {
  const [file] = await pick('.apk')
  if (!file) return
  busy.value = true
  message.value = '正在上传安装包…'
  try {
    const target = await pushFile(file)
    message.value = '正在安装…'
    const output = await run(`pm install -r -t '${target}'`)
    message.value = output.trim() || '安装完成'
    await run(`rm -f '${target}'`)
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    busy.value = false
    progress.value = 0
  }
}

async function installSplit() {
  const files = await pick('.apk', true)
  if (!files.length) return
  busy.value = true
  message.value = `正在上传 ${files.length} 个分片…`
  try {
    const paths: string[] = []
    for (const file of files) paths.push(await pushFile(file))
    const total = files.reduce((sum, f) => sum + f.size, 0)
    const created = await run(`pm install-create -r -t -S ${total}`)
    const id = created.match(/\[(\d+)\]/)?.[1]
    if (!id) throw new Error(created.trim() || '无法创建安装会话')
    for (let i = 0; i < paths.length; i++) {
      await run(`pm install-write -S ${files[i].size} ${id} ${i}_${files[i].name} '${paths[i]}'`)
    }
    const result = await run(`pm install-commit ${id}`)
    message.value = result.trim() || '安装完成'
    await run(`rm -f ${paths.map((p) => `'${p}'`).join(' ')}`)
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    busy.value = false
    progress.value = 0
  }
}

async function pushAny() {
  const [file] = await pick('*/*')
  if (!file) return
  busy.value = true
  message.value = '正在推送…'
  try {
    const target = await pushFile(file)
    message.value = `已推送至 ${target}`
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    busy.value = false
    progress.value = 0
  }
}

async function extract() {
  if (!packageName.value.trim()) return
  busy.value = true
  message.value = '正在读取安装包…'
  try {
    const text = await run(`pm path ${packageName.value.trim()}`)
    const path = text.match(/package:(.+)/)?.[1]?.trim()
    if (!path) throw new Error('未找到安装包路径')
    const bytes = await runBytes(`cat '${path}'`)
    const blob = new Blob([bytes], { type: 'application/vnd.android.package-archive' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${packageName.value.trim()}-${Date.now()}.apk`
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 10000)
    message.value = `已导出 ${(blob.size / 1024 / 1024).toFixed(1)} MB`
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section class="panel">
    <div class="panel-head"><h2>安装与文件</h2></div>

    <div class="row">
      <button class="btn primary" :disabled="busy || !state.serial" @click="installSingle">安装 APK</button>
      <button class="btn" :disabled="busy || !state.serial" @click="installSplit">拆分 APK 安装</button>
      <button class="btn" :disabled="busy || !state.serial" @click="pushAny">推送文件</button>
    </div>

    <div class="row">
      <label class="label">接收目录</label>
      <input v-model="remotePath" class="input" style="flex: 1; min-width: 160px" />
    </div>

    <div class="row">
      <input v-model="packageName" class="input" style="flex: 1; min-width: 160px" placeholder="包名，例如 com.android.chrome" />
      <button class="btn" :disabled="busy || !state.serial || !packageName.trim()" @click="extract">导出安装包</button>
    </div>

    <div v-if="busy && progress" class="progress"><span :style="{ width: progress + '%' }" /></div>
    <p v-if="message" class="hint">{{ message }}</p>
    <p class="hint">安装输出由系统包管理器返回；部分系统应用需要用户确认或签名校验。</p>
  </section>
</template>
