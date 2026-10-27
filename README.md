# 南山 App 官網（Astro）

台湾同志交友 App「南山」的 SEO 官网。文章用 Markdown 撰写，导航、SEO 标签、结构化数据、sitemap、分类页、延伸阅读都会自动生成。

## 项目结构

```
src/
  site.config.mjs        ← 网站设置：域名、下载链接、分类（上线前先改这里）
  content/posts/         ← 所有文章，一篇一个 .md 文件
  pages/
    index.astro          ← 首页
    [category]/          ← 分类页与文章页模板（一般不用动）
    404.astro            ← 找不到页面
  layouts/Base.astro     ← 全站共用的 <head>、导航、页脚
  styles/global.css      ← 全站样式（品牌色在最上面）
public/
  img/                   ← 图片放这里，网址是 /img/文件名
  favicon.ico            ← 需要自己放
docs/文章範本.md          ← 新文章模板
.pages.yml               ← Pages CMS 后台设置
```

## 上线前必做

1. 打开 `src/site.config.mjs`，替换：
   - `url`：正式域名
   - `appStoreId`、`appStoreUrl`、`playUrl`：商店信息
   - `privacyUrl`：App 现有的隐私权政策网址
2. 在 `public/` 放入 `favicon.ico`、`apple-touch-icon.png`，在 `public/img/` 放入：
   - `og-image.jpg`（首页分享图，1200×630）
   - 每篇文章 `ogImage` 指定的分享图
   - App 截图（WebP 格式）
3. 全局搜索 `TODO`，处理剩下的待办（比如对比页表格里的【請填寫】）。

## 用后台编辑文章（Pages CMS，推荐）

不用写代码，在网页上就能新增、修改文章和上传图片。

**第一次设置**
1. 先完成下面“部署”一节，把项目放到 GitHub。
2. 打开 [pagescms.org](https://pagescms.org)，用 GitHub 登录，授权并选中这个仓库。
3. 左侧会出现两个入口（配置在项目根目录的 `.pages.yml`）：
   - **文章**：所见即所得编辑器，像写公众号一样，适合一般文章。
   - **文章（原始码模式）**：直接编辑 Markdown。现有三篇文章含有优缺点框、路线卡片等特殊区块，**修改这三篇请用这个入口**，避免编辑器把特殊区块转掉。
4. 其他同事要一起编辑，可以在 Pages CMS 里把他们加为协作者。

**发一篇新文章**
1. 进入“文章”→ 新增。
2. 填写标题、**网址名称**（英文小写，用 `-` 连接，例如 `blued-alternative`）、分类、摘要、正文；需要时补上常见问题和分享图。
3. 先保持“草稿”勾选，保存后检查；确认无误后取消“草稿”再保存，1–2 分钟后网站自动更新。

上传的图片会自动存到 `public/img/`。

## 新增一篇文章（手动编辑文件）

1. 复制 `docs/文章範本.md` 到 `src/content/posts/`。
2. 改文件名，并填写开头的 `slug`（网址名称）：英文小写、用 `-` 连接，例如 `blued-alternative`，网址就是 `/compare/blued-alternative/`。
   **上线后不要再改 slug**，否则网址变了，排名会丢失。
3. 填写开头的设置（标题、描述、分类、日期、FAQ），然后写正文。写好后把 `draft` 改成 `false`。
4. 提交到 GitHub，Cloudflare 会在 1–2 分钟内自动更新网站。

新文章会自动出现在分类页、sitemap 和其他文章的“延伸閱讀”里，不需要手动加链接。

**更新旧文章**：直接修改内容，并在开头加上 `updatedDate: 更新日期`。比如明年把《2026 G軟推薦》更新成 2027 版时，保留同一个文件名，排名会延续。

## 本地预览（可选）

需要先安装 [Node.js](https://nodejs.org/) 20 或以上版本。

```bash
npm install        # 第一次需要
npm run dev        # 打开 http://localhost:4321 预览，改文章会即时刷新
npm run build      # 正式构建，检查有没有错误
```

## 部署：GitHub + Cloudflare Pages（自动更新）

1. 在 GitHub 新建一个仓库，把整个项目上传（`node_modules`、`dist` 不用传，已在 `.gitignore` 中排除）。
2. 登录 Cloudflare → **Workers & Pages** → **Create application** → 选择从 Git 仓库导入（Import a repository），授权并选中这个仓库。
3. 构建设置：
   - Framework preset：**Astro**
   - Build command：`npm run build`
   - Build output directory：`dist`
   - 环境变量：`NODE_VERSION` = `22`
4. 部署完成后，在项目的 **Custom domains** 绑定正式域名。
5. 之后每次往 GitHub 提交，网站都会自动重新构建上线。

## 提交给搜索引擎

- sitemap 地址：`https://你的域名/sitemap-index.xml`（自动生成，包含所有文章）
- 在 Google Search Console 提交上面的 sitemap；Bing Webmaster Tools 可从 Search Console 一键导入。
- 每发布一篇重要文章，可在 Search Console 的“网址检查”里请求编入索引，加快收录。

## 写作 SEO 小提醒

- 每篇文章锁定 1 个主关键词，放进 `title`、`description` 和第一段。
- 用 `##` 分段，标题里自然带到相关词。
- 每篇至少链接 1–2 篇站内相关文章。
- 宁可少写，也不要大量生产只换城市名或关键词的模板文章。
- 比较或推荐类文章，保留 `disclose` 说明，竞品优缺点写客观。
