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

<div class="fx">
  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  <header class="fx-pagehead">
    <p class="fx-kicker">Thoughts · {{ site.posts | size }}</p>
    <h1>Notes</h1>
    <p>前端、工具链，以及做东西时留下的痕迹。</p>
  </header>

  <ol class="fx-thoughts">
    {% for post in postlist %}
    <li>
      <a href="{{ post.url | relative_url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
        <div>
          <h3>{{ post.title }}</h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        </div>
      </a>
    </li>
    {% endfor %}
  </ol>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>
