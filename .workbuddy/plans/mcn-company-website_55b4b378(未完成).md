---
name: mcn-company-website
overview: 为一家 MCN/短视频运营公司搭建 WordPress 官网，包含 8 个核心板块：公司介绍、业务介绍、案例展示、内容创意（短视频循环播放）、报价套餐表、合作伙伴、资质背书、联系我们。设计风格为创意活泼（大胆配色+动态元素），使用 WordPress/CMS 便于后续自主编辑。
design:
  architecture:
    framework: html
  styleKeywords:
    - 创意活泼
    - 大胆渐变配色
    - 深色与亮色对比
    - 动态微交互动效
    - 视频驱动视觉
    - 年轻化MCN风格
    - 玻璃拟态(Glassmorphism)
    - 流畅过渡动画
  fontSystem:
    fontFamily: Noto Sans SC, Poppins
    heading:
      size: 48px
      weight: 700
    subheading:
      size: 32px
      weight: 600
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#6C63FF"
      - "#FF6584"
      - "#43E97B"
    background:
      - "#0D0D1A"
      - "#1A1A2E"
      - "#F8F9FE"
      - "#FFFFFF"
    text:
      - "#FFFFFF"
      - "#1A1A2E"
      - "#6B7280"
    functional:
      - "#43E97B"
      - "#FF6584"
      - "#FFC107"
      - "#6C63FF"
todos:
  - id: init-project
    content: 初始化项目结构：创建 WordPress 主题目录、webpack 构建配置、package.json、SCSS/JS 源码骨架
    status: pending
  - id: dev-base-theme
    content: 开发主题基础框架：style.css 主题声明、functions.php 注册功能（菜单/侧边栏/自定义Post Type）、header.php + footer.php 公共模板、响应式导航栏
    status: pending
    dependencies:
      - init-project
  - id: dev-homepage
    content: 开发首页全部模块：Hero Banner(渐变背景+粒子动效)、数据亮点条(countUp)、服务速览卡片、视频轮播墙、精选案例、合作伙伴走马灯、CTA区块
    status: pending
    dependencies:
      - dev-base-theme
  - id: dev-inner-pages
    content: 开发内页模板：关于我们(简介+时间轴+团队)、业务服务(交替布局+流程图)、案例展示(筛选+网格)、内容创意(视频播放器)、报价方案(套餐对比表)、资质背书(Carousel)、联系我们(表单+信息卡)
    status: pending
    dependencies:
      - dev-base-theme
  - id: dev-animations
    content: 集成动效系统：GSAP ScrollTrigger 滚动入场动画、视频循环播放交互、卡片悬停微动效、数字计数动画、平滑锚点导航
    status: pending
    dependencies:
      - dev-homepage
      - dev-inner-pages
  - id: assets-content
    content: 使用 [skill:多模态内容生成] 生成官网所需的视觉素材（Banner配图、服务图标、占位图片），编写内容填写指南文档
    status: pending
    dependencies:
      - dev-homepage
      - dev-inner-pages
  - id: test-deploy
    content: 浏览器视觉验收测试、响应式兼容性检查、性能优化（懒加载/压缩）、输出部署指南和内容维护手册
    status: pending
    dependencies:
      - dev-animations
      - assets-content
---

## 产品概述

为一家 **MCN/短视频运营公司** 打造完整的品牌官网项目，涵盖公司介绍、业务展示、案例作品、内容创意、定价套餐、合作伙伴、资质背书、联系表单等全模块，采用 WordPress/CMS 方案便于后续自主编辑维护。

## 核心功能

### 8 大页面板块

1. **首页 (Home)** — 全站概览，包含 Hero Banner、核心数据亮点、服务速览、短视频循环播放区、合作伙伴 Logo 墙、CTA 引导
2. **关于我们 (About)** — 公司背景故事、团队介绍、愿景使命、发展历程时间轴
3. **业务服务 (Services)** — 核心服务项目卡片展示（账号代运营、短视频制作、直播运营、达人孵化等），含服务流程图
4. **案例展示 (Portfolio / Cases)** — 成功案例/作品集网格画廊，支持分类筛选（抖音/快手/B站/小红书），点击查看详情
5. **内容创意 (Creative Hub)** — 多个短视频循环播放区域（自动轮播/网格播放器），展示最新创作能力
6. **报价方案 (Pricing)** — 三档价格套餐对比表（基础版 / 专业版 / 企业版），高亮推荐套餐，含服务明细
7. **合作伙伴 & 资质 (Partners & Credentials)** — 合作客户 Logo 展示墙 + 荣誉资质证书轮播
8. **联系我们 (Contact)** — 联系信息（地址/电话/邮箱/微信）、在线留言表单、地图嵌入（可选）

### 交互与动效需求

