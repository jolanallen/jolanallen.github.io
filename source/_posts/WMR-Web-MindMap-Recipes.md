---
title: WMR - Ma méthode pour organiser mes connaissances en Pentest Web
date: 2025-12-02
tags: [Pentest Web, WMR, MindMap, Sécurité Offensive, Méthodologie]
categories: Projets
keywords: 'WMR, Web-MindMap-Recipes, Pentest Web, MindMap Pentest, Méthodologie Sécurité, Hacking Éthique, Checklist Pentest, ThePrintor'
description: Comment je centralise les techniques de pentest web dans des MindMaps pour ne rien oublier lors de mes audits.
cover: /images/projects/WMR/WMR.png
top_img: /images/projects/WMR/WMR.png
toc: true
---

# WMR : Ne plus se perdre dans l'immensité du Pentest Web

**Allen Jolan**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen)

Le pentest web est un domaine passionnant mais colossal. Entre les vulnérabilités classiques de l'OWASP Top 10 et les nouvelles techniques d'exploitation qui apparaissent chaque jour, il est facile d'oublier une étape cruciale en plein audit. C'est exactement ce constat qui m'a poussé à créer **WMR (Web-MindMap-Recipes)** : une base de connaissances vivante, sous forme de MindMaps, qui me sert de filet de sécurité méthodologique.

---

## Le concept : Mes "recettes" de pentest

L'idée fondatrice de WMR est simple : chaque technique est traitée comme une **recette de cuisine**. Une recette complète répond toujours aux mêmes questions :

- **Quoi** : Quel est l'objectif du test ? (détection d'un IDOR, injection SQL, contournement de WAF...)
- **Comment** : Quels sont les payloads et les commandes d'outils validés lors de mes audits précédents ?
- **Quand** : Dans quel contexte ce test a-t-il du sens ? Et surtout, quand est-il inutile ou contre-productif ?

Cette structure transforme une simple note en un savoir réutilisable, au lieu de laisser la technique dormir au fond d'un dossier.

### Exemple concret : un IDOR

Prenons un cas que l'on rencontre constamment en audit. La recette "IDOR" ressemblerait à ceci dans mon vault :

```text
WMR/
└── Gestion des Accès/
    ├── IDOR/
    │   ├── 🔍 Reconnaissance
    │   │   └── Chercher des IDs numériques/guid dans les URLs, requêtes et réponses
    │   ├── 💉 Payloads
    │   │   └── curl -s http://target/api/user/1337 -H "Cookie: $SESSION"
    │   ├── 🗝️ Authentification
    │   │   └── Test sur les endpoints de profil, export, facturation (compte 1 -> compte 2)
    │   └── ⚠️ Pièges
    │       └── Attention aux IDs hashés (MD5, base64) — souvent réutilisables sur d'autres endpoints
    └── JWT/
        └── ...
```

En un coup d'œil, je retrouve la technique, l'outil exact à lancer, et les erreurs que j'ai déjà commises par le passé.

---

## Pourquoi une MindMap plutôt qu'un simple document ?

J'ai d'abord essayé un classique répertoire de notes. Le résultat était fiable mais rigide. La MindMap apporte trois gains concrets au quotidien :

1. **Une vue d'ensemble de la surface d'attaque** : Je peux visualiser tous les vecteurs d'un projet, puis zoomer sur une branche très précise sans perdre le fil.
2. **Une charge mentale réduite** : En suivant le cheminement visuel, je sais instantanément où j'en suis et ce qui reste à tester. Mon cerveau ne calcule plus la structure, il se concentre sur l'analyse.
3. **Une exécution plus rapide** : Les commandes étant prêtes à l'emploi, je gagne un temps précieux pendant la fenêtre de consultation. Plus besoin de recopier une syntaxe de mémoire en pleine nuit.

---

## Ma stratégie d'organisation

WMR n'est pas qu'une carte : c'est un vrai processus de travail. J'organise mon expertise selon quatre piliers qui reflètent le déroulé réaliste d'un audit :

### 1. Reconnaissance
La phase fondatrice. Découverte de sous-domaines, énumération de chemins, identification des technologies et versions. C'est ici que se joue, très souvent, la qualité du reste de l'audit.

### 2. Gestion des accès
Authentification, sessions, JWT, OAuth, IDOR. Un champ où les erreurs d'implémentation par les développeurs sont légion, et où les crises de logique sont fréquentes.

### 3. Logique métier
Comprendre comment l'application fonctionne "normalement" pour mieux la détourner. Prix négatifs, workflows contournés, montants modifiés... c'est le terrain des vulnérabilités qu'aucune machine ne détecte.

### 4. Injections et contournements
XSS, SQLi, SSRF, XXE, command injection, mais aussi les tactiques de contournement de WAF qui occupent une branche entière.

Chaque pilier est lui-même une carte, reliée aux autres par des liens : une note "IDOR" pointe vers la note "JWT" quand les deux techniques se complètent sur un même endpoint.

---

## Un projet vivant sous Obsidian

Techniquement, WMR vit dans un **vault Obsidian**. Le choix s'est imposé naturellement :

- **Les liens bidirectionnels** : chaque note est reliée à ses techniques voisines, ce qui transforme le vault en graphe navigable.
- **Le format Markdown** : mes notes restent libres de tout format propriétaire, portables et versionnables sur Git.
- **Le graph view** : on voit littéralement apparaître les clusters de techniques, ce qui révèle les zones que je documente le mieux... et celles que je néglige.

Chaque note commence comme une *seed* brute issue d'un CTF, d'une lecture ou d'un audit réel. Je la structure ensuite en recette, puis je la relie. C'est un travail quotidien, mais il paie dès la mission suivante.

**Sortie prévue : Fin 2026.** Je souhaite partager une version publique une fois que la structure sera suffisamment mûre et que les recettes auront été validées sur plusieurs contextes différents.

---

## Conclusion

WMR est ma réponse au besoin de rigueur qu'impose la cybersécurité. En centralisant mon expertise web dans un format visuel, je transforme la complexité du pentest en un processus fluide et structuré. L'objectif n'est pas de remplacer la réflexion de l'analyste, mais de lui garantir de ne jamais commencer son audit sans filet.

N'hésitez pas à me suivre sur LinkedIn pour échanger sur vos propres méthodologies !

---

**Allen Jolan**