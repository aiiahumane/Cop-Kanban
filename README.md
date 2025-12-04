# Kanban Proyfe

Aplicación **Kanban** interactiva, responsive (desktop, tablet, móvil) con **drag & drop**, gestión de **Responsables / Personal / Recursos**, **Archivo**, cálculos automáticos y **avatares IA estilo 3D Clay/Icon**.

## Arquitectura
- **apps/web** – Frontend React + TypeScript + Vite + dnd-kit + Tailwind.
- **services/api** – Backend Node.js (NestJS) + Prisma + PostgreSQL.
- **docker-compose.yml** – Orquesta DB (PostgreSQL) y API/Web para desarrollo.

## Requisitos
- Node.js 18+
- Docker + Docker Compose

## Puesta en marcha (desarrollo rápido)
```bash
# 1) Variables de entorno
cp services/api/.env.example services/api/.env

# 2) Levantar stack
docker compose up -d --build

# 3) Web en http://localhost:5173  | API en http://localhost:3000
```

## Scripts útiles
```bash
# apps/web
npm --prefix apps/web i && npm --prefix apps/web run dev
# services/api
npm --prefix services/api i && npm --prefix services/api run start:dev
```

## Despliegue en GitHub
1. Crea un repositorio vacío en GitHub.
2. Inicializa y sube:
```bash
git init
git add .
git commit -m "feat: bootstrap Kanban Proyfe"
git branch -M main
git remote add origin <URL-del-repo>
git push -u origin main
```
3. El workflow **CI** ya está en `.github/workflows/ci.yml`.

## IA Avatares 3D Clay/Icon
- Endpoint placeholder: `POST /api/avatars` (por implementar). 
- Prompt base editable en `services/api/src/ai/prompts.ts`.
- Front-end incluye botón y campo descriptivo (mock).

## Licencia
MIT
