# 上海区域农业气象服务数据可视化平台

## 📋 项目简介

这是一个专注于数据可视化的农业气象服务平台,整合上海多个农场的实时气象数据,通过直观的可视化界面帮助用户监控区域气象状况,为农业生产决策提供数据支持。

## ✨ 核心功能

### 1. 区域气象总览
- 🗺️ **地图可视化**: 在上海地图上标注各农场位置,实时展示气象状况
- 📊 **关键指标卡片**: 展示区域平均温度、湿度、降雨量、风速等核心指标
- ⚠️ **预警提示**: 高亮显示异常气象条件,提供农业风险提示
- 📋 **农场排行榜**: 展示各农场实时气象数据表格

### 2. 多农场对比
- 🎯 **雷达图对比**: 选择2-4个农场进行多指标雷达图对比
- 📈 **时间序列对比**: 展示选定农场过去7天的气象变化曲线
- 🔍 **区域筛选**: 支持按区域筛选农场

### 3. 历史趋势分析
- 📉 **多指标趋势图**: 展示选定农场7天/30天的气象数据变化
- 📊 **数据统计**: 显示平均值、最大值、最小值、标准差
- 💾 **数据导出**: 支持导出CSV、图片、PDF报告

### 4. 农场详情页
- 🎛️ **实时气象仪表盘**: 8个仪表盘展示详细气象参数
- 🔮 **24小时预测**: 模拟展示未来24小时气象趋势
- 🌱 **适种建议**: 根据当前气象条件推荐适宜种植的作物

## 🛠 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI 组件库**: TDesign Vue Next
- **数据可视化**: Apache ECharts
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **日期处理**: Day.js
- **样式方案**: Sass/SCSS
- **数据方案**: 前端 Mock 数据(模拟10个上海农场)

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

服务器将在 `http://localhost:5173` 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 📁 项目结构

```
agricultural-meteorological-system/
├── src/
│   ├── assets/
│   │   ├── styles/          # 全局样式
│   │   └── shanghai.json    # 上海地图 GeoJSON 数据
│   ├── components/          # 通用组件
│   │   ├── MetricCard.vue   # 指标卡片
│   │   ├── MapChart.vue     # 地图图表
│   │   ├── FarmTable.vue    # 农场数据表格
│   │   ├── GaugeCard.vue    # 仪表盘卡片
│   │   ├── RadarChart.vue   # 雷达图
│   │   └── ...
│   ├── views/               # 页面视图
│   │   ├── Layout.vue       # 主布局
│   │   ├── Overview.vue     # 区域气象总览
│   │   ├── Compare.vue      # 多农场对比
│   │   ├── Trend.vue        # 历史趋势分析
│   │   └── FarmDetail.vue   # 农场详情
│   ├── router/              # 路由配置
│   ├── store/               # Pinia 状态管理
│   │   └── weather.js       # 气象数据 store
│   ├── mock/                # Mock 数据
│   │   └── weatherData.js   # 气象数据生成器
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 设计特色

- **专业数据看板**: 深蓝色主色调 + 青绿色辅助色,科技感与农业场景融合
- **卡片式布局**: 清晰分隔数据区块,信息层次分明
- **多种图表**: ECharts 仪表盘、折线图、雷达图、地图等
- **响应式设计**: 支持 1920x1080 和 1366x768 分辨率
- **流畅动画**: 数据加载、页面切换使用淡入淡出和滚动动画

## 📊 Mock 数据说明

项目使用前端 Mock 数据,模拟了10个上海不同区域的农场:

1. 浦东新区绿谷农场
2. 崇明生态农庄
3. 松江家庭农场
4. 青浦现代农业园
5. 金山农业基地
6. 奉贤都市农场
7. 嘉定智慧农场
8. 闵行科技农场
9. 宝山现代农业示范区
10. 浦东川沙农业园

每个农场包含以下气象数据:
- 温度、湿度、降雨量、风速、风向
- 气压、光照强度、土壤温度、土壤湿度

## 🌐 页面导航

- `/overview` - 区域气象总览页(首页)
- `/compare` - 多农场对比页
- `/trend` - 历史趋势分析页
- `/farm/:id` - 农场详情页

## 📝 开发说明

### 添加新农场

编辑 `src/mock/weatherData.js` 中的 `farmConfigs` 数组:

```javascript
{
  id: 'farm11',
  name: '新农场名称',
  region: '所在区域',
  area: 300,
  crops: ['作物1', '作物2'],
  location: [经度, 纬度]
}
```

### 自定义主题色

编辑 `src/assets/styles/global.scss` 中的样式变量:

```scss
$primary-color: #1E3A8A;
$secondary-color: #10B981;
$warning-color: #F59E0B;
```

## 📄 许可证

MIT License

---

**开发时间**: 2024年
**技术支持**: Vue 3 + TDesign + ECharts
