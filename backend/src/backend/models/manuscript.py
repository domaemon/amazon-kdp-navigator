import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class Manuscript(Base):
    __tablename__ = "manuscripts"

    senior_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("seniors.id"), nullable=False
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    google_doc_url: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String, default="draft")
