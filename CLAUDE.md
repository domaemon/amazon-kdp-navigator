# CLAUDE.md

## Project Overview

Amazon KDP Navigator — a publishing-as-a-service platform enabling Japanese senior writers to publish paperback books through Amazon KDP via a proxy publisher agent.

## Development Guidelines

- **Package manager**: Always use `uv` for Python dependency management (not pip, poetry, or conda)
  - Use `uv run` to execute scripts
  - Use `uv add` to add dependencies
  - Use `uv run --with <pkg>` for one-off tool usage
- **Python version**: 3.12+ (backend currently uses 3.13)
- **Frontend**: React + Vite with TypeScript
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Language**: UI text must be in Japanese for senior-facing pages; agent panel may use English internally
