---
title: oxiddd - Forensic Disk Imager Haute Performance
date: 2026-02-27
tags: [Rust, Forensic, Cybersecurity, Open Source]
categories: Projets
keywords: 'Rust, Forensic tool, Disk imaging, O_DIRECT, NTP, Data integrity, DFIR, Open Source'
description: Développement d'un outil d'acquisition disque ultra-rapide en Rust avec hachage lié et certification temporelle NTP.
cover: /images/projects/oxiddd/banner.png
top_img: /images/projects/oxiddd/banner.png
toc: true
toc_number: true
---

# oxiddd : L'évolution de l'Acquisition Forensic

## Réalisé par
**Allen Jolan**  
**Spécialiste Cybersécurité & Développement Système**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen) | [GitHub](https://github.com/jolanallen)


## Introduction

**oxiddd** est un outil d'imagerie disque de nouvelle génération conçu pour répondre aux exigences modernes de l'investigation numérique (DFIR). Développé intégralement en **Rust**, il vise à remplacer les outils traditionnels comme `dd` et `dc3dd` en apportant une sécurité mémoire accrue et des performances optimisées pour les supports NVMe.

L'objectif majeur est de garantir une **chaîne de possession inviolable** grâce à un algorithme de hachage exclusif lié au temps certifié.

---

## Architecture Technique

Le projet repose sur une architecture **asynchrone et multi-threadée** pour saturer la bande passante du matériel sans goulot d'étranglement CPU.

### Composants clés :
- **Pipeline MPMC** : Utilisation de `crossbeam-channel` pour orchestrer les flux Reader, Writer et Hasher en parallèle.
- **I/O Directes (O_DIRECT)** : Contournement du cache noyau (Linux/macOS) pour une interaction brute avec le contrôleur disque.
- **Zero-copy** : buffers alignés (4096 octets) partagés via des pointeurs atomiques (`Arc`) pour éviter toute duplication mémoire inutile.

---

## Fonctionnalité Exclusive : Le "Binding Hash"

La principale innovation d'oxiddd réside dans sa méthode de scellé numérique. Contrairement aux outils standards, oxiddd calcule une signature qui lie mathématiquement trois éléments :

1. **Le contenu binaire** brut du disque.
2. **Le nom du fichier cible** (pour empêcher le renommage).
3. **Un horodatage certifié** récupéré via **Google NTP** (pour empêcher la falsification de l'heure système).

> *Si l'un de ces éléments est altéré après l'acquisition, la signature devient invalide, garantissant l'intégrité judiciaire de la preuve.*

---

## Spécifications & Résilience

### Gestion des secteurs défectueux
oxiddd intègre une gestion intelligente des blocs corrompus. En cas d'erreur de lecture, l'outil injecte des blocs de zéros (`0x00`) pour maintenir l'alignement des offsets, permettant une analyse ultérieure cohérente avec les outils de type Autopsy ou EnCase.

### Portabilité
Le projet peut être compilé en **binaire statique** (via `musl`), permettant son exécution sur des systèmes compromis sans dépendances externes, une nécessité absolue en réponse aux incidents.

---

## Guide d'Utilisation

### Installation via Cargo
```bash
cargo install oxiddd
```

### Acquisition Forensic Standard
```bash
# Acquisition avec hachage SHA-256 certifié
sudo ./oxiddd --if /dev/nvme0n1 --of evidence_case_001.dd --hash sha256
```

### Mode de Compatibilité (Syntaxe DD)
```bash
sudo ./oxiddd if=/dev/sdb of=preuve.dd hash=sha512 bs=8M
```

---

## Conclusion & Perspectives

Ce projet démontre la puissance de **Rust** pour les outils système critiques. oxiddd apporte une fiabilité et une vitesse que les outils en C ne peuvent plus garantir sur les infrastructures modernes.

**Compétences acquises :**
- Programmation système bas-niveau (Direct I/O, Alignement mémoire).
- Gestion de la concurrence massive en Rust.
- Protocoles réseau (NTP) et cryptographie appliquée.
- Standards de l'investigation numérique judiciaire.

---

## Liens du Projet

- **Site Officiel** : [https://jolanallen.github.io/oxiddd/](https://jolanallen.github.io/oxiddd/)
- **Code Source** : [GitHub Repository](https://github.com/jolanallen/oxiddd)
- **Communauté** : [Serveur Discord](https://discord.gg/tn3R7Zg7)

---

**Allen Jolan**
