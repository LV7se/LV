---
# 首页：hero 与项目简介，正文随版本更新
layout: home

hero:
  name: LV Box
  text: 玩机，可以更简单。
  tagline: 在浏览器里直接完成 ADB 操作，免下载、免安装。
  image:
    src: /logo.svg
    alt: LV Box
  actions:
    - theme: brand
      text: 进入 LV Box
      link: /Box
    - theme: alt
      text: 了解项目
      link: /about
    - theme: alt
      text: 更新日志
      link: /changelog
    - theme: alt
      text: GitHub
      link: https://github.com/LV7se/LV

features:
  - icon: 🧰
    title: 集中在一处
    details: 把常用的设备操作集中在一个页面里完成，不用在多个窗口之间来回切换。
  - icon: 🌐
    title: 打开即用
    details: 运行在支持 WebUSB 的 Chromium 浏览器中，不需要下载安装客户端。
  - icon: 🔗
    title: 连接留在本机
    details: 设备命令通过浏览器与手机之间的 USB 连接执行，不经过远程 ADB 服务。
  - icon: 🧩
    title: 开源
    details: 项目以 GPL-3.0 许可开源，源码与问题反馈都在 GitHub 上公开。
---

## 这个项目是什么

**LV Box 是一款在浏览器中运行的 ADB 图形化工具**。它省掉了下载安装与配置环境的步骤，打开网址、连上设备就能用。

## 为什么是网页版

不用装客户端，也不挑系统 —— 只要浏览器支持 WebUSB，Windows、Linux、macOS 都能用。代价是需要 Chromium 内核浏览器、手机开启 USB 调试，并通过 `localhost` 或 HTTPS 访问。

## 保持克制

每个页面只做一类操作，常用的放前面，其余不占位置。功能是否生效取决于设备的 Android 版本与 ADB 权限，读不到的信息不会硬写成「全机型支持」。

## 从这里开始

- [关于](/about) · 项目来历与定位
- [更新日志](/changelog) · 版本变化
- [GitHub](https://github.com/LV7se/LV) · 源码与反馈
