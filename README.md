# AI Coding 作品集

深色主题的 AI 辅助编程作品集网站，适合部署到 GitHub Pages。

## 功能特点

- 深色 UI，渐变光晕与噪点背景
- 每个作品包含四个模块：**网站背景**、**制作工具**、**原始材料**、**成品展示**
- 成品链接可选：有 `link` 则显示按钮，无则显示「暂无在线链接」
- 纯静态 HTML / CSS / JS，无需构建步骤

## 本地预览

直接用浏览器打开 `index.html`，或使用本地服务器：

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

访问 http://localhost:8080

## 修改作品内容

编辑 **`js/projects.js`** 即可更新全部作品数据，无需改 HTML。

每个作品对象结构：

```javascript
{
  id: "project-1",
  title: "项目名称",
  subtitle: "简短描述",
  cover: "assets/covers/project-1.jpg",      // 封面图（可选）
  coverFallback: "linear-gradient(...)",     // 封面加载失败时的渐变
  tags: ["React", "TypeScript"],
  background: `<p>HTML 格式的项目背景说明</p>`,
  tools: [
    { name: "Cursor", desc: "主要开发环境" },
  ],
  materials: [
    { type: "prompt", label: "初始 Prompt", content: "..." },
    { type: "image", label: "参考图", src: "...", alt: "..." },
    { type: "text", label: "需求摘要", content: "..." },
  ],
  showcase: {
    link: "https://...",           // 可选 — 无则不显示外链
    linkLabel: "访问在线 Demo",     // 可选
    description: "成品说明",
    images: [
      { src: "assets/showcase/xxx.png", alt: "截图说明" },
    ],
  },
}
```

## 添加图片

将素材放入对应目录：

```
assets/
├── covers/       # 卡片封面图
├── materials/    # 原始材料中的图片
└── showcase/     # 成品展示截图
```

图片缺失时会自动显示占位提示，不影响页面布局。

## 部署到 GitHub Pages

### 方式一：从 main 分支根目录部署（推荐）

1. 在 GitHub 创建新仓库，上传本项目全部文件
2. 进入仓库 **Settings → Pages**
3. **Source** 选择 `Deploy from a branch`
4. **Branch** 选择 `main`，文件夹选 `/ (root)`
5. 保存后等待 1–2 分钟，访问 `https://<用户名>.github.io/<仓库名>/`

### 方式二：使用 gh-pages 分支

```bash
git init
git add .
git commit -m "Initial commit: AI coding portfolio"
git branch -M main
git remote add origin https://github.com/<用户名>/<仓库名>.git
git push -u origin main
```

然后在 Settings → Pages 中选择 `gh-pages` 分支（若使用 GitHub Actions 自动部署）。

## 目录结构

```
.
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式
├── js/
│   ├── projects.js     # 作品数据（主要编辑此文件）
│   └── main.js         # 交互逻辑
├── assets/
│   ├── covers/
│   ├── materials/
│   └── showcase/
└── README.md
```

## 自定义

- **站点标题 / 关于文案**：编辑 `index.html` 中 hero 与 about 区块
- **配色**：修改 `css/style.css` 顶部 `:root` 变量
- **关于区标签**：编辑 `index.html` 中 `.about-tags`

## License

MIT
