# MEMORY.md

## FastForward 官网（fastforward.net.cn）
- GitHub: https://github.com/reginashen986-debug/fastforward-website
- 部署: Vercel（main 分支自动部署）
- 视频资源: 腾讯云 COS（域名含 cos-website，H.264 baseline 1080p）

## 近期修改记录（按时间倒序）

- **2026-04-29**：creative.html 方案B — 10 个 video 移除 `controls`（彻底无下载按钮），每个 vs-card 插入自定义 `vs-ctrl` 叠加层（全屏按钮 + 静音按钮）；全屏使用 Fullscreen API，微信/移动端播放逻辑保留。
- **2026-04-28**：首页视频防下载（controlsList + CSS + JS contextmenu 防护）
- **2026-04-28**：首页 Block 7 五列溢出问题修复
- **2026-04-25**：首页「为什么选择向前海外」5 个子模块手机端两列布局（最终稳定版：手机端单列，图标在上文字在下）
- **2026-04-25**：创意作品集页面（pages/creative.html）搭建

## 项目结构
- pages/index.html：首页
- pages/about.html：关于页
- pages/creative.html：作品集页（含 10 个竖版/横版视频轮播）
- assets/css/style.css：全局样式
- assets/js/main.js：全局 JS

## 技术要点
- **X5 视频关键规律**：X5 必须有 `controls` 属性才识别为可播放视频；但 X5 会在 controls 上渲染包含下载按钮的原生控件层
- **方案C（creative.html 当前方案）**：保留 `controls`，用 CSS `height: calc(100%+44px) + margin-bottom:-44px` 把原生控件栏（44px）推出卡片 `overflow:hidden` 范围外，视觉上完全不可见；自定义 `.vs-ctrl` 叠加层（播放/全屏/静音）正常工作
  - 下载按钮跟随原生控件栏一起被裁剪出视图，彻底消失
  - controlsList="nodownload noremoteplayback" 仍保留（WebKit 下双重保险）
- 首页（index.html）：用 `controlsList="nodownload"` 保留 controls，WebKit 下有效；X5 下用 CSS shadow DOM 伪元素隐藏
- style.css 和 main.js 中的 controlsList 和 contextmenu 防护代码保留（无害）