- 首页 Hero 区视频背景或动态渐变 + 文字打字动画
- 短视频循环播放组件（支持多视频自动轮播）
- 滚动触发的元素入场动画（AOS / GSAP）
- 卡片悬停微动效（缩放/阴影变化）
- 平滑锚点导航，移动端汉堡菜单
- 响应式布局（适配桌面端 / 平板 / 手机）

## 需要用户提供的信息清单

| 序号 | 信息项 | 详细说明 |
| --- | --- | --- |
| 1 | **公司名称 & 品牌 Logo** | 公司全称、简称、Logo 文件（SVG/PNG 透明底） |
| 2 | **公司 Slogan / 口号** | 一句话概括公司定位（如"让每一个品牌都被看见"） |
| 3 | **公司简介文案** | 200-500 字公司介绍，包含成立时间、团队规模、核心竞争力 |
| 4 | **团队成员信息** | 核心成员姓名+职位+头像（可选） |
| 5 | **服务项目列表** | 具体提供哪些服务（建议 4-6 项），每项配简短描述和图标 |
| 6 | **案例素材** | 至少 3-6 个成功案例：封面图/视频链接+项目名称+简要描述+数据成果（播放量/涨粉数等） |
| 7 | **短视频素材** | 用于内容创意区循环播放的视频文件或嵌入链接（3-10 个） |
| 8 | **价格套餐内容** | 三档套餐名称、价格（或"联系我们询价"）、每档包含的服务项清单、差异点 |
| 9 | **合作伙伴 Logo** | 合作品牌/客户的 Logo 图片文件（PNG/SVG） |
| 10 | **资质证书图片** | 获得的荣誉/认证/奖项证书扫描件或照片 |
| 11 | **联系方式** | 公司地址、联系电话、邮箱、微信公众号/企业微信、工作时间 |
| 12 | **品牌主色调偏好**（可选） | 是否有固定的品牌色？没有的话由设计师根据"创意活泼"风格确定 |
| 13 | **竞品参考网站**（可选） | 1-2 个觉得不错的同行业官网链接，供设计参考 |


## 技术栈选型

### CMS 方案：WordPress + 自定义主题

- **CMS 核心**：WordPress 6.x（中文版），方便非技术人员后续编辑内容
- **主题开发方式**：开发自定义子主题（Child Theme），基于轻量 starter theme 或从零构建
- **前端技术**：
- HTML5 + CSS3（CSS 变量体系 + Flexbox/Grid 布局）
- JavaScript（原生 ES6+，无框架依赖以保持轻量）
- 动画库：GSAP（ScrollTrigger 入场动画）+ Swiper（轮播/视频播放器）
- 字体：Google Fonts 中英文字体组合
- **构建工具**：Webpack 或 Vite（开发时编译 SCSS/JS，生产输出给主题目录）
- **页面构建**：WordPress 原生 Block Editor（Gutenberg）+ 自定义 ACF 字段组（用于结构化内容录入）
- **表单插件**：WPForms 或 Contact Form 7（联系我们表单提交）

## 架构设计

```
mcn-website/
├── wordpress/                    # WordPress 核心（通过 WP-CLI 安装或手动部署）
├── wp-content/themes/mcn-theme/ # 自定义主题（主要开发目标）
│   ├── style.css                 # 主题样式入口 + WordPress 主题声明
│   ├── functions.php             # 主题功能注册（自定义 Post Type、ACF 字段、菜单等）
│   ├── header.php                # 公共头部（导航栏、SEO meta）
│   ├── footer.php                # 公共底部（版权、社交链接、回到顶部）
│   ├── index.php                 # 首页模板
│   ├── page-about.php            # 关于我们页面模板
│   ├── page-services.php         # 业务介绍页面模板
│   ├── page-cases.php            # 案例展示页面模板
│   ├── page-creative.php         # 内容创意页面模板
│   ├── page-pricing.php          # 报价方案页面模板
│   ├── page-partners.php         # 合作伙伴&资质页面模板
│   ├── page-contact.php          # 联系我们页面模板
│   ├── template-parts/           # 可复用组件模板
│   │   ├── hero-section.php      # Hero Banner 组件
│   │   ├── video-player.php      # 视频循环播放组件
│   │   ├── pricing-card.php      # 定价卡片组件
│   │   ├── case-card.php         # 案例卡片组件
│   │   └── partner-logo.php      # 合作伙伴 Logo 组件
│   ├── assets/                   # 静态资源
│   │   ├── css/                  # 编译后的 CSS
│   │   ├── js/                   # 编译后的 JS
│   │   ├── images/               # 图片资源
│   │   └── videos/              # 视频资源
│   └── src/                      # 开发源码（SCSS/JS）
│       ├── scss/                 # SCSS 源文件
│       │   ├── variables.scss    # 设计令牌（颜色/字体/间距）
│       │   ├── mixins.scss       # 混入（响应式断点/动效）
│       │   ├── base.scss         # 基础样式重置
│       │   ├── components/       # 组件级样式
│       │   ├── layouts/          # 页面布局样式
│       │   └── main.scss         # 主入口
│       └── js/                   # JS 源文件
│           ├── main.js           # 主入口
│           ├── navigation.js     # 导航交互（移动端菜单/滚动效果）
│           ├── animations.js     # GSAP 滚动动画配置
│           └── video-player.js   # 视频循环播放逻辑
├── build/                        # 构建工具配置
│   ├── webpack.config.js         # Webpack 配置（SCSS编译/JS打包/资源优化）
│   └── package.json              # 依赖管理
└── docs/                         # 项目文档
    ├── content-guide.md          # 内容填写指南（对应上述需要用户提供的信息）
    └── deployment.md             # 部署指南（服务器要求/迁移步骤）
```

