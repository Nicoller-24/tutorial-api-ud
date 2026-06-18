from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TutorialDetailBase(BaseModel):
    created_on: datetime
    created_by: str = Field(min_length=1)


class TutorialDetailCreate(TutorialDetailBase):
    pass


class TutorialDetailUpdate(BaseModel):
    created_on: datetime | None = None
    created_by: str | None = Field(default=None, min_length=1)


class TutorialDetailResponse(TutorialDetailBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    tutorial_id: int
