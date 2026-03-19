import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class OTPCode(Base):
    __tablename__ = "otp_codes"

    senior_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("seniors.id"), nullable=False
    )
    code: Mapped[str] = mapped_column(String, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    is_used: Mapped[bool] = mapped_column(Boolean, default=False)
