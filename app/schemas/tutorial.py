from pydantic import BaseModel, ConfigDict, Field

from app.schemas.tutorial_detail import (
    TutorialDetailCreate,
    TutorialDetailResponse,
    TutorialDetailUpdate,
)


class TutorialBase(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)
    published: bool = False


class TutorialCreate(TutorialBase):
    detail: TutorialDetailCreate


class TutorialUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    description: str | None = Field(default=None, min_length=1)
    published: bool | None = None


class TutorialResponse(TutorialBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    detail: TutorialDetailResponse | None = None


class TutorialListResponse(TutorialBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
