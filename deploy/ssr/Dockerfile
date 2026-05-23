# --- STAGE 1: Builder ---
FROM node:22-alpine AS builder

WORKDIR /app

# Enable 'pnpm' globally
RUN corepack enable pnpm

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Angular SSR application
RUN pnpm build

# --- STAGE 2: Runner ---
FROM node:22-alpine AS runner

# Install tini for proper init process and signal handling (PID 1)
RUN apk add --no-cache tini

# Set environment
ENV NODE_ENV=production

WORKDIR /app

# Copy built artifacts from builder with correct non-root permissions
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/package.json ./package.json

# Use the built-in non-root 'node' user for security
USER node

EXPOSE 4000

# Health check using busybox wget to verify SSR server responsiveness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:4000/ || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/front/server/server.mjs"]
