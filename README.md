# SKH Farm Tracer (SKH031)

> **Digital Food Traceability System**  
> *Track the batch. Trace the lineage. Recall only what's affected.*

---

## 🌾 Project Overview

SKH Farm Tracer is an end-to-end digital food safety and traceability platform built for the **Smart Kopargaon Hackathon (Problem Statement SKH031)**. 

The system models agricultural and food transformation supply chains as a verified graph—tracking multi-source batch merging, processing transformations (e.g., Wheat → Maida → Biscuit), distribution handoffs, public consumer QR verification, cold-chain events, and targeted recall propagation.

---

## 🚀 Phase 0 Technical Foundation

- **Frontend Core:** React 18, TypeScript, Vite, Tailwind CSS
- **Routing:** React Router v6 with declarative `ProtectedRoute`, `RoleRoute`, and `PublicLayout`
- **Backend & Persistence:** Supabase (PostgreSQL, Row-Level Security, Supabase Auth)
- **Domain Modeling:** Pure TypeScript type definitions covering Profiles, Batches, Events, Lineage Operations, and Recalls
- **Resilience:** Singleton client factory with environment validation and non-blocking fallback modes

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and provide your Supabase project credentials:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Typecheck & Build
```bash
npm run typecheck
npm run build
```

---

## 📦 Project Structure

```text
src/
├── components/          # Reusable UI primitives (Button, Card, Badge, Alert, Modal) & Layouts
├── config/              # Environment schema validation & system constants
├── context/             # AuthContext and ToastContext
├── lib/                 # Supabase client singleton & utility formatters
├── routes/              # Declarative route configuration and guards
├── services/            # Domain service layer (BaseService, AuthService)
├── types/               # TypeScript domain contracts & DB mappings
└── views/               # Route view shells (Landing, Login, Public Trace, Dashboard)
```

---

## 🔒 Branch & Safety Rules
- Active development branch: `rebuild`
- Never modify or force-push `main`
- Zero mock data in production services