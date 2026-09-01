---
layout: post
title: 缺 nbconvert 就 exclude
description: 插件 ENOENT。
date: 2026-08-01 12:00:00
tags: [site]
categories: notes
permalink: /blog/jupyter-exclude/
---

生成站点时报 `jupyter-nbconvert` 找不到。插件叫 `jekyll-jupyter-notebook`，写在 `_config.yml` 的 plugins 列表里，和 feed、sitemap、scholar 排在一起。Bundler 只装 Ruby 的 gem，不会替你装 Python。`nbconvert` 是 Python 工具。PATH 里没有它，插件在处理 notebook 时就会 ENOENT。报错看起来像 Jekyll 坏了。Jekyll 没坏。坏的是默认假设：开了插件就等于本机有 notebook 工具链。

这个站目前不靠 notebook 当内容。帖子是 `_posts/` 里的 md，故事是 `_stories/` 里的 md，首页是 `_pages/about.md`。`assets/jupyter/` 下面若还有模板自带的 ipynb，生成时会被插件摸到。摸到就要调 `jupyter-nbconvert`。调不到就闹。最小的修法是 exclude，不是现装一套 Python 依赖。`_config.yml` 里已经有：

```yaml
exclude:
  - assets/jupyter/
```

这一行比 `python3 -m pip install --user --break-system-packages jupyter nbconvert` 小。小的意思是：不往机器上添用不上的包，不和课设的 Python 环境打架，不在 Pages 构建里引入又一条会过期的依赖。al-folio 文档也写了，缺 nbconvert 可以 warn-and-continue；我更想连摸都不要摸。exclude 之后，插件仍可留在列表里，模板升级少一层冲突。要用 notebook 当帖子的那天，再装，再把 exclude 拿掉。现在不装。

装的代价我算过。本机已经有训练仓、检测仓、作业仓的 Python。全局 `pip install` 会把 nbconvert 的传递依赖丢进用户目录，下次某个仓的 `uv.lock` 或 `requirements.txt` 对不上，排查会先误伤站点。站点仓的门禁是 `bundle exec jekyll serve --host 127.0.0.1 --port 4000`，Ruby 走 brew 的 `ruby@3.3`。再给它绑一套 Jupyter，等于为了几份从不发布的 ipynb 开第二工具链。第二工具链在撞周的晚上最危险：报错一出，人会以为要修课设的环境，cwd 漂走，站点更起不来。

Pages 远端构建同样没有我的本机 PATH。即便我本机装了 nbconvert，GitHub 的环境也不一定有。要让远端能渲染 notebook，得在 Actions 或文档里声明 Python 步骤。声明了就要维护。维护一份我并不发布的格式，不值。md 能写命令、能写中文、能被 agent 搜索。ipynb 是 JSON，diff 难看，故事页那种左右错落也用不上 notebook 的单元格。等真有一篇必须用 notebook 展示的实验，那篇会带着自己的依赖说明过来。那时再开。现在 exclude 是完成标准的一部分：本地能起，远端能编，不因模板示例文件失败。

课赛期间这条尤其要死。国创演示崩了该改项目仓，不要顺手给站点装 Jupyter「以后也许用」。也许用的东西不进这台机器的默认环境。默认环境已经够挤：代理 7890、Ruby 3.3、各仓自己的锁文件。挤的时候只保留会因缺失而让当前站失败的依赖。nbconvert 缺失，用 exclude 让它不再被调用，当前站就不失败。不失败就可以回去改演示、改课设、去早功。早功不等 nbconvert。课设老师也不看你有没有把 ipynb 编进个人站。个人站看的是 md 是否还在，数字是否还指回简历。这两项与 Jupyter 无关。无关就排除。排除写进配置，写成这篇，免得以后的自己看见 ENOENT 又去 pip。先读 exclude。读到了，报错就可以当已经处理。已经处理的不要再处理。再处理就是扩 scope。扩 scope 的晚上，睡眠的第二段会没。
## 为什么不装一套 Jupyter

本机已经有训练仓、检测仓、作业仓的 Python。全局 `pip install jupyter nbconvert` 会把传递依赖丢进用户目录，和下一个仓的 `uv.lock` 打架。站点仓的门禁是 `bundle exec jekyll serve`，再绑一套 Jupyter，等于为了几份从不发布的 ipynb 开第二工具链。

## Pages 远端也没有我的 PATH

即便本机装了，GitHub 的构建环境也不一定有。要让远端渲染 notebook，还得在 Actions 里声明 Python 步骤。维护一份我不发布的格式，不值。等真有一篇必须用 notebook 展示的实验，那篇会带着依赖说明过来。现在 exclude 写进配置，ENOENT 就当已经处理。已经处理的不要再处理。
## 和课赛抢手的时候

国创演示崩了该改项目仓，不要顺手给站点装 Jupyter「以后也许用」。也许用的东西不进这台机器的默认环境。默认环境已经够挤：代理 7890、Ruby 3.3、各仓自己的锁文件。挤的时候只保留会因缺失而让当前站失败的依赖。nbconvert 缺失，用 exclude 让它不再被调用，当前站就不失败。不失败就可以回去改演示。
## 完成标准里有这一行

本地能起，远端能编，不因模板示例 ipynb 失败。md 能写命令、能写中文、能被搜索。ipynb 是 JSON，diff 难看，故事页那种左右错落也用不上单元格。exclude 写进 `_config.yml` 之后，插件可以仍留在列表里，少一层和模板升级的冲突。先读 exclude。读到了，ENOENT 就可以当已经处理。
课设老师不看你有没有把 ipynb 编进个人站。个人站看 md 是否还在，数字是否还指回简历。这两项与 Jupyter 无关。无关就排除。
现在不装。要用 notebook 当帖子的那天，再装，再把 exclude 拿掉。那天会带着那一篇自己的依赖说明过来。
