from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class Agent(Base):
    __tablename__ = "agents"

    email: Mapped[str] = mapped_column(String, unique=True)
    password_hash: Mapped[str] = mapped_column(String)
    totp_secret: Mapped[str | None] = mapped_column(String)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
