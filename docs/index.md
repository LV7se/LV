---
layout: home

hero:
  name: LV Box 官网
  text: 网页版 Android 玩机工具箱
  tagline: 《搞机工具箱》的网页版本。在浏览器里直接完成 ADB 操作，免下载、免安装。
  image:
    src: /logo.svg
    alt: LV Box
  actions:
    - theme: brand
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
    title: 同一套工具箱
    details: 与《搞机工具箱》PC 版同源，把常用的设备操作集中在一个页面里完成。
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

**LV Box 是《搞机工具箱》网页版**，而《搞机工具箱》是一款 ADB 图形化工具。

原版是个人开发的 PC 软件。网页版把它搬进了浏览器：借助 WebADB 打通与手机之间的通信，再通过终端组件提供原生 Shell 交互，于是原本需要装客户端的操作，变成了打开一个网址就能进行。它也不绑定特定操作系统 —— 只要浏览器支持 WebUSB，Windows、Linux、macOS 甚至手机上的 Chromium 内核浏览器都可以使用。

## 为什么是网页版

PC 版需要下载、安装、配置运行环境，换一台电脑就要重来一次。网页版把这部分成本去掉：同一份页面放在任何能托管静态文件的地方，打开即用，也不必担心本地依赖版本对不上。

代价是它依赖浏览器的能力与授权机制。因此使用前需要满足几个前提：Chromium 内核浏览器、手机开启 USB 调试、通过 `localhost` 或 HTTPS 访问。这些条件都写在[关于](/about)页面里，没有隐藏。

## 保持克制

工具箱类工具有个通病：功能越堆越多，界面越来越挤，最后变成一堆按钮的集合。这个项目尽量反过来做 —— 每个页面只承担一类操作，信息按设备、软件、显示等维度分开摆放，常用操作放前面，不需要的部分不占位置。

它也不是万能的。功能是否生效取决于设备的 Android 版本、厂商 ROM 和 ADB Shell 权限，部分系统节点不开放时，对应信息就是读不到。这一点选择直接说明，而不是用一句「支持全部机型」盖过去。

## 从这里开始

- 想了解项目的来历与定位：[关于](/about)
- 想看版本变化：[更新日志](/changelog)
- 想看源码或反馈问题：[GitHub](https://github.com/LV7se/LV)
