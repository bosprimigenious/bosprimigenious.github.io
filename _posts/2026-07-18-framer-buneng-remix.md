---
layout: post
title: 不能 Remix Framer
description: GitHub Pages 的限制。
date: 2026-07-18 12:00:00
tags: [site]
categories: notes
permalink: /blog/framer-buneng-remix/
---

Framer Marketplace 里模板很漂亮。奶油色、大留白、左右错落、一页一个故事，滚动时像在翻一本印好的册子。我点过 Remix。Remix 出来的是 Framer 工程，托管在人家的那一套上。这个域名是 `bosprimigenious.github.io`，构建是 GitHub Pages + Jekyll + al-folio。Pages 不能把 Framer 工程直接丢进来当源。丢进去没有 `Gemfile`，没有 `_posts`，没有 `_stories`，GitHub 也不会替我跑 Framer 的编辑器。能看的模板，不能当这个仓库的源。

能做的是把视觉系统搬过来。Majd 那种 2×2 太整齐，后来改成左右错落。一页一个故事，对应简历荣誉明细：国创、计设、网挑、奖学金、三好，各有 `_stories/` 里的一篇。内容仍是 md 和自己的照片。照片在 `assets/img/folio/`：汉服、白 T、茶桌、山、展位、黑西装。AI 证件照不用。模板负责间距和字体气质，仓库负责事实。事实从 `Documents/Typst-Matrix/03_my_resume/resume.typ` 抄。抄错就是站点错。Framer 再漂亮，也不能让 Under Review 变成已接收，不能让北京赛区一等奖变成冠军。

自己乱写一套皮肤，已经试过，难看。难看的原因不是「不够设计」，是和 al-folio 的构建抢。这个站的 CSS 入口在 `_config.yml` 里写过 Tailwind 那一套，本地还要：

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

系统 Ruby 不够，PATH 里要有 brew 的 `ruby@3.3`。直接 `jekyll serve` 会撞到系统 Ruby。皮肤如果另起一个纯静态目录硬塞，Pages 或许能显示一张首页，blog、学术、故事页的 permalink 会散。散了就不是这个站。换皮肤不是换仓库。al-folio 还在，壳可以换。壳换完，用户能看见的页面要真走过：点、打字、跳转。只看一张从 Framer 导出的渲染图不够。渲染图没有 404，真实站点有。

课和赛会来打断换皮肤。撞周的时候不要换。换皮肤属于站点仓的大改，一次会话只能在 `bosprimigenious.github.io` 里做，并且要能回滚。没有 git 可回滚就不要动 `_config.yml` 的主题段。我把「借鉴 Framer」限制在：配色、留白、故事页左右翻转、首页一张主图加一句数字。数字仍是国家级 2、省部级 7、校级竞赛 4、二等奖学金和三好各 1。配色后来和 favicon 的陶土红 `#C4562A` 有过对照，那是另一篇。对照归对照，工程还是 Jekyll。

有人会问为什么不直接用 Framer 再 CNAME 过来。原因有三。一，故事页和 blog 是 md，我要在仓库里改字、让以后的自己和 agent 能搜到中文原文；Framer 画布搜不到 `exclude: assets/jupyter/`。二，简历真源是 typst，站点必须能对着文件 diff，不能对着画布说「好像对」。三，Pages 免费、和 GitHub 用户名绑在一起，构建日志在 Actions 里。日志能说明哪次把 jupyter 插件惹怒了，哪次 listen 重复监视了 skill 软链。Framer 的漂亮不提供这些日志。我需要日志，因为这个站会和课设、国创抢同一双手，改动经常是半夜切仓切过来的。半夜需要能回滚的东西。画布回滚不如 git。

所以 Marketplace 我还看。看到好的间距就记下来，回到仓库里改。改完仍用 `bundle exec` 起本地，浏览器开 `127.0.0.1:4000`，看首页汉服、页脚西土城路、故事页 rank 是否还在。还在，才说皮肤没有把事实吃掉。事实比模板贵。模板可以借鉴。源必须留在这个 git 里。
## 能借鉴什么，不能搬什么

Marketplace 上的间距、左右错落、奶油色，可以记下来回到 CSS 里改。不能搬的是工程：Framer 画布搜不到 `exclude: assets/jupyter/`，也 diff 不了 `resume.typ`。故事页和 blog 必须是仓库里的 md。

## 一次只换壳

换皮肤属于这个 git 仓的大改。没有回滚不要动 `_config.yml` 的主题段。撞周不要换。换完要在 `127.0.0.1:4000` 把首页汉服、页脚西土城路、故事页 rank 走一遍。数字仍是国家级 2、省部级 7、校级竞赛 4、奖学金和三好各 1。事实比模板贵。
## 半夜改站需要 git

这个站会和课设、国创抢同一双手，改动经常是切仓切过来的。半夜需要能回滚的东西。画布回滚不如 git。Pages 的构建日志能说明哪次把 jupyter 插件惹怒了，哪次 listen 重复监视了 skill 软链。这些日志 Framer 不提供。

我需要日志，因为验收不是看一张导出的渲染图。渲染图没有 404。真实站点有。有 404 才知道 permalink 散没散。散了就还不是这个站。
## 首页还要能指回简历

壳换完，国家级 2、省部级 7 这些数还得能点进故事页，故事页还得对得上 `resume.typ`。对不上，说明换皮肤把事实吃掉了。吃掉了就回滚 CSS，不要再开一个新模板仓。新模板仓是第二个仓库。一次会话一个主仓库。这个会话的主仓库是 github.io，不是 Framer。
借鉴停在视觉。源停在 git。两者打架时，留 git。
看到好的留白就记下来，回到仓库里改 CSS。改完仍用本地 4000 看，不把画布截图当验收。
