---
layout: default
title: projects
permalink: /projects/
description: 开源与课程项目（同步自 GitHub 公开仓库）
nav: true
nav_order: 3
---

<div class="fx">
  <header class="fx-pagehead">
    <p class="fx-kicker">Work</p>
    <h1>Selected work</h1>
    <p>GitHub @bosprimigenious 的公开仓库。现场照片在首页，按左右错开的故事页打开。</p>
  </header>

  <ol class="fx-worklist">
    {% assign works = site.projects | sort: "importance" %}
    {% for project in works %}
    <li>
      <a href="{{ project.url | relative_url }}">
        <span class="fx-num">{% if forloop.index < 10 %}0{{ forloop.index }}{% else %}{{ forloop.index }}{% endif %}</span>
        <div>
          <h2>{{ project.title }}</h2>
          {% if project.description %}<p>{{ project.description }}</p>{% endif %}
        </div>
        <span class="fx-cat">{{ project.category }}</span>
      </a>
    </li>
    {% endfor %}
  </ol>
</div>
