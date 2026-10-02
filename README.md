# Lady Fitness Humenné

Slovak website implementation for Lady Fitness. Website copy reflects the recorded implementation and must be checked against current authorized Google Drive requirements before publication.

## Governance

Read [repository instructions](AGENTS.md) and [website governance](docs/00_WEBSITE_GOVERNANCE.md). Google Drive is business truth; this repository is implementation truth. README descriptions and old website briefs are technical/history references, not a current catalogue or price list.

Routes:
- `/`: customer website
- `/navrhy`: three visual directions for the owner to compare

Reservation requests are drafted locally. The visitor opens their SMS app or copies the draft; no message is sent by the website and no reservation is automatically confirmed. No database or email delivery is configured.

The private draft has indexing disabled. Before public launch, confirm fitness prices and hours, staff details, operating entity information and the final visual direction. The earlier kindergarten brief is superseded for business truth. Use the primary-school/school requirement and the current programs master; operational details and prices must be verified there. This documentation change does not correct application copy.

Scripts: `pnpm dev`, `pnpm build`. Framework: Vinext with Sites hosting.

Validation: TypeScript and production build; successful local HTTP rendering. No broad browser interaction or visual QA requested. The optional WebMCP tool `prepare_visit_sms` is feature-detected; runtime verification was unavailable because the browser did not expose WebMCP tools for the document.

## Illustrated scroll introduction

The intro now has three imagegen style-transfer scenes based on the supplied gym, training, and community photographs. Scroll position drives a sticky scene with held reading intervals and eased crossfades. Decorative zoom is disabled on narrow screens. The motion switch and the operating-system reduced-motion preference show the scenes as static sections. A skip link and chapter navigation preserve direct access to the offer.

Validation: TypeScript, production build, HTTP 200, and numerical tests for scene stops, clamping, hold intervals and normalized two-scene blending. Broad browser visual/interaction QA was not requested.
