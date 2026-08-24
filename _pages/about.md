---
layout: default
title: about
permalink: /
nav: true
nav_order: 1
---

<section class="atelier-cover">
  <p class="atelier-kicker">
    <span id="atelier-greet">你好</span>
    <span aria-hidden="true"> · </span>
    <time id="atelier-clock"></time>
  </p>

  <h1 class="atelier-name">BosPrimigenious <em>Zhang</em></h1>
  <p class="atelier-deck">北京邮电大学 · 全栈与前端</p>

  <p class="atelier-verb" aria-hidden="true">
    <span class="atelier-verb-item">写界面</span>
    <span class="atelier-verb-item">做系统</span>
    <span class="atelier-verb-item">记过程</span>
  </p>

  <div class="atelier-rule" aria-hidden="true"></div>

  <div class="atelier-hero">
    <div class="atelier-copy" data-reveal>
      <p>你好，我是 <strong>Bosprimigenious</strong>（张恒基）。</p>
      <p>这个站点用来放项目、笔记，以及之后的学术记录。来了就先看作品，再看我怎么想。</p>
      <p class="atelier-en">Building quietly, and trying to leave the work cleaner than I found it.</p>
      <p class="atelier-links">
        <a href="/projects/">项目</a>
        <a href="/blog/">笔记</a>
        <a href="/contact/">联系</a>
      </p>
    </div>
    <figure class="atelier-photo" data-reveal>
      <img src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" alt="Bosprimigenious Zhang" width="420" height="420">
      <figcaption>海淀 · 西土城路</figcaption>
    </figure>
  </div>
</section>

<section class="atelier-grid" data-reveal>
  <article>
    <h2>技能</h2>
    <ol>
      <li>前端 — React, Vue, TypeScript</li>
      <li>界面 — Figma</li>
      <li>工程 — Vite, Git, Docker</li>
    </ol>
  </article>
  <article>
    <h2>协作</h2>
    <ol>
      <li><a href="https://github.com/Prince-Led-Initiatives">Prince-Led-Initiatives</a></li>
      <li><a href="https://github.com/Nexus-Best">Nexus-Best</a></li>
      <li><a href="https://github.com/TextGuard-BUPT">TextGuard-BUPT</a></li>
      <li><a href="https://github.com/WebTravelLAB">WebTravelLAB</a></li>
      <li><a href="https://github.com/SleepFamily">SleepFamily</a></li>
    </ol>
  </article>
</section>

<section class="atelier-notes" data-reveal>
  <div class="atelier-notes-head">
    <h2>最近笔记</h2>
    <a href="/blog/">全部</a>
  </div>
  <ol class="atelier-index">
    {% for post in site.posts limit: 4 %}
    <li>
      <a href="{{ post.url | relative_url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m.%d" }}</time>
        <span class="atelier-year">{{ post.date | date: "%Y" }}</span>
        <h3>{{ post.title }}</h3>
      </a>
    </li>
    {% endfor %}
  </ol>
</section>

<script src="{{ '/assets/js/atelier.js' | relative_url }}" defer></script>
