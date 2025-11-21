# SecureVPN - 跨平台移动VPN应用

<div align="center">
  <h3>🛡️ 安全 · 快速 · 稳定的VPN服务</h3>
  <p>面向东南亚市场的专业移动端VPN解决方案</p>
</div>

---

## 📱 项目概述

SecureVPN是一款使用React Native开发的跨平台移动VPN应用，支持iOS和Android双平台。应用采用现代Material Design 3.0设计风格，提供流畅的用户体验和强大的VPN连接功能。

### ✨ 核心特性

- 🔐 **多协议支持** - 集成Shadowsocks、VMess (V2Ray)、Trojan三种主流VPN协议
- 🌍 **智能服务器选择** - 实时延迟检测、服务器负载显示、智能推荐
- 📊 **流量统计** - 实时上传/下载速度、今日/本月流量统计
- 🔗 **订阅管理** - 支持导入订阅链接、自动更新、多订阅源管理
- 💳 **应用内购买** - 集成iOS StoreKit 2和Android Play Billing
- ⚙️ **高级配置** - 分应用代理、自动重连、DNS设置等

---

## 🏗️ 技术架构

### 前端框架
```
React Native 0.73.2 + TypeScript 5.3.3
```

### 核心依赖
- **UI框架**: React Native Paper 5.11.6 (Material Design 3.0)
- **导航**: React Navigation 6.1.9 (Stack + Bottom Tabs)
- **状态管理**: Zustand 4.4.7 (轻量级状态管理)
- **本地存储**: 
  - @react-native-async-storage/async-storage 1.21.0
  - react-native-encrypted-storage 4.0.3 (加密存储)
- **图标**: react-native-vector-icons 10.0.3
- **渐变**: react-native-linear-gradient 2.8.3
- **支付**: react-native-iap 12.13.0

### 原生模块 (待实现)

**iOS平台**
- NetworkExtension框架 (PacketTunnelProvider)
- Swift原生代码
- StoreKit 2 (应用内购买)

**Android平台**
- VpnService API
- Kotlin原生代码
- Google Play Billing Library v5

---

## 📂 项目结构

```
mobile-vpn/
├── src/
│   ├── components/          # 可复用组件 (待扩展)
│   ├── navigation/          # 导航配置
│   │   ├── AppNavigator.tsx      # 主导航容器
│   │   ├── AuthNavigator.tsx     # 认证导航
│   │   ├── MainNavigator.tsx     # 主应用导航
│   │   └── types.ts              # 导航类型定义
│   ├── screens/             # 页面组件
│   │   ├── auth/                 # 认证页面
│   │   │   ├── LoginScreen.tsx   # 登录页面
│   │   │   └── RegisterScreen.tsx # 注册页面
│   │   └── main/                 # 主应用页面
│   │       ├── HomeScreen.tsx        # VPN连接控制中心
│   │       ├── ServersScreen.tsx     # 服务器列表
│   │       ├── SubscriptionsScreen.tsx # 订阅管理
│   │       └── ProfileScreen.tsx     # 个人中心
│   ├── store/               # 状态管理
│   │   ├── authStore.ts          # 用户认证状态
│   │   ├── vpnStore.ts           # VPN连接状态
│   │   └── subscriptionStore.ts  # 订阅管理状态
│   ├── theme/               # 主题配置
│   │   ├── colors.ts             # 颜色定义
│   │   └── theme.ts              # 主题配置
│   ├── types/               # TypeScript类型定义
│   │   └── index.ts              # 全局类型
│   ├── utils/               # 工具函数
│   │   ├── formatters.ts         # 格式化函数
│   │   └── mockData.ts           # 模拟数据
│   └── App.tsx              # 主应用组件
├── index.js                 # 应用入口
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript配置
├── babel.config.js          # Babel配置
└── README.md                # 项目文档
```

---

## 🎨 设计系统

### 颜色方案
```typescript
主色调 (Primary):   #1E3A8A → #3B82F6 (深蓝渐变)
强调色 (Accent):    #06B6D4 (青色)
背景色 (Background): #0F172A (深色)
成功色 (Success):   #10B981 (绿色)
警告色 (Warning):   #F59E0B (橙色)
错误色 (Error):     #EF4444 (红色)
```

### 协议颜色标识
```
Shadowsocks: #8B5CF6 (紫色)
VMess:       #EC4899 (粉色)
Trojan:      #F59E0B (橙色)
```

### 视觉特效
- 毛玻璃效果 (Glassmorphism)
- 柔和阴影和渐变
- 脉冲动画 (连接状态指示)
- 平滑过渡效果

---

## 🚀 快速开始

### 环境要求
```
Node.js >= 18
npm or yarn
React Native开发环境 (iOS需要Xcode, Android需要Android Studio)
```

### 安装依赖
```bash
cd mobile-vpn
npm install
```

### iOS运行
```bash
# 安装iOS依赖
cd ios && pod install && cd ..

# 运行iOS应用
npm run ios
```

### Android运行
```bash
npm run android
```

### 启动开发服务器
```bash
npm start
```

---

## 📱 功能模块详解

### 1. 用户认证系统
- ✅ 邮箱密码登录
- ✅ 用户注册
- ✅ JWT令牌管理
- ✅ 持久化登录状态
- ⏳ 忘记密码 (待实现)

