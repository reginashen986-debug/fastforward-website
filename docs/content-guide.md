# 向前海外 FastForward 官网 — 内容填写指南

> 本文档列出官网中所有**需要替换为真实内容**的占位项，按页面整理。
> 已用真实数据填充的项目（来自 PPTX）标注 ✅，待补充的标注 📌。

---

## 📁 文件结构

```
pages/
  index.html       首页
  about.html       关于我们
  services.html    业务服务
  cases.html       成功案例
  creative.html    内容创意
  pricing.html     报价方案
  partners.html    合作伙伴 & 资质背书
  contact.html     联系我们

assets/
  css/style.css    主样式
  js/main.js       主 JS
  images/
    logo/          ✅ Logo 文件已就位
    covers/        📌 案例封面图（待上传）
    partners/      📌 合作伙伴 Logo（待上传）
    credentials/   📌 资质证书图片（待上传）
  videos/          📌 短视频文件（待上传）
```

---

## ✅ 已填充的内容（无需修改）

| 内容项 | 来源 | 状态 |
|--------|------|------|
| 公司名称：向前海外 / FastForward | PPTX | ✅ |
| 品牌 Slogan | PPTX | ✅ |
| 四大核心能力（日产200+/1000+达人/6市场/端到端） | PPTX | ✅ |
| 六大服务板块详情 | PPTX | ✅ |
| 五大差异化优势 | PPTX | ✅ |
| 覆盖市场（6国） | PPTX | ✅ |
| 三个核心案例完整数据 | PPTX | ✅ |
| 联系邮箱：reginashen888@gmail.com | 用户提供 | ✅ |
| 品牌色、字体系统 | Logo 项目 | ✅ |

---

## 📌 待补充内容清单

### 1. 短视频素材（最优先）
**位置：** `pages/creative.html` 视频网格 + `pages/index.html` 视频轮播

**需要提供：**
- 至少 3-6 个短视频文件（MP4 格式，建议 9:16 竖屏）
- 或 TikTok 视频链接（可用 `<iframe>` 嵌入）

**操作方式：**
1. 将视频文件放入 `assets/videos/` 目录
2. 在 HTML 中替换 `.video-placeholder` 为 `<video src="../assets/videos/xxx.mp4" muted autoplay loop playsinline></video>`

---

### 2. 合作伙伴 Logo
**位置：** `pages/partners.html` + `pages/index.html` 走马灯

**需要提供：**
- 合作品牌 / 客户的 Logo 图片（PNG 透明背景，建议宽 200px）
- 或平台合作 Logo（如 TikTok Shop 官方 Logo）

**操作方式：**
1. 将 Logo 文件放入 `assets/images/partners/`
2. 替换 `.partner-logo-placeholder` 和 `.partner-logo-item` 中的文字占位符

---

### 3. 资质证书图片
**位置：** `pages/partners.html` 资质背书区

**需要提供：**
- 资质证书 / 奖项证明 / 官方合作截图（JPG/PNG）
- 建议提供 3-5 张

**操作方式：**
1. 将图片放入 `assets/images/credentials/`
2. 替换 `.credential-img` 中的 emoji 占位为 `<img>` 标签

---

### 4. 案例封面图
**位置：** `pages/cases.html` 各案例卡片的 `.case-cover` 区域

**需要提供：**
- 每个案例 1 张封面图（建议 16:9 横版，可以是截图/配图）
- 或案例成果截图（店铺后台、数据看板等截图均可）

---

### 5. 报价套餐具体定价
**位置：** `pages/pricing.html`

**当前状态：** 三档套餐服务内容已填写，价格显示为「面议」

**如需显示具体价格，请告知：**
- 基础版：¥ _____ / 月
- 专业版：¥ _____ / 月
- 企业版：定制报价 / 面议

---

### 6. 微信二维码
**位置：** `pages/contact.html` 快捷联系区

**需要提供：**
- 微信二维码图片（PNG，正方形）

**操作方式：**
1. 图片放入 `assets/images/`
2. 在联系页添加 `<img src="../assets/images/wechat-qr.png" />` 二维码展示区块

---

### 7. 公司/团队形象照
**位置：** `pages/about.html` 公司简介区（右侧图片占位）

**需要提供：**
- 团队合照 / 办公室照片（横版，建议 4:3 比例）

---

### 8. 社交媒体链接
**位置：** 所有页面 Footer + 导航区

**需要提供：**
| 平台 | 链接 |
|------|------|
| TikTok 账号 | https://www.tiktok.com/@_______ |
| Instagram | https://www.instagram.com/_______ |
| LinkedIn | https://www.linkedin.com/company/_______ |

**操作方式：** 全局搜索 `href="#"` 替换为真实链接

---

### 9. 地址（可选）
**位置：** `pages/contact.html` 联系信息卡

**当前状态：** 未填写实体地址

**如需显示，请告知注册地址或办公地址**

---

## 🚀 部署指南

### 方案 A：纯静态网站部署（推荐用于快速上线）

1. 将整个项目文件夹上传至服务器
2. 确保 Web 服务器的根目录指向 `pages/` 或做 URL 重写
3. 推荐平台：Vercel / Netlify / 阿里云 OSS + CDN

```bash
# Netlify 一键部署（拖拽 pages/ 文件夹到 Netlify 控制台即可）
```

### 方案 B：WordPress 主题化（后续可自主编辑内容）

1. 安装 WordPress 6.x（建议使用宝塔面板）
2. 将 HTML 文件按 WordPress 模板规则改写（`.php` 扩展名，添加 `get_header()` 等模板标签）
3. 将 CSS/JS 通过 `wp_enqueue_*` 在 `functions.php` 中注册
4. 使用 ACF 插件管理案例、服务等可变内容

---

## 📋 内容替换优先级

| 优先级 | 内容项 | 影响 |
|--------|--------|------|
| P0 🔴 | 短视频素材 | 创意页/首页视觉核心 |
| P0 🔴 | 合作伙伴 Logo | 信任背书建立 |
| P1 🟡 | 资质证书图片 | 专业度背书 |
| P1 🟡 | 案例封面图 | 案例页视觉效果 |
| P2 🟢 | 具体报价 | 商务转化 |
| P2 🟢 | 微信二维码 | 联系转化 |
| P3 ⚪ | 团队照片 | 关于我们页面丰富度 |
| P3 ⚪ | 社交媒体链接 | SEO 和品牌一致性 |

---

*最后更新：2024 年 向前海外官网项目*
