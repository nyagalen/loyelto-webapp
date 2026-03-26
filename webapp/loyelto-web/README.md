# Loyelto Web App

React 19 + Vite + MUI v7 + TailwindCSS v4

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build tool | Vite 6 |
| UI library | MUI v7 (@mui/material) |
| Styling | TailwindCSS v4 (@tailwindcss/vite) |
| Routing | React Router v7 |
| Server state | TanStack React Query v5 |
| Auth | Privy (@privy-io/react-auth) |
| Forms | Zod v4 validation |
| i18n | i18next + react-i18next |
| Testing | Vitest + @testing-library/react |
| Type checking | TypeScript 5.7 |

## Routes

| Path | Component | Guard |
|------|-----------|-------|
| `/` | LandingPage | Public |
| `/signup-main` | SignupMain | Public (intended: auth before submit) |
| `/business-main` | BusinessMain | AuthLayout |
| `/client-page` | ClientPage | AuthLayout |

## Development

```bash
npm install
npm run dev          # Dev server (Vite HMR)
npm run build        # tsc -b && vite build
npm run lint         # ESLint
npm run test         # Vitest (watch mode)
npm run test:run     # Vitest (single run)
npm run test:coverage  # Coverage report
```

## Key Architecture Notes

- `ErrorBoundary` wraps the entire app in `App.tsx`
- TanStack Query is initialized in `main.tsx` with `QueryClientProvider`
- Privy auth is set up with `PrivyProvider` in `App.tsx`
- Protected routes use `AuthLayout` (Privy login gate)
- API client: `src/api/client.ts` — typed fetch wrapper with error handling
- Custom hooks in `src/hooks/` encapsulate all data fetching via React Query
- The web app does NOT auto-convert snake_case/camelCase (unlike mobile apps)

## ESLint Configuration

The project uses Vite's default ESLint setup. For stricter type-aware rules, update `eslint.config.js` to use `tseslint.configs.recommendedTypeChecked` with proper `parserOptions.project` pointing to `tsconfig.app.json`.
