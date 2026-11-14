// LV Box 功能中心的 ADB 连接层
// 通过 WebUSB 直接与手机通信，不经过任何远程服务
// 维护：LV7
import { shallowRef, reactive } from 'vue'
import { Adb, AdbDaemonTransport } from '@yume-chan/adb'
import { AdbDaemonWebUsbDeviceManager } from '@yume-chan/adb-daemon-webusb'
import AdbWebCredentialStore from '@yume-chan/adb-credential-web'

// 浏览器不支持 WebUSB 时为 undefined
export const usbManager = AdbDaemonWebUsbDeviceManager.BROWSER

export const adbRef = shallowRef<Adb | null>(null)

export const state = reactive({
  serial: '',
  model: '',
  connecting: false,
  supported: !!usbManager,
  secureContext: typeof window !== 'undefined' ? window.isSecureContext : false,
  error: ''
})

const credentialStore = new AdbWebCredentialStore('LV Box')

/** 弹出系统选择框，让用户授权一台 ADB 设备并建立会话 */
export async function connect(): Promise<void> {
  if (!usbManager) {
    state.error = '当前浏览器不支持 WebUSB，请改用 Chrome / Edge 等 Chromium 内核浏览器'
    return
  }
  state.connecting = true
  state.error = ''
  try {
    const device = await usbManager.requestDevice({ filters: [] })
    if (!device) {
      state.error = '未选择设备'
      return
    }
    const connection = await device.connect()
    const transport = await AdbDaemonTransport.authenticate({
      serial: device.serial,
      connection,
      credentialStore
    })
    const adb = new Adb(transport)

    adbRef.value = adb
    state.serial = device.serial
    state.model = device.name || device.serial

    // 设备断开后同步清理状态
    transport.disconnected.then(() => {
      if (adbRef.value === adb) {
        adbRef.value = null
        state.serial = ''
      }
    })
  } catch (error) {
    state.error = (error as Error)?.message || String(error)
  } finally {
    state.connecting = false
  }
}

export async function disconnect(): Promise<void> {
  const adb = adbRef.value
  adbRef.value = null
  state.serial = ''
  await adb?.close()
}

/** 执行一条命令，等待结束并返回合并的 stdout/stderr 文本 */
export async function run(command: string): Promise<string> {
  const adb = adbRef.value
  if (!adb) throw new Error('设备尚未连接')
  return adb.subprocess.noneProtocol.spawnWaitText(command)
}

/** 执行命令并返回原始字节，用于截屏这类二进制结果 */
export async function runBytes(command: string): Promise<Uint8Array> {
  const adb = adbRef.value
  if (!adb) throw new Error('设备尚未连接')
  return adb.subprocess.noneProtocol.spawnWait(command)
}

/** 读取单行结果，去掉末尾换行 */
export async function getLine(command: string): Promise<string> {
  return (await run(command)).trim()
}

export function resetError(): void {
  state.error = ''
}
