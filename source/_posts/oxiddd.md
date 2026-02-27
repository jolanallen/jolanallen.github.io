---
title: oxiddd - Forensic Disk Imager en Rust
date: 2026-02-27
tags: [Rust, Forensic, Cybersecurity, Open Source]
categories: Projets
keywords: 'Rust, Forensic tool, Disk imaging, O_DIRECT, NTP, Data integrity, DFIR, Open Source'
description: Développement d'un outil d'acquisition disque haute performance en Rust avec hachage lié et certification temporelle.
cover: /images/projects/oxiddd/banner.png
top_img: /images/projects/oxiddd/banner.png
toc: true
toc_number: true
---

# oxiddd : Acquisition Forensic et Sécurité Mémoire

**Allen Jolan**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen) | [GitHub](https://github.com/jolanallen)

## Introduction

Dans le cadre d'un cours de Forensics que j'ai eu l'idée de développé **oxiddd**, un outil d'imagerie disque conçu en **Rust**. Ce projet est né de la volonté d'explorer comment un langage moderne peut améliorer les outils traditionnels de l'investigation numérique (DFIR) comme `dd` ou `dc3dd`, en apportant à la fois une sécurité mémoire native et des optimisations pour les supports de stockage récents (NVMe).

L'objectif principal était de garantir une **chaîne de possession rigoureuse** tout en maximisant la vitesse de transfert des données.

---

## Pourquoi Rust pour le Forensic ?

Le choix de Rust s'est imposé pour plusieurs raisons techniques essentielles au bas niveau :
- **Sécurité Mémoire** : Élimination des erreurs de segmentation et des fuites de mémoire, critiques lors de la manipulation de preuves judiciaires.
- **Performance brute** : Capacité à gérer des entrées/sorties (I/O) asynchrones sans le surcoût d'un garbage collector.
- **Écosystème moderne** : Facilitation de la gestion des dépendances pour la cryptographie et les protocoles réseau.

---

## Architecture Technique

Pour saturer la bande passante du matériel sans saturer le processeur, le projet repose sur une architecture **multi-threadée**.

### Points clés de l'implémentation :
- **Pipeline de données** : Utilisation de canaux (`crossbeam-channel`) pour séparer les tâches de lecture (Reader), d'écriture (Writer) et de calcul d'empreinte (Hasher).
- **I/O Directes (O_DIRECT)** : Interaction directe avec le contrôleur disque pour contourner le cache du noyau et éviter les copies inutiles en RAM.
- **Gestion de la mémoire** : Utilisation de buffers alignés (4096 octets) et de pointeurs atomiques (`Arc`) pour un partage efficace des données entre les threads (Zero-copy).

---

## Innovation : Le "Binding Hash"

La particularité d'oxiddd réside dans sa méthode de scellé numérique. Plutôt que de simplement calculer une empreinte classique, j'ai implémenté un algorithme qui lie mathématiquement trois éléments pour renforcer l'intégrité de la preuve :

1. **Le contenu binaire** du disque source.
2. **Le nom du fichier cible** (pour détecter les renommages accidentels ou malveillants).
3. **Un horodatage certifié** récupéré via le protocole **NTP** (Google NTP), indépendant de l'heure du système local qui pourrait être altérée.

> *Ce mécanisme permet de s'assurer que l'image disque n'a pas été modifiée, renommée ou antidatée après son acquisition.*

---

## Résilience et Portabilité

### Gestion des erreurs
Lorsqu'un secteur est illisible (bad blocks), oxiddd injecte automatiquement des blocs de zéros (`0x00`). Cela permet de conserver l'alignement des données et garantit que l'image reste compatible avec les logiciels d'analyse standard comme **Autopsy** ou **EnCase**.

### Compilation Statique
Grâce à la compilation via `musl`, l'outil peut être généré sous forme de **binaire statique**. Il est alors utilisable sur n'importe quel système Linux sans installation préalable, ce qui est indispensable lors d'une intervention sur une machine compromise.

---

## Guide d'Utilisation

### Installation via Cargo
```bash
cargo install oxiddd
```

### Exemple d'Acquisition
```bash
# Acquisition avec hachage SHA-256 certifié par NTP
sudo ./oxiddd --if /dev/nvme0n1 --of evidence_case.dd --hash sha256
```

### Compatibilité (Syntaxe classique)
```bash
sudo ./oxiddd if=/dev/sdb of=image.dd hash=sha512 bs=8M
```

---

## Conclusion

Le développement d'oxiddd a été une étape majeure dans ma compréhension de la programmation système et des enjeux de l'investigation numérique. Il démontre que les langages de nouvelle génération ont une place de choix dans l'arsenal des outils de cybersécurité.

**Compétences consolidées :**
- **Programmation système** : Direct I/O, gestion de l'alignement mémoire et des syscalls Linux.
- **Concurrence** : Programmation multi-threadée et synchronisation asynchrone en Rust.
- **Cryptographie appliquée** : Implémentation de mécanismes de signature et d'intégrité.
- **Standards DFIR** : Compréhension des exigences judiciaires pour l'acquisition de preuves.

---

## Liens du Projet

- **Code Source** : [GitHub - oxiddd](https://github.com/jolanallen/oxiddd)
- **Portfolio** : [Retour à l'accueil](https://jolanallen.github.io/)

---

**Allen Jolan**

