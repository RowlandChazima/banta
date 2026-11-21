<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — CampusFlow

This file gives coding agents the project context and working rules. Read it before making changes.

## 1. Product overview

CampusFlow is an academic coordination workspace for university students. It aims to make important academic information easier to find, trust, and act on when it is scattered across group chats, email, learning platforms, lecturers, and class representatives.

The product is not intended to replace WhatsApp or become a full Discord clone. Its core value is to combine familiar group communication with dependable, structured academic information and reminders.

### Primary users
- **Student:** joins unit offerings, participates in group conversations, views shared academic events, and creates private personal obligations.
- **Class representative:** communicates with the unit and publishes or updates shared academic information when authorised.
- **Lecturer:** can publish or verify academic information when authorised.

A user's role alone does not automatically make every statement official. Preserve who published information, their authority, timestamps, and verification state.

## 2. Product decisions already made

Treat these as current decisions unless the project owner explicitly changes them:

- A unit is a persistent course identity; a **unit offering** is that unit in a particular semester. Membership, class representatives, invitation codes, and shared events belong to an offering.
- A student must explicitly join an offering to access its group conversation and shared academic information. Knowing an invitation code must not itself grant ongoing access to the offering's data.
- The unit's primary screen is a **conversation-first group chat**. Students should be able to browse the conversation history, not just see the latest message or an overview.
- The initial communication experience is one main group conversation per unit offering (WhatsApp-like). Do not add a complex Discord-style channel hierarchy in the pilot.
- The unit header should provide an unobtrusive **My obligations** entry point, potentially with a count or short status such as “No upcoming obligations” or “2 upcoming”. Selecting it opens a dedicated in-app obligations page, not a modal that obscures the chat. Preserve the ability to return to the conversation.
- The obligations page should support viewing obligations for the current unit and, eventually, across all joined units. When opened from a unit, default to that unit.
- Distinguish **shared unit events** (CATs, exams, assignments, deadlines, announcements) from **personal obligations** created by an individual student. Personal obligations must never become official group announcements automatically.
- Ordinary chat messages do not automatically create or modify official academic events. An authorised person must deliberately publish or update the structured record.
- Students may ask questions, mention representatives, reply, and discuss corrections naturally in chat. Do not introduce a bureaucratic issue-ticket/report workflow for ordinary questions.
- Shared event changes should preserve an audit history: actor, timestamp, old value, new value, and reason where available.
- Notification channels planned for the pilot: email, in-app, and browser push. WhatsApp/SMS are out of initial scope.
- Reminder defaults currently proposed are 7, 3, and 1 days before an event, with user customisation and per-unit overrides. Treat these as product decisions to implement only when the relevant feature is reached; do not hard-code them throughout the UI.
- Membership departure should deactivate membership, revoke future access, and stop future reminders while preserving relevant history.
- Closing/archiving an offering should preserve historical records and stop future reminders.

## 3. Current project stage

The repository was created with `pnpm create next-app` and currently contains the default Next.js starter. The project owner has not yet approved a feature implementation or a dependency installation.

**Immediate milestone:** build and validate the frontend application shell using mock data only.

Expected first UI experiences:
1. A home/workspace view with navigation and an overview of academic activity.
2. A list of the student's joined unit offerings.
3. A unit conversation screen with a visible conversation history and message composer.
4. A subtle obligations entry point in the unit header.
5. A dedicated obligations page, initially scoped to the selected unit, with a route back to the conversation.

Do not implement authentication, database persistence, real messaging, email/push delivery, AI extraction, or background jobs in this first UI milestone.

## 4. Likely technical direction

The current intended direction is:
- Next.js with the App Router and React.
- JavaScript first; do not migrate to TypeScript unless explicitly approved.
- Tailwind CSS if it is already configured by the starter. Inspect the actual repository before assuming file paths or configuration.
- Next.js Route Handlers for future server-side APIs.
- MongoDB for future persistence.
- Auth.js for future authentication.
- Zod for future input validation.
- Vitest and Playwright for future unit/integration and browser testing.
- Vercel is the likely deployment target.

These are planned choices, not permission to install packages now. Inspect `package.json`, the existing Next.js version, directory layout, and current configuration before proposing changes. Do not replace or regenerate the starter project.

