# Codex Cloud workflow — Lady Fitness

Operational technical guide under [website governance](00_WEBSITE_GOVERNANCE.md). Business authority remains on Drive. This guide is prepared configuration guidance, not evidence that a cloud environment is published or a task has run.

## Cloud setup and verification

Official procedure reviewed 2026-10-02: [Codex Cloud](https://learn.chatgpt.com/docs/cloud).

Select or create a cloud environment in ChatGPT, choose `wwwsusi/Lady-Fitness-web-page`, connect GitHub if required, let Codex inspect dependencies/tools, review setup checks and publish. Start work from the published environment. Official documentation describes separate task workspaces and reviewing work across web/mobile/desktop. Confirm the environment and repository access in the actual account; the GitHub connector in this conversation is not proof of Codex Cloud access.

Cloud readiness evidence to record privately:
- Environment name/ID and published state: TBD.
- Repository/ref checked out and governance files available: TBD.
- Dependencies installed and relevant validation completed: TBD.
- Task ID/URL and result commit/PR: TBD.
- Access to required Drive sources or authorized task-specific handoff: TBD.
- Open the same task/PR from another computer: NOT VERIFIED.

Before starting a cloud task, verify that its selected repository ref contains AGENTS.md and both governance/workflow documents. Governance introduced by PR #4 is available on main only after that PR has been merged.

## Repository setup inputs

At inspected governance branch commit `43217731148829e9c473321e501ab09ac8f79647`, package.json requires Node >=22.13.0 and has a pnpm lockfile. Preserve the lockfile; verify the available pnpm version in the cloud setup rather than invent a project pin. Install with `pnpm install --frozen-lockfile` after ensuring Node/pnpm are available.

Available relevant commands: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`; `pnpm build:pages` is a separate GitHub Pages build path. Select checks appropriate to changed code and intended target. These commands were inspected, not run in a cloud environment by this documentation change. There is no package test script in the inspected package.json. Do not describe a nonexistent test suite as passed. Inspect deployment configuration separately before deployment; a build is not a deployment.

## Private Drive handoff

Do not assume a cloud task inherits this chat's Google Drive connector or cached context. Verify source access in the task. If unavailable, provide only the authorized requirement subset and necessary derived assets through an approved private task channel, citing canonical filenames/sections and decision dates. Do not copy the entire KB into GitHub, make private Drive files public, or store credentials in the repository. Block only the dependent business changes while useful independent technical work continues.

Drive retains business decisions; GitHub retains implementation commits and PRs. A cloud chat, local checkout or temporary task workspace is not the only durable record.

## Task brief template

```text
Repository: wwwsusi/Lady-Fitness-web-page
Environment: <verified published cloud environment>
Starting ref: <authorized branch/commit>
Decision/source: <Drive master filename, section and decision date>
Source access: <verified connector access or authorized private handoff>
Goal: <one concrete outcome>
Approved scope: <files/behaviors>
Business facts: <minimum approved public-facing facts, no internal cost data>
Unknowns: <TBD; never infer from old website copy>
Assets: <authorized derived assets and provenance>
Acceptance: <observable behavior/content checks>
Validation: <appropriate commands plus visual/functional checks>
Delivery: branch/PR, tested commit and results; do not merge/deploy unless authorized.
Follow DECIDE → RECORD → IMPACT CHECK → IMPLEMENT → TEST → MERGE → VERIFY.
```

## First cloud smoke check

Once an environment is available, start an explicitly authorized read-only task: identify the repository/ref, read AGENTS.md and both governance/workflow docs, report dependency setup and source-access gaps. Run appropriate validation only where configured and report exact outcomes. Do not edit business facts, publish content, merge or deploy as part of this smoke check. Record task evidence in the private project workstream.

This documentation step does not itself launch a cloud task, publish an environment, configure account permissions or verify cross-computer continuity.
