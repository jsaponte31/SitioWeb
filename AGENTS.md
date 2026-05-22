# SitioWeb — Agents guide

Angular 21 standalone SPA with SSR (Express). Personal portfolio site.

## Commands

| Action | Command |
|---|---|
| Dev server | `npm start` (port 4200) |
| Build | `npm run build` → `dist/` |
| Test (Vitest) | `npm test` |
| Focused test | `fdescribe`/`fit` in spec files |
| SSR production | `npm run serve:ssr:SitioWeb` (port 4000) |
| Scaffold | `npx ng generate component X` |
| Format | Prettier installed; no npm script defined. Run `npx prettier --write .` |

## Conventions that differ from defaults

- **File naming:** components use `name.ts` (not `name.component.ts`), `name.html`, `name.scss`.
- **`styleUrl`** (singular, not `styleUrls`).
- **`ng generate` skips tests by default** (`skipTests: true` in angular.json for component/service/pipe/directive/guard).
- All components are **standalone** (no NgModules).
- Global styles include Bootstrap 5, Bootstrap Icons, and ngx-toastr — configured in `angular.json` `styles`, not imported per-component.

## SSR

All routes use `RenderMode.Prerender` (`src/app/app.routes.server.ts`). Server entry: `src/server.ts`.

## Test runner

Uses Vitest (via `@angular/build:unit-test`), **not** Karma. Globals mode (`describe`/`it`/`expect`). DOM via jsdom. See `tsconfig.spec.json`.
