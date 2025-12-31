# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Install dependencies**: `pnpm install`
- **Run development server**: `pnpm dev` (runs `mastra dev`)

## Environment Setup

Requires `ANTHROPIC_API_KEY` in `.env` file. Copy from `.env.example`.

Optionally set `MODEL` environment variable to override the default `anthropic/claude-sonnet-4-20250514`.

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
