from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.exceptions.custom import ConflictError
from app.models.tutorial import Tutorial
from app.models.tutorial_detail import TutorialDetail


class TutorialRepository:
    def __init__(self, db: Session):
        self.db = db

    def _commit(self) -> None:
        try:
            self.db.commit()
        except IntegrityError as exc:
            self.db.rollback()
            raise ConflictError("Conflicto con el estado actual del recurso") from exc
        except Exception:
            self.db.rollback()
            raise

    def list_tutorials(self, published: bool | None = None) -> list[Tutorial]:
        query = self.db.query(Tutorial)
        if published is not None:
            query = query.filter(Tutorial.published == published)
        return query.order_by(Tutorial.id).all()

    def get_tutorial(self, tutorial_id: int) -> Tutorial | None:
        return (
            self.db.query(Tutorial)
            .options(joinedload(Tutorial.detail))
            .filter(Tutorial.id == tutorial_id)
            .first()
        )

    def get_detail(self, tutorial_id: int) -> TutorialDetail | None:
        return (
            self.db.query(TutorialDetail)
            .filter(TutorialDetail.tutorial_id == tutorial_id)
            .first()
        )

    def create(self, tutorial: Tutorial) -> Tutorial:
        self.db.add(tutorial)
        self._commit()
        self.db.refresh(tutorial)
        return tutorial

    def create_detail(self, detail: TutorialDetail) -> TutorialDetail:
        self.db.add(detail)
        self._commit()
        self.db.refresh(detail)
        return detail

    def save(self, entity: Tutorial | TutorialDetail) -> Tutorial | TutorialDetail:
        self._commit()
        self.db.refresh(entity)
        return entity

    def delete(self, tutorial: Tutorial) -> None:
        self.db.delete(tutorial)
        self._commit()

    def delete_detail(self, detail: TutorialDetail) -> None:
        self.db.delete(detail)
        self._commit()
