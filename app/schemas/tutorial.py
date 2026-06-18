from pydantic import BaseModel, ConfigDict, Field

from app.schemas.tutorial_detail import (
    MAX_VARCHAR,
    TutorialDetailCreate,
    TutorialDetailResponse,
    TutorialDetailUpdate,
)

__all__ = [
    "MAX_VARCHAR",
    "TutorialCreate",
    "TutorialListResponse",
    "TutorialResponse",
    "TutorialUpdate",
]


class TutorialBase(BaseModel):
    title: str = Field(min_length=1, max_length=MAX_VARCHAR)
    description: str = Field(min_length=1, max_length=MAX_VARCHAR)
    published: bool = False


class TutorialCreate(TutorialBase):
    detail: TutorialDetailCreate


class TutorialUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=MAX_VARCHAR)
    description: str | None = Field(default=None, min_length=1, max_length=MAX_VARCHAR)
    published: bool | None = None


class TutorialResponse(TutorialBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    detail: TutorialDetailResponse | None = None


class TutorialListResponse(TutorialBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
