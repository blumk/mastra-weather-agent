# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (Mastra Agent)
- **Install dependencies**: `npm install`
- **Run development server**: `npm run dev` (runs `mastra dev` on port 4111)
- **Build for Vercel**: `npm run build` (runs `mastra build`)

### Frontend (Next.js)
- **Install dependencies**: `cd frontend && npm install`
- **Run development server**: `cd frontend && npm run dev` (runs on port 3000)
- **Build**: `cd frontend && npm run build`

## Environment Setup

Requires `ANTHROPIC_API_KEY` in `.env` file. Copy from `.env.example`.

Optionally set `MODEL` environment variable to override the default `anthropic/claude-sonnet-4-20250514`.

## Vercel Deployment

This is a monorepo with two deployable projects:

### Backend (Mastra API)
- Root directory: `/`
- Build command: `npm run build`
- Environment variables:
  - `ANTHROPIC_API_KEY` - Your Anthropic API key
  - `TURSO_DATABASE_URL` - Turso database URL (optional)
  - `TURSO_AUTH_TOKEN` - Turso auth token (optional)

### Frontend (Next.js)
- Root directory: `frontend`
- Build command: `npm run build`
- Environment variables:
  - `MASTRA_API_URL` - URL of deployed Mastra backend (e.g., `https://your-backend.vercel.app`)

## Architecture

This is a Mastra framework weather agent with three main components:

### Mastra Instance (`src/mastra/index.ts`)
Central configuration that registers agents, workflows, and logging (Pino with observability enabled).

### Agent (`src/mastra/agents/index.ts`)
The `weatherAgent` is an AI agent configured with instructions for handling weather queries. Uses `weatherTool` to fetch data.

### Tool (`src/mastra/tools/index.ts`)
The `weatherTool` uses Open-Meteo APIs:
1. Geocoding API to convert city names to coordinates
2. Weather API to fetch current conditions (temperature, humidity, wind, weather code)

### Workflow (`src/mastra/workflows/index.ts`)
The `weatherWorkflow` chains two steps:
1. `fetchWeather` - Gets forecast data from Open-Meteo
2. `planActivities` - Uses a separate agent to suggest activities based on weather

Both the tool and workflow use Zod schemas for input/output validation.
