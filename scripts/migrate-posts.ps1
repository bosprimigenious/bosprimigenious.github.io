$src = "c:\Fullstack_Development\my-web\public\markdown"
$dst = "c:\Fullstack_Development\bosprimigenious.github.io\_posts"

$posts = @(
  @{ file = "git.md"; date = "2025-07-06"; title = "Git 使用指南"; slug = "git"; tags = "git,tools" },
  @{ file = "npm.md"; date = "2025-07-07"; title = "Npm 使用指南"; slug = "npm"; tags = "npm,tools" },
  @{ file = "markdown.md"; date = "2025-07-08"; title = "MarkDown 介绍"; slug = "markdown"; tags = "markdown" },
  @{ file = "Detail_MC_game.md"; date = "2025-07-08"; title = "Minecraft 服务器配置"; slug = "Detail_MC_game"; tags = "minecraft" },
  @{ file = "guifan.md"; date = "2025-12-04"; title = "WenZhenGuardian 团队开发规范"; slug = "guifan"; tags = "team,workflow" }
)

foreach ($p in $posts) {
  $body = Get-Content -Path (Join-Path $src $p.file) -Raw -Encoding UTF8
  $fm = @"
---
layout: post
title: $($p.title)
date: $($p.date) 12:00:00
tags: [$($p.tags)]
categories: notes
permalink: /blog/$($p.slug)/
---

"@
  $outName = "$($p.date)-$($p.slug).md"
  Set-Content -Path (Join-Path $dst $outName) -Value ($fm + $body) -Encoding UTF8
  Write-Host "Wrote $outName"
}
