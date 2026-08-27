# FARM TRACER — AGENT RULES

## Project Status

This repository is a FROM-SCRATCH rebuild of Farm Tracer for SKH031.

The old Farm Tracer implementation must NOT be reused as application code.

The current branch is `rebuild`.

`main`, `frontend`, `backend`, and any legacy branches are separate and must not be modified unless explicitly instructed.

## Primary Specification

Read `FARM_TRACER_BRAIN_V2.md` before implementing any feature.

The brain file is the source of truth for product goals, architecture, workflow, and feature priorities.

## Development Rules

1. Work only on the current branch.
2. Never modify or force-push `main`.
3. Never delete or modify other Git branches.
4. Do not recreate the previous Farm Tracer UI or architecture.
5. Do not invent fake backend functionality.
6. Do not use mock data when a real Supabase implementation is required.
7. Do not add unnecessary dependencies.
8. Do not expose API keys or secrets.
9. Never commit `.env`.
10. Keep `.env.example` safe and placeholder-only.
11. Prefer simple, maintainable implementations.
12. Do not implement future phases early unless explicitly requested.
13. Do not replace working code unnecessarily.
14. Before major implementation, explain the plan.
15. After implementation, run appropriate checks and report failures honestly.

## Product Priority

The highest priority is:

REAL END-TO-END FOOD TRACEABILITY.

The system must eventually support:

Farm
→ Processor
→ Warehouse
→ Transport
→ Distributor
→ Retailer
→ Consumer

and transformation lineage such as:

Wheat
→ Flour/Maida
→ Biscuit Batch
→ Retail Package
→ Consumer

The trace must eventually be represented as:

- timeline
- lineage graph
- map
- detailed event view

QR scanning must lead to the relevant trace.

## Engineering Priority

Prefer:

Real database
>
Real business logic
>
Real traceability
>
Real offline synchronization
>
Real QR flow
>
Visual polish
>
Optional AI

AI must never be required for the fundamental traceability workflow.

## Agent Behavior

When asked to implement a phase:

1. Inspect existing files.
2. Explain what will change.
3. Implement only that phase.
4. Test it.
5. Report what was changed.
6. Report what was tested.
7. Report any remaining issues.

Do not silently expand scope.