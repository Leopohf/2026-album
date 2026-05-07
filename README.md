# 2026-album-track Knowledge Base

Este es el repositorio central de conocimiento para el proyecto **2026-album-track**, un rastreador de álbumes de stickers moderno.

## Estructura del Proyecto

Siguiendo el patrón **LLM Wiki**, este repositorio está organizado en tres capas:

- **`AGENTS.md`**: Define el rol del agente (Senior Software Engineer) y las reglas de interacción con este repositorio.
- **`raw/`**: Contiene documentos de origen inmutables, especificaciones y datos base.
- **`wiki/`**: Contiene la síntesis del conocimiento, documentación técnica y registros del proyecto.
  - [Wiki Index](wiki/index.md) - Punto de partida para la documentación técnica.
  - [Log](wiki/log.md) - Registro cronológico de operaciones y cambios.

## El Ecosistema

Este repositorio de conocimiento integra el código fuente de los proyectos en la carpeta `raw/`.

### Fuentes (raw/)
- **[Frontend](raw/front_source/)**: Aplicación Angular 21 (Git Submodule).
- **[Backend](raw/back_source/)**: Servidor Go (Local).

### Frontend (Angular)
El frontend es una aplicación web de alto rendimiento construida con:
- **Angular 21** & **Signals** para un estado reactivo eficiente.
- **Tailwind CSS 4.0** para un diseño moderno y fluido.
- **SSR (Server-Side Rendering)** para optimización de carga y SEO.

### Backend (Go)
El backend se basa en:
- **Go** con arquitectura limpia/hexagonal.
- **PostgreSQL** y servicios de **AWS**.

## Objetivos del Proyecto
1.  **Persistencia Eficiente**: Gestión del álbum localmente con sincronización ligera.
2.  **Experiencia de Usuario**: Interfaz intuitiva para marcar stickers faltantes y repetidos.
3.  **Conocimiento Compuesto**: Mantener esta "Wiki" actualizada para facilitar el desarrollo continuo y la toma de decisiones arquitectónicas.
