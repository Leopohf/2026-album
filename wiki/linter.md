# Linter and Code Quality Specifications

To maintain robust code health across the hybrid **Angular 21 + React 19 + TypeScript** workspace without adding clutter to the main source folders, the codebase utilizes a completely decoupled, parallel linting architecture.

---

## 🏗️ Workspace Architecture

The linting engine resides in a dedicated sibling directory `raw/album-eslint` which is consumed as a local symlinked package inside `raw/front_source`.

```
album-project/
└── raw/
    ├── front_source/        # Main Frontend Application
    │   ├── eslint.config.js # Simple wrapper importing rules
    │   └── package.json     # Links to album-eslint via local protocol
    │
    └── album-eslint/        # Decoupled Linter Package
        ├── package.json     # Node configurations & package dependencies
        └── index.js         # Single source of truth ruleset definitions
```

This decoupled pattern ensures that:
- Core development source files are kept clean and lean.
- Any new frontend projects or packages can instantly share the exact same ruleset by adding the local reference dependency.
- Upgrading linter plugins, TS parser versions, or adding a new code quality rule is done in a single isolated project.

---

## 📜 Specific Linting Conditions and Rulesets

The configuration uses ESLint v9+ **Flat Config**, which maps specific plugins and parsers to target patterns using the `files` array. Below are the precise conditions and rules applied to each file scope in the repository.

### 1. General Rules (JS, TS, and TSX files)
* **Target Files:** `**/*.{js,ts,tsx}`
* **Default Extension Packs:** `js.configs.recommended`, `tseslint.configs.recommended`
* **Custom Conditions:**
  | Rule ID | Action / Severity | Description |
  | :--- | :--- | :--- |
  | `@typescript-eslint/no-explicit-any` | `warn` | Discourages the use of `any` in favor of strong static typing or `unknown`. |
  | `@typescript-eslint/no-unused-vars` | `warn` (args ignored: `^_`) | Warns about unused variables to prevent leftover dead code, while allowing variables prefixed with `_` to represent explicitly unused arguments. |

---

### 2. Angular Logic Rules
* **Target Files:** `**/*.ts` (excluding React `.tsx` files)
* **Default Extension Packs:** `@angular-eslint/configs.tsRecommended`
* **Custom Conditions:**
  | Rule ID | Action / Severity | Description |
  | :--- | :--- | :--- |
  | `@angular-eslint/directive-selector` | `error` | Enforces that directive selectors are in `camelCase` and are prefixed with `app`. |
  | `@angular-eslint/component-selector` | `error` | Enforces that component selectors are in `kebab-case` and are prefixed with `app`. |
  | `@angular-eslint/no-input-rename` | `error` | Prevents naming differences between the external template API name and the internal property name. |
  | `@angular-eslint/no-output-rename` | `error` | Prevents output renaming discrepancies to maintain clean reactive APIs. |
  | `@angular-eslint/component-class-suffix`| `error` (Built-in standard check) | Enforces component classes to end with the standard suffix `Component`. |

---

### 3. Angular Template and Accessibility Rules
* **Target Files:** `**/*.html`
* **Parser:** `@angular-eslint/template-parser`
* **Default Extension Packs:** `@angular-eslint/configs.templateRecommended`, `@angular-eslint/configs.templateAccessibility`
* **Custom Conditions:**
  | Rule ID | Action / Severity | Description |
  | :--- | :--- | :--- |
  | `@angular-eslint/template/alt-text` | `error` | Validates that image elements, areas, and input buttons have descriptive alt-text for screen readers, supporting the WCAG AA requirement. |
  | `@angular-eslint/template/elements-content`| `error` | Verifies that interactive and semantic elements contain accessible text or elements. |

---

### 4. React Functional and Hooks Rules
* **Target Files:** `**/*.tsx` (exclusive React files)
* **Plugin Scope:** `eslint-plugin-react`, `eslint-plugin-react-hooks`
* **Custom Conditions:**
  | Rule ID | Action / Severity | Description |
  | :--- | :--- | :--- |
  | `react/react-in-jsx-scope` | `off` | Disabled for modern React (v17+) where standard compiler transforms make importing `React` globally redundant. |
  | `react/prop-types` | `off` | Disabled in favor of strict TypeScript interface typing for components, which provides compile-time protection. |
  | `react-hooks/rules-of-hooks` | `error` (Standard react configuration) | Prevents conditional rendering of hooks, ensuring they are only called at the top level of React functions. |
  | `react-hooks/exhaustive-deps` | `warn` (Standard react configuration) | Verifies that all reactive values utilized inside hooks (e.g. `useEffect`, `useCallback`) are declared as dependencies. |

---

### 5. Prettier Styling Safety Override
* **Plugins Used:** `eslint-config-prettier`
* **Condition:** Must run as the **final configuration block** in the configuration array.
* **Objective:** Automatically turns off all ESLint format-based and stylistic rules that could conflict with the developer's `.prettierrc` specifications.

