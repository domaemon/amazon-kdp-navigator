from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.schemas.agent_auth import (
    AgentLoginRequest,
    AgentTOTPSetupResponse,
    AgentTOTPVerifyRequest,
    TokenResponse,
)
from backend.services.agent_auth import (
    create_access_token,
    decode_token,
    generate_totp_secret,
    get_agent_by_email,
    get_agent_by_id,
    get_totp_uri,
    verify_password,
    verify_totp,
)

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def agent_login(req: AgentLoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate agent with email + password. Returns temp token if 2FA is enabled."""
    agent = await get_agent_by_email(db, req.email)
    if not agent or not verify_password(req.password, agent.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not agent.is_active:
        raise HTTPException(status_code=403, detail="Account is disabled")

    if agent.totp_secret:
        temp_token = create_access_token(agent.id, temp=True)
        return TokenResponse(
            access_token="",
            requires_2fa=True,
            temp_token=temp_token,
        )

    access_token = create_access_token(agent.id)
    return TokenResponse(access_token=access_token)


@router.post("/verify-2fa", response_model=TokenResponse)
async def verify_2fa(req: AgentTOTPVerifyRequest, db: AsyncSession = Depends(get_db)):
    """Verify TOTP code using temp token from login step."""
    try:
        payload = decode_token(req.token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if payload.get("type") != "temp":
        raise HTTPException(status_code=401, detail="Invalid token type")

    agent = await get_agent_by_id(db, UUID(payload["sub"]))
    if not agent or not agent.totp_secret:
        raise HTTPException(status_code=401, detail="Invalid agent")

    if not verify_totp(agent.totp_secret, req.totp_code):
        raise HTTPException(status_code=401, detail="Invalid 2FA code")

    access_token = create_access_token(agent.id)
    return TokenResponse(access_token=access_token)


@router.post("/setup-2fa", response_model=AgentTOTPSetupResponse)
async def setup_2fa(token: str, db: AsyncSession = Depends(get_db)):
    """Generate TOTP secret for an agent. Requires a valid access token."""
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")

    agent = await get_agent_by_id(db, UUID(payload["sub"]))
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    if agent.totp_secret:
        raise HTTPException(status_code=400, detail="2FA is already enabled")

    secret = generate_totp_secret()
    agent.totp_secret = secret
    await db.commit()

    return AgentTOTPSetupResponse(
        totp_uri=get_totp_uri(secret, agent.email),
        secret=secret,
    )
