# Buvio-Frontend

React Native (Expo) mobile app for Buvio.

- **Architecture**: feature-based + MVVM — see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Stack**: Expo 53 · React Native 0.79 · Expo Router · Apollo Client (GraphQL codegen) · react-hook-form + Zod · TypeScript strict

## Getting started

This project uses [Bun](https://bun.sh) as its package manager.

```bash
bun install
cp .env.example .env   # fill in the backend URL
bun start
```

`bun run generate` regenerates the GraphQL types/hooks from the backend schema.
