# 安装指南

## 前置要求
- Node.js >= 16.0.0
- npm >= 7.0.0

## 安装步骤

### 方法1: 使用批处理文件（Windows推荐）
双击运行 `install.bat` 文件，脚本会自动安装所有依赖。

### 方法2: 手动安装
1. 打开命令行工具（CMD 或 PowerShell）
2. 进入项目目录：
   ```bash
   cd c:\UGit\github\codebuddy-playground\energy-platform
   ```
3. 安装依赖：
   ```bash
   npm install
   ```

## 启动项目

### 方法1: 使用批处理文件（Windows推荐）
双击运行 `start.bat` 文件，脚本会自动启动开发服务器。

### 方法2: 手动启动
```bash
npm run dev
```

开发服务器启动后，在浏览器中访问: `http://localhost:5173`

## 常见问题

### Q: npm install 失败
A: 
1. 检查 Node.js 是否正确安装：`node -v`
2. 检查 npm 是否正确安装：`npm -v`
3. 尝试清除 npm 缓存：`npm cache clean --force`
4. 删除 node_modules 和 package-lock.json 后重新安装

### Q: 端口被占用
A: 修改 `vite.config.ts` 中的端口配置，或者关闭占用 5173 端口的程序。

### Q: 依赖版本冲突
A: 使用 `npm install --legacy-peer-deps` 安装

## 项目文件说明

```
energy-platform/
├── src/
│   ├── components/          # React组件
│   ├── data/               # Mock数据
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # Tailwind配置
├── tsconfig.json           # TypeScript配置
└── README.md               # 项目说明
```

## 依赖包说明

### 核心依赖
- `react`: ^18.2.0 - React框架
- `react-dom`: ^18.2.0 - React DOM
- `tdesign-react`: 1.12.0 - TDesign UI组件库
- `tdesign-icons-react`: 0.5.0 - TDesign图标库
- `recharts`: ^2.10.0 - 图表库

### 开发依赖
- `vite`: ^5.0.8 - 构建工具
- `typescript`: ^5.2.2 - TypeScript
- `tailwindcss`: 3.4.17 - CSS框架
- `less`: ^4.3.0 - Less预处理器

## 下一步

安装完成后，可以：
1. 查看 README.md 了解项目详细信息
2. 运行 `npm run dev` 启动开发服务器
3. 在浏览器中打开 http://localhost:5173 查看效果
