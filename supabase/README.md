# Supabase Database Migrations

This folder contains database migrations and setup scripts for the **SKH031 Farm Tracer** project.

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended for Quick Setup)
1. Open your project on [Supabase Dashboard](https://app.supabase.com).
2. Go to the **SQL Editor** tab in the left sidebar.
3. Open `supabase/migrations/20260828_phase2_auth_schema.sql`.
4. Copy and paste the contents into the SQL Editor and click **Run**.
5. The tables (`organizations`, `profiles`, `organization_members`), RLS policies, trigger function (`handle_new_user`), and seed data will be created.

### Option 2: Supabase CLI
```bash
supabase db push
```

## Tables Created in Phase 2
- `public.organizations`: Supply-chain organizations with license numbers, location, and types (`FARM`, `MANDI`, `PROCESSOR`, etc.).
- `public.profiles`: Stakeholder profiles linked to `auth.users(id)` with assigned `role` and `organization_id`.
- `public.organization_members`: Junction table for organization memberships.
- Automated Trigger: `on_auth_user_created` creates a profile entry automatically when a new user signs up.
