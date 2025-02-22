# KK宇宙空间站

这是一个基于 Hexo 框架的个人博客网站，使用 AnZhiYu 主题进行定制开发。

## 🚀 特性

- 💡 基于 Hexo 6.3.0
- 🎨 使用 AnZhiYu 主题
- 📦 集成 Bilibili 追番页面
- 🔒 支持文章加密
- 📝 支持评论信封样式
- 🎯 支持文章永久链接
- 🔍 集成搜索功能
- 🛠️ 使用 Gulp 进行资源优化

## 📦 安装

1. 克隆项目
```bash
git clone https://github.com/xiaoqi72665/websource.git
cd websource
```

2. 安装依赖
```bash
npm install
```

## 🔨 使用方法

### 开发环境

```bash
npm run server
```

### 构建

```bash
npm run build
```

### 部署

```bash
npm run deploy
```

### 更新追番数据

```bash
npm run bangumi
```

## 📝 主要功能

### 追番页面
- 支持显示 Bilibili 追番列表
- 自动更新追番进度
- 支持自定义样式

### 文章加密
- 支持单个文章加密
- 支持密码保护

### 评论功能
- 支持信封样式评论
- 自定义评论样式

### 资源优化
- CSS 压缩
- HTML 压缩
- JavaScript 压缩
- 字体压缩

## 🔧 配置说明

主要配置文件：
- `_config.yml`: 网站主配置
- `_config.anzhiyu.yml`: 主题配置
- `package.json`: 项目依赖配置

## 📚 依赖列表

主要依赖：
- hexo: ^6.3.0
- hexo-theme-anzhiyu: ^1.6.14
- hexo-bilibili-bangumi: ^1.10.7
- hexo-blog-encrypt: ^3.1.9
- gulp: ^5.0.0

## 🤝 贡献

欢迎提交 Issue 和 Pull Request。

## 📄 许可证

ISC License

## 🔗 相关链接

- [在线预览](https://jisuk.top)
- [Hexo 文档](https://hexo.io/docs/)
- [AnZhiYu 主题](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 