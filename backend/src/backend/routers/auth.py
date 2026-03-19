from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/otp/request", status_code=501)
async def request_otp():
    """Request a one-time password. Implementation in SCRUM-35."""
    return JSONResponse(status_code=501, content={"message": "not implemented"})


@router.post("/otp/verify", status_code=501)
async def verify_otp():
    """Verify OTP and create session. Implementation in SCRUM-35."""
    return JSONResponse(status_code=501, content={"message": "not implemented"})
