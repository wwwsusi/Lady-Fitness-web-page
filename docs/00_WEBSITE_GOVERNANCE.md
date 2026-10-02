# Website governance and Drive synchronization

This repository is the implementation source of truth for the Lady Fitness website. Business knowledge and original assets remain on Google Drive. This technical document applies the project's approved governance; it does not replace it.

## System boundaries

- ChatGPT: decisions, analysis and orchestration. Chat is not permanent storage for approved decisions.
- Google Drive: business source of truth, website requirements, brand and original assets.
- GitHub: code, tests, technical documentation, branches and PRs.
- Codex Cloud: coding and implementation over GitHub according to recorded Drive requirements.

The highest project governance document is **03_PROJECT_INSTRUCTIONS.md** in Drive **00_START_HERE**. **90_MD_CREATION.md** is an archived historical/migration tool without governance authority. Number prefixes do not determine authority.

## Canonical source map

Use the authenticated Lady Fitness Drive project, not a duplicate KB in this public repository:

| Source | Responsibility |
|---|---|
| 03_PROJECT_INSTRUCTIONS.md | Highest project governance |
| 01_BRAND_STRATEGY.md | Positioning and brand strategy |
| 02_BUSINESS_MODEL.md | Business and operating model |
| 03_PROGRAMS_SERVICES.md | Catalogue, Product IDs, lifecycle, customer prices, commercial conditions and approved product claims |
| 04_SEMINARS.md | Seminar content and educational scope |
| 05_WEBSITE.md | Website requirements and landing flows |
| 06_MARKETING_BRAND_IDENTITY.md | Marketing, canonical logo, typography and visual/product-asset rules |
| 07_SOCIAL_MEDIA_PLAYBOOK.md | Operational social execution under the marketing master |
| 08_OWNER_VISUAL_PROFILE.md | Detailed owner identity under the marketing master |

Retain public-facing web copy and derived assets needed by the application, with source provenance. Do not upload private business masters, internal purchase costs/margins, property-investment records, original photo archives or credentials into this public repository. Property Maintenance is the only property scope in Lady Fitness; investment records belong to a separate project.

## Authority and content checks

A commit, newer technical file, website display or deployment never overwrites Drive business truth. Treat discrepancies as implementation differences. Changing a business fact requires an explicit decision recorded in its Drive master before implementation.

Customer pricing has only **Current Price** and **Last Historical Price** in the programs master. Unknown/unconfirmed current price is **TBD**: do not invent a price or publish the historical value as current. Purchase cost is an internal cost, not historical customer pricing. Read current authorized data for the task; do not maintain a second price list in documentation.

Preserve ACTIVE/PILOT/DEVELOPMENT/IDEA distinctions. Children's Zumba uses primary-school/school terminology under the recorded decision, not the old kindergarten brief. The seminar is one comprehensive product in DEVELOPMENT; website summary blocks do not redefine its scope or establish a launch date. Brand defaults are canonical logo and Oswald/Inter; verify asset rules in the marketing master. Approved/published creative is a reference, not a new global brand rule.

If a required source is unavailable, record the access gap. Continue independent technical work, but leave dependent business changes pending rather than infer missing facts from old README text or website copy.

## Workflow

**DECIDE → RECORD → IMPACT CHECK → IMPLEMENT → TEST → MERGE → VERIFY**

1. DECIDE: identify the approved change and distinguish it from a proposal.
2. RECORD: persist it in the appropriate Drive master, including effective date where relevant; governance changes go to the governance master.
3. IMPACT CHECK: identify affected code, copy, assets, child documents and requirements.
4. IMPLEMENT: use a branch/PR; keep technical changes traceable to the authorized requirement. A local checkout is temporary working space, not the only durable result.
5. TEST: run checks appropriate to the change and verify customer-facing facts against Drive. Documentation-only work needs source/readback and diff checks, not an application build.
6. MERGE: merge only within authorization after relevant checks. A draft PR is not a merged change.
7. VERIFY: verify merged content and deployed behavior when deployment is in scope. Distinguish implemented, merged and deployed states.

## PR evidence

Record the relevant canonical source filename/section and decision date, without copying private source text. Include scope, tested commit, checks/results, unresolved source gaps, merge state and deployment evidence when applicable. For private evidence use an authorized private record; do not make it public merely for a PR.

Existing CI/deployment configuration, domain and repository permissions must be inspected before operational changes. This document does not enable branch protection, auto-merge, deployment or new integrations.
