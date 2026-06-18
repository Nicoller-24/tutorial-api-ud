from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.exceptions.custom import AppException
from app.exceptions.handlers import app_exception_handler, validation_exception_handler
from app.routers import tutorials


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


app = FastAPI(
    title="Tutorial API - OATI UD",
    description=(
        "API REST para gestión de tutoriales con detalle (Enunciado 4 - Prueba técnica OATI). "
        "Un tutorial tiene exactamente un detalle asociado (relación 1:1)."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(tutorials.router, prefix="/api/v1")


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Tutorial API funcionando correctamente"}
