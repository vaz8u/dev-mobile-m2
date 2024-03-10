# Projet de développement mobile M2 Génie Informatique

**Membres :** 
- Pierre VAZ
- Sofyann SAFSAF
- Samvel MANUKYAN
- Luc BRUNGARD

WakeUp est une application développée avec React Native qui permet de programmer des réveils automatiquement en fonction d'un emploi du temps donné et de positions GPS.  

## Prérequis

Avant de commencer, assurez-vous d'avoir installé ces éléments suivants :

- Node.js : https://nodejs.org/en
- npm (généralement installé avec Node.js)
- Expo CLI : `npm i expo-cli`

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Naviguez vers le répertoire du projet dans votre terminal.
3. Exécutez `npm install` pour installer toutes les dépendances du projet.
4. Dirigez vous vers le répertoire `wake-up-api` avec la commande `cd wake-up-api`
5. Exécutez `npm install` pour installer toutes les dépendances de l'api projet.
   
## Lancement du Projet
Le projet contient sa propre Api de base de données, il faut la lancer avant de lancer le projet avec la commande :

`cd wake-up-api && SET NODE_ENV=development && nest start`

Une fois que vous avez installé toutes les dépendances, vous pouvez lancer le projet avec les commandes suivantes :

- `npm start` : Lance le serveur de développement Expo.
- `npm run android` : Lance l'application sur un émulateur Android connecté ou un appareil Android.
- `npm run ios` : Lance l'application sur un émulateur iOS.
- `npm test` : Exécute les tests du projet.

## Emulateurs

Vous pouvez ouvrir l'application dans l'émulateur iOS/Android ou sur votre appareil via l'application mobile Expo Go.
Il faut que les deux machines soient connectés au même réseau pour pouvoir se connecter.
Sur Iphone, il faut obligatoirement scanner le QR Code affiché dans le terminal avec l'appareil photo pour lancer l'application.

Il est aussi possible d'utiliser des emulateurs non physiques :
- Android : Installer Android Studio, puis télécharger un Emulated Device avec une version d'android récente.
- iOS : Uniquement sous macOS, installer XCode, puis télécharger un emulateur iOS.

## Tests
Ce projet utilise SonarCloud

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=vaz8u_dev-mobile-m2&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=vaz8u_dev-mobile-m2)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vaz8u_dev-mobile-m2&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vaz8u_dev-mobile-m2)


![image](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)




