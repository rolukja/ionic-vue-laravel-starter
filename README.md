# Ionic Vue Laravel – Starter Template

A modern **full-stack starter** that combines:

* ⚡ **Ionic Vue** for cross-platform mobile & web UIs
* 🐘 **Laravel 12** served via **Laravel Sail** (Docker) for the API layer
* 🔐 **Laravel Sanctum** for token-based authentication

Use this repository to bootstrap new projects without spending time on initial Docker, auth, routing or build configuration.

---

## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
   1. [Backend (Laravel Sail)](#backend-laravel-sail)
   2. [Frontend (Ionic Vue)](#frontend-ionic-vue)
   3. [Run Both Together](#run-both-together)
3. [Environment Variables](#environment-variables)
4. [Useful Commands](#useful-commands)
5. [Project Structure](#project-structure)
6. [Android Build](#android-build)
7. [Roadmap](#roadmap)

---

## Requirements

| Tool | Tested Version | Purpose |
|------|---------------|---------|
| **Git** | ≥ 2.40 | Source control |
| **Node.js** | ≥ 18 LTS | Ionic / Vite tool-chain |
| **npm** | ≥ 9 | Front-end packages |
| **Docker Desktop** | ≥ 24 | Laravel Sail containers |
| **Java JDK 11+** | (adoptopenjdk) | Android build (optional) |
| **Android Studio** | 2023.x | Native Android compilation |

> On Windows use **WSL 2** for best experience.

---

## Installation

### Backend (Laravel Sail)
```bash
# 1 – Go to backend directory
cd backend

# 2 – Install PHP dependencies
composer install

# 3 – Copy .env & generate APP_KEY
cp .env.example .env
php artisan key:generate

# 4 – Start containers in background
./vendor/bin/sail up -d

# 5 – Run migrations + seeders
./vendor/bin/sail artisan migrate --seed
```
API is now reachable at **http://localhost** inside Docker network.

### Frontend (Ionic Vue)
```bash
# At repository root
npm install         # install JS deps
ionic serve         # hot-reload dev server
```
App runs at **http://localhost:5173** and talks to backend URL from `.env`.

### Run Both Together
Run Sail (`./vendor/bin/sail up -d`) and `ionic serve` in separate terminals.

---

## Environment Variables
Create `.env` in project root for front-end (handled by Vite):
```env
# Backend URL (without /api)
VITE_API_BASE_URL=http://localhost

# Show verbose API logs in browser console
VITE_APP_DEBUG=true
```
Backend uses usual `backend/.env`.

---

## Useful Commands
| Action | Command |
|--------|---------|
| Start Sail containers | `cd backend && ./vendor/bin/sail up -d` |
| Stop containers | `cd backend && ./vendor/bin/sail down` |
| Run backend tests | `cd backend && ./vendor/bin/sail artisan test` |
| Start Ionic dev server | `ionic serve` |
| Lint / type-check front-end | `npm run lint` / `npm run type-check` |

---

## Project Structure
```text
backend/   ➜ Laravel API (Sail + Sanctum)
  ├─ app/
  ├─ routes/
  └─ ...
src/       ➜ Ionic Vue app
  ├─ layouts/
  ├─ views/
  ├─ config/
  └─ main.ts
```

---

## Android Build
Using **Capacitor**.
1. Add platform (once)
```bash
ionic build
npx cap add android
```
2. Copy latest build
```bash
ionic build
npx cap copy android
```
3. Open in Android Studio
```bash
npx cap open android
```
Build APK/AAB via Android Studio. For CLI release build:
```bash
cd android
./gradlew assembleRelease
```
Adjust `android/variables.gradle` before releasing.

---

## Roadmap
- ✅ Ready-made auth (register / login / logout)
- ✅ Token-based API (Sanctum)
- ✅ Responsive Ionic layouts (guest + auth)
- ⏳ GitHub Actions CI/CD
- ⏳ File upload example
- ⏳ Comprehensive tests (Vitest + Cypress)

Contributions are welcome 🙌 