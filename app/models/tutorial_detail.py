from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class TutorialDetail(Base):
    __tablename__ = "tutorial_details"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_on: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    created_by: Mapped[str] = mapped_column(String(255), nullable=False)
    tutorial_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("tutorials.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    tutorial: Mapped["Tutorial"] = relationship("Tutorial", back_populates="detail")
