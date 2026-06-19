from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict, Field, field_serializer

MAX_VARCHAR = 255


class TutorialDetailCreate(BaseModel):
    created_by: str = Field(min_length=1, max_length=MAX_VARCHAR)


class TutorialDetailUpdate(BaseModel):
    created_by: str | None = Field(default=None, min_length=1, max_length=MAX_VARCHAR)


class TutorialDetailResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    tutorial_id: int
    created_on: datetime
    created_by: str

    @field_serializer("created_on")
    def serialize_created_on(self, value: datetime) -> datetime:
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value
