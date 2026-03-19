# Amazon KDP Navigator

A publishing-as-a-service platform that enables Japanese senior writers to publish paperback books through Amazon KDP, mediated by a proxy publisher agent.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Clients                                    │
│                                                                     │
│  ┌──────────────────────┐          ┌──────────────────────────┐     │
│  │  Senior Landing Page │          │   Agent Review Panel     │     │
│  │  (React + Vite)      │          │   (React + Vite)         │     │
│  │                      │          │                          │     │
│  │  - OTP login         │          │  - Email + password + 2FA│     │
│  │  - Onboarding form   │          │  - Manuscript checklist  │     │
│  │  - Google Doc viewer  │          │  - Metadata review      │     │
│  │  - Status tracker    │          │  - Cover PDF preview    │     │
│  │  - 「完成しました」 btn│          │  - Pipeline trigger      │     │
│  └──────────┬───────────┘          └────────────┬─────────────┘     │
└─────────────┼──────────────────────────────────┼────────────────────┘
              │              HTTPS               │
              └──────────────┬───────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Backend API (FastAPI)                           │
│                                                                     │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│  │ Auth Module  │ │ Onboarding   │ │ Manuscript   │ │ Agent      │  │
│  │             │ │ Module       │ │ Module       │ │ Module     │  │
│  │ - OTP gen   │ │ - Form CRUD  │ │ - Doc mgmt   │ │ - Review   │  │
│  │ - OTP verify│ │ - Validation │ │ - Status     │ │ - Approve  │  │
│  │ - Sessions  │ │              │ │ - Feedback   │ │ - Reject   │  │
│  │ - Agent 2FA │ │              │ │              │ │            │  │
│  └─────────────┘ └──────────────┘ └──────────────┘ └────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │               KDP Pipeline (async worker)                    │    │
│  │                                                             │    │
│  │  Google Docs API ──► DOCX ──► LibreOffice ──► ODT ──► PDF  │    │
│  │       │                        (headless)       (A5 content)│    │
│  │       │                                              │      │    │
│  │       │         ┌────────────────────────────────────┘      │    │
│  │       │         ▼                                           │    │
│  │       │    Page count ──► Spine width calc ──► Cover PDF    │    │
│  │       │                   (KDP formula)       (ReportLab)   │    │
│  │       │                                       [front+spine  │    │
│  │       │                                        +back cover] │    │
│  │       │                                                     │    │
│  │       └──► Claude API ──► Metadata + back cover summary     │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
              ┌────────────┼────────────────┐
              ▼            ▼                ▼
     ┌──────────────┐ ┌─────────┐  ┌──────────────┐
     │  PostgreSQL   │ │ SendGrid│  │ File Storage │
     │              │ │         │  │              │
     │ - Writers    │ │ - OTP   │  │ - Content PDF│
     │ - Manuscripts│ │   email │  │ - Cover PDFs │
     │ - Covers     │ │ - Notif.│  │ - DOCX cache │
     │ - Status log │ │         │  │              │
     │ - Audit trail│ │         │  │              │
     └──────────────┘ └─────────┘  └──────────────┘
```

## Component Breakdown

### Frontend — Senior Landing Page

A minimal, large-font Japanese UI optimized for seniors with basic PC skills.

| Route | Purpose |
|---|---|
| `/` | Email input → OTP request |
| `/verify` | 4-digit OTP entry |
| `/onboarding` | Basic info form (name, pen name, title, description, email, consent) |
| `/write` | Authenticated view embedding Google Doc + 「完成しました」button |
| `/status` | Visual step-by-step progress tracker for the senior's manuscript |

**Key constraints:**
- No Google login required (Docs shared via "anyone with link can edit")
- Desktop shortcut (`kdp-navigator.jp/write`) is the primary entry point
- OTP expires after 10 minutes; 4-digit code via email only (V1)

### Frontend — Agent Review Panel

A standard web app for the proxy publisher agent (email + password + 2FA).

| Route | Purpose |
|---|---|
| `/agent/dashboard` | List of all writers and manuscript statuses |
| `/agent/review/:id` | Structured QA checklist for a specific manuscript |
| `/agent/metadata/:id` | Review/edit Claude-generated KDP metadata |
| `/agent/cover/:id` | Cover PDF preview + approve/regenerate |
| `/agent/pipeline/:id` | Content PDF + cover PDF preview, one-click KDP pipeline trigger |

### Backend API (FastAPI)

| Module | Responsibilities |
|---|---|
| **auth** | OTP generation/verification (seniors), email+password+2FA (agent), session management |
| **onboarding** | Senior registration form CRUD, validation, agent confirmation gate |
| **manuscript** | Google Doc creation via service account, status tracking (draft → submitted → in-review → approved → published), feedback loop |
| **pipeline** | DOCX download from Google Docs → LibreOffice conversion → A5 content PDF generation |
| **cover** | Page count extraction, spine width calculation, three-panel cover PDF generation (ReportLab) |
| **metadata** | Claude API integration for book description, 7 keywords, 2 BISAC categories, back cover summary |
| **status** | Senior-facing status mapping (internal → Japanese labels), status page API |
| **notification** | SendGrid integration for OTP delivery and status transition notifications |

### KDP Content Pipeline (async)

```
1. Download DOCX from Google Docs API
2. Convert DOCX → ODT via LibreOffice (headless)
3. Apply KDP formatting:
   - Paper: A5 (148mm × 210mm)
   - Font: 11pt
   - Layout: Mirror
   - Margins: L 1cm, R 1cm, Gutter 0.5cm
