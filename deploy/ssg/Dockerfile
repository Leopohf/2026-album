# --- STAGE 1: Builder ---
FROM node:22-alpine AS builder

WORKDIR /app

# Enable 'pnpm' globally
RUN corepack enable pnpm

# Copy manifests and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build SSG
COPY . .
RUN pnpm build

# --- STAGE 2: Runner (Unprivileged / Non-root Nginx) ---
FROM nginxinc/nginx-unprivileged:alpine AS runner

# Copy custom nginx configuration
COPY deploy/ssg/default.conf /etc/nginx/conf.d/default.conf

# Copy static assets from builder
COPY --from=builder /app/dist/front/browser /usr/share/nginx/html

EXPOSE 8080

# Health check to ensure the container is running and healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
