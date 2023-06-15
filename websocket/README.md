# Chat Web-socket

Ce projet est une application web basée sur Node.js qui met en œuvre un chat utilisant des web-sockets avec la librairie Socket.IO.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés localement :

- Node.js (version 19.x)
- npm (version 9.x)

## Installation

1. Clonez ce dépôt sur votre machine locale :

```bash
npm instal
```

## Configuration

1. Renommez le fichier `.env.exemple` en `.env`.
2. Configurez les variables d'environnement nécessaires dans le fichier `.env`. Voici un exemple

```bash
NODE_ENV=
PORT=
API_URL=
```

## Variables d'environnement

Les variables d'environnement suivantes doivent être configurées dans un fichier `.env` à la racine du projet :

- `NODE_ENV`: Environnement d'exécution de l'application (par exemple : `"development"`).
- `PORT`: Numéro de port sur lequel l'application sera exécutée (par exemple : `5000`).
- `API_URL`: URL de l'API à laquelle l'application se connecte (par exemple : `http://localhost:3000`).

## Linting avec ESLint

Ce projet utilise ESLint pour maintenir des standards de code cohérents. Vous pouvez exécuter ESLint en utilisant la commande suivante :

```bash
npm run lint
```

## Build

Pour construire le projet, exécutez la commande suivante :

```bash
npm run build
```

## Utilisation

Lancez l'application  à l'aide de la commande suivante :

```bash
npm run serve
```

1. Accédez à l'application dans votre navigateur à l'adresse suivante : `http://localhost:5000` (remplacez le port par celui spécifié dans votre fichier `.env` si vous avez effectué des modifications).
2. Vous devriez maintenant pouvoir utiliser le serveur de WebSocket !
