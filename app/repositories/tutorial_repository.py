from sqlalchemy.orm import Session, joinedload

from app.models.tutorial import Tutorial
from app.models.tutorial_detail import TutorialDetail


class TutorialRepository:
    def __init__(self, db: Session):
        self.db = db

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
        try:
            self.db.add(tutorial)
            self.db.commit()
            self.db.refresh(tutorial)
            return tutorial
        except Exception:
            self.db.rollback()
            raise

    def create_detail(self, detail: TutorialDetail) -> TutorialDetail:
        try:
            self.db.add(detail)
            self.db.commit()
            self.db.refresh(detail)
            return detail
        except Exception:
            self.db.rollback()
            raise

    def save(self, entity) -> object:
        try:
            self.db.commit()
            self.db.refresh(entity)
            return entity
        except Exception:
            self.db.rollback()
            raise

    def delete(self, tutorial: Tutorial) -> None:
        try:
            self.db.delete(tutorial)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

    def delete_detail(self, detail: TutorialDetail) -> None:
        try:
            self.db.delete(detail)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise
