#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Nx Monorepo Migration Script
# Converts git submodules → git subtrees and sets up Nx workspace
# ============================================================================

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_ROOT"

echo "=== Phase 1: Git Subtree Migration ==="
echo ""

# --- Step 1.1: Deinit and remove submodules ---
echo "[1.1] Deinitializing submodules..."
git submodule deinit -f raw/front_source
git submodule deinit -f raw/back_source
git submodule deinit -f raw/jlhf-lint

echo "[1.1] Removing submodule entries from index..."
git rm -f raw/front_source
git rm -f raw/back_source
git rm -f raw/jlhf-lint

echo "[1.1] Cleaning up .git/modules/..."
rm -rf .git/modules/raw/front_source
rm -rf .git/modules/raw/back_source
rm -rf .git/modules/raw/jlhf-lint

echo "[1.1] Committing submodule removal..."
git commit -m "chore: remove git submodules in preparation for monorepo migration"
echo "[1.1] ✅ Submodules removed"
echo ""

# --- Step 1.2: Add frontend as subtree ---
echo "[1.2] Adding frontend as git subtree → apps/album-front/ ..."
git subtree add --prefix=apps/album-front \
  git@github.com:Leopohf/2026-album-track-front.git main --squash
echo "[1.2] ✅ Frontend subtree added"
echo ""

# --- Step 1.3: Add backend as subtree ---
echo "[1.3] Adding backend as git subtree → apps/album-backend/ ..."
git subtree add --prefix=apps/album-backend \
  git@github.com:Leopohf/2026-album-track-back.git main --squash
echo "[1.3] ✅ Backend subtree added"
echo ""

# --- Step 1.4: Add jlhf-lint as subtree inside frontend ---
echo "[1.4] Adding jlhf-lint as git subtree → apps/album-front/lint/ ..."
git subtree add --prefix=apps/album-front/lint \
  git@github.com:Leopohf/jlhf-lint.git main --squash
echo "[1.4] ✅ Lint subtree added"
echo ""

# --- Step 1.5: Move images ---
echo "[1.5] Moving images to assets/images/ ..."
mkdir -p assets/images
git mv raw/images/*.webp assets/images/
echo "[1.5] ✅ Images moved"
echo ""

# --- Step 1.6: Clean up ---
echo "[1.6] Cleaning up raw/ directory..."
rm -f .gitmodules 2>/dev/null || true
rm -f raw/INDEX.md 2>/dev/null || true
rmdir raw 2>/dev/null || rm -rf raw 2>/dev/null || true

# Update .gitattributes for new LFS path
echo 'assets/images/*.webp filter=lfs diff=lfs merge=lfs -text' > .gitattributes

git add -A
git commit -m "chore: move images to assets/, clean up raw/, update LFS paths"
echo "[1.6] ✅ Cleanup complete"
echo ""
echo "=== Phase 1 Complete ==="
echo ""

# ============================================================================
echo "=== Phase 2: Initialize Nx Workspace ==="
echo ""

# --- Step 2.1: Root package.json ---
echo "[2.1] Creating root package.json..."
cat > package.json << 'ROOTPKG'
{
  "name": "album-project",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.33.2",
  "scripts": {
    "front:serve": "nx run album-front:serve",
    "front:build": "nx run album-front:build",
    "front:test": "nx run album-front:test",
    "front:lint": "nx run album-front:lint",
    "back:serve": "nx run album-backend:serve",
    "back:build": "nx run album-backend:build",
    "test:all": "nx run-many --target=test",
    "lint:all": "nx run-many --target=lint"
  },
  "devDependencies": {
    "nx": "^21.0.0"
  }
}
ROOTPKG
echo "[2.1] ✅ Root package.json created"

# --- Step 2.2: nx.json ---
echo "[2.2] Creating nx.json..."
cat > nx.json << 'NXJSON'
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/**/*.spec.tsx",
      "!{projectRoot}/**/*.md"
    ],
    "sharedGlobals": []
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "test": {
      "inputs": ["default", "^production"]
    },
    "lint": {
      "inputs": ["default"]
    }
  }
}
NXJSON
echo "[2.2] ✅ nx.json created"

# --- Step 2.3: pnpm-workspace.yaml ---
echo "[2.3] Creating pnpm-workspace.yaml..."
cat > pnpm-workspace.yaml << 'PNPMWS'
packages:
  - 'apps/album-front'
  - 'apps/album-front/lint'
PNPMWS
echo "[2.3] ✅ pnpm-workspace.yaml created"

# --- Step 2.4: tsconfig.base.json ---
echo "[2.4] Creating tsconfig.base.json..."
cat > tsconfig.base.json << 'TSBASE'
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "jsx": "react-jsx",
    "target": "ES2022",
    "module": "preserve"
  }
}
TSBASE
echo "[2.4] ✅ tsconfig.base.json created"

# --- Step 2.5: Update .gitignore ---
echo "[2.5] Updating .gitignore..."
cat > .gitignore << 'GITIGN'
# Dependencies
node_modules/

# Build output
dist/
out-tsc/

# Angular
.angular/

# Testing
coverage/

# Nx
.nx/

# IDE
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/mcp.json

# Misc
.DS_Store
.antigravitycli/

# Go build artifacts
bootstrap
bootstrap.zip
GITIGN
echo "[2.5] ✅ .gitignore updated"

git add -A
git commit -m "chore: initialize Nx workspace scaffolding"
echo ""
echo "=== Phase 2 Complete ==="
echo ""

# ============================================================================
echo "=== Phase 3: Configure Frontend as Nx Project ==="
echo ""

# --- Step 3.1: Rename lint package ---
echo "[3.1] Renaming lint package to @album/lint..."
cat > apps/album-front/lint/package.json << 'LINTPKG'
{
  "name": "@album/lint",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "@eslint/js": "^9.20.0",
    "typescript-eslint": "^8.24.0",
    "angular-eslint": "^19.0.2",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-config-prettier": "^10.0.1"
  }
}
LINTPKG
echo "[3.1] ✅ Lint package renamed"

# --- Step 3.2: Update frontend package.json dependency ---
echo "[3.2] Updating frontend package.json..."
cd apps/album-front
# Replace the jlhf-lint dependency line with @album/lint workspace reference
sed -i 's/"jlhf-lint": "link:..\/jlhf-lint"/"@album\/lint": "workspace:*"/' package.json
# Also handle the version-based reference just in case
sed -i 's/"jlhf-lint": "\^1.0.0"/"@album\/lint": "workspace:*"/' package.json
cd "$REPO_ROOT"
echo "[3.2] ✅ Frontend dependency updated"

# --- Step 3.3: Update eslint.config.js ---
echo "[3.3] Updating eslint.config.js import..."
cat > apps/album-front/eslint.config.js << 'ESLINT'
import albumConfig from '@album/lint';

export default albumConfig;
ESLINT
echo "[3.3] ✅ ESLint config updated"

# --- Step 3.4: Update tsconfig.json ---
echo "[3.4] Updating tsconfig.json to extend base..."
cat > apps/album-front/tsconfig.json << 'TSCONF'
{
  "extends": "../../tsconfig.base.json",
  "compileOnSave": false,
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
TSCONF
echo "[3.4] ✅ tsconfig.json updated"

# --- Step 3.5: Create frontend project.json ---
echo "[3.5] Creating apps/album-front/project.json..."
cat > apps/album-front/project.json << 'FRONTPROJ'
{
  "name": "album-front",
  "projectType": "application",
  "sourceRoot": "apps/album-front/src",
  "targets": {
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm ng serve",
        "cwd": "apps/album-front"
      }
    },
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm ng build",
        "cwd": "apps/album-front"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm vitest run",
        "cwd": "apps/album-front"
      }
    },
    "lint": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm eslint .",
        "cwd": "apps/album-front"
      }
    }
  }
}
FRONTPROJ
echo "[3.5] ✅ Frontend project.json created"

git add -A
git commit -m "chore: configure frontend as Nx project with @album/lint"
echo ""
echo "=== Phase 3 Complete ==="
echo ""

# ============================================================================
echo "=== Phase 4: Configure Backend as Nx Project ==="
echo ""

echo "[4.1] Creating apps/album-backend/project.json..."
cat > apps/album-backend/project.json << 'BACKPROJ'
{
  "name": "album-backend",
  "projectType": "application",
  "sourceRoot": "apps/album-backend",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "make build",
        "cwd": "apps/album-backend"
      }
    },
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "command": "make run",
        "cwd": "apps/album-backend"
      }
    },
    "clean": {
      "executor": "nx:run-commands",
      "options": {
        "command": "make clean",
        "cwd": "apps/album-backend"
      }
    }
  }
}
BACKPROJ

git add -A
git commit -m "chore: configure backend as Nx project"
echo "[4.1] ✅ Backend project.json created"
echo ""
echo "=== Phase 4 Complete ==="
echo ""

# ============================================================================
echo "=== Phase 5: Install Dependencies ==="
echo ""

echo "[5.1] Running pnpm install..."
pnpm install --no-frozen-lockfile
echo "[5.1] ✅ Dependencies installed"
echo ""

echo "[5.2] Verifying Nx workspace..."
npx nx show projects
echo "[5.2] ✅ Nx projects listed"
echo ""

git add -A
git commit -m "chore: install workspace dependencies" || echo "(no changes to commit)"
echo ""
echo "=== Phase 5 Complete ==="
echo ""

echo "============================================"
echo "  🎉 Migration Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Run: npx nx run album-front:lint"
echo "  2. Run: npx nx run album-front:test"
echo "  3. Run: npx nx run album-front:build"
echo "  4. Run: npx nx run album-front:serve"
echo ""
echo "Once verified, push with: git push origin main"
