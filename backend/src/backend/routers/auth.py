from fastapi import APIRouter

router = APIRouter()


@router.post("/otp/request")
async def request_otp():
    """Request a one-time password. Implementation in SCRUM-35."""
    return {"message": "not implemented"}


@router.post("/otp/verify")
async def verify_otp():
    """Verify OTP and create session. Implementation in SCRUM-35."""
    return {"message": "not implemented"}
