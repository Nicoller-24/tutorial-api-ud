# Evidencias de funcionamiento

Agregar capturas de pantalla de Swagger UI antes de la entrega OATI.

## Capturas recomendadas

| Archivo | Contenido |
|---------|-----------|
| `01-post-tutorial.png` | `POST /api/v1/tutorials` con respuesta 201 |
| `02-list-tutorials.png` | `GET /api/v1/tutorials` con lista de resultados |
| `03-detail-crud.png` | `DELETE /api/v1/tutorials/{id}/detail` (204) y `POST /api/v1/tutorials/{id}/detail` (201) |

## Cómo generarlas

1. `alembic upgrade head`
2. `uvicorn app.main:app --reload`
3. Abrir http://localhost:8000/docs
4. Ejecutar los endpoints y capturar pantalla
