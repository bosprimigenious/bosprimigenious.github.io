---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 4
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 8
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<section class="atelier-issue">
  <header class="atelier-issue-head">
    <p class="atelier-kicker">Field Notes · {{ site.posts | size }}</p>
    <h1>笔记</h1>
    <p class="atelier-deck">前端、工具链，以及做东西时留下的痕迹。</p>
    <div class="atelier-rule" aria-hidden="true"></div>
  </header>

  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  <ol class="atelier-index atelier-index-page">
    {% for post in postlist %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    <li data-reveal>
      <a href="{{ post.url | relative_url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m.%d" }}</time>
        <span class="atelier-year">{{ post.date | date: "%Y" }}</span>
        <div class="atelier-index-body">
          <h2>{{ post.title }}</h2>
          {% if post.description %}
          <p>{{ post.description }}</p>
          {% endif %}
          <p class="atelier-meta">{{ read_time }} min · {{ post.date | date: "%Y 年 %m 月" }}</p>
        </div>
      </a>
    </li>
    {% endfor %}
  </ol>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</section>

<script src="{{ '/assets/js/atelier.js' | relative_url }}" defer></script>
