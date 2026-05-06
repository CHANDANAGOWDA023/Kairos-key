from typing import Any

from pydantic import BaseModel, Field


class AIRequest(BaseModel):
    text: str | None = ""
    draft: str | None = ""
    memory: str | None = ""
    university: str | None = ""
    universities: list[str] = Field(default_factory=list)
    essays: dict[str, str] = Field(default_factory=dict)
    sections: dict[str, str] = Field(default_factory=dict)
    timeline: list[dict[str, Any]] = Field(default_factory=list)
    samples: dict[str, str] = Field(default_factory=dict)
    metadata: dict[str, Any] = Field(default_factory=dict)
