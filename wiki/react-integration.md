# React Integration in Angular

This document outlines the strategy for hosting React components within our Angular-based project.

## Architecture

To maintain a single source of truth and leverage Angular's robust service layer (Signals, DI, Routing), we use a "Bridge" approach.

### 1. Generic Angular Wrapper (`ReactWrapperComponent`)
A reusable Angular component responsible for:
- Initializing a React Root using `createRoot`.
- Mounting the React component on a specific DOM element.
- Syncing Angular changes to React via props.
- Unmounting the React tree when the Angular component is destroyed.

### 2. State Flow (Pure Props)
- **Source**: Angular Signals in `AlbumService`.
- **Bridge**: Angular Host components subscribe/read signals.
- **Consumption**: Values are passed to React components as standard props.
- **Events**: React components trigger callbacks passed via props, which then call Angular methods/emitters.

## Migration Path

1. **Setup**: Configure `tsconfig.json` to support JSX/TSX.
2. **Infrastructure**: Create `ReactWrapperComponent`.
3. **Component Migration**:
   - Create `ComponentReact.tsx` (Functional, Pure).
   - Refactor `Component.ts` (Angular) to act as a host using the wrapper.
   - Remove Angular HTML/CSS for that component.

## Benefits
- Leverage React's ecosystem for complex UI components.
- Maintain Angular's powerful infrastructure for state and routing.
- Gradual migration capability.