### 数据模型设计（自定义 Post Type & ACF 字段）

- **案例 (Case Study)** — 自定义 Post Type：字段包含 `case_platform`（平台）、`case_views`（播放量）、`case_followers`（涨粉数）、`case_cover_img`（封面）、`case_video_link`（视频链接）
- **服务 (Service)** — 自定义 Post Type 或 ACF 选项页：`service_icon`（图标）、`service_description`、`service_process_steps`
- **合作伙伴 (Partner)** — 自定义 Post Type：`partner_logo`（图片）、`partner_website`（链接）
- **资质证书 (Credential)** — 自定义 Post Type：`credential_image`（证书图片）、`credential_name`（名称）

### 关键实现要点

- **视频循环播放区**：使用 Swiper.js 实现多视频自动轮播，支持 muted autoplay（符合浏览器策略），用户点击可切换视频
- **报价套餐表**：纯 CSS Grid 三列布局，推荐套餐高亮放大 + 徽章标注，响应式变为垂直堆叠
- **性能优化**：图片懒加载（native lazy loading）、视频预览图占位、CSS/JS 压缩合并
- **SEO 友好**：语义化 HTML5 标签、Schema.org 结构化数据、Yoast SEO 插件兼容

## 设计风格定位

整体采用 **「创意活泼 + 品牌感」** 设计语言，契合 MCN 行业的年轻化、活力化调性。视觉上大胆运用高饱和度渐变色块搭配深色背景，营造科技感与创意氛围并存的现代感。

### 页面规划（6 个核心页面）

#### 页面一：首页 (Homepage)

- **Block 1 - 导航栏**：固定顶栏（sticky），左侧品牌 Logo + 名称，右侧导航链接（关于/服务/案例/报价/联系），右侧 CTA 按钮「免费咨询」，移动端折叠为汉堡菜单，滚动后导航栏添加毛玻璃背景效果
- **Block 2 - Hero Banner**：全屏视差英雄区，深色渐变背景（紫蓝到品红）配合动态粒子/光效背景，大标题 + Slogan 副标题 + 双 CTA 按钮（「查看案例」+「获取报价」），底部向下滚动提示箭头带弹跳动画
- **Block 3 - 数据亮点条**：深色横条背景，4 列关键数字展示（如「500+ 合作品牌」「50亿+ 累计播放」「98% 客户续约」「5年行业经验」），数字带计数动画（countUp 效果）
- **Block 4 - 服务速览**：白色背景，6 个服务图标卡片（2行3列），每个卡片含彩色渐变图标 + 服务名 + 一行描述，悬停时卡片上浮 + 阴影扩散
- **Block 5 - 内容创意视频墙**：深色背景区块标题「我们的创作实力」，下方 Swiper 视频轮播器，3-4 个短视频 muted autoplay 循环播放，左右切换控制，底部「查看更多作品 →」链接
- **Block 6 - 精选案例**：白色背景，3 个横向大卡片展示头部案例，每个含封面图/视频预览 + 平台标签 + 核心数据（播放量/涨粉），悬停显示详情遮罩层
- **Block 7 - 合作伙伴 Logo 墙**：浅灰背景，无限滚动的 Logo 走马灯（CSS animation infinite scroll），展示合作品牌
- **Block 8 - CTA 行动召唤**：渐变背景（橙黄暖色调），大标题「准备好打造下一个爆款了吗？」+ 副标题 + 「立即联系我们」大按钮

#### 页面二：关于我们 (About)

