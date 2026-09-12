# ASCEND — Frontend Prototype

A cinematic sci-fi RPG productivity app. Real tasks become quests; quests earn
XP and Credits, grow six life attributes, and level up your character.

This is **frontend only** — mock data and local React state stand in for a
future backend/API. No 3D character, no Three.js, no real auth, no
localStorage: everything lives in `src/context/AppState.jsx` and
`src/data/mockData.js`, shaped so real API calls can be dropped in later
without touching any page or component.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for production with `npm run build`
(output goes to `dist/`).

## Structure

```
src/
  components/
    layout/       nav, page shell, particle field, auth layout
    ui/            button, modal, progress bar/ring, glass panel
    quests/        quest card, create-quest modal
    progression/   attribute card, character chamber, level-up modal
  pages/           one file per screen (see App.jsx for routes)
  context/         AppState.jsx — mock store, API-shaped
  data/            mockData.js — seed user, quests, attributes, market items
```

## Where the 3D character goes later

`components/progression/CharacterChamber.jsx` is the empty staging area — a
glowing circular platform with orbiting rings and HUD corners. It's used on
both the Command Center and Attributes screens. Drop a React Three Fiber
`<Canvas>` into it later; the surrounding UI was built to already assume the
character is there.

## Demo-only affordance

There's a small "DEMO: LEVEL UP" button in the bottom-right corner of the
Command Center that triggers the level-up sequence on demand, since that
flow is normally backend-triggered. Remove it once real progression events
exist.
