from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Tutorial(Base):
    __tablename__ = "tutorials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    detail: Mapped["TutorialDetail | None"] = relationship(
        "TutorialDetail",
        back_populates="tutorial",
        uselist=False,
        cascade="all, delete-orphan",
    )
