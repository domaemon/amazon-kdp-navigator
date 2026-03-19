import enum
import uuid

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class ManuscriptStatus(str, enum.Enum):
    draft = "draft"
    pending_review = "pending_review"
    revision = "revision"
    approved = "approved"
    processing = "processing"
    ready = "ready"


class Manuscript(Base):
    __tablename__ = "manuscripts"

    senior_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("seniors.id"), index=True)
    title: Mapped[str] = mapped_column(String)
    google_doc_url: Mapped[str | None] = mapped_column(String)
    status: Mapped[ManuscriptStatus] = mapped_column(
        Enum(ManuscriptStatus), default=ManuscriptStatus.draft
    )
