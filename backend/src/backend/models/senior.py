from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class Senior(Base):
    __tablename__ = "seniors"

    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True)
    pen_name: Mapped[str] = mapped_column(String)
    phone: Mapped[str | None] = mapped_column(String)
    preferred_genre: Mapped[str | None] = mapped_column(String)
