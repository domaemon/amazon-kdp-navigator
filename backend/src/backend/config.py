from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Amazon KDP Navigator"
    debug: bool = False
    database_url: str
    secret_key: str
    cors_origins: list[str] = ["http://localhost:5173"]
    otp_expiry_minutes: int = 10

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