The backend direction is a **modular monolith**, not microservices. Keep domain boundaries understandable (users, units/offers, memberships, conversations, academic events, personal obligations, notifications, audit history) without prematurely creating a distributed system.

## 5. UI and UX principles

- Conversation-first within a unit; academic obligations are easy to access but do not dominate the chat.
- Familiar, calm, modern interface. Borrow WhatsApp's low-friction conversation patterns and Discord's useful organisation without copying either product wholesale.
- Clear distinction between ordinary messages and structured/authoritative academic information.
- Avoid clutter, excessive navigation, unnecessary tabs, ticket forms, and notification noise.
- Responsive by design: desktop should use available space well; mobile should remain practical for students.
- Accessible contrast, keyboard navigation, visible focus states, semantic HTML, and readable text sizes.
- Provide useful empty, loading, error, and populated states rather than designing only the happy path.
- Do not use fake status labels that imply real verification, delivery, or lecturer approval. Mock data must be clearly understood as demo data.
- Do not invent institutional branding, official JKUAT endorsement, lecturer identities, or real student data.

## 6. Engineering rules for agents

### Before changing code
1. Read this file and inspect the existing repository structure.
2. Inspect `package.json` and relevant configuration before choosing commands, libraries, or file paths.
3. Summarise the task, identify the files likely to change, and present a short implementation plan for any multi-file change.
4. If requirements are ambiguous or a decision changes product behaviour, ask the project owner rather than silently deciding.
5. Keep the change focused on the requested milestone. Do not add speculative features.

### While implementing
- Prefer small, composable components with clear responsibilities.
- Reuse the existing conventions and dependencies where sensible.
- Do not add a dependency for something the current stack can reasonably handle without one.
- Do not modify lockfiles or install packages without explaining why and receiving approval.
- Do not introduce TypeScript, a UI component library, state-management library, database, authentication, or external service without approval.
- Keep mock data separate from UI components where practical; make it obvious that it is temporary.
- Avoid giant components, duplicated markup, unexplained abstractions, and premature generalisation.
- Do not put secrets, API keys, credentials, or personal data in source control.
- Never run destructive commands, delete user work, overwrite configuration, or reset Git history without explicit permission.

### After implementing
1. Summarise exactly what changed and why.
2. List the files created or modified.
3. Run appropriate checks using scripts that actually exist in `package.json` (do not assume script names).
4. Report test/build failures honestly; do not claim success if checks were not run.
5. Explain important implementation decisions and any remaining limitations.
6. Give the project owner a short review checklist and wait for approval before moving to the next milestone.

## 7. Data, permissions, and trust rules for future backend work

- Enforce access control on the server; hiding a button in the UI is not authorisation.
- Check active membership in the relevant unit offering before returning its private conversation or shared data.
- Validate all untrusted input on the server.
- Treat client-provided roles, publisher identities, verification states, and ownership claims as untrusted.
- Keep personal obligations private to their owner unless an explicit future product decision says otherwise.
- Preserve provenance for shared academic events: publisher, publisher role at the time, timestamps, and verification state.
- AI extraction or suggestions must never be treated as authoritative merely because a model reports high confidence. Ambiguous or conflicting information needs human confirmation.
- Notifications must be designed for idempotency, retry handling, and delivery-attempt history. A provider accepting a message is not proof that a person read it.

## 8. Working style and communication

The project owner is learning software engineering while building CampusFlow. Explain concepts in beginner-friendly language, with concrete examples when useful. Do not merely dump code.

Act like a careful senior engineer and mentor:
- challenge assumptions respectfully;
- explain trade-offs and failure modes;
- distinguish confirmed decisions from hypotheses;
- ask one focused question at a time;
- do not rush ahead when the owner needs to understand or approve a decision.

AI-generated code is a proposal, not automatically correct. The project owner is responsible for understanding and approving changes.

## 9. First task for the coding agent

Do not start by implementing the whole application.

First inspect the existing Next.js starter and report:
- the Next.js version and whether the App Router is in use;
- the current folder structure;
- the styling setup and available scripts;
- which starter files would be changed for the first application shell.

Then propose a small, reviewable plan for the first UI slice. Wait for approval before editing files.
