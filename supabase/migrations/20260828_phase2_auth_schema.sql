-- ==============================================================================
-- SKH031 Farm Tracer — Phase 2 Auth & Organization Schema Migration
-- Master Specification: FARM_TRACER_BRAIN_V2.md (Sections 15, 16, 17, 52, 53)
-- Phased Scope: phaseinfo.md (Sections 58, 59)
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. Organizations Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('FARM', 'MANDI', 'WAREHOUSE', 'PROCESSOR', 'FACTORY', 'DISTRIBUTOR', 'TRANSPORTER', 'RETAILER', 'AUTHORITY')),
    license_number TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 2. Profiles Table (Linked to Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('FARMER', 'MANDI', 'WAREHOUSE', 'PROCESSOR', 'FACTORY', 'DISTRIBUTOR', 'TRANSPORTER', 'RETAILER', 'AUTHORITY', 'ADMIN')),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 3. Organization Members Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_in_org TEXT DEFAULT 'MEMBER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(organization_id, profile_id)
);

-- ------------------------------------------------------------------------------
-- 4. Enable Row Level Security (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 5. Row Level Security Policies
-- ------------------------------------------------------------------------------
-- Organizations Policies
DROP POLICY IF EXISTS "Allow public read on organizations" ON public.organizations;
CREATE POLICY "Allow public read on organizations" 
    ON public.organizations FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to create organizations" ON public.organizations;
CREATE POLICY "Allow authenticated users to create organizations" 
    ON public.organizations FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Profiles Policies
DROP POLICY IF EXISTS "Allow public read on profiles" ON public.profiles;
CREATE POLICY "Allow public read on profiles" 
    ON public.profiles FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile" 
    ON public.profiles FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users to insert own profile" ON public.profiles;
CREATE POLICY "Allow users to insert own profile" 
    ON public.profiles FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- Organization Members Policies
DROP POLICY IF EXISTS "Allow authenticated read on organization members" ON public.organization_members;
CREATE POLICY "Allow authenticated read on organization members" 
    ON public.organization_members FOR SELECT 
    TO authenticated 
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert organization members" ON public.organization_members;
CREATE POLICY "Allow authenticated users to insert organization members" 
    ON public.organization_members FOR INSERT 
    TO authenticated 
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated users to delete own organization membership" ON public.organization_members;
CREATE POLICY "Allow authenticated users to delete own organization membership" 
    ON public.organization_members FOR DELETE 
    TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 6. Trigger for Automatic Profile Creation upon Supabase Auth Signup
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role TEXT;
    user_name TEXT;
    org_id_text TEXT;
    org_uuid UUID;
    new_profile_id UUID;
BEGIN
    default_role := COALESCE(NEW.raw_user_meta_data->>'role', 'FARMER');
    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
    org_id_text := NEW.raw_user_meta_data->>'organization_id';

    IF org_id_text IS NOT NULL AND org_id_text != '' THEN
        BEGIN
            org_uuid := org_id_text::UUID;
        EXCEPTION WHEN OTHERS THEN
            org_uuid := NULL;
        END;
    END IF;

    INSERT INTO public.profiles (user_id, full_name, role, organization_id, language)
    VALUES (
        NEW.id,
        user_name,
        default_role,
        org_uuid,
        COALESCE(NEW.raw_user_meta_data->>'language', 'en')
    )
    ON CONFLICT (user_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        organization_id = COALESCE(EXCLUDED.organization_id, public.profiles.organization_id),
        language = EXCLUDED.language
    RETURNING id INTO new_profile_id;

    IF org_uuid IS NOT NULL AND new_profile_id IS NOT NULL THEN
        INSERT INTO public.organization_members (organization_id, profile_id, role_in_org)
        VALUES (org_uuid, new_profile_id, CASE WHEN default_role = 'ADMIN' THEN 'ADMIN' ELSE 'MEMBER' END)
        ON CONFLICT (organization_id, profile_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. Seed Data: Default Demo Organizations
-- ------------------------------------------------------------------------------
INSERT INTO public.organizations (id, name, type, license_number, address, city, state, country, lat, lng)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Kopargaon Organic Growers Co-op', 'FARM', 'MH-AGR-2026-001', 'Survey 42, Sanvatsar Road', 'Kopargaon', 'Maharashtra', 'India', 19.8912, 74.4789),
    ('a0000000-0000-0000-0000-000000000002', 'Kopargaon APMC Mandi Market', 'MANDI', 'APMC-KPG-8821', 'Station Road, APMC Yard', 'Kopargaon', 'Maharashtra', 'India', 19.8875, 74.4823),
    ('a0000000-0000-0000-0000-000000000003', 'Godavari Agri-Storage Facility #4', 'WAREHOUSE', 'FSSAI-WH-9932', 'MIDC Industrial Area', 'Kopargaon', 'Maharashtra', 'India', 19.8765, 74.4912),
    ('a0000000-0000-0000-0000-000000000004', 'Sahyadri Flour & Grain Mills Ltd.', 'PROCESSOR', 'FSSAI-11524001000123', 'Plot 12, Food Processing Zone', 'Nashik', 'Maharashtra', 'India', 19.9975, 73.7898),
    ('a0000000-0000-0000-0000-000000000005', 'NutriBake Biscuit Manufacturing Unit 2', 'FACTORY', 'FSSAI-10022002000554', 'Sinnar Industrial Park', 'Sinnar', 'Maharashtra', 'India', 19.8456, 73.9982),
    ('a0000000-0000-0000-0000-000000000006', 'Western Maharashtra FMCG Distributors', 'DISTRIBUTOR', 'MH-DIST-4421', 'Warehouse Hub 8', 'Pune', 'Maharashtra', 'India', 18.5204, 73.8567),
    ('a0000000-0000-0000-0000-000000000007', 'Kisan Express Cold Chain Logistics', 'TRANSPORTER', 'LOG-MH-7712', 'Highway Logistics Terminal', 'Ahmednagar', 'Maharashtra', 'India', 19.0952, 74.7480),
    ('a0000000-0000-0000-0000-000000000008', 'Kopargaon Fresh Mart Superstore', 'RETAILER', 'FSSAI-21523004000876', 'Main Bazaar Road', 'Kopargaon', 'Maharashtra', 'India', 19.8850, 74.4750),
    ('a0000000-0000-0000-0000-000000000009', 'District Food Safety & Inspection Wing', 'AUTHORITY', 'GOV-FSSAI-MH031', 'Collectorate Office Complex', 'Ahmednagar', 'Maharashtra', 'India', 19.0980, 74.7450)
ON CONFLICT (id) DO NOTHING;