---

## 🔍 Explanation of Core Linter Rules

To understand what the linter checks and enforces, here is a detailed breakdown of the core rules that protect our codebase from runtime bugs, type leaks, and architectural deviations.

### 1. General & TypeScript Rules (JS/TS/TSX)
These rules are crucial for maintaining the **Strict Type Checking** policy outlined in `GEMINI.md`.

*   **`@typescript-eslint/no-explicit-any`**:
    *   *What it does:* Forbids variables, arguments, or return values from being explicitly typed as `any`.
    *   *Why we use it:* The `any` type disables the compiler's type checker, making refactoring unsafe and allowing runtime errors to slip through. Instead, developers should use `unknown` (safe) or write precise custom interfaces.
*   **`@typescript-eslint/no-unused-vars`**:
    *   *What it does:* Detects declared variables, imports, or arguments that are never used in the file.
    *   *Why we use it:* Unused code bloats bundle sizes, reduces readability, and often points to incomplete refactoring or logic bugs.
    *   *Exemption:* If you have an argument that *must* be present to satisfy a function signature but is unused, prefix it with an underscore (e.g. `_changes`) to satisfy this condition.
*   **`@typescript-eslint/ban-ts-comment`**:
    *   *What it does:* Regulates compiler directive comments like `@ts-ignore` or `@ts-nocheck`.
    *   *Why we use it:* Direct suppressions like `@ts-ignore` can mask real bugs. Under this rule, we enforce using `@ts-expect-error` instead, which ensures that if the code ever becomes valid in the future, the compiler will alert you to clean up the comment.

### 2. Angular Component & Directive Rules (.ts)
These rules enforce the official Angular Style Guide (as well as specific architecture decisions in `GEMINI.md`).

*   **`@angular-eslint/component-selector`**:
    *   *What it does:* Validates component HTML tag selectors.
    *   *Specification:* Requires a kebab-cased tag prefixed with `app-` (e.g., `<app-sticker-grid>`).
*   **`@angular-eslint/directive-selector`**:
    *   *What it does:* Validates directive attribute selectors.
    *   *Specification:* Requires camelCased attributes prefixed with `app` (e.g., `[appLazyLoad]`).
*   **`@angular-eslint/component-class-suffix`**:
    *   *What it does:* Enforces that the TS class name of any component ends with `Component`.
    *   *Specification:* For example, class `StickerCardComponent` is valid, while class `StickerCard` triggers a blocker.
*   **`@angular-eslint/no-input-rename` & `@angular-eslint/no-output-rename`**:
    *   *What it does:* Restricts developers from renaming `@Input` or `@Output` fields inside decorator properties (e.g., `@Input('customName')`).
    *   *Why we use it:* Renaming properties creates a discrepancy between the TS file and the HTML templates, making templates harder to read, maintain, and refactor.

### 3. Angular Template Accessibility (HTML)
Enforces critical accessibility conditions required to pass all AXE checks and achieve WCAG AA minimums (as mandated in `GEMINI.md`).

*   **`@angular-eslint/template/alt-text`**:
    *   *What it does:* Assures that images (`<img>`), image maps (`<area>`), and input elements with type image (`<input type="image">`) have proper `alt="..."` attributes.
    *   *Why we use it:* Screen readers rely on alt descriptions to read visual elements to visually impaired users.
*   **`@angular-eslint/template/elements-content`**:
    *   *What it does:* Checks that elements like headings (`<h1>`-`<h6>`), interactive controls, and anchors contain text or semantic children.
    *   *Why we use it:* Ensures screen readers have readable content to announce when focusing on these container elements.

### 4. React Code Quality & Purity (.tsx)
These rules govern the React functional UI components.

*   **`react-hooks/rules-of-hooks`**:
    *   *What it does:* Enforces the core rules of React Hooks.
    *   *Specification:* Hooks (like `useState`, `useEffect`, `useMemo`) must only be called at the very top level of a functional component. They must **never** be placed inside loops, conditional statements (`if`), or nested functions.
    *   *Why we use it:* React relies on the exact execution order of Hooks across renders. Deviating from this order corrupts state mapping.
*   **`react-hooks/exhaustive-deps`**:
    *   *What it does:* Audits the dependency arrays of active hooks (like `useEffect`, `useCallback`, `useMemo`).
    *   *Why we use it:* If a variable used inside `useEffect` changes but isn't listed in the dependency array, the effect will run with stale data, causing quiet, hard-to-debug data mapping bugs.

---

## ⚡ Running and Fixing Code Quality Issues

You can execute validation directly from `/raw/front_source/` using `pnpm`:

### Run Checks
Check the entire codebase for linting issues:
```bash
pnpm run lint
```

### Automatic Autofix
Safely rewrite files with solvable syntax errors (such as missing semi-colons, improper quoting, or minor formatting issues):
```bash
pnpm run lint:fix
```
