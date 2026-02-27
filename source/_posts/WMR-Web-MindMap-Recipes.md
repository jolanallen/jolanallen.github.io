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

Le pentest web est un domaine passionnant mais colossal. Entre les vulnérabilités classiques de l'OWASP Top 10 et les nouvelles techniques d'exploitation qui sortent chaque jour, il est facile d'oublier une étape cruciale lors d'un audit. 

Pour y remédier, j'ai commencé à développer **WMR (Web-MindMap-Recipes)**. Ce n'est pas un outil miracle, mais une méthode personnelle pour centraliser tout ce que j'apprends et m'assurer que mes tests sont aussi exhaustifs que possible.

---

## Le concept de WMR : Mes "Recettes" de Cuisine

L'idée derrière WMR est simple : chaque branche de la MindMap est pensée comme une "recette". J'y associe :
- **Une étape méthodologique** (Reconnaissance, Authentification, Injection, etc.).
- **Des payloads spécifiques** que j'ai testés et validés.
- **Les commandes d'outils** (Burp Suite, Gobuster, SQLMap, etc.) pour ne plus avoir à chercher la syntaxe exacte en plein audit.
- **Le contexte** : Quand faut-il utiliser ce test ? Et quand est-il inutile ?

---

## Pourquoi utiliser une MindMap ?

J'ai choisi le format visuel de la MindMap pour plusieurs raisons qui m'aident au quotidien :

1. **Une vision globale** : Je peux voir toute la surface d'attaque d'un seul coup d'œil, tout en zoomant sur un point très précis.
2. **Moins de charge mentale** : En suivant mon cheminement logique, je sais exactement où j'en suis et ce qu'il me reste à tester. Ça me permet de rester concentré sur l'analyse plutôt que sur la structure du test.
3. **Rapidité** : Avoir mes commandes prêtes à l'emploi me fait gagner un temps précieux en phase d'audit.

---

## Ma stratégie d'organisation

Je travaille actuellement sur l'intégration de plusieurs piliers dans mon flux de travail :

### La segmentation par vecteurs d'attaque
J'ai découpé chaque grand domaine du web pour refléter la réalité d'un audit :
- **Reconnaissance** : Découverte de sous-domaines, identification des technos.
- **Gestion des accès** : Analyse de l'authentification, des sessions, JWT et IDOR.
- **Logique métier** : Comprendre comment l'application fonctionne "normalement" pour mieux la détourner.
- **Injections** : XSS, SQLi, SSRF, XXE et contournements de WAF.

---

### Un projet vivant sous Obsidian

Pour faire vivre WMR, j'utilise **Obsidian**. La puissance des liens entre mes notes me permet de naviguer facilement d'une technique à une autre. Pour le moment, c'est un projet personnel que j'affine chaque jour, mais j'espère pouvoir le partager avec la communauté une fois qu'il sera suffisamment mûr.

**Sortie prévue : Fin 2026.**

---

### Conclusion

WMR est ma réponse au besoin de rigueur qu'impose la cybersécurité. En centralisant mon expertise web dans un format visuel, je cherche simplement à transformer la complexité du pentest en un processus fluide et structuré. 

N'hésitez pas à me suivre sur LinkedIn pour échanger sur vos propres méthodologies !

---

**Allen Jolan**
