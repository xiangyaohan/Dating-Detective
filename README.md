# 相亲对象背调AI

一个基于AI技术的智能相亲对象背景调查Web应用，通过AI算法帮助用户全面了解潜在交往对象的背景信息。

## 功能特性

### 🔍 核心功能
- **智能背景调查**：通过多维度数据分析，生成详细的背景调查报告
- **风险评估**：基于AI算法的风险等级评估和预警
- **数据可视化**：丰富的图表展示，包括雷达图、饼图、柱状图等
- **报告导出**：支持PDF和图片格式导出，便于保存和分享

### 📊 数据分析
- **人格特质分析**：多维度人格特征评估
- **社交媒体分析**：社交平台活跃度和行为分析
- **人际关系网络**：关系图谱可视化展示
- **风险分布统计**：详细的风险等级分布

### 💼 用户体验
- **响应式设计**：完美适配桌面端和移动端
- **实时搜索**：快速搜索和筛选功能
- **批量操作**：支持批量删除和导出报告
- **状态管理**：全局状态管理，数据持久化

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **状态管理**：Zustand
- **图表库**：Recharts
- **路由**：React Router
- **图标**：Lucide React
- **文件处理**：React Dropzone
- **PDF生成**：jsPDF + html2canvas

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── charts/         # 图表组件
│   ├── ErrorBoundary.tsx
│   ├── FileUpload.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── Loading.tsx
│   ├── MobileNavigation.tsx
│   ├── Modal.tsx
│   ├── SearchBar.tsx
│   └── Toast.tsx
├── pages/              # 页面组件
│   ├── Home.tsx
│   ├── Investigation.tsx
│   ├── Login.tsx
│   ├── Privacy.tsx
│   ├── Profile.tsx
│   ├── Register.tsx
│   ├── Report.tsx
│   ├── Reports.tsx
│   └── SearchResults.tsx
├── stores/             # 状态管理
│   ├── appStore.ts
│   └── authStore.ts
├── utils/              # 工具函数
│   └── validation.ts
└── App.tsx
```

## 开始使用

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或
pnpm preview
```

## 主要页面

### 🏠 首页 (Home)
- 应用介绍和功能概览
- 快速开始调查入口
- 最新报告展示

### 🔍 新建调查 (Investigation)
- 目标信息录入表单
- 文件上传功能
- 实时表单验证

### 📊 报告详情 (Report)
- 综合评分展示
- 多维度数据可视化
- 详细分析结果
- 导出和分享功能

### 📋 报告管理 (Reports)
- 报告列表展示
- 搜索和筛选功能
- 批量操作支持
- 状态管理

### 👤 用户中心 (Profile)
- 个人信息管理
- 账户设置
- 使用统计

## 特色功能

### 📈 数据可视化
- **雷达图**：人格特质多维度分析
- **饼图**：风险等级分布统计
- **柱状图**：社交媒体活跃度对比
- **网络图**：人际关系网络展示

### 🔒 隐私保护
- 敏感信息加密存储
- 权限控制和访问管理
- 数据脱敏处理
- 隐私设置选项

### 📱 移动端优化
- 响应式布局设计
- 触摸友好的交互
- 移动端专用导航
- 手势操作支持

### 🚀 性能优化
- 代码分割和懒加载
- 图片压缩和优化
- 缓存策略
- 加载状态管理

## 开发指南

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier规范
- 组件大小控制在300行以内
- 使用函数式组件和Hooks

### 状态管理
- 使用Zustand进行全局状态管理
- 本地状态使用useState
- 表单状态使用自定义hooks

### 样式规范
- 使用Tailwind CSS工具类
- 响应式设计优先
- 深色模式支持
- 无障碍访问优化

## 部署说明

### 环境要求
- Node.js 16+
- 现代浏览器支持

### 部署步骤
1. 构建生产版本：`npm run build`
2. 将`dist`目录部署到静态文件服务器
3. 配置路由重定向到`index.html`

## 许可证

MIT License

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

---

**注意**：本应用仅供学习和演示使用，请遵守相关法律法规，尊重他人隐私权。