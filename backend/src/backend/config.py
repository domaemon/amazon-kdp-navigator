from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Amazon KDP Navigator"
    debug: bool = False
    database_url: str = "postgresql+asyncpg://localhost:5432/kdp_navigator"
    secret_key: str = "change-me-in-production"
    otp_expiry_minutes: int = 10

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
