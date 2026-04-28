# FastForward 向前海外官网 — 完整维护手册

> 本文档记录了官网搭建、部署、视频处理的全套工具链和操作流程，供后续更新维护参考。
> 最后更新：2026-04-28

---

## 一、项目概览

| 项目 | 信息 |
|------|------|
| 项目名称 | FastForward 向前海外官网 |
| 域名 | **fastforward.net.cn**（Cloudflare DNS） |
| 技术栈 | 纯 HTML + CSS + JavaScript（无框架） |
| 部署平台 | **Vercel** |
| 代码仓库 | GitHub: `reginashen986-debug/fastforward-website` |
| Git 代理 | `http.proxy=http://127.0.0.1:1087` |

### 页面结构

```
pages/
├── index.html          首页（核心入口，含视频轮播）
├── about.html          关于我们
├── services.html       业务服务
├── cases.html          成功案例
├── creative.html       内容创意 / AI作品展示（10个视频）
├── pricing.html        报价方案
└── assets/
    ├── css/style.css   主样式表
    ├── js/main.js      主脚本
    ├── images/         图片资源（Logo、配图等，28个文件）
    └── videos/         视频文件（17个MP4 + 10张poster封面）
        └── posters/    视频封面缩略图（用于微信兼容）
```

---

## 二、工具与服务清单

### 2.1 开发 & 编辑

| 工具/服务 | 用途 | 备注 |
|-----------|------|------|
| **WorkBuddy (AI)** | 全程开发、调试、代码编写、问题排查 | 本次开发的主要环境 |
| **VS Code / IDE** | 手动编辑代码（可选） | 用于快速小改 |

### 2.2 版本控制

| 工具 | 用途 | 配置 |
|------|------|------|
| **Git** | 版本管理 | 代理 `http://127.0.0.1:1087` |
| **GitHub** | 远程仓库托管 | `reginashen986-debug/fastforward-website` |

### 2.3 部署

| 服务 | 用途 | 关键配置 |
|------|------|----------|
| **Vercel** | 静态网站托管 & 自动部署 | 连接 GitHub 仓库，push 即自动部署 |
| **Cloudflare DNS** | 域名解析 | fastforward.net.cn → Vercel |

> **部署流程：** git push 到 main 分支 → Vercel 自动构建部署 → 全球 CDN 分发

### 2.4 视频存储 & 处理

| 服务 | 用途 | 关键配置 |
|------|------|----------|
| **腾讯云 COS** | 视频存储与分发 | 存储桶 `fastforward-videos-1407530608`，广州区域 |
| **COS 静态网站域名** | 视频访问地址 | 格式：`https://fastforward-videos-1407530608.cos-website.ap-guangzhou.myqcloud.com/xxx.mp4` |
| **ffmpeg** | 视频转码、生成封面 | iOS 兼容性转码必须工具 |

#### 为什么用 COS 而不是放 GitHub？

- 国内用户访问 GitHub 速度慢/不可达
- COS 提供 CDN 加速，国内加载快
- COS 默认域名有预览限制 → 必须使用 **cos-website 域名**

### 2.5 域名 & DNS

| 服务 | 用途 |
|------|------|
| **Cloudflare** | DNS 解析管理 |
| **fastforward.net.cn** | 官网域名 |

### 2.6 其他辅助工具

| 工具 | 用途 |
|------|------|
| **浏览器 DevTools** | 调试样式、检查控制台错误 |
| **真机测试** | iOS Safari / Android 微信内嵌浏览器 测试视频播放 |

---

## 三、视频处理规范（重要）

### 3.1 iOS Safari 兼容性要求

iOS Safari 对视频解码能力有限制，**不满足以下条件的视频会黑屏或无法播放：**

| 参数 | 要求 | 说明 |
|------|------|------|
| 分辨率 | ≤ 1080p（1920×1080 或 1080×1920） | 超过会黑屏 |
| 编码格式 | H.264 Baseline Profile | 最广泛兼容 |
| 码率 | ≤ 4 Mbps | 过高会卡顿/黑屏 |
| faststart | ✅ 必须 | moov atom 移到文件头，否则需下载完才能播 |

### 3.2 ffmpeg 转码命令模板

