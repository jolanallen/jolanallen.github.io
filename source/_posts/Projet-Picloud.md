---
title: RaspiCloud - Mon aventure dans l'auto-hébergement
date: 2024-11-21
tags: [Cloud, Nextcloud, Raspberry]
categories: Projets
keywords: 'Raspberry Pi, Nextcloud, Cloud personnel, Cybersécurité, Linux, Auto-hébergement, Serveur LAMP'
description: Mon parcours pour déployer un cloud personnel sécurisé avec Nextcloud sur un Raspberry Pi.
cover: /images/projects/RaspCloud/raspberry-pi-nextcloud-featured-image.jpg
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---

# Créer son propre Cloud : Pourquoi et comment ?

**Allen Jolan**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen)

L'idée de reprendre le contrôle de mes données m'a toujours fasciné. Plutôt que de confier tous mes fichiers à des géants du web, j'ai décidé de profiter de mes premiers pas en cybersécurité pour monter mon propre serveur à la maison. 

Ce projet a été mon terrain de jeu pour apprendre les bases de l'administration Linux, de la mise en réseau et, bien sûr, de la sécurisation d'un système exposé.

## L'objectif du projet

L'idée était simple sur le papier, mais riche en enseignements :
- Apprivoiser **Linux** (Raspbian).
- Sécuriser mes accès à distance via **SSH** et un **VPN**.
- Comprendre le fonctionnement d'un serveur web (**LAMP**).
- Déployer **Nextcloud** pour synchroniser mes documents.
- Chiffrer les échanges avec **SSL/TLS**.

---

## Le matériel : Faire avec les moyens du bord

Pour ce projet, j'ai utilisé un **Raspberry Pi**. C'est un outil formidable pour apprendre sans consommer trop d'énergie :
- **Raspberry Pi 4** (2Go RAM).
- Une simple **carte microSD** pour le système.
- Un **SSD externe** pour stocker mes fichiers de manière plus fiable.

---

## Mes premiers pas avec Raspbian

La première étape a été d'installer le système. Rien de très complexe, mais j'ai pris le réflexe de vérifier l'intégrité de l'image téléchargée avec un hash **SHA256**. C'est une petite habitude qui compte en sécurité :
```bash
sha256sum <image_raspbian.img>
```

---

## Apprendre à sécuriser l'accès

C'est là que les choses sérieuses commencent. Un serveur ouvert sur internet est une cible. J'ai donc cherché à appliquer les bonnes pratiques que je découvrais :

1. **Supprimer l’utilisateur par défaut (`pi`)** pour éviter les attaques par force brute évidentes.
2. **Changer le port SSH** (passer du 22 à un port moins commun comme le 2222).
3. **Installer Fail2Ban** : un petit outil génial qui bannit temporairement les IP qui tentent de se connecter trop de fois sans succès.
4. **Passer aux clés SSH** : j'ai désactivé l'authentification par mot de passe pour ne plus autoriser que ma propre clé privée.

```bash
# Désactivation du mot de passe dans /etc/ssh/sshd_config
PasswordAuthentication no
```

---

## Le réseau et le Pare-feu (UFW)

Gérer les ports de ma box internet a été une étape clé. Pour protéger le Raspberry Pi, j'ai configuré **UFW** (Uncomplicated Firewall) pour ne laisser passer que le strict nécessaire :
```bash
sudo ufw allow 2222/tcp  # Mon accès SSH
sudo ufw allow 1194/udp  # Mon futur VPN
sudo ufw allow 80,443/tcp  # Le web
sudo ufw default deny incoming # On bloque tout le reste par défaut
```

Pour l'accès à distance, plutôt que d'exposer Nextcloud directement, j'ai préféré passer par un **VPN (OpenVPN)**. C'est un peu plus contraignant au quotidien, mais tellement plus sûr.

---

## Déploiement de Nextcloud

Après avoir installé le serveur web (Apache, MariaDB, PHP), j'ai enfin pu installer Nextcloud. 
C'est un moment gratifiant de voir l'interface s'afficher pour la première fois ! J'ai terminé par la mise en place d'un certificat **SSL/TLS** pour que mes fichiers transitent de manière chiffrée.

---

## Ce que j'en retiens

Ce projet n'était pas seulement une installation technique, c'était ma porte d'entrée dans le monde de l'administration système. J'ai appris que :
- La sécurité est un processus constant, pas une option qu'on coche.
- On apprend énormément en faisant des erreurs de configuration (et il y en a eu !).
- L'auto-hébergement demande de la rigueur, mais la satisfaction de posséder ses propres services est immense.

---

**Allen Jolan**
