# RISE Onboarding

Application d'onboarding interne Rise — univers "Soft Cosmic / Aube céleste".

## Stack

- **Frontend** : React 18 + Vite + React Router + Framer Motion + TailwindCSS
- **Backend** : Node.js + Express (API minimale)
- **Fonts** : Fraunces (titres) + Inter (corps) via Google Fonts

## Installation

```bash
# À la racine du projet
npm run install:all
```

Cela installe les dépendances à la racine (concurrently) ainsi que dans `/client` et `/server`.

## Lancement

```bash
npm run dev
```

Lance client et serveur en parallèle :

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:5173     |
| API      | http://localhost:3001     |

## Routes

| Route   | Description                        |
|---------|------------------------------------|
| `/`     | Landing page (séquence d'animation)|
| `/home` | Placeholder Accueil                |

## Endpoints API

| Méthode | Route        | Description          |
|---------|--------------|----------------------|
| GET     | /api/health  | Statut du serveur    |

## Structure

```
RiseOnboarding/
├── package.json              # Root — concurrently
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css         # Animations CSS globales
│       ├── components/
│       │   └── Background.jsx
│       └── pages/
│           ├── Landing.jsx
│           └── Home.jsx
└── server/
    ├── package.json
    └── index.js
```
