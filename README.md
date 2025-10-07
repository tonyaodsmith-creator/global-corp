# GlobalCorp Sim (Windows 10/11)

Simulatore gestionale single–player di una multinazionale.
Stack: **Electron + Vite + React + TypeScript + Tailwind + Zustand + Recharts + framer-motion**.

## Requisiti
- Node.js LTS (consigliato 20.x) e npm
- Windows 10 o 11
- (Opzionale) NSIS viene gestito automaticamente da electron-builder

## Avvio in sviluppo
```bash
npm install
npm run start
```
- apre la finestra Electron con HMR

## Build pacchetto installabile (EXE)
```bash
npm run dist
```
- genera un installer **NSIS** (EXE) per Windows in `dist/` o `release/`

## Funzionalità principali
- Loop di simulazione con velocità variabili (Pausa/1x/2x/3x)
- Cruscotto KPI, mercati, operazioni, finanza, HR, R&D, news/eventi
- Azioni rapide: **Lancio prodotto**, **CAPEX**, **Pausa assunzioni**
- Salvataggio/caricamento su disco (Electron `userData/saves/latest.json`)

## Struttura
```
globalcorp-sim/
  electron/       # main & preload
  src/            # renderer (UI + engine)
  build/icon.png  # icona app
  vite.config.ts
  package.json
```
> I componenti UI in `src/components/ui/` riproducono lo stile dark mostrato nell'anteprima.

## Roadmap / Estensioni
- AI concorrenti, mappa mondiale interattiva, albero tecnologie, eventi narrativi
- Localizzazione completa, achievement, tutorial guidato
- Salvataggi multipli e cloud

© 2025-10-07 — pronto per Windows 10/11.
