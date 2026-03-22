from pydantic import BaseModel, EmailStr


class AgentLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AgentTOTPVerifyRequest(BaseModel):
    token: str
    totp_code: str


class AgentTOTPSetupResponse(BaseModel):
    totp_uri: str
    secret: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    requires_2fa: bool = False
    temp_token: str | None = None