4. Export ODT → content PDF
5. Generate metadata via Claude API (claude-sonnet-4-20250514)
6. Trigger cover generation pipeline (see below)
7. Store content PDF + cover PDF + metadata for agent review
```

### Cover Generation Pipeline

The cover is a single full-bleed PDF containing three panels — back cover, spine, front cover — assembled left to right. It is generated **after** the content PDF is finalised because spine width depends on the exact page count.

#### Cover Layout

```
┌─────────────────┬────────┬─────────────────┐
│                 │        │                 │
│   Back Cover    │ Spine  │  Front Cover    │
│                 │        │                 │
│  Claude-gen     │ Title  │  Title          │
│  summary        │ Author │  Subtitle (opt) │
│  (plain text)   │        │  Author name    │
│                 │        │                 │
└─────────────────┴────────┴─────────────────┘
       ◄── 3mm bleed on all outside edges ──►
```

#### Dimension Calculation

| Variable | Formula | Example (100 pages, white paper) |
|---|---|---|
| Spine width (white) | `0.0572mm × page_count` | 5.72mm |
| Spine width (cream) | `0.0635mm × page_count` | 6.35mm |
| Total cover width | `(148mm × 2) + spine + (3mm bleed × 2)` | 307.72mm |
| Total cover height | `210mm + (3mm bleed × 2)` | 216mm |
| Safe text zone | Inset 6mm from all panel edges | No text within 6mm of cut edge |

#### Pipeline Steps

```
1. Read page count from finalised content PDF (PyPDF2/pdfplumber)
2. Calculate spine width: paper_factor × page_count
   - White paper: 0.0572mm/page
   - Cream paper: 0.0635mm/page
3. Calculate total cover dimensions (width × height) including 3mm bleed
4. Retrieve cover content:
   - Title, subtitle, author name → from onboarding data
   - Back cover summary → from Claude API (reuses metadata generation call)
5. Render three-panel cover PDF at exact dimensions (ReportLab)
6. Agent reviews cover PDF → approve or request regeneration
7. Both content PDF and cover PDF submitted to KDP
```

#### Spine Width Edge Case

| Condition | Behavior |
|---|---|
| Spine ≥ 6.35mm | Render title + author name on spine |
| Spine < 6.35mm | Blank spine (solid background only); agent notified: 「本文ページ数が少ないため、背表紙のテキストは省略されました。」 |

#### Implementation Technology

| Task | Tool | Notes |
|---|---|---|
| Page count extraction | PyPDF2 or pdfplumber | Read from completed content PDF — never estimate from word count |
| Cover PDF rendering | ReportLab | Full control over dimensions, text placement, bleed |
| Back cover summary | Claude API | Reuses manuscript summary from metadata generation |
| Japanese font rendering | Noto Sans JP (embedded) | Required for correct Japanese text in ReportLab |

#### Cover Version Roadmap

| Version | Capability |
|---|---|
| V1 | Automated typographic cover — solid background, title/author on front, spine text (if wide enough), Claude-generated summary on back. Agent can approve or regenerate. |
| V2 | Template-based cover designer — agent selects from colour schemes / layout variations with in-panel preview. |
| V3 | AI-assisted cover image generation based on manuscript themes. |

### Senior Status Tracking

The senior needs clear visibility into where their book is in the publishing process. The `/status` page shows a simplified, plain-Japanese progress view — not the internal system states.

#### Status Flow (Senior-Facing)

```
 ① 執筆中        ② 提出済み      ③ 確認中        ④ 出版準備中     ⑤ Amazon審査中   ⑥ 出版完了
 (Writing)      (Submitted)    (Reviewing)    (Preparing)     (Amazon Review)  (Published)
 ●───────────────●───────────────●───────────────●───────────────●───────────────●
                                 │
                                 └──→ 修正依頼 (Revision Requested) → back to ①
