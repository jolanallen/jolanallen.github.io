---
title: Starting Point Dancing - Hack the Box 
date: 2025-02-25
tags: [HackTheBox, SMB, VeryEasy]
categories: writeups
keywords: 'Hack The Box, Dancing, SMB, Writeup, Cybersécurité, Pentest, smbclient, Nmap'
description: Ma découverte du protocole SMB à travers la machine Dancing de Hack The Box.
cover: images/writeups/Dancing/image.png
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---

# Mes débuts sur Hack The Box : La machine Dancing

Pour mes premiers pas dans l'univers de **Hack The Box**, j'ai commencé par la machine **Dancing**. C'est une excellente introduction qui permet de se familiariser avec le protocole **SMB (Server Message Block)** sans se perdre dans des techniques trop complexes. 

### Qu'est-ce que le protocole SMB ?

Au début, le nom m'était familier sans que j'en comprenne réellement les rouages. Pour résumer ce que j'ai appris : le protocole SMB permet à des ordinateurs de **partager des fichiers**, des imprimantes ou d'autres ressources sur un réseau local. Il fonctionne principalement sur le **port TCP 445**.

Si SMB est mal configuré (accès anonyme, absence de mot de passe), il devient une porte d'entrée facile pour un attaquant qui souhaite fouiller dans les fichiers de l'entreprise.

---

### Phase d'exploration : Le scan Nmap

Pour voir si la machine cible (`10.129.41.30`) avait son port SMB ouvert, j'ai lancé un petit scan Nmap. C'est le réflexe de base pour tout apprenti pentesteur :

```bash
nmap -p 445 -Pn -sV 10.129.41.30
```

Le scan confirme que le service est présent. À ce stade, on ne sait pas encore si on peut y entrer librement.

---

### À la recherche d'une faille : smbclient

C'est ici que l'outil **smbclient** entre en jeu. Je l'ai utilisé pour lister les "partages" (les dossiers partagés) disponibles sur la machine. J'ai tenté une connexion sans mot de passe :

```bash
smbclient -L 10.129.41.30
```

À ma grande surprise, plusieurs partages sont apparus. L'un d'entre eux a attiré mon attention : **WorkShares**.

---

### Exploration des dossiers : La récompense

J'ai essayé de me connecter au dossier **WorkShares** sans aucun mot de passe :
```bash
smbclient //10.129.41.30/WorkShares -N
```

Une fois connecté, j'ai exploré les répertoires comme si j'étais sur mon propre ordinateur. En naviguant dans le dossier de l'utilisateur **James.P**, j'ai découvert un fichier nommé **flag.txt**.

```bash
smb: \James.P\> get flag.txt
```

C'est un moment excitant quand on récupère son premier flag ! 

---

### Ce que j'ai retenu de cette expérience

Cette machine, bien que classée "Very Easy", m'a permis de comprendre concrètement pourquoi la configuration des partages réseau est un enjeu majeur en cybersécurité. Un simple oubli de mot de passe sur un dossier peut exposer des données sensibles à n'importe qui sur le réseau.

Pour moi, c'est une petite victoire qui m'encourage à continuer ma progression sur Hack The Box !

---

**Allen Jolan**
