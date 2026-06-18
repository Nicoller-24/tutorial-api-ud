# Evidencias de funcionamiento

Capturas de pantalla de Swagger UI para la entrega OATI.

## Capturas requeridas

| Archivo | Contenido |
|---------|-----------|
| `01-post-tutorial.png` | `POST /api/v1/tutorials` con respuesta 201 |
| `02-list-tutorials.png` | `GET /api/v1/tutorials` con lista de resultados |
| `03-detail-crud.png` | `DELETE /api/v1/tutorials/{id}/detail` (204) y `POST /api/v1/tutorials/{id}/detail` (201) |

## Body de ejemplo (POST tutorial)

`created_on` lo genera la API; solo envía `created_by` en el detalle:

```json
{
  "title": "Introducción a FastAPI",
  "description": "Tutorial básico de APIs REST",
  "published": true,
  "detail": {
    "created_by": "profesor.garcia@udistrital.edu.co"
  }
}
```

## Body de ejemplo (POST detalle, tras DELETE)

```json
{
  "created_by": "nuevo.autor@udistrital.edu.co"
}
```

## Cómo generarlas

1. `alembic upgrade head`
2. `uvicorn app.main:app --reload`
3. Abrir http://localhost:8000/docs
4. Ejecutar los endpoints y capturar pantalla