```

#### Internal → Senior Status Mapping

| Internal Status | Senior-Facing Label | Senior-Facing Description |
|---|---|---|
| `writing` | 執筆中 | 「原稿を執筆中です」 |
| `submitted` | 提出済み | 「原稿が提出されました。担当者が確認します」 |
| `in_review` | 確認中 | 「担当者が原稿を確認しています」 |
| `revision` | 修正依頼 | 「担当者からのメッセージがあります。ご確認ください」 |
| `approved` / `content_pdf_ready` / `cover_generated` / `agent_final_review` | 出版準備中 | 「出版の準備を進めています」 |
| `kdp_submitted` | Amazon審査中 | 「Amazonで審査中です。しばらくお待ちください」 |
| `published` | 出版完了 | 「おめでとうございます！本が出版されました」 |

The senior sees 6 steps (7 including revision). Multiple internal states (e.g. the entire PDF/cover pipeline) are collapsed into a single "出版準備中" step — the senior doesn't need to know about PDF conversion or spine width calculations.

#### Email Notifications on Transitions

| Transition | Email sent? | Content |
|---|---|---|
| → 提出済み | No | Senior just clicked the button, they know |
| → 確認中 | No | Immediate follow-on from submission |
| → 修正依頼 | Yes | Includes agent's plain-language feedback note |
| → 出版準備中 | Yes | 「原稿が承認されました。出版の準備を進めています」 |
| → Amazon審査中 | Yes | 「Amazonに提出しました。審査には数日かかる場合があります」 |
| → 出版完了 | Yes | 「おめでとうございます！あなたの本が出版されました」+ Amazon link |

#### UX Design Notes

- Large step indicator bar with the current step highlighted — legible at a glance
- Each step shows a one-line Japanese description (no jargon)
- The `/status` page is accessible from the same desktop shortcut after OTP login
- No polling required — the page loads current status on each visit; email notifications handle proactive updates

### Database Schema (PostgreSQL)

```
writers
├── id (UUID)
├── full_name
├── pen_name (nullable)
├── email
├── created_at
└── consented_at

manuscripts
├── id (UUID)
├── writer_id (FK → writers)
├── title
├── subtitle (nullable)
├── one_line_description
├── google_doc_id
├── google_doc_url
├── status (enum: onboarding | writing | submitted | in_review | revision | approved | content_pdf_ready | cover_generated | agent_final_review | kdp_submitted | published)
├── page_count (nullable, set after content PDF generation)
├── created_at
└── updated_at

manuscript_metadata
├── id (UUID)
├── manuscript_id (FK → manuscripts)
├── book_description
├── back_cover_summary
├── keywords (text[7])
├── bisac_categories (text[2])
├── list_price (nullable)
└── generated_at

covers
├── id (UUID)
├── manuscript_id (FK → manuscripts)
├── page_count (int)
├── paper_type (enum: white | cream)
├── spine_width_mm (decimal)
├── total_width_mm (decimal)
├── total_height_mm (decimal)
├── spine_text_omitted (boolean)
├── pdf_path
├── status (enum: generated | approved | rejected)
├── created_at
└── approved_at (nullable)

agent_reviews
├── id (UUID)
├── manuscript_id (FK → manuscripts)
├── checklist_json
├── feedback_note (nullable)
├── decision (enum: approved | revision_requested)
├── reviewed_at
└── agent_id

otp_codes
├── id (UUID)
├── email
├── code (char[4])
├── expires_at
├── used (boolean)
└── created_at

audit_log
├── id (UUID)
├── actor (agent | system | senior)
├── action
├── entity_type
├── entity_id
├── detail_json
└── created_at
```

### Manuscript State Machine

```
                                                    ┌─── Pipeline ───────────────────────────────────┐
                                                    │                                                │
onboarding → writing → submitted → in_review ──→ approved → content_pdf_ready → cover_generated      │
                ▲                      │            │                                    │            │
                │                      │            └────────────────────────────────────┘            │
                └──── revision ◄───────┘                                                             │
                                                    agent_final_review → kdp_submitted → published   │
                                                    │                                                │
                                                    └────────────────────────────────────────────────┘
