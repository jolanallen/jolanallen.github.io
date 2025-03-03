---
title: Mes Projets
date: 2025-03-03 16:00:00
type: page
---
## 🔥 Mes Projets

Bienvenue dans ma section **Projets** ! Voici quelques-unes de mes réalisations :

<ul>
  <% site.pages.filter(page => page.path.startsWith('projets/') && page.type === 'page').forEach(project => { %>
    <li>
      <a href="<%= url_for(project.path) %>"><%= project.title %></a>
    </li>
  <% }) %>
</ul>
