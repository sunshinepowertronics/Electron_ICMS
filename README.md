# ICMS – Inventory & Customer Management System

Desktop app built with Electron, Vite, and React.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts Electron with the renderer served by Vite (hot reload).

## Build

```bash
npm run build
```

Output: `out/main`, `out/preload`, `out/renderer`.

## Run built app

```bash
npm start
```

Runs the app from the `out/` build (no Vite server).

## Project layout

- `src/main` – Electron main process
- `src/preload` – Preload script (context bridge)
- `src/renderer` – React UI (Dashboard, Inventory, Customers, Orders, Settings)
