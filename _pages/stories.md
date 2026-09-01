---
layout: default
title: stories
permalink: /stories/
description: 简历上的每一项荣誉，以及没写进简历的路上
nav: true
nav_order: 2
---

<div class="fx">
  <header class="fx-pagehead">
    <p class="fx-kicker">Honors</p>
    <h1>每一项怎么来的</h1>
    <p>按简历竞赛荣誉明细：2025 七项，2026 七项。国家级 2、省部级 7、校级竞赛 4，外加奖学金和三好。点进去是各自的一页。</p>
  </header>

  <section class="fx-list">
    {% assign stories = site.stories | sort: "weight" %}
    {% for story in stories %}
    <a class="fx-row{% assign lim = forloop.index | modulo: 2 %}{% if lim == 0 %} is-flip{% endif %}{% if story.ratio == 'portrait' %} is-tall{% endif %}" href="{{ story.url | relative_url }}">
      <div class="fx-media">
        {% if story.img %}
        <img class="fx-fit-{{ story.fit | default: 'center' }}" src="{{ story.img | relative_url }}" alt="{{ story.title }}">
        {% else %}
        <div class="fx-rank">
          <span>{{ story.level }}</span>
          <strong>{{ story.rank }}</strong>
        </div>
        {% endif %}
      </div>
      <div class="fx-copy">
        <p class="fx-num">{% if story.weight < 10 %}0{{ story.weight }}{% else %}{{ story.weight }}{% endif %}</p>
        <p class="fx-kicker">{{ story.kicker }} · {{ story.year }}</p>
        <h3>{{ story.title }}</h3>
        <p>{{ story.description }}</p>
        <span class="fx-more">Read →</span>
      </div>
    </a>
    {% endfor %}
  </section>
</div>
