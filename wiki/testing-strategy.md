# Testing Strategy: Comprehensive Coverage

## Objective
Implement comprehensive test coverage for all components, views (pages), and routes in the `front` Angular application. The strategy involves deep integration and isolated testing for the Angular + React hybrid architecture, utilizing **Vitest** as the testing framework.

## Feasibility of Vitest
**Vitest is the chosen testing framework.** 
The project already includes `vitest` and `jsdom`. Since it's a hybrid Angular + React project, Vitest provides a fast environment capable of rendering both Angular components and React components seamlessly within the same test suite.

## Scope
- **React Components (`.tsx`)**: Isolated tests to verify UI rendering and callbacks independently of Angular.
- **Angular Components (`.ts`)**: Integration tests to verify the React Wrapper correctly passes inputs and outputs.
- **Pages (Views)**: Deep integration tests, rendering child components to verify full page state, dependency injection, and data flow.
- **Routes**: Navigation logic tests, ensuring the router loads the correct page component for a given path and handles wildcards.

## Implementation Phases

### Phase 1: Test Environment & Tooling Setup (Completed)
1. **Testing Libraries Installed**: 
   - `@testing-library/react`, `@testing-library/user-event`, and `@testing-library/jest-dom`.
2. **Vitest Configuration Optimized**:
   - `vitest.config.ts` includes `@vitejs/plugin-react` for JSX support.
   - `src/test-setup.ts` initializes the Angular testing environment via `TestBed.initTestEnvironment`.
3. **Scripts Updated**:
   - `pnpm test` is configured to run `vitest run` for reliable CI/CD verification.

### Phase 2: Component Tests (Completed)
- **React Isolated Tests (`[name]React.spec.tsx`)**: Verified rendering and callbacks for all components (`FilterBar`, `StatsPanel`, `StickerCard`, `StickerGrid`, `UserHeader`).
- **Angular Integration Tests (`[name].component.spec.ts`)**: Verified the `ReactWrapperComponent` bridge for all components.

### Phase 3: Page (View) Tests (Completed)
- Deep integration tests for `home`, `album`, `section`, and `profile` pages are implemented and passing.

### Phase 4: Route Tests (Completed)
- Navigation logic for all primary routes and redirects verified.
