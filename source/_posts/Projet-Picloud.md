---
title: RaspiCloud - Projet
date: 2024-11-21
tags: [Cloud, Nextcloud, Raspberry]
categories: Projets
keywords: ''
description: Projet cloud personnel à la maison sur un raspberry pi evec nextcloud
cover: /images/projects/RaspCloud/raspberry-pi-nextcloud-featured-image.jpg
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---
# Livrables Projet Linux

## Réalisé par
**Allen Jolan**  
**B1 Cybersécurité**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen)


## Table des Matières

- [Livrables Projet Linux](#livrables-projet-linux)
  - [Réalisé par](#réalisé-par)
  - [Table des Matières](#table-des-matières)
  - [Introduction](#introduction)
  - [Prérequis](#prérequis)
    - [Matériel recommandé :](#matériel-recommandé-)
  - [Installation de Raspbian](#installation-de-raspbian)
  - [Configuration de l'accès SSH](#configuration-de-laccès-ssh)
  - [Sécurisation du Raspberry Pi](#sécurisation-du-raspberry-pi)
    - [1. Suppression de l’utilisateur `pi`](#1-suppression-de-lutilisateur-pi)
    - [2. Changement du port SSH](#2-changement-du-port-ssh)
    - [3. Installation de Fail2Ban](#3-installation-de-fail2ban)
    - [4. Désactivation de l’authentification par mot de passe](#4-désactivation-de-lauthentification-par-mot-de-passe)
  - [Installation physique du Raspberry Pi](#installation-physique-du-raspberry-pi)
  - [Configuration du réseau](#configuration-du-réseau)
  - [Mise en place d'un pare-feu (UFW)](#mise-en-place-dun-pare-feu-ufw)
  - [Accès à distance via VPN](#accès-à-distance-via-vpn)
  - [Installation du serveur LAMP](#installation-du-serveur-lamp)
  - [Installation et configuration de Nextcloud](#installation-et-configuration-de-nextcloud)
  - [Sécurisation avec SSL/TLS](#sécurisation-avec-ssltls)
  - [Conclusion](#conclusion)
  - [Sources](#sources)

---

## Introduction

Ce projet détaille la mise en place complète d'un **cloud personnel sécurisé** sur un Raspberry Pi. Il couvre les étapes essentielles, depuis l'installation et la configuration, jusqu'à la sécurisation avancée du système.

L'objectif est de :
- Installer et configurer **Raspbian**.
- Mettre en place un accès **SSH sécurisé**.
- Configurer le **réseau, pare-feu et VPN**.
- Déployer un **serveur LAMP** et **Nextcloud**.
- Sécuriser les échanges avec un **certificat SSL/TLS**.

Ce projet vise avant tout l'apprentissage et l'acquisition de compétences en **cybersécurité et administration système**.

---

## Prérequis

### Matériel recommandé :

- **Raspberry Pi 4** (2Go RAM minimum) ou **Pi 5** (8Go recommandé)
- **Alimentation** 5V 3A
- **Carte microSD** (16Go minimum, 32Go recommandé)
- **Clavier, écran et câble HDMI**
- **Connexion Internet stable**
- **Stockage SSD externe** recommandé pour de meilleures performances

Un stockage **RAID 5** peut être envisagé pour assurer la redondance des données.

---

## Installation de Raspbian

1. Télécharger l'image **Raspberry Pi OS** depuis le site officiel.
2. Vérifier l'intégrité avec **SHA256** :
   ```bash
   sha256sum <image_raspbian.img>
   ```
3. Graver l'image sur la carte SD avec **Raspberry Pi Imager**.
4. Insérer la carte SD, brancher l'alimentation et suivre l'installation.

---
![cablage](/images/projects/RaspCloud/t80125952.jpg)
## Configuration de l'accès SSH

1. Activer SSH via `raspi-config` ou en créant un fichier `ssh` vide sur la carte SD.
2. Installer OpenSSH Server :
   ```bash
   sudo apt install openssh-server
   ```
3. Trouver l'adresse IP du Raspberry Pi :
   ```bash
   ip a
   ```
4. Générer et copier une clé SSH :
   ```bash
   ssh-keygen
   ssh-copy-id Theprintor@192.168.1.X
   ```

---

## Sécurisation du Raspberry Pi

### 1. Suppression de l’utilisateur `pi`
   ```bash
   sudo deluser pi --remove-home
   ```
### 2. Changement du port SSH
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Modifier 'Port 22' en 'Port 2222'
   ```
### 3. Installation de Fail2Ban
   ```bash
   sudo apt install fail2ban
   ```
### 4. Désactivation de l’authentification par mot de passe
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Modifier 'PasswordAuthentication yes' en 'PasswordAuthentication no'
   ```

---

## Installation physique du Raspberry Pi

- Connexion filaire à la **box Internet**.
- Attribution d'une **IP fixe** via l'interface de la box.

---

## Configuration du réseau

- Ouverture des **ports essentiels** (SSH, HTTP, HTTPS, VPN).
- Redirection des flux vers le Raspberry Pi.

---

## Mise en place d'un pare-feu (UFW)

```bash
sudo apt install ufw
sudo ufw allow 2222/tcp  # SSH sécurisé
sudo ufw allow 1194/udp  # VPN
sudo ufw allow 80,443/tcp  # HTTP/HTTPS
sudo ufw default deny incoming
sudo ufw enable
```

---

## Accès à distance via VPN

Installation d'**OpenVPN** :
```bash
wget https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh -O openvpn-install.sh
sudo bash openvpn-install.sh
```

---

## Installation du serveur LAMP

```bash
sudo apt install apache2 mysql-server php php-mysql
```

Vérification via `http://localhost`.

---

## Installation et configuration de Nextcloud

```bash
cd /var/www/
wget https://download.nextcloud.com/server/releases/nextcloud.zip
unzip nextcloud.zip
sudo chown -R www-data:www-data nextcloud
sudo chmod -R 755 nextcloud
```

---

## Sécurisation avec SSL/TLS

Génération d'un **certificat auto-signé** :
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nextcloud.key -out /etc/ssl/certs/nextcloud.crt
```

---

## Conclusion

Ce projet a permis d’acquérir des compétences en :

- **Administration Linux et réseau**
- **Cybersécurité et protection des systèmes**
- **Déploiement d'un cloud personnel sécurisé**

---

## Sources

- [Installation d’un VPN sur Raspberry Pi](https://raspberrytips.fr/installer-serveur-vpn-raspberry-pi/)

---

**Allen Jolan - B1 Cybersécurité**
