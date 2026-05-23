# Makefile for 2026 Album Track Frontend

# --- Variables ---
REPLICAS ?= 3

# --- Help ---
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Local Development:"
	@echo "  dev           - Start Angular development server (pnpm start)"
	@echo ""
	@echo "Production Environments (Scalable & Load Balanced):"
	@echo "  prod-ssr      - Start SSR production environment (Nginx LB + 3 Replicas)"
	@echo "  prod-ssg      - Start SSG production environment (Nginx LB + 3 Replicas)"
	@echo ""
	@echo "Management:"
	@echo "  stop          - Stop all running docker compose environments"
	@echo "  clean         - Stop and remove all containers and images"
	@echo "  logs-ssr      - View logs for SSR environment"
	@echo "  logs-ssg      - View logs for SSG environment"

# --- Development ---
.PHONY: dev
dev:
	pnpm start

# --- Production SSR ---
.PHONY: prod-ssr
prod-ssr:
	docker compose -f deploy/compose/ssr/docker-compose.yml up --build --detach --scale app=$(REPLICAS)
	@echo "SSR Production environment started at http://localhost:8080"

.PHONY: logs-ssr
logs-ssr:
	docker compose -f deploy/compose/ssr/docker-compose.yml logs -f

# --- Production SSG ---
.PHONY: prod-ssg
prod-ssg:
	docker compose -f deploy/compose/ssg/docker-compose.yml up --build --detach --scale app=$(REPLICAS)
	@echo "SSG Production environment started at http://localhost:8080"

.PHONY: logs-ssg
logs-ssg:
	docker compose -f deploy/compose/ssg/docker-compose.yml logs -f

# --- Kubernetes ---
.PHONY: k8s-apply-ssr
k8s-apply-ssr:
	kubectl apply -f deploy/k8s/ssr/

.PHONY: k8s-delete-ssr
k8s-delete-ssr:
	kubectl delete -f deploy/k8s/ssr/

.PHONY: k8s-apply-ssg
k8s-apply-ssg:
	kubectl apply -f deploy/k8s/ssg/

.PHONY: k8s-delete-ssg
k8s-delete-ssg:
	kubectl delete -f deploy/k8s/ssg/


# --- Global Commands ---

.PHONY: stop
stop:
	docker compose -f deploy/compose/ssr/docker-compose.yml stop
	docker compose -f deploy/compose/ssg/docker-compose.yml stop

.PHONY: clean
clean:
	docker compose -f deploy/compose/ssr/docker-compose.yml down --rmi all
	docker compose -f deploy/compose/ssg/docker-compose.yml down --rmi all
