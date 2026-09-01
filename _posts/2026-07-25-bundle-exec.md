---
layout: post
title: bundle exec 才能起
description: 本地 Jekyll。
date: 2026-07-25 12:00:00
tags: [site, tools]
categories: notes
permalink: /blog/bundle-exec/
---

在仓库根敲：

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

不要在 `$HOME` 里敲。家目录没有这个站的 `Gemfile`，搜也会吞掉整个家。不要直接 `jekyll serve`。直接敲会撞到系统 Ruby。macOS 自带的那份不够，al-folio 这套插件要更新的 gem。这台机器用 brew 的 `ruby@3.3`，PATH 要先能看见它。看不见就先查 `which ruby`、`ruby -v`，再查 `bundle -v`。版本对了，还是用 `bundle exec` 包一层，让这次启动走到 `Gemfile.lock` 里锁住的那套，而不是系统里碰巧叫 jekyll 的另一个可执行文件。

`jekyll-jupyter-notebook` 在 `_config.yml` 的 plugins 里开着。本机若没有 `jupyter-nbconvert`，生成时会报找不到命令。这个站目前不靠 notebook 当内容，已经把 `assets/jupyter/` 写进 exclude。缺 Python 那一套，就保持 exclude，不要为了消一条警告去对全局 `pip install`。要对，也该在明确要用 notebook 当帖子的那天，按仓库文档装，而不是在课设撞周的晚上顺手装。顺手装会把站点仓的环境搞脏，搞脏之后下一次 `bundle exec` 仍与 nbconvert 无关，只是机器上多一份用不上的包。

警告里有 `main.css` 冲突、listen 重复监视 skill 软链。软链在 `~/.grok/skills/` 一类目录，Jekyll 的监听有时会跟过去。不致命。构建还能出页。致命的是端口被占还以为自己在看新站。4000 上如果已经有上一周没关的 `bundle exec`，新的启动会失败或你浏览器仍在看旧进程。旧进程里没有你刚改的 permalink，你会以为 md 没生效，然后把正文改第二遍。第二遍往往改坏。我的习惯是：启动前看一眼终端有没有旧的 serve；浏览器用 `127.0.0.1:4000` 而不是含糊的 localhost 别的端口；改完强制刷新。看不见新 favicon 时，关标签再开，那是缓存，下一篇写。

课、赛、站点抢这台机器时，这条命令是站点仓的门禁。撞周不要升级 gem，不要改 `Gemfile`，不要把 Framer 工程塞进来试。只允许：进仓库根、`bundle exec`、看自己改的那一页。代理走 `127.0.0.1:7890`，变量在 `~/.zshenv` 不在 `.zshrc`。本地 serve 不靠出网。出网是装 gem、拉主题的时候。开新终端没有代理，会让人以为 Ruby 坏了。排查先看环境变量，再看报错。macOS 没有 `timeout`，要用 `gtimeout` 或后台加 kill；没有 `rg` 就 `find . -maxdepth 1 -type f -print`。二进制先探测。不要假设 Linux 命令都在。

我把这些写成命令而不是感受，是因为感受会在答辩前失效。失效的晚上需要能复制的一行。一行在仓库根。仓库根对了，Ruby 对了，`bundle exec` 在，exclude 在，4000 上才是这个站。不是这个站的话，再漂亮的皮肤也是别人的进程。别人的进程不能拿去验收首页数字、汉服图、页脚西土城路。验收要看自己刚保存的 md 是不是出现在浏览器里。出现了，才能关终端去睡第二段。没出现，先查端口和 cwd，再查 Ruby，再查是不是在家目录里启动。这三条查完，大多数「Jekyll 坏了」会消失。消失了就去睡觉。剩下的警告明天再看。明天如果还是 `main.css` 和 listen，可以继续忽略。忽略有清单：只有这两类。新的报错不能忽略。新的报错可能是真的缺文件，缺了页会空。页空比警告严重。严重就停，不要边改课设边猜。猜的时候 cwd 最容易漂回 `$HOME`。漂回去，一切重来。所以第一刀仍是：进仓库根，再 `bundle exec`。
## 启动前先看旧进程

4000 上如果已经有上一周没关的 serve，新的启动会失败，或者浏览器仍在看旧进程。旧进程没有新 permalink，我会以为 md 没生效，然后把正文改第二遍。第二遍容易改坏。

## cwd 漂了就一切重来

在 `$HOME` 里敲 `bundle exec`，项目级约定加载不到，搜索还会扫到整个家。第一刀仍是进 `bosprimigenious.github.io` 仓库根。Ruby 用 brew 的 3.3。警告里的 `main.css` 冲突和 listen 软链可以暂时忽略；新的报错不能忽略。页空比警告严重。
## 代理和本地 serve 不是一回事

本地 serve 不靠出网。出网是装 gem、拉主题的时候。开新终端没有 `~/.zshenv` 里的 7890，会让人以为 Ruby 坏了。排查先看环境变量。macOS 没有 `timeout`，没有 `rg` 就换命令。二进制先探测。门禁仍是这一行：仓库根里的 `bundle exec jekyll serve --host 127.0.0.1 --port 4000`。
## 验收看刚保存的那一页

出现了刚改的中文，才能关终端去睡第二段。没出现，先查端口和 cwd，再查 Ruby，再查是不是在家目录启动。这三条查完，大多数「Jekyll 坏了」会消失。剩下的 `main.css` 和 listen 警告明天再看。新的报错不能放进明天。页空比警告严重。
命令能复制才算门禁。感受会在答辩前失效。失效的晚上只需要这一行还在仓库根。
仓库根对了，Ruby 对了，exclude 在，4000 上才是这个站。不是这个站的话，皮肤再好看也是别人的进程。
别人的进程不能拿去验收首页数字。
