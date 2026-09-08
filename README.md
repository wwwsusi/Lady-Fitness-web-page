# Lady Fitness Humenné

Slovak website for Lady Fitness with current services, a kindergarten Zumba offer, planned programs, one educational seminar, authentic supplied photographs, and a visitor SMS drafting form.

Routes:
- `/`: customer website
- `/navrhy`: three visual directions for the owner to compare

Reservation requests are drafted locally. The visitor opens their SMS app or copies the draft; no message is sent by the website and no reservation is automatically confirmed. No database or email delivery is configured.

The private draft has indexing disabled. Before public launch, confirm fitness prices and hours, staff details, operating entity information and the final visual direction. The kindergarten offer is based on the supplied website brief: 45 minutes, weekly, maximum 25 children, €50 per kindergarten lesson.

Scripts: `pnpm dev`, `pnpm build`. Framework: Vinext with Sites hosting.

Validation: TypeScript and production build; successful local HTTP rendering. No broad browser interaction or visual QA requested. The optional WebMCP tool `prepare_visit_sms` is feature-detected; runtime verification was unavailable because the browser did not expose WebMCP tools for the document.