### 2. VPN连接控制中心 (首页)
- ✅ 大型连接按钮 (180x180圆形)
- ✅ 连接状态指示 (未连接/连接中/已连接/错误)
- ✅ 脉冲动画效果
- ✅ 当前服务器信息展示
- ✅ 实时上传/下载速度
- ✅ 今日/本月流量统计
- ⏳ 流量限额进度条 (待完善)

### 3. 服务器列表页面
- ✅ 智能推荐服务器 (延迟最低的3个)
- ✅ 服务器搜索功能
- ✅ 协议筛选 (Shadowsocks/VMess/Trojan)
- ✅ 延迟显示 (颜色编码: 优秀/良好/一般/差)
- ✅ 服务器负载百分比
- ✅ 收藏功能
- ✅ VIP服务器标识
- ⏳ 延迟测试功能 (待实现原生模块)

### 4. 订阅管理
- ✅ 添加订阅链接
- ✅ 订阅列表展示
- ✅ 单个/全部更新
- ✅ 删除订阅 (带确认)
- ⏳ 二维码扫描导入 (待实现相机权限)
- ⏳ 剪贴板导入 (待实现)
- ⏳ 订阅链接解析 (待实现解析库)

### 5. 个人中心
- ✅ 用户信息展示
- ✅ 会员状态展示
- ✅ 升级会员按钮
- ✅ 常规设置 (语言/主题/通知/震动)
- ✅ VPN设置 (自动连接/自动重连/DNS/分应用代理)
- ✅ 帮助与支持/隐私政策/关于应用
- ✅ 退出登录
- ⏳ 深色模式切换 (待实现)
- ⏳ 语言切换 (待实现国际化)

---

## 🔧 待实现功能

### 高优先级
1. **原生VPN模块**
   - [ ] iOS NetworkExtension封装
   - [ ] Android VpnService封装
   - [ ] React Native桥接层
   - [ ] Shadowsocks协议集成
   - [ ] VMess协议集成
   - [ ] Trojan协议集成

2. **订阅解析**
   - [ ] Base64订阅链接解析
   - [ ] ss:// URI解析
   - [ ] vmess:// URI解析
   - [ ] trojan:// URI解析

3. **应用内购买**
   - [ ] iOS StoreKit 2集成
   - [ ] Android Play Billing集成
   - [ ] 订阅套餐页面
   - [ ] 支付流程实现

4. **真实API集成**
   - [ ] 用户认证API
   - [ ] 服务器列表API
   - [ ] 流量统计API
   - [ ] 订阅管理API

### 中优先级
5. **延迟测试**
   - [ ] ICMP Ping实现
   - [ ] TCP延迟测试
   - [ ] 批量测试功能

6. **分应用代理**
   - [ ] 已安装应用列表
   - [ ] 选择排除应用
   - [ ] 规则保存和应用

7. **国际化**
   - [ ] i18n配置
   - [ ] 英文翻译
   - [ ] 越南语/泰语翻译

### 低优先级
8. **高级功能**
   - [ ] 流量图表可视化
   - [ ] 连接日志
   - [ ] 速度测试
   - [ ] 规则订阅

---

## 📊 Mock数据说明

当前应用使用模拟数据进行开发和测试：

### 服务器数据 (`src/utils/mockData.ts`)
- 16个东南亚地区服务器
- 覆盖新加坡、泰国、越南、马来西亚、印尼、菲律宾、香港、台湾、日本、韩国
- 包含延迟、负载、协议类型等完整信息

### 用户认证
- 登录/注册使用本地AsyncStorage
- 无需真实后端即可测试

### 流量统计
- 使用随机数据模拟实时流量
- 待集成原生VPN模块后使用真实数据

---

## 🔐 安全性考虑

### 数据加密
- 使用 `react-native-encrypted-storage` 加密存储敏感信息
- 订阅配置、用户凭证等使用AES-256加密

### 权限管理
- iOS需要VPN权限 (NetworkExtension)
- Android需要VPN权限 (VpnService)
- 相机权限 (二维码扫描)

### 合规性
- **重要**: 本项目仅供学习研究使用
- 实际部署需遵守当地法律法规
- 东南亚地区需获得相应运营许可

---

## 📝 开发注意事项

### 1. 路径别名配置
项目配置了TypeScript路径别名，使用`@`前缀导入模块：
```typescript
import {useAuthStore} from '@store/authStore';
import HomeScreen from '@screens/main/HomeScreen';
import {colors} from '@theme/colors';
```

### 2. 类型安全
所有状态、props、导航参数都有完整的TypeScript类型定义

### 3. 状态管理
使用Zustand进行状态管理，比Redux更轻量简洁

### 4. 原生模块开发
VPN核心功能需要原生模块支持，需要iOS和Android原生开发知识

---

## 🤝 贡献指南

本项目欢迎贡献！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📄 许可证

本项目仅供学习研究使用。

---

## 📮 联系方式

- 项目地址: [GitHub Repository]
- 问题反馈: [Issues]

---

<div align="center">
  <p>Built with ❤️ using React Native</p>
  <p>© 2024 SecureVPN. All rights reserved.</p>
</div>