```

**Senior sees:** writing → submitted → in_review → 出版準備中 (covers approved through agent_final_review) → kdp_submitted → published

### Error Tracking (Sentry)

Sentry is integrated into both frontend and backend to catch errors that would otherwise go unnoticed — especially in async pipeline steps where no user is watching.

#### Integration Points

| Layer | SDK | What it captures |
|---|---|---|
| Backend (FastAPI) | `sentry-sdk[fastapi]` | Unhandled exceptions, failed async tasks, slow transactions |
| Frontend (Senior) | `@sentry/react` | JS errors, failed API calls, rendering crashes |
| Frontend (Agent) | `@sentry/react` | Same as above, scoped to agent panel |
| Celery workers | `sentry-sdk[celery]` | Pipeline task failures, retries, timeouts |

#### Key Monitored Areas

| Area | Why Sentry matters |
|---|---|
| PDF conversion (LibreOffice) | Headless LibreOffice is prone to crashes on malformed DOCX input — these fail silently in async workers |
| Cover generation (ReportLab) | Dimension miscalculations, font rendering failures, bleed errors |
| Claude API calls | Timeouts, rate limits, malformed responses during metadata/summary generation |
| OTP delivery (SendGrid) | Failed email sends leave seniors locked out with no way to report the issue |
| Senior frontend | Seniors won't report errors — Sentry captures JS crashes, failed loads, and broken states automatically |
| Status transitions | Unexpected state transitions or stuck manuscripts in the pipeline |

#### Sentry Configuration

- **Environment tags:** `production`, `staging`
- **Release tracking:** tied to git SHA for deploy-level tracing
- **Alerts:** notify agent via email/Slack when pipeline errors occur
- **PII scrubbing:** enabled — senior email addresses and names must not appear in Sentry events
- **Free tier:** sufficient for V1 volume

## External Services

| Service | Purpose | Auth |
|---|---|---|
| Google Docs API | Manuscript creation & management | Service account |
| SendGrid | Email OTP + notifications | API key |
| Claude API | KDP metadata generation + back cover summary | API key |
| Sentry | Error tracking + performance monitoring | DSN |
| LibreOffice | DOCX → content PDF conversion | Local (headless) |

## Project Structure

```
amazon-kdp-navigator/
├── frontend/                  # React + Vite + TypeScript
│   ├── src/
│   │   ├── senior/            # Senior-facing pages
│   │   ├── agent/             # Agent review panel
│   │   ├── components/        # Shared UI components
│   │   └── api/               # API client
│   └── package.json
├── backend/                   # FastAPI
│   ├── app/
│   │   ├── api/               # Route handlers
│   │   │   ├── auth.py
│   │   │   ├── onboarding.py
│   │   │   ├── manuscript.py
│   │   │   ├── pipeline.py
│   │   │   ├── cover.py
│   │   │   ├── status.py
│   │   │   └── metadata.py
│   │   ├── models/            # SQLAlchemy models
│   │   ├── services/          # Business logic
│   │   │   ├── otp.py
│   │   │   ├── google_docs.py
│   │   │   ├── pdf_converter.py
│   │   │   ├── cover_generator.py
│   │   │   ├── claude_metadata.py
│   │   │   └── notification.py
│   │   ├── core/              # Config, security, DB
│   │   └── main.py
│   ├── fonts/                 # Noto Sans JP (embedded for cover generation)
│   └── pyproject.toml         # Managed with uv
├── CLAUDE.md
└── README.md
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, TypeScript |
| Backend | Python 3.12+, FastAPI, SQLAlchemy |
| Database | PostgreSQL |
| Task queue | Celery + Redis (for async pipeline) |
| Content PDF conversion | LibreOffice (headless mode) |
| Cover PDF generation | ReportLab + PyPDF2/pdfplumber |
| Error tracking | Sentry (`sentry-sdk[fastapi,celery]`, `@sentry/react`) |
| AI | Claude API (`claude-sonnet-4-20250514`) |
| Email | SendGrid |
| Package management | `uv` (Python), `npm` (frontend) |
| Deployment | Docker Compose (V1) |

## V1 Scope

**In scope:** Senior OTP auth, onboarding form, Google Doc creation, manuscript status tracking, senior-facing status page with Japanese progress labels and email notifications on key transitions, content PDF conversion pipeline, automated cover generation (typographic, three-panel, dimension-calculated from page count), Claude metadata generation (including back cover summary), agent review panel with cover preview, `kdp_submitted` state for Amazon review tracking.

**Out of scope:** Custom editor, automated KDP API submission, royalty tracking, digital bank account collection, cover template selection UI (V2), AI-assisted cover images (V3), audio/handwriting input, LINE integration.
