# OneFood-Backend

Backend NodeJS server for OneFood.

## Project Configuration

- `package.json`: Project metadata plus scripts for `dev` (per-environment via `tsx --env-file`), `build` (`tsc` using `tsconfig.build.json`), `start` (runs compiled `dist` with env file), linting/formatting, tests (Vitest), and Husky setup. Defines the `#*` import alias for `src/*` and lint-staged rules to run ESLint and Prettier on staged files.
- `tsconfig.json`: Extends `@tsconfig/node24` and sets `outDir` to `dist`, `rootDir` to repo root, and the `#*` path alias. Includes all `.ts` files except `dist`.
- `tsconfig.build.json`: Reuses the base TS config but excludes `*.test.ts` and `*.spec.ts` from the production build.
- `eslint.config.js`: Ignores compiled `.js` output, layers ESLint recommended rules with strict/stylistic TypeScript settings, adds `eslint-plugin-perfectionist` sorting rules, and enables Vitest-specific rules/overrides for test files.
- `.prettierrc` & `.prettierignore`: Uses Prettier defaults and skips formatting generated `dist` artifacts.
- `vitest.config.js`: Baseline Vitest setup; extend here as tests grow.
- `.husky/pre-commit`: Runs `npm test` before commits (framework in place to add lint-staged if desired).
- `.nvmrc`: Pins Node version `v24.11.1` to match the TypeScript target and runtime.
- `.vscode/settings.json` & `.vscode/extensions.json`: Sets Prettier as the default formatter with format-on-save and recommends ESLint/Prettier/TypeScript Next extensions for a consistent dev experience.
- `.github/workflows/ci.yml`: CI workflow triggered on `main` pushes; checks out code, installs dependencies, runs tests, type-checks, applies ESLint/Prettier fixes, and re-checks lint/format to ensure a clean build.
