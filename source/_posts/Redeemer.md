---
title: Starting Point Redeemer - Hack the Box 
date: 2025-03-05
tags: [HackTheBox, Redis, DataBases, VeryEasy]
categories: writeups
keywords: 'Hack The Box, Redeemer, Redis, Writeup, Cybersécurité, Pentest, redis-cli'
description: Ma découverte des bases de données Redis à travers la machine Redeemer de Hack The Box.
cover: images/writeups/REDEEMER/image.png
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---

# Apprendre à manipuler Redis : La machine Redeemer

Après avoir exploré le protocole SMB, j'ai continué ma progression sur **Hack The Box** avec la machine **Redeemer**. Cette fois, l'objectif était d'interagir avec un service que je ne connaissais que de nom : **Redis**.

### Qu'est-ce que Redis ?

Redis est un système de gestion de base de données "en mémoire". Contrairement aux bases de données classiques qui écrivent tout sur le disque, Redis stocke les données en RAM pour être extrêmement rapide. C'est très utilisé pour la mise en cache.

L'intérêt pour moi, en tant qu'apprenti en cybersécurité, est de voir ce qui se passe quand un tel service est laissé accessible sans mot de passe.

---

### Étape 1 : Le scan de reconnaissance

Comme toujours, tout commence par un scan avec **Nmap**. J'ai cherché quel port était ouvert sur la machine cible :

```bash
nmap -p- -sS -min-rate=10000 -T5 10.129.136.187
```

Le scan a révélé que le port **6379** était ouvert. C'est le port par défaut de **Redis**.

---

### Étape 2 : Se connecter au service

Pour parler à un serveur Redis, on utilise l'outil **redis-cli**. J'ai tenté une connexion directe vers l'IP cible :

```bash
redis-cli -h 10.129.136.187
```

À ce moment-là, j'attendais une demande de mot de passe... mais rien. J'étais directement connecté au prompt du serveur. C'est une erreur de configuration classique, mais aux conséquences lourdes.

---

### Étape 3 : Fouiller dans la base de données

Une fois à l'intérieur, j'ai voulu voir quelles "clés" (les noms des données stockées) étaient présentes. J'ai utilisé la commande `keys *` :

```bash
10.129.136.187:6379> keys *
1) "temp"
2) "numb"
3) "stor"
4) "flag"
```

Quatre clés sont apparues, dont une nommée **flag**. C'était presque trop facile !

---

### Étape 4 : Récupérer le contenu

Pour lire la valeur d'une clé, on utilise la commande `get` :

```bash
10.129.136.187:6379> get flag
"03e1d2b376c37ab3f5319922053953eb"
```

Et voilà, le flag était là, exposé en clair.

---

### Conclusion et réflexion

Cette expérience sur la machine **Redeemer** a été très instructive. Elle m'a montré qu'un outil aussi puissant que Redis peut devenir un maillon faible s'il n'est pas correctement configuré. 

Ce que j'ai appris :
- Ne jamais laisser un service de base de données accessible sur le réseau sans authentification.
- Le port 6379 est un bon indicateur de la présence de Redis lors d'un audit.
- La simplicité de certains outils (comme redis-cli) rend l'exploitation très rapide si la porte est restée ouverte.

---

**Allen Jolan**
