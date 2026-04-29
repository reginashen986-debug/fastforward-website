# MEMORY.md

## FastForward 官网（fastforward.net.cn）
- GitHub: https://github.com/reginashen986-debug/fastforward-website
- 部署: Vercel（main 分支自动部署）
- 视频资源: 腾讯云 COS（域名含 cos-website，H.264 baseline 1080p）

## 近期修改记录（按时间倒序）

- **2026-04-29**：creative.html 作品集页，10 个 video 标签移除 `controls` 属性，阻止微信 X5 内核渲染下载按钮；video 保留 autoplay muted loop playsinline 自动循环。about.html「五大差异化优势」手机端改回单列上下布局。
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
- X5 内核防下载：video 元素**不能有 controls 属性**，否则 X5 会自行渲染包含下载按钮的控件层
- 正确做法：无 controls，视频以 autoplay+muted+loop 自动循环播放（iOS Safari/Chrome 兼容性均无问题）
- style.css 和 main.js 中仍有 controlsList 和 contextmenu 防护代码，保留（无害）
