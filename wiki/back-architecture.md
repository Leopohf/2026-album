# Backend Architecture

*Nota: Esta página se encuentra en fase inicial de diseño.*

## Propuesta Tecnológica
- **Lenguaje**: Go (Golang)
- **Base de Datos**: PostgreSQL (Relacional)
- **Cloud**: AWS (Lambda/API Gateway)

## Componentes Principales
1. **API Gateway**: Punto de entrada para el frontend.
2. **Lambda Functions**: Lógica de negocio serverless.
3. **RDS/PostgreSQL**: Almacenamiento persistente de usuarios y colecciones.

## Integración con el Sistema
El backend proporcionará los endpoints necesarios para que el frontend de Angular sincronice los álbumes de los usuarios, permitiendo que la persistencia vaya más allá del `localStorage`.
