---
layout: default
title: about
permalink: /
nav: false
nav_order: 1
---

<div class="fx">
  <section class="fx-about">
    <div>
      <p class="fx-kicker">Beijing · BUPT · 2024–2026</p>
      <h1>张恒基</h1>
      <p>北邮计算机，47/452。国家级竞赛 2 项，省部级 7 项，校级竞赛 4 项，加上校级二等奖学金和三好学生。每一项都有一页，写它怎么来的。</p>
      <p>一行在左，一行在右。点进去是各自的小故事。</p>
      <a class="fx-btn" href="mailto:bosprimigenious@foxmail.com">Get Started →</a>
    </div>
    <figure>
      <img src="{{ '/assets/img/folio/hero-hanfu.jpg' | relative_url }}" alt="张恒基">
    </figure>
  </section>

  <section class="fx-list">
    <p class="fx-kicker">Honors</p>
    <h2>每一项怎么来的</h2>

    {% assign stories = site.stories | sort: "weight" %}
    {% for story in stories %}
    <a class="fx-row{% assign rem = forloop.index | modulo: 2 %}{% if rem == 0 %} is-flip{% endif %}{% if story.ratio == 'portrait' %} is-tall{% endif %}" href="{{ story.url | relative_url }}">
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

  <section class="fx-talk">
    <p class="fx-kicker">Contact</p>
    <h2>Let’s talk.</h2>
    <p>Have a project or need help? Write me and I’ll get back to you soon.</p>
    <p>
      <a class="fx-btn fx-btn-solid" href="mailto:bosprimigenious@foxmail.com">Get Started →</a>
    </p>
  </section>
</div>
