from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.exceptions.custom import BusinessValidationError, ConflictError, NotFoundError
from app.models.tutorial import Tutorial
from app.models.tutorial_detail import TutorialDetail
from app.repositories.tutorial_repository import TutorialRepository
from app.schemas.tutorial import TutorialCreate, TutorialUpdate
from app.schemas.tutorial_detail import TutorialDetailCreate, TutorialDetailUpdate


def _utc_now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


class TutorialService:
    def __init__(self, db: Session):
        self.repository = TutorialRepository(db)

    def list_tutorials(self, published: bool | None = None) -> list[Tutorial]:
        return self.repository.list_tutorials(published=published)

    def get_tutorial(self, tutorial_id: int) -> Tutorial:
        tutorial = self.repository.get_tutorial(tutorial_id)
        if tutorial is None:
            raise NotFoundError(f"Tutorial con id {tutorial_id} no encontrado")
        return tutorial

    def create_tutorial(self, data: TutorialCreate) -> Tutorial:
        tutorial = Tutorial(
            title=data.title,
            description=data.description,
            published=data.published,
            detail=TutorialDetail(
                created_on=_utc_now(),
                created_by=data.detail.created_by,
            ),
        )
        return self.repository.create(tutorial)

    def update_tutorial(self, tutorial_id: int, data: TutorialUpdate) -> Tutorial:
        tutorial = self.get_tutorial(tutorial_id)

        update_data = data.model_dump(exclude_unset=True)
        if not update_data:
            raise BusinessValidationError("Debe enviar al menos un campo para actualizar")

        for field, value in update_data.items():
            setattr(tutorial, field, value)

        return self.repository.save(tutorial)

    def delete_tutorial(self, tutorial_id: int) -> None:
        tutorial = self.get_tutorial(tutorial_id)
        self.repository.delete(tutorial)

    def get_detail(self, tutorial_id: int) -> TutorialDetail:
        self.get_tutorial(tutorial_id)
        detail = self.repository.get_detail(tutorial_id)
        if detail is None:
            raise NotFoundError(f"Detalle del tutorial {tutorial_id} no encontrado")
        return detail

    def create_detail(self, tutorial_id: int, data: TutorialDetailCreate) -> TutorialDetail:
        tutorial = self.get_tutorial(tutorial_id)
        if tutorial.detail is not None:
            raise ConflictError("El tutorial ya tiene un detalle asociado")

        detail = TutorialDetail(
            tutorial_id=tutorial_id,
            created_on=_utc_now(),
            created_by=data.created_by,
        )
        return self.repository.create_detail(detail)

    def update_detail(self, tutorial_id: int, data: TutorialDetailUpdate) -> TutorialDetail:
        detail = self.get_detail(tutorial_id)

        update_data = data.model_dump(exclude_unset=True)
        if not update_data:
            raise BusinessValidationError("Debe enviar al menos un campo para actualizar")

        for field, value in update_data.items():
            setattr(detail, field, value)

        return self.repository.save(detail)

    def delete_detail(self, tutorial_id: int) -> None:
        detail = self.get_detail(tutorial_id)
        self.repository.delete_detail(detail)
