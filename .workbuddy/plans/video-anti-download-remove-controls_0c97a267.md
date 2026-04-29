---
name: video-anti-download-remove-controls
overview: 从 creative.html 所有 video 元素删除 controls 属性，彻底阻止微信 X5 内核注入下载按钮；同时清理 index.html 和 style.css 中多余的防护 hack。
todos:
  - id: remove-controls-creative-html
    content: 去除 creative.html 10 个 video 元素的 controls 属性
    status: completed
  - id: git-commit-push
    content: 提交并推送代码
    status: completed
    dependencies:
      - remove-controls-creative-html
---

## 用户需求

安卓微信（X5 内核）和手机浏览器仍能显示并点击视频下载按钮，需彻底屏蔽。确认方案 A：去掉 creative.html 所有 video 的 controls 属性，视频保持 autoplay muted loop playsinline 自动循环播放，用户体验不变。controls 去掉后 X5 内核无 UI 可渲染，下载按钮彻底消失。

## 目标效果

- 安卓微信 X5：不再渲染控件，下载按钮消失
- 安卓浏览器：不再渲染原生控件，下载按钮消失
- iOS Safari / 微信 WebView：autoplay+muted 视频完全正常，无兼容风险
- 桌面端：视频继续自动循环，与 index.html 风格一致

## 技术方案

方案 A：移除 controls 属性

### 原理

微信 X5 内核只在 video 元素存在 `controls` 属性时才接管控件层并渲染自己的 UI（包含下载按钮）。去掉 `controls` 后，X5 没有机会注入任何控件 UI，下载按钮自然消失。

### 改动范围

- `pages/creative.html`：10 个 video 标签，统一删除 `controls` 属性（7 个竖版 track-portrait + 3 个横版 track-landscape），保留 autoplay muted loop playsinline preload x5-video-player-type 等其余全部属性
- `pages/assets/css/style.css` 和 `pages/assets/js/main.js`：相关 CSS/JS 防护代码保留（无副作用）