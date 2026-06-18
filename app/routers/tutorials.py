from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.tutorial import (
    TutorialCreate,
    TutorialListResponse,
    TutorialResponse,
    TutorialUpdate,
)
from app.schemas.tutorial_detail import (
    TutorialDetailCreate,
    TutorialDetailResponse,
    TutorialDetailUpdate,
)
from app.services.tutorial_service import TutorialService

router = APIRouter(prefix="/tutorials", tags=["Tutorials"])


def get_service(db: Session = Depends(get_db)) -> TutorialService:
    return TutorialService(db)


@router.get("", response_model=list[TutorialListResponse])
def list_tutorials(
    published: bool | None = Query(default=None, description="Filtrar por estado publicado"),
    service: TutorialService = Depends(get_service),
):
    return service.list_tutorials(published=published)


@router.post("", response_model=TutorialResponse, status_code=status.HTTP_201_CREATED)
def create_tutorial(data: TutorialCreate, service: TutorialService = Depends(get_service)):
    return service.create_tutorial(data)


@router.get("/{tutorial_id}", response_model=TutorialResponse)
def get_tutorial(tutorial_id: int, service: TutorialService = Depends(get_service)):
    return service.get_tutorial(tutorial_id)


@router.put("/{tutorial_id}", response_model=TutorialResponse)
def update_tutorial(
    tutorial_id: int,
    data: TutorialUpdate,
    service: TutorialService = Depends(get_service),
):
    return service.update_tutorial(tutorial_id, data)


@router.delete("/{tutorial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tutorial(tutorial_id: int, service: TutorialService = Depends(get_service)):
    service.delete_tutorial(tutorial_id)


@router.post(
    "/{tutorial_id}/detail",
    response_model=TutorialDetailResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_tutorial_detail(
    tutorial_id: int,
    data: TutorialDetailCreate,
    service: TutorialService = Depends(get_service),
):
    return service.create_detail(tutorial_id, data)


@router.get("/{tutorial_id}/detail", response_model=TutorialDetailResponse)
def get_tutorial_detail(tutorial_id: int, service: TutorialService = Depends(get_service)):
    return service.get_detail(tutorial_id)


@router.put("/{tutorial_id}/detail", response_model=TutorialDetailResponse)
def update_tutorial_detail(
    tutorial_id: int,
    data: TutorialDetailUpdate,
    service: TutorialService = Depends(get_service),
):
    return service.update_detail(tutorial_id, data)


@router.delete("/{tutorial_id}/detail", status_code=status.HTTP_204_NO_CONTENT)
def delete_tutorial_detail(tutorial_id: int, service: TutorialService = Depends(get_service)):
    service.delete_detail(tutorial_id)