```bash
# 竖屏视频（9:16，适用于 TikTok/短视频）
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.0 \
  -vf "scale=1080:1920" -b:v 3500k -maxrate 4000k -bufsize 4000k \
  -c:a aac -b:a 128k -movflags +faststart output.mp4

# 横屏视频（16:9）
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.0 \
  -vf "scale=1920:1080" -b:v 3500k -maxrate 4000k -bufsize 4000k \
  -c:a aac -b:a 128k -movflags +faststart output.mp4
```

### 3.3 生成视频封面图（poster）

```bash
# 从视频第 1 秒提取一帧作为封面
ffmpeg -i input.mp4 -vframes 1 -ss 00:00:01 poster.jpg
```

封面图用途：
- 微信 WebView 自动播放被阻止时显示封面
- 提升用户体验，避免黑屏空白

### 3.4 视频上传到 COS 的步骤

1. 登录 [腾讯云 COS 控制台](https://console.cloud.tencent.com/cos)
2. 选择存储桶 `fastforward-videos-1407530608`
3. 上传转码后的 MP4 文件
4. 使用 **cos-website 域名** 访问（非默认域名）

---

## 四、微信内置浏览器兼容方案

这是本次开发中遇到的最复杂的问题，以下是完整的技术方案：

### 4.1 问题现象

- iOS Safari 正常播放 ✅
- 微信内打开网址 → 视频黑屏 ❌（Android 和 iOS 都有）
- Android 微信没有全屏按钮 ❌

### 4.2 解决方案（已实现）

#### HTML 属性配置（每个 video 标签都需要）

```html
<video 
  src="cos-website域名/xxx.mp4"
  poster="封面图路径"
  muted autoplay loop playsinline 
  webkit-playsinline
  x5-video-player-type="h5"
  x5-video-player-fullscreen=""
  controlsList="nodownload noremoteplayback"
  controls
>
</video>
```

| 属性 | 作用 |
|------|------|
| `muted` | 静音（允许自动播放的前提） |
| `autoplay loop playsinline` | 自动循环内联播放 |
| `webkit-playsinline` | iOS Safari 内联播放（不全屏） |
| `x5-video-player-type="h5"` | Android 微信 X5 同层播放器（带原生控件） |
| `x5-video-player-fullscreen=""` | 阻止微信自动全屏 |
| `controlsList="nodownload noremoteplayback"` | 隐藏下载和远程播放按钮 |
| ⚠️ **不加 `nofullscreen`** | 保留全屏按钮（Android 需要） |
| `poster` | 封面图（自动播放失败时展示） |
| `controls` | 显示控制条（Android 需要才有音量和全屏） |

#### JavaScript 策略（main.js 中的微信兼容块）

```
1. 检测是否在微信环境中
2. WeixinJSBridge ready 回调中触发 play()
3. touchstart 第一次触摸时触发 play()
4. visibilitychange 页面切回时重试 play()
5. Android 微信额外添加 x5-video-player class 启用同层播放器
```

#### CSS 兼容

- iOS：隐藏画中画(PiP)和字幕按钮（保留全屏）
- Android x5 播放器：`object-fit: contain` 避免裁剪

---

## 五、日常维护操作指南

### 5.1 修改文字内容

直接编辑对应 HTML 文件中的文字即可。主要位置：

| 要修改的内容 | 所在文件 | 搜索关键词 |
|-------------|----------|-----------|
| 公司介绍文案 | `about.html` | 对应段落文字 |
| 服务详情 | `services.html` | 各模块标题/描述 |
| 案例数据 | `cases.html` | 数字/品牌名 |
| 报价方案 | `pricing.html` | 价格/套餐内容 |
| 联系方式 | `index.html` 底部「联系我们」 | email/电话/微信 |
| 导航菜单 | 所有 HTML `<nav>` | 菜单项名称 |

### 5.2 更换图片

1. 将新图片放入 `pages/assets/images/` 对应子目录
2. 在 HTML 中修改 `<img src="...">` 的路径
3. 注意保持图片尺寸比例一致

### 5.3 更换/添加视频

⚠️ **视频是最容易出问题的部分，务必按流程操作：**

1. **准备源视频**
2. **用 ffmpeg 转码**（参见 §3.2 命令模板）
3. **生成封面图**（参见 §3.3）
4. **上传 MP4 到腾讯云 COS**
5. **将封面图放入 `assets/videos/posters/` 并提交到仓库**
6. **修改 HTML 中 video 标签的 `src` 和 `poster` 属性**
7. **git commit + push**（Vercel 自动部署）
8. **真机测试**（iOS Safari + 微信 + Android 微信）

### 5.4 修改样式

编辑 `pages/assets/css/style.css`，常用调整：

| 常见需求 | 搜索关键词 |
|---------|-----------|
| 改主题色/品牌色 | `--primary` 或具体色值 |
| 改字体大小 | `font-size` |
| 改间距 | `padding` / `margin` |
| 调整视频区域 | `.video-card` / `.vsb-video-stack` |
| 移动端适配 | `@media` 查询 |

### 5.5 修改交互逻辑

编辑 `pages/assets/js/main.js`，当前包含的功能：

- 数字滚动动画（首页数据展示）
- 视频 hover 交互
- **微信 WebView 兼容处理**（⚠️ 不要随意删除这部分）
- 导航栏滚动效果

### 5.6 从修改到上线的完整流程

```bash
# 1. 进入项目目录
cd /Users/regina/WorkBuddy/20260421220323

# 2. 确认在 main 分支
git checkout main
git pull origin main

# 3. 修改文件（用编辑器或让 AI 改）

# 4. 查看改了什么
git status
git diff

# 5. 提交并推送
git add .
git commit -m "简短描述改动内容"
git push origin main

# 6. Vercel 会自动构建部署（约 1-2 分钟生效）
# 访问 https://fastforward.net.cn 验证
```

> 💡 **提示：** 每次 push 后 Vercel 自动部署，无需手动操作。

---

## 六、常见问题排查

### 6.1 视频黑屏

| 可能原因 | 排查方法 | 解决方案 |
|---------|---------|---------|
| 视频超过 1080p 或码率过高 | 用 ffmpeg 检查 `ffmpeg -i xxx.mp4` | 重新转码（§3.2） |
| 缺少 faststart | 检查 moov atom 位置 | 转码时加 `-movflags +faststart` |
| 微信阻止自动播放 | 在微信中打开 | 确保 poster + WeixinJSBridge 策略就位 |
| COS 域名不对 | 检查 video src | 使用 cos-website 域名，不用默认域名 |
| 缺少 muted 属性 | 检查 HTML | 加上 `muted` 属性 |

### 6.2 修改后页面没变化

- 清除浏览器缓存（Cmd+Shift+R 强刷）
- 检查 Vercel 是否部署完成（Vercel Dashboard 查看）
- 检查是否有 Cloudflare 缓存（Cloudflare Dashboard → Purge Cache）

### 6.3 手机端样式错乱

- 用 Chrome DevTools 切换到移动设备模式模拟
- 检查 `@media` 查询的断点设置
- 真机测试（模拟器和真机行为可能不同）

### 6.4 微信内视频不能全屏（Android）

- 确认 `controlsList` 里**没有** `nofullscreen`
- 确认有 `controls` 属性
- 确认有 `x5-video-player-type="h5"`
- 检查 JS 中 `setupAndroidWechatVideos()` 是否执行

---

## 七、待办事项 / 待补充内容

| 优先级 | 内容项 | 状态 |
|--------|--------|------|
| 🔴 高 | 微信号（首页联系我们板块） | 用户未提供，等待补充 |
| 🟡 中 | 合作伙伴 Logo | 可后续添加 |
| 🟢 低 | 社交媒体链接（TikTok/IG/LinkedIn） | 可后续添加 |
| 🟢 low | 团队形象照（about页） | 可后续添加 |

---

## 八、账号与凭证速查

| 服务 | 账号/标识 |
|------|-----------|
| GitHub | reginashen986-debug |
| Vercel | 绑定上述 GitHub 账号 |
| 腾讯云 COS | AppID: 1407530608 |
| Cloudflare | 管理 fastforward.net.cn |
| 联系邮箱 | reginashen888@gmail.com |

---

*本文档随项目迭代持续更新。如有重大变更请同步更新本文。*
