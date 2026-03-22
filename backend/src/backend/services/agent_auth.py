from datetime import datetime, timedelta, timezone
from uuid import UUID

import bcrypt
import jwt
import pyotp
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config import settings
from backend.models.agent import Agent

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours
TEMP_TOKEN_EXPIRE_MINUTES = 5  # for 2FA step


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode(), password_hash.encode())


def create_access_token(agent_id: UUID, temp: bool = False) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=TEMP_TOKEN_EXPIRE_MINUTES if temp else ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {
        "sub": str(agent_id),
        "exp": expire,
        "type": "temp" if temp else "access",
    }
    return jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])


def generate_totp_secret() -> str:
    return pyotp.random_base32()


def get_totp_uri(secret: str, email: str) -> str:
    return pyotp.TOTP(secret).provisioning_uri(name=email, issuer_name="KDP Navigator")


def verify_totp(secret: str, code: str) -> bool:
    return pyotp.TOTP(secret).verify(code)


async def get_agent_by_email(db: AsyncSession, email: str) -> Agent | None:
    result = await db.execute(select(Agent).where(Agent.email == email))
    return result.scalar_one_or_none()


async def get_agent_by_id(db: AsyncSession, agent_id: UUID) -> Agent | None:
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    return result.scalar_one_or_none()
