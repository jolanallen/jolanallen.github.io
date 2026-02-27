---
title: Calculatrice en Assembleur x86_64 - Mes débuts dans le bas niveau
date: 2026-01-07
tags: [Assembly, x86_64, Linux, C, Low-Level]
categories: Projets
keywords: 'Assembly, x86_64, NASM, C, Calculator, Linux Syscalls'
description: Ma découverte de l'assembleur x86_64 sur Linux à travers la création d'une petite calculatrice hybride C/Assembleur.
cover: /images/projects/Asm_calc/Assembly.png
top_img: /images/projects/Asm_calc/Assembly.png
toc: true
---

# Apprivoiser l'Assembleur : Un défi personnel

**Allen Jolan**  
[LinkedIn](https://www.linkedin.com/in/jolan-allen)

L'assembleur est souvent perçu comme un langage intimidant, presque mystique. Pourtant, c'est celui qui parle le plus directement au processeur. Pour lever le voile sur ce fonctionnement, je me suis lancé un petit défi : réaliser une calculatrice simple en assembleur x86_64. 

Ce projet a été pour moi une véritable initiation aux mécanismes fondamentaux de l'informatique.

---

## Pourquoi l'Assembleur ?

En tant qu'étudiant en cybersécurité, comprendre l'assembleur est indispensable. Cela permet de voir comment les données transitent réellement dans la machine :
- **La mémoire** : Comment elle est gérée via la pile (stack).
- **Les registres** : Ces petites cases ultra-rapides du processeur (`RAX`, `RDI`, `RSI`...).
- **Le lien avec le C** : Comment un langage de "haut niveau" communique avec le matériel.

---

## Mon approche : Un projet hybride

Pour ne pas me perdre dès le début, j'ai choisi une approche hybride :
1. **Le Driver en C (`main.c`)** : Il gère l'interface, la saisie des nombres et l'affichage des résultats. C'est la partie "facile".
2. **Le Cœur en Assembleur (`.asm`)** : Chaque opération mathématique (addition, soustraction, multiplication, division) est écrite en pur assembleur NASM.

### Exemple : L'Addition

En assembleur x86_64, on utilise des registres pour passer les arguments. Le premier nombre arrive dans `RDI` et le deuxième dans `RSI`. Le résultat est renvoyé via `RAX`.

```nasm
global addition

section .text

addition:
    mov rax, rdi    ; On met le 1er argument dans RAX
    add rax, rsi    ; On ajoute le 2ème argument
    ret             ; On renvoie le résultat
```

C'est simple, mais c'est là que l'on comprend que chaque instruction compte.

---

## Mon plus gros défi : La Division

La division a été l'opération la plus délicate. Avant d'utiliser l'instruction `idiv`, il faut préparer le registre `RAX` et étendre son signe vers `RDX` avec l'instruction `cqo`. Si on l'oublie, le programme plante ou donne un résultat incohérent. C'est dans ce genre de détails que l'on apprend la rigueur du bas niveau.

---

## Ce que j'ai appris

Ce projet m'a permis de démystifier le fonctionnement interne de nos ordinateurs. Passer de la logique du C à la manipulation directe des registres est une étape essentielle pour quiconque s'intéresse au **Reverse Engineering** ou à l'exploitation de vulnérabilités (comme les buffer overflows).

C'est une expérience modeste, mais elle m'a donné le goût de continuer à explorer ce qui se passe "sous le capot".

---

Retrouvez le code complet sur mon GitHub : [simple-calculator-in-Assembly](https://github.com/jolanallen/simple-calculator-in-Assembly)

---

**Allen Jolan**