- **导航栏**：同首页固定顶栏
- **Block 1 - Page Hero**：半屏高度，品牌色渐变背景，页面标题「关于我们」+ 面包屑导航
- **Block 2 - 公司简介**：左文右图布局，左侧公司介绍文字（300-500字），右侧团队合照或办公环境大图，文字段落带淡入动画
- **Block 3 - 愿景使命价值观**：三列卡片布局，分别展示愿景/使命/核心价值观，每个卡片有独特的渐变边框色
- **Block 4 - 发展历程时间轴**：横向/纵向时间轴（响应式切换），展示公司里程碑节点（年份 + 事件 + 小图标）
- **Block 5 - 团队核心成员**：网格卡片展示，每人头像（圆形）+ 姓名 + 职位 + 一句话简介，悬停显示社交链接
- **Block 6 - CTA**：「加入我们一起成长」招聘/合作引导

#### 页面三：业务服务 (Services)

- **Block 1 - Page Hero**：渐变背景 + 标题「我们的服务」
- **Block 2 - 服务总览**：交替式布局——奇数项左文右图，偶数项右文左图，每个服务区块含大图标/插画 + 服务名称 + 详细描述 + 核心优势列表 + CTA「了解详情」
- **Block 3 - 服务流程**：横向步骤流程图（4 步：需求沟通 → 方案策划 → 内容制作 → 数据优化），用连接线和箭头串联，每步含图标 + 标题 + 说明
- **Block 4 - 为什么选择我们**：4-6 个差异化优势点，图标 + 标题 + 描述的网格排列

#### 页案四：案例展示 (Cases/Portfolio)

- **Block 1 - Page Hero**
- **Block 2 - 分类筛选栏**：标签按钮组（全部 / 抖音 / 快手 / B站 / 小红书 / 视频号），点击筛选，active 状态高亮
- **Block 3 - 案例网格**：Masonry 瀑布流或等高网格布局，每个案例卡片含：封面图/视频预览 + 平台标签角标 + 项目名称 + 简要描述 + 核心数据指标（播放量/点赞/涨粉），悬停放大 + 详情按钮浮现
- **Block 4 - 案例详情 Modal/跳转**：点击展开完整案例信息（项目背景 → 执行方案 → 数据成果 → 客户评价）

#### 页面五：内容创意 (Creative Hub) — 视频专区

- **Block 1 - Page Hero**：暗色动感背景，标题「内容创意工场」
- **Block 2 - 精选视频轮播**：大尺寸主角视频播放器（当前推荐），两侧缩略图导航，支持自动轮播
- **Block 3 - 视频网格墙**：2x3 或 3x3 网格，每个格子是一个短视频循环静音播放（hover 时放大并出声），展示多样化创作能力
- **Block 4 - 创作数据统计**：月均产出视频数量、覆盖粉丝总量、平均完播率等数据可视化展示

#### 页面六：报价方案 (Pricing)

- **Block 1 - Page Hero**
- **Block 2 - 套餐对比表**：三栏 pricing table，中间「专业版」推荐栏略微放大并置顶「最受欢迎」飘带标签。每栏含：套餐名 + 价格 + 功能列表（勾选项 vs 不可用项）+ CTA 按钮。基础版按钮描边样式，推荐版实心品牌色强调，企业版描边深色
- **Block 3 - 常见问题 FAQ**：手风琴折叠面板，解答常见问题（服务周期、修改次数、付款方式、售后保障等）
- **Block 4 - 定制方案 CTA**：「有特殊需求？联系我们定制专属方案」

#### 页面七：合作伙伴 & 资质 (Partners & Credentials)（可与 About 合并或独立）

- **Block 1 - Page Hero**
- **Block 2 - 合作伙伴 Logo 墙**：分类展示（平台方/品牌客户/渠道伙伴），网格布局 + 灰度→彩色 hover 过渡
- **Block 3 - 资质荣誉轮播**：证书图片 Carousel 轮播展示，每张证书配有简短说明文字

#### 页面八：联系我们 (Contact)

- **Block 1 - Page Hero**
- **Block 2 - 联系信息卡片区**：3-4 张卡片横排（电话/邮箱/地址/工作时间），每张带线性图标 + 信息文本，悬停上浮
- **Block 3 - 在线留言表单**：左侧表单（姓名/手机/邮箱/公司/咨询服务类型下拉/需求描述文本域 + 提交按钮），右侧添加客服微信二维码 + 工作时间说明
- **Block 4 - 地图嵌入**（可选）：百度地图/高德地图嵌入手动输入的公司位置

## Agent Extensions

### Skill

- **多模态内容生成**
- Purpose: 为官网生成所需的配图素材（Banner 背景、服务图标插画、团队头像占位图等）
- Expected outcome: 产出官网各板块所需的高质量视觉素材

### Skill

- **Browser Automation**
- Purpose: 在开发完成后进行官网页面的截图验收和视觉检查
- Expected outcome: 对生成的页面进行视觉验证，确保设计还原度