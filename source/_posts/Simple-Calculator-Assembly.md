---
title: Calculatrice en Assembleur x86_64 - Projet Bas Niveau
date: 2026-02-23
tags: [Assembly, x86_64, Linux, C, Low-Level]
categories: Projets
keywords: 'Assembly, x86_64, NASM, C, Calculator, Linux Syscalls'
description: Exploration de l'assembleur x86_64 sur Linux à travers la création d'une calculatrice hybride C/Assembleur.
cover: /images/projects/Asm_calc/Assembly.png
top_img: /images/projects/Asm_calc/Assembly.png
toc: true
---

L'assembleur est souvent perçu comme un langage complexe et intimidant. Pourtant, c'est le langage qui parle directement au processeur. Dans ce projet, j'ai voulu comprendre comment fonctionne l'assembleur et j'ai donc réalisé un petit projet simple de calculatrice en assembleur, ce qui m'a permis de m'initier à ce langage de programmation.

## Pourquoi l'Assembleur ?

Comprendre l'assembleur x86_64 sur Linux permet de saisir :
- Comment la mémoire est gérée via la **pile (stack)**.
- Comment les données transitent dans les **registres** (`RAX`, `RDI`, `RSI`...).
- Comment le langage C communique avec le matériel via l'**ABI System V**.

## Architecture du Projet

Le projet est une calculatrice hybride :
1. **Le Driver en C (`main.c`)** : Il gère l'interface utilisateur, la saisie des nombres et l'affichage des résultats.
2. **Le Cœur en Assembleur (`.asm`)** : Chaque opération (addition, soustraction, multiplication, division, carré) est écrite en pur assembleur NASM.

### Exemple : L'Addition

En assembleur x86_64, pour additionner deux nombres passés par un programme en C, on utilise la convention d'appel Linux. Le premier nombre arrive dans `RDI` et le deuxième dans `RSI`.

```nasm
global addition

section .text

addition:
    mov rax, rdi    ; On met le 1er argument dans RAX
    add rax, rsi    ; On ajoute le 2ème argument
    ret             ; Le résultat est retourné via RAX
```

## Les Défis de la Division

La division est l'opération la plus délicate en assembleur. Avant d'utiliser `idiv`, il faut étendre le signe du registre `RAX` vers `RDX` avec l'instruction `cqo`. Sans cela, le processeur risque de déclencher une erreur de segmentation ou un résultat incohérent.

## Compilation et Liaison

Pour faire fonctionner ce mélange de C et d'Assembleur, on utilise `nasm` pour l'assembleur et `gcc` pour lier le tout :

```bash
# Assemblage des fichiers NASM
nasm -f elf64 addition.asm -o addition.o

# Compilation finale avec GCC
gcc -fPIE main.c addition.o -no-pie -o calculator
```

## Conclusion

Ce projet m'a permis de démystifier le fonctionnement interne des ordinateurs. Passer de la logique de haut niveau (C) à la manipulation directe des registres est une étape essentielle pour tout étudiant en cybersécurité souhaitant comprendre l'exploitation de vulnérabilités (comme les buffer overflows) ou le reverse engineering.

Retrouvez le code complet sur mon GitHub : [simple-calculator-in-Assembly](https://github.com/jolanallen/simple-calculator-in-Assembly)
