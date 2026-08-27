# FARM TRACER — NEW BRAIN FILE
## SKH031 Digital Food Traceability System
### FROM-SCRATCH CORE MVP BUILD PLAN — 27 AUGUST 2026

> **Project mantra:** Track the batch. Trace the lineage. Recall only what's affected.

---

# 0. PURPOSE OF THIS FILE

This is the new single source of truth for rebuilding Farm Tracer from the ground up around a **real, working end-to-end food traceability system**.

This document intentionally replaces the previous implementation-first approach.

We are starting the implementation again from the beginning, but we are **not blindly throwing away useful repository code**. The existing repository is an asset/reference. Every existing file must be inspected before reuse or replacement.

The goal is not to produce a huge fake dashboard.

The goal is to make the following critical path genuinely work:

```text
LOGIN
  ↓
CREATE / RECEIVE FOOD BATCH
  ↓
GENERATE QR
  ↓
RECORD EVERY SUPPLY-CHAIN HANDOFF
  ↓
MERGE / SPLIT / TRANSFORM BATCHES
  ↓
BUILD COMPLETE LINEAGE
  ↓
SHOW LINEAGE VISUALLY
  ↓
SHOW JOURNEY ON MAP
  ↓
CALCULATE SHELF-LIFE / EXPIRY RISK
  ↓
FLAG AT-RISK / EXPIRED PRODUCTS
  ↓
TRACE BACK TO SOURCES
  ↓
TRACE FORWARD TO ALL DERIVED PRODUCTS
  ↓
TARGETED RECALL
  ↓
QR ON FINAL CONSUMER PACKAGE
  ↓
CONSUMER SEES FULL VERIFIED JOURNEY
```

Everything else is secondary.

---

# 1. PROJECT IDENTITY

**Hackathon:** Smart Kopargaon Hackathon  
**Problem Statement:** SKH031  
**Title:** Digital Food Traceability System  
**Track:** Software  
**Domain:** Food Safety & Security  
**Team size:** 4  
**Development style:** AI-assisted / vibe coding  
**Budget:** Free-first  
**Backend:** Supabase  
**Primary coding/build assistants:** Google AI Studio and/or Antigravity  
**Optional AI routing:** OmniRoute  
**Repository:**

```text
https://github.com/jiviteshiscoding/farm-tracer1
```

---

# 2. CURRENT TIME / DEVELOPMENT TARGET

Current development date:

```text
27 August 2026
```

The immediate target is:

## TODAY'S TARGET

Build a **working Core MVP**, not the complete final product.

By the end of today's core build, a judge should be able to perform this:

```text
Login
  ↓
Create a farmer batch
  ↓
Generate QR
  ↓
Create/record supply-chain movement
  ↓
Merge multiple source batches
  ↓
Transform into a processed product
  ↓
Create a packaged consumer batch
  ↓
View visual lineage
  ↓
View map journey
  ↓
Scan/open QR
  ↓
See full trace
```

Then, if time permits:

```text
Offline event
  ↓
Pending Sync
  ↓
Reconnect
  ↓
Supabase Sync
```

Then:

```text
Introduce problem
  ↓
Trace Forward
  ↓
Targeted Recall
```

The **minimum winning core** is traceability + lineage + QR + visual representation.

---

# 3. IMPORTANT: REPOSITORY REALITY

The current public repository is not blank.

The repository currently contains:

```text
.github/
public/
src/
  components/
  lib/
  pages/
  services/
  types/
  App.tsx
  index.css
  main.tsx
.env.example
.gitignore
README.md
bun.lock
index.html
metadata.json
package.json
server.ts
tsconfig.json
vite.config.ts
```

The repository currently uses React/TypeScript/Vite and has dependencies including:

```text
React
TypeScript
Vite
Tailwind
Leaflet
Recharts
idb
qrcode
html5-qrcode
Lucide
Motion
Express
@google/genai
```

The repository also contains substantial UI and conceptual functionality for:

```text
Farmer
Processor
Distributor
Retailer
Authority
Admin
Consumer Trace
QR
Maps
Lineage
Offline storage
AI
Translations
```

However:

## DO NOT TRUST THE README AS PROOF OF FUNCTIONALITY.

The README describes capabilities such as offline sync, AI, cryptographic integrity, lineage, recall, maps, and multilingual support.

Those claims are not automatically equivalent to working production functionality.

Every AI agent must inspect the actual source files.

---

# 4. NEW DEVELOPMENT PHILOSOPHY

We are rebuilding the **core product**, not rebuilding every visual component.

Use this rule:

```text
KEEP if it works
REUSE if it is useful
REFACTOR if it is close
REPLACE if it is misleading/broken
DELETE only when proven unnecessary
```

Do not allow an AI coding agent to:

```text
rewrite the entire repository
replace the architecture unnecessarily
invent fake APIs
fake database persistence
fake offline synchronization
add random libraries
create unnecessary dashboards
```

---

# 5. WHAT THE PRODUCT ACTUALLY SOLVES

The real problem is not simply:

> "Consumers want more information."

The deeper problem is:

> Food passes through many organizations and may be merged, split, transformed, repackaged and redistributed. When something goes wrong, stakeholders need to know where it originated and exactly where affected material went.

Therefore the system must support a **graph**, not merely a timeline.

Example:

```text
FARMER A ───────┐
                │
FARMER B ───────┼──> MANDI LOT
                │
FARMER C ───────┘
                      ↓
                  PROCESSOR
                      ↓
             ┌────────┴────────┐
             ↓                 ↓
        FLOUR BATCH       FLOUR BATCH
             ↓                 ↓
          BISCUIT A          BISCUIT B
             ↓                 ↓
        DISTRIBUTOR A     DISTRIBUTOR B
             ↓                 ↓
         RETAILER A        RETAILER B
             ↓                 ↓
         CONSUMERS         CONSUMERS
```

This graph is the core intellectual value of the product.

---

# 6. HERO USE CASE

Use a realistic example that demonstrates transformation.

## Example:

```text
WHEAT
  ↓
FARMERS
  ↓
MANDI
  ↓
FLOUR MILL
  ↓
MAIDA
  ↓
BISCUIT FACTORY
  ↓
BISCUIT BATCH
  ↓
PACKAGED BISCUIT
  ↓
DISTRIBUTOR
  ↓
RETAILER
  ↓
CONSUMER
```

This is stronger than only demonstrating:

```text
Farm → Retailer
```

because it proves that the system understands **ingredient-to-product lineage**.

---

# 7. THE BIG DIFFERENTIATOR

The final consumer QR should not only say:

```text
This biscuit was made by Company X.
```

It should answer:

```text
What ingredients went into this product?

Where did those ingredients originate?

Which farmers supplied them?

Which mandi/warehouse handled them?

Which processor transformed them?

When was the product manufactured?

Which batch was it derived from?

Which distributors handled it?

Which retailer received it?

What is its expiry status?

Has it been recalled?

Are there any active risk flags?

How many supply-chain handoffs occurred?
```

This is the **Farm-to-Product-to-Consumer lineage**.

---

# 8. "HAND COUNT" / CHAIN DEPTH

The system should calculate a consumer-friendly chain depth.

Example:

```text
Farmer
  ↓
Mandi
  ↓
Warehouse
  ↓
Processor
  ↓
Factory
  ↓
Distributor
  ↓
Retailer
```

Display:

```text
Supply-chain depth: 7 stages
```

But do not misleadingly call every stage a "second hand" or "fifth hand".

Use clear terminology:

## Recommended labels

```text
Supply-chain stages: 7
Verified handoffs: 6
Organizations involved: 7
Trace depth: 7 stages
```

For consumers:

```text
This product passed through 6 recorded custody transfers
before reaching the retailer.
```

This is more understandable and technically defensible.

---

# 9. CORE PRODUCT MODULES

The application consists of these modules:

```text
1. Authentication
2. Organization / Role Management
3. Batch Management
4. Supply-Chain Events
5. Batch Lineage
6. Product Transformation
7. QR System
8. Consumer Trace
9. Visual Lineage Graph
10. Journey Map
11. Shelf-Life Engine
12. Risk / Expiry Alerts
13. Recall Engine
14. Offline-First Sync
15. Notifications
16. Multilingual UI
17. AI Assistance
18. Analytics / Reporting
19. Audit Log
```

But they are not equal priority.

---

# 10. FEATURE PRIORITY

## P0 — CORE MVP

These must actually work.

```text
Authentication
Roles
Batch creation
Batch storage in Supabase
Supply-chain event creation
Batch transfer
Batch merge
Batch split
Batch transformation
Lineage graph
Trace-back
Trace-forward
QR generation
Public QR trace page
Journey timeline
Map visualization
Expiry calculation
Basic expiry flags
Recall workflow
```

## P1 — STRONG DEMO FEATURES

```text
Offline IndexedDB queue
Real Supabase synchronization
Sync status
Temperature events
Realtime alerts
Consumer trust indicators
Chain depth
Audit logs
Multilingual UI
Dashboard analytics
```

## P2 — AI / ADVANCED

```text
AI trace summary
AI risk explanation
AI expiry-risk explanation
AI visual inspection
AI document extraction
AI anomaly detection
Natural-language investigation
```

## P3 — DO NOT PRIORITIZE TODAY

```text
Blockchain
Hyperledger
Complex ML training
Real IoT hardware
BLE sensors
Actual FSSAI/FoSCoS integration
National-scale infrastructure
Complex zero-knowledge proofs
```

---

# 11. TECHNOLOGY STACK

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
Lucide React
Existing Motion where useful
```

## Backend / Database

```text
Supabase
PostgreSQL
Supabase Auth
Supabase Storage
Supabase Realtime
Row Level Security
Edge Functions only where needed
```

## Offline

```text
IndexedDB
idb
Service Worker
PWA
Sync Queue
Idempotency Keys
```

## QR

```text
qrcode
html5-qrcode
```

## Maps

Primary:

```text
Leaflet
OpenStreetMap
```

Optional routing/geocoding:

```text
OSRM
Nominatim
```

The core product must not break if an external routing/geocoding API is unavailable.

## Charts

```text
Recharts
```

## Visual Lineage

First preference:

```text
Reuse/fix the existing LineageGraph component
```

Only add a graph library if the existing graph cannot support the required interactions.

Potential optional library:

```text
@xyflow/react
```

Do not add it automatically.

---

# 12. FREE-FIRST RULE

The project should be buildable without paid infrastructure.

Use:

```text
Supabase free tier
Google AI Studio
Free model/API quotas where available
OpenStreetMap
Leaflet
GitHub
Free hosting
IndexedDB
```

Important:

## THERE IS NO GUARANTEED UNLIMITED FREE AI API.

Do not design the core product around unlimited AI calls.

AI must remain optional.

If AI stops working:

```text
Traceability still works.
QR still works.
Lineage still works.
Recall still works.
Expiry rules still work.
Maps still work.
```

---

# 13. AI CODING TOOL STRATEGY

Primary coding agents:

```text
Google AI Studio
Antigravity
```

Use whichever is currently more reliable for the team.

Do not repeatedly move the whole project between tools.

Recommended workflow:

```text
One repository
      ↓
One source of truth
      ↓
One phase at a time
      ↓
Inspect
      ↓
Implement
      ↓
Run
      ↓
Test
      ↓
Commit
```

Never let an AI agent make 10 architectural changes in one prompt.

---

# 14. OMNIROUTE STRATEGY

OmniRoute can provide an OpenAI-compatible routing layer and can expose multiple providers/models through a common API.

Use it only for **AI-assisted features**, never for the core database logic.

Architecture:

```text
Frontend
   ↓
Our server / Supabase Edge Function
   ↓
OmniRoute
   ↓
Selected AI model
   ↓
Structured response
   ↓
Frontend
```

NEVER:

```text
Frontend
   ↓
OmniRoute API key
```

The OmniRoute key must stay server-side.

OmniRoute supports chat, model listing, embeddings, and other provider-compatible routes, but the actual model catalog and availability can change. Check the live model list before selecting a model.

For the hackathon:

```text
AI_MODEL = configurable environment variable
```

Do not hardcode the whole product to one model.

---

# 15. DATABASE — CORE ENTITIES

Start with a small relational model.

```text
profiles
organizations
organization_members
batches
batch_events
batch_lineage
locations
products
recalls
notifications
audit_logs
```

Optional later:

```text
documents
temperature_readings
ratings
consumer_feedback
ai_analysis
sync_operations
```

---

# 16. PROFILES

```text
profiles
```

Fields:

```text
id
full_name
phone
role
organization_id
language
created_at
updated_at
```

Roles:

```text
FARMER
MANDI
WAREHOUSE
PROCESSOR
FACTORY
DISTRIBUTOR
TRANSPORTER
RETAILER
AUTHORITY
ADMIN
```

Consumer:

```text
NO LOGIN REQUIRED
```

---

# 17. ORGANIZATIONS

```text
organizations
```

Fields:

```text
id
name
type
license_number
address
city
state
country
lat
lng
created_at
```

Types:

```text
FARM
MANDI
WAREHOUSE
PROCESSOR
FACTORY
DISTRIBUTOR
TRANSPORTER
RETAILER
AUTHORITY
```

---

# 18. PRODUCTS

A product is not the same thing as a batch.

```text
products
```

Example:

```text
Wheat
Maida
Biscuit
Milk
Paneer
Rice
Onion
```

Fields:

```text
id
name
category
description
unit
created_at
```

---

# 19. BATCHES

A batch represents a traceable quantity at a specific stage.

Core fields:

```text
id
batch_code
product_id
product_name
quantity
unit
production_date
harvest_date
expiry_date
organization_id
origin_location_id
current_location_id
current_status
quality_grade
verification_status
created_by
created_at
updated_at
```

Statuses:

```text
HARVESTED
COLLECTED
RECEIVED
PROCESSING
PROCESSED
PACKED
IN_TRANSIT
STORED
RETAIL
SOLD
QUARANTINED
RECALLED
EXPIRED
```

---

# 20. BATCH EVENTS

Every meaningful action becomes an event.

```text
batch_events
```

Fields:

```text
id
batch_id
actor_id
organization_id
event_type
location_id
latitude
longitude
timestamp
notes
temperature
humidity
quantity
previous_event_hash
event_hash
idempotency_key
sync_status
created_at
```

Event types:

```text
HARVEST
COLLECT
MANDI_RECEIVE
WAREHOUSE_RECEIVE
PROCESS
TRANSFORM
MERGE
SPLIT
PACK
TRANSFER
TRANSPORT_START
CHECKPOINT
STORAGE
QUALITY_CHECK
TEMPERATURE_READING
RETAIL_RECEIVE
SALE
QUARANTINE
RECALL
```

---

# 21. BATCH LINEAGE

This is the heart of the project.

Use a relational table:

```text
batch_lineage
```

Fields:

```text
id
parent_batch_id
child_batch_id
operation_type
quantity_transferred
created_by
created_at
```

Operations:

```text
MERGE
SPLIT
TRANSFORM
REPACK
```

Example:

```text
WHEAT-A ──────┐
WHEAT-B ──────┼──> MAIDA-001
WHEAT-C ──────┘
                   ↓
               BISCUIT-001
                   ↓
             PACK-001
```

---

# 22. CRITICAL CONCEPT: INGREDIENT LINEAGE

The system must not assume:

```text
one product = one source batch
```

A processed food can have multiple inputs.

Example:

```text
Maida Batch A
Sugar Batch B
Oil Batch C
Milk Powder Batch D
      ↓
Biscuit Factory
      ↓
Biscuit Production Batch X
```

Create lineage edges:

```text
Maida A → Biscuit X
Sugar B → Biscuit X
Oil C → Biscuit X
Milk Powder D → Biscuit X
```

Then:

```text
Consumer scans Biscuit X
```

and can see:

```text
Biscuit X
├── Maida A
│   └── Wheat sources
├── Sugar B
│   └── Sugar source
├── Oil C
│   └── Oil source
└── Milk Powder D
    └── Dairy source
```

This is a major differentiator.

---

# 23. TRACE-BACK

Input:

```text
PACK-BISCUIT-001
```

System traverses parents.

Output:

```text
Retailer
← Distributor
← Factory
← Biscuit Batch
← Maida Batch
← Wheat Batch
← Mandi
← Farmer A
← Farmer B
```

The user should be able to click any node.

---

# 24. TRACE-FORWARD

Input:

```text
WHEAT-BATCH-B
```

System traverses descendants.

Output:

```text
WHEAT-B
 ↓
MANDI
 ↓
MAIDA
 ↓
BISCUIT PRODUCTION
 ↓
PACKAGED BISCUITS
 ↓
DISTRIBUTORS
 ↓
RETAILERS
```

This is what enables targeted recall.

---

# 25. VISUAL REPRESENTATION — PRIMARY VIEW

The system should have a dedicated:

# TRACE VIEW

with tabs:

```text
[ GRAPH ] [ TIMELINE ] [ MAP ] [ DETAILS ]
```

This is the main visual experience.

---

# 26. GRAPH VIEW

Graph nodes represent:

```text
Farmer
Mandi
Warehouse
Processor
Factory
Distributor
Retailer
Batch
Product
```

Edges represent:

```text
Produced
Transferred
Merged
Split
Transformed
Repacked
Stored
Sold
```

Example:

```text
┌──────────┐
│ Farmer A │
└────┬─────┘
     │
┌────▼─────┐
│ Mandi 01 │
└────┬─────┘
     │
┌────▼──────┐
│ Maida 001 │
└────┬──────┘
     │
┌────▼─────────┐
│ Biscuit Prod │
└────┬─────────┘
     │
 ┌───┴────┐
 ▼        ▼
Pack A   Pack B
```

---

# 27. GRAPH INTERACTION

Clicking a node should show:

```text
Name
Type
Batch ID
Organization
Quantity
Date
Location
Status
Parent count
Child count
```

Buttons:

```text
Trace Back
Trace Forward
View Details
View on Map
```

Highlight the selected node and its ancestors/descendants.

---

# 28. FULL DETAILS VIEW

The user specifically wants a second way to inspect the trace.

Provide:

```text
GRAPH
TIMELINE
MAP
DETAILS
```

Details page should show:

## Batch identity

```text
Product
Batch ID
Quantity
Unit
Production date
Expiry date
Current status
Verification status
```

## Source

```text
Origin organization
Origin location
Source batches
```

## Processing

```text
Processor
Transformation
Input quantities
Output quantity
```

## Distribution

```text
Distributors
Transport events
Warehouses
Retailers
```

## Safety

```text
Expiry risk
Temperature anomalies
Quality checks
Recall status
```

## Audit

```text
Event count
Last update
Recorded actors
```

---

# 29. TIMELINE VIEW

Example:

```text
10 Aug
🌾 Harvested
Farmer A
Kopargaon
300 kg

11 Aug
🏪 Mandi Received
Kopargaon Mandi

12 Aug
🏭 Processed
Flour Mill
→ Maida

14 Aug
🏭 Biscuit Production
Factory X

15 Aug
📦 Packed
Batch BSK-001

16 Aug
🚚 Dispatched
Distributor Y

18 Aug
🏪 Retail Received
Store Z
```

Every event must be backed by database records.

---

# 30. MAP VIEW

Map should answer:

> Where did this food physically move?

Display:

```text
Farm
 ↓
Mandi
 ↓
Warehouse
 ↓
Factory
 ↓
Distributor
 ↓
Retailer
```

Use:

```text
Leaflet
OpenStreetMap
```

Map layers:

```text
Origin markers
Processing markers
Warehouse markers
Transport checkpoints
Retail markers
Route lines
Risk markers
```

---

# 31. MAP API STRATEGY

Do not make the map dependent on expensive APIs.

Primary:

```text
Leaflet + OpenStreetMap
```

For route geometry:

```text
OSRM
```

For address lookup:

```text
Nominatim
```

These are external public services and should not be assumed to provide unlimited production capacity.

Therefore:

```text
Stored coordinates
+
straight-line/polyline fallback
```

must always work.

The demo should still show a route if the routing API fails.

---

# 32. "BURST / HEAT" MAP

For authority/admin users, add a risk map later.

Visualize:

```text
Low risk
Medium risk
High risk
Expired
Recalled
Temperature anomaly
```

This should be an optional overlay.

Do not build this before the core route map works.

Possible visualization:

```text
● Retail locations
● Processing locations
● High-risk clusters
● Recall-affected locations
```

Use existing Leaflet capabilities before adding a specialized heatmap library.

---

# 33. QR SYSTEM

Every traceable batch gets a public trace URL.

Example:

```text
https://YOUR-DOMAIN/trace/FT-BSK-2026-001
```

QR contains only:

```text
public trace identifier / URL
```

Never put:

```text
database password
service role key
private organization data
```

inside the QR.

---

# 34. CONSUMER QR WORKFLOW

```text
Consumer
  ↓
Scans QR
  ↓
/trace/:batchCode
  ↓
Fetch public trace data
  ↓
Display product
  ↓
Display origin
  ↓
Display complete journey
  ↓
Display ingredient lineage
  ↓
Display map
  ↓
Display expiry
  ↓
Display recall status
  ↓
Display verification information
```

No consumer login.

---

# 35. CONSUMER TRUST SCORE

Do NOT invent a scientific "food safety score".

Instead use transparent trust indicators.

Example:

```text
Traceability completeness: 92%
Verified supply-chain events: 18
Recorded custody transfers: 6
Source batches traced: 4
Recall status: No active recall
Expiry status: 21 days remaining
```

Optional:

```text
Traceability Rating
★★★★★
```

But this must be based on an explicit scoring formula.

Example:

```text
+ source recorded
+ processing recorded
+ custody transfers recorded
+ retail receipt recorded
+ QR valid
+ expiry known
+ recall status available
- missing events
- unresolved anomaly
- recalled
```

Never label this as an official safety certification.

---

# 36. CONSUMER FEEDBACK / RATING

Allow consumers to optionally submit:

```text
Overall experience
Traceability clarity
Packaging condition
Comments
```

Do not use consumer ratings as evidence that food is safe.

Keep it separate:

```text
Consumer feedback
```

versus:

```text
Food safety / regulatory status
```

---

# 37. SHELF-LIFE ENGINE

The basic expiry engine should NOT require AI.

For each batch:

```text
expiry_date - current_date
```

Calculate:

```text
days_remaining
```

Statuses:

```text
SAFE_WINDOW
EXPIRING_SOON
EXPIRED
```

Example thresholds:

```text
> 7 days:
NORMAL

1–7 days:
EXPIRING SOON

0 days:
EXPIRES TODAY

< 0:
EXPIRED
```

Thresholds should be configurable by product category.

---

# 38. AI SHELF-LIFE ASSISTANCE

AI can help explain risk, but it should not invent expiry dates.

Use structured inputs:

```text
product
production date
declared expiry
temperature events
storage duration
transport duration
quality checks
```

AI output:

```text
Risk: LOW / MEDIUM / HIGH
Reason:
- 4 days remaining
- one temperature excursion
- prolonged storage
```

Core expiry status still comes from deterministic rules.

---

# 39. EXPIRY ALERTS

The system should flag:

```text
EXPIRING SOON
EXPIRED
```

Dashboard example:

```text
🚨 12 batches expire within 3 days
⚠ 4 batches expire today
🔴 2 batches expired
```

Notifications:

```text
Admin
Retailer
Warehouse
Authority
```

Only notify roles relevant to the batch.

---

# 40. TEMPERATURE / COLD CHAIN

Temperature can be manually entered or simulated for the hackathon.

Example:

```text
4°C
5°C
6°C
8°C
27°C
```

A rule engine can flag:

```text
temperature excursion
```

The system should show:

```text
⚠ Cold-chain anomaly
Batch: MILK-001
Observed: 27°C
Expected range: configured range
```

Do not claim real IoT unless hardware is actually connected.

---

# 41. AI RISK FLAGGING

AI should explain risk from verified data.

Input:

```text
batch events
locations
timestamps
temperature
expiry
lineage
```

Output:

```text
Risk level
Reasons
Evidence
Recommended investigation
```

Example:

```text
HIGH RISK

Reasons:
1. Batch expired 2 days ago.
2. It was recorded as received by a retailer after expiry.
3. A temperature excursion was recorded during transport.

Recommended:
Quarantine and investigate.
```

The final action remains a deterministic workflow.

---

# 42. RECALL ENGINE

The recall engine is one of the most important features.

Input:

```text
Affected batch
```

Process:

```text
Affected batch
    ↓
Trace forward
    ↓
Find descendants
    ↓
Find organizations
    ↓
Find retail locations
    ↓
Calculate affected quantities
    ↓
Create recall record
    ↓
Mark affected batches
    ↓
Notify stakeholders
    ↓
Update consumer trace
```

---

# 43. TARGETED RECALL

Never do:

```text
Recall everything.
```

Do:

```text
Recall only affected descendants.
```

Example:

```text
WHEAT-B
  ↓
MAIDA-002
  ↓
BISCUIT-009
  ↓
PACK-009
  ↓
RETAILER-A
```

If another product came from:

```text
WHEAT-A
```

and is unrelated:

```text
DO NOT RECALL IT.
```

This is the core reason for the lineage graph.

---

# 44. RECALL DASHBOARD

Authority/Admin sees:

```text
Active recalls
Affected batches
Affected products
Affected retailers
Affected quantity
Recall status
Created time
Reason
```

Buttons:

```text
Trace affected products
Notify
Quarantine
Close recall
Export report
```

---

# 45. FSSAI POSITIONING

The application can support food-safety investigation and recall workflows.

Do NOT claim:

```text
Official FSSAI certification
Official FoSCoS integration
Official FSSAI safety score
```

unless an actual official integration exists.

Use wording:

```text
FSSAI-aligned prototype workflow
Food recall support
Traceability and audit support
Prototype recall report
```

---

# 46. OFFLINE-FIRST ARCHITECTURE

Offline support is important because agricultural supply chains may have poor connectivity.

Architecture:

```text
USER ACTION
   ↓
LOCAL INDEXEDDB
   ↓
UI UPDATES IMMEDIATELY
   ↓
PENDING SYNC
   ↓
NETWORK RETURNS
   ↓
SYNC ENGINE
   ↓
SUPABASE
   ↓
SERVER CONFIRMATION
   ↓
SYNCED
```

Never fake the final status.

---

# 47. OFFLINE STATUS UI

Always show:

```text
🟢 Online
```

or:

```text
🔴 Offline
3 events pending
```

During sync:

```text
Syncing 3 events...
```

After success:

```text
✓ 3 events synced
```

Failure:

```text
⚠ 1 event failed
Retry
```

---

# 48. OFFLINE DATA RULE

Local records may be:

```text
PENDING
SYNCED
FAILED
```

Only after Supabase confirms:

```text
SYNCED
```

Do not mark a local record synced just because an upload was attempted.

---

# 49. MULTILINGUAL SUPPORT

Required initial languages:

```text
English
Hindi
Marathi
```

Then add:

```text
Gujarati
Tamil
Telugu
Kannada
Bengali
Punjabi
```

The architecture must use translation keys.

Example:

```text
trace.batch
trace.origin
trace.expiry
trace.recall
trace.status
trace.timeline
```

Do not hardcode English strings throughout components.

---

# 50. AUTHENTICATION FLOW

## PHASE 1 STARTS WITH LOGIN FRONTEND.

Roles:

```text
Farmer
Mandi
Warehouse
Processor
Factory
Distributor
Transporter
Retailer
Authority
Admin
```

Login:

```text
Email / Password
```

Optional later:

```text
Phone / OTP
```

Consumer:

```text
No login.
```

---

# 51. AUTH FRONTEND REQUIREMENTS

Login screen:

```text
Farm Tracer logo
Welcome message
Email
Password
Show/hide password
Remember session
Login button
Language selector
Demo role access if enabled
```

After login:

```text
role → correct dashboard
```

Do not trust frontend role hiding for security.

---

# 52. AUTH BACKEND REQUIREMENTS

Use:

```text
Supabase Auth
```

After signup/login:

```text
auth.users
   ↓
profiles
   ↓
organization
   ↓
role
```

RLS must enforce permissions.

Example:

```text
FARMER
→ can create/read own organization batches

PROCESSOR
→ can receive/process assigned batches

AUTHORITY
→ can investigate and recall

ADMIN
→ system administration
```

---

# 53. DATABASE SECURITY

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to browser code.

Frontend uses:

```text
Supabase publishable/anon client key
```

Server-side privileged operations use:

```text
Edge Function
```

where required.

AI keys:

```text
server-side only
```

---

# 54. ENVIRONMENT VARIABLES

Frontend:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Server/Edge:

```text
GEMINI_API_KEY=
OMNIROUTE_API_KEY=
OMNIROUTE_BASE_URL=
AI_MODEL=
```

Never commit real secrets.

Provide:

```text
.env.example
```

---

# 55. PHASED BUILD PLAN

## PHASE 0 — REPOSITORY AUDIT

DO NOT MODIFY CODE YET.

AI agent must inspect:

```text
src/
package.json
server.ts
public/
types/
services/
lib/
pages/
components/
App.tsx
main.tsx
```

Report:

```text
WORKING
PARTIAL
MOCK
BROKEN
MISSING
```

Specifically audit:

```text
Auth
Supabase
IndexedDB
Offline
QR
Lineage
Recall
Maps
AI
Translations
PWA
Routing
Dashboards
```

### Phase 0 success:

A short implementation audit exists.

---

# 56. PHASE 1 — LOGIN FRONTEND

This is the first implementation phase.

Frontend teammate / AI agent builds:

```text
Login page
Role selector if needed
Validation
Loading state
Error state
Responsive layout
Language selector
```

Do NOT connect database yet if the backend is not ready.

Use a temporary controlled auth state only for UI preview.

### Important:

Do not build all dashboards now.

Only:

```text
Login
+
basic protected shell
```

---

# 57. PHASE 1 FRONTEND PROMPT

Give this to the coding agent:

```text
Work on the existing Farm Tracer repository.

Do not rebuild the repository.

Phase 1 only: implement the authentication frontend.

Create a clean responsive Farm Tracer login screen with email, password, validation, loading state, error state, password visibility toggle, language selector, and role-aware visual design.

Create the minimum protected application shell required after login, but do not build the full dashboards yet.

Do not invent a backend.
Do not add another authentication provider.
Do not add unnecessary libraries.
Use the existing React/TypeScript/Tailwind architecture.

First inspect the current routing, App.tsx, components and styling system. Reuse existing components where useful.

After implementation:
1. run the project
2. fix TypeScript/build errors
3. report changed files
4. report how the login UI is reached
5. do not modify unrelated features.
```

---

# 58. PHASE 2 — AUTH BACKEND

After Phase 1 frontend works:

Implement:

```text
Supabase project
Supabase Auth
profiles
organizations
organization_members
RLS
role routing
```

Workflow:

```text
Login
 ↓
Supabase Auth
 ↓
auth.users
 ↓
profiles
 ↓
role
 ↓
dashboard
```

### Phase 2 success:

A real user can:

```text
register/login
logout
refresh page
remain authenticated
receive correct role
```

---

# 59. PHASE 2 BACKEND PROMPT

```text
Phase 2: implement real Supabase authentication for the existing Farm Tracer login UI.

Do not rebuild the frontend.

Create the minimum database structures required for:
profiles
organizations
organization_members

Use Supabase Auth for authentication.

Connect the existing login page to Supabase Auth.

After authentication, retrieve the user's profile and role and route them to the correct protected application shell.

Implement RLS so authorization is not based only on frontend role checks.

Do not expose any service-role key.

First inspect the existing code and current routing before modifying files.

Test:
signup if supported
login
logout
refresh
invalid credentials
role retrieval
protected route access
```

---

# 60. PHASE 3 — BATCH CORE

Build:

```text
products
batches
batch_events
locations
```

First workflow:

```text
Farmer login
 ↓
Create batch
 ↓
Save to Supabase
 ↓
Show batch
```

Required fields:

```text
Product
Quantity
Unit
Harvest/production date
Expiry
Location
Organization
Status
```

---

# 61. PHASE 4 — SUPPLY-CHAIN EVENTS

Create reusable event service:

```text
createEvent()
getBatchEvents()
```

Example:

```text
Farmer
→ HARVEST

Mandi
→ MANDI_RECEIVE

Warehouse
→ STORAGE

Processor
→ PROCESS

Distributor
→ TRANSFER

Retailer
→ RETAIL_RECEIVE
```

Every event must include:

```text
who
what
when
where
batch
```

---

# 62. PHASE 5 — BATCH LINEAGE

Implement:

```text
batch_lineage
```

Operations:

```text
MERGE
SPLIT
TRANSFORM
REPACK
```

First demo:

```text
Wheat A
Wheat B
Wheat C
  ↓
Mandi
  ↓
Maida
  ↓
Biscuit
  ↓
Packaged Biscuit
```

This phase is the most important backend phase.

---

# 63. PHASE 6 — TRACE ENGINE

Create reusable functions:

```text
traceBack(batchId)
traceForward(batchId)
getAncestors(batchId)
getDescendants(batchId)
getFullLineage(batchId)
```

Do not implement separate hardcoded logic for each dashboard.

One trace engine.

---

# 64. PHASE 7 — VISUAL TRACE EXPERIENCE

Create:

```text
Trace View
```

with:

```text
Graph
Timeline
Map
Details
```

This becomes the hero screen.

---

# 65. PHASE 8 — GRAPH

Use existing graph component if viable.

Graph requirements:

```text
zoom
pan
node selection
parent/child highlighting
trace-back
trace-forward
details panel
```

The graph must represent real database lineage.

No fake static graph for the final demo.

---

# 66. PHASE 9 — MAP

Use:

```text
Leaflet
OpenStreetMap
```

Map requirements:

```text
origin
processing
warehouse
transport checkpoints
retailer
route
risk marker
```

Map data must come from trace events/locations.

---

# 67. PHASE 10 — QR

Implement:

```text
Generate QR
Scan QR
Open public trace
```

QR:

```text
/trace/:batchCode
```

Consumer does not log in.

---

# 68. PHASE 11 — CONSUMER TRACE

Public page:

```text
Product
Batch
Origin
Ingredients
Lineage
Timeline
Map
Expiry
Recall
Traceability indicators
```

The consumer should see both:

```text
Simple summary
```

and:

```text
Full trace details
```

---

# 69. PHASE 12 — SHELF LIFE

Implement deterministic engine first.

Inputs:

```text
production date
expiry date
current date
```

Outputs:

```text
days remaining
status
```

Then integrate:

```text
dashboard alerts
retailer alerts
authority alerts
consumer status
```

---

# 70. PHASE 13 — TARGETED RECALL

Implement:

```text
Authority selects affected batch
 ↓
Trace forward
 ↓
Find descendants
 ↓
Find affected locations
 ↓
Create recall
 ↓
Mark affected inventory
 ↓
Notify
 ↓
Consumer QR shows recall
```

This is a hero demo feature.

---

# 71. PHASE 14 — OFFLINE

Only after online core works.

Implement:

```text
IndexedDB
syncQueue
idempotency
retry
network detection
PWA service worker
```

Do not attempt offline sync before the online data model is stable.

---

# 72. PHASE 15 — REALTIME

Use Supabase Realtime for:

```text
recall alerts
expiry alerts
inventory changes
authority actions
```

Do not make the core trace page dependent on realtime.

---

# 73. PHASE 16 — MULTILINGUAL

First:

```text
English
Hindi
Marathi
```

Then remaining languages if time permits.

Priority is consumer/field vocabulary.

---

# 74. PHASE 17 — AI

Only after the core works.

AI features:

```text
Trace summary
Risk explanation
Expiry-risk explanation
Visual inspection
Natural-language investigation
```

---

# 75. AI TRACE SUMMARY

Input:

```text
verified events
lineage
locations
status
expiry
```

Output:

```text
plain-language journey
```

Rules:

```text
AI may summarize.
AI may not invent.
AI may not change database records.
AI may not decide recall alone.
```

---

# 76. AI INVESTIGATION ASSISTANT

Authority can ask:

```text
Why is Batch X risky?
Where did Batch X originate?
Where did Batch X go?
Which retailers are affected?
Which products contain this ingredient?
```

The system should retrieve verified database facts first.

Then AI converts facts into natural language.

Architecture:

```text
Question
 ↓
Database query / trace engine
 ↓
Verified facts
 ↓
AI
 ↓
Explanation
```

Never:

```text
Question
 ↓
AI guesses
```

---

# 77. AI VISUAL INSPECTION

Optional.

Input:

```text
food/product image
```

Output:

```text
Possible mismatch
Possible spoilage indicator
Uncertain
```

Always label:

```text
AI-assisted inspection
Not laboratory certification
```

---

# 78. AI MODEL FALLBACK

AI must be optional.

Recommended:

```text
Primary AI provider
↓
Fallback AI provider
↓
Rule-based fallback
```

If no AI:

```text
Trace summary generated from deterministic templates
```

This makes the demo reliable.

---

# 79. PRODUCT TRANSFORMATION WORKFLOW

Example:

```text
INPUTS

Wheat A = 300 kg
Wheat B = 400 kg
Wheat C = 300 kg

        ↓

MANDI / MILL

        ↓

MAIDA-001 = 850 kg

        ↓

BISCUIT FACTORY

Maida-001
Sugar-001
Oil-001
MilkPowder-001

        ↓

BISCUIT-001

        ↓

PACK-BISCUIT-001
```

The lineage graph must preserve all relationships.

---

# 80. QUANTITY ACCOUNTING

When transforming or splitting batches, record quantities.

Example:

```text
Wheat total = 1000 kg
Maida output = 850 kg
```

The system should not silently create impossible quantities.

For hackathon prototype:

```text
input quantity
output quantity
waste/loss quantity
```

can be recorded.

---

# 81. LINEAGE + QUANTITY

A lineage edge should contain:

```text
parent
child
quantity
operation
```

Example:

```text
WHEAT-A
→ MAIDA-001
300 kg
TRANSFORM
```

This makes the graph useful for recall quantity calculations.

---

# 82. RECALL QUANTITY

When tracing forward:

```text
affected source quantity
```

should be propagated where possible.

Example:

```text
Wheat B = 400 kg
↓
Maida = 340 kg derived
↓
Biscuit = 20,000 packs affected
```

For the prototype, use deterministic stored lineage quantities rather than guessing.

---

# 83. AUDIT LOG

Every important administrative action:

```text
login
batch creation
transfer
merge
split
transform
recall
quarantine
status change
```

should be auditable.

Fields:

```text
actor
action
entity
timestamp
metadata
```

---

# 84. EVENT HASHING

Optional integrity feature.

If retained:

```text
eventHash
previousEventHash
```

must be described as:

```text
tamper-evident hash chain
```

Do not claim:

```text
blockchain
tamper-proof
cryptographically authenticated
```

unless those properties are actually implemented.

---

# 85. DEMO DATASET

Create one deterministic dataset.

```text
FARM-A
300 kg Wheat

FARM-B
400 kg Wheat

FARM-C
300 kg Wheat

        ↓

MANDI-001
1000 kg Wheat

        ↓

MAIDA-001
850 kg

        ↓

BISCUIT-001
        ↓
PACK-001
PACK-002

        ↓
DISTRIBUTOR-A
DISTRIBUTOR-B

        ↓
RETAILER-A
RETAILER-B
```

Ingredients:

```text
MAIDA-001
SUGAR-001
OIL-001
MILKPOWDER-001
```

Final:

```text
BISCUIT-001
```

---

# 86. HERO DEMO STORY

The final demo should be:

## ACT 1 — ORIGIN

Show:

```text
Farmer A
Farmer B
Farmer C
```

Create/record batches.

---

## ACT 2 — MERGE

Show:

```text
3 wheat batches
      ↓
Mandi
      ↓
1 processing batch
```

Graph immediately updates.

---

## ACT 3 — TRANSFORM

Show:

```text
Wheat
 ↓
Maida
 ↓
Biscuit
```

This proves ingredient traceability.

---

## ACT 4 — DISTRIBUTE

Show:

```text
Distributor A
Distributor B
```

Then:

```text
Retailer A
Retailer B
```

---

## ACT 5 — QR

Generate QR.

Scan.

Consumer sees:

```text
Farm
Mandi
Factory
Distributor
Retailer
```

---

## ACT 6 — VISUALIZATION

Switch:

```text
Graph
Timeline
Map
Details
```

---

## ACT 7 — RISK

Introduce:

```text
expiry risk
```

or:

```text
temperature anomaly
```

---

## ACT 8 — RECALL

Mark a source batch as affected.

Click:

```text
Trace Forward
```

System identifies:

```text
affected derived products
affected retailers
affected quantities
```

---

## ACT 9 — CONSUMER

Scan the same QR again.

Now:

```text
⚠ ACTIVE RECALL
```

The consumer sees the updated status.

This is the winning story.

---

# 87. CONSUMER EXPERIENCE

The consumer screen should be extremely simple.

Top:

```text
✓ VERIFIED TRACE
```

Then:

```text
Biscuit
Batch: BSK-001
```

Then:

```text
Origin
Maharashtra
```

Then:

```text
Traceability
7 stages
6 handoffs
4 source batches
```

Then:

```text
Farm → Mandi → Factory → Distributor → Retailer
```

Then:

```text
Expiry
21 days remaining
```

Then:

```text
Recall status
No active recall
```

Then:

```text
View Full Trace
```

---

# 88. CONSUMER RECALL SCREEN

If recalled:

```text
⚠ ACTIVE RECALL

This batch is affected by a recorded
food-safety recall.

Do not consume/use this product.

Recall ID:
RC-2026-001

Affected batch:
BSK-001
```

Do not say:

```text
This product is dangerous
```

unless the authority actually recorded that determination.

---

# 89. AUTHORITY EXPERIENCE

Authority dashboard should focus on:

```text
Active batches
Risk alerts
Expiring batches
Recall cases
Trace search
Lineage graph
Affected locations
Audit logs
```

Search:

```text
Batch ID
QR ID
Product
Organization
```

---

# 90. ADMIN EXPERIENCE

Admin should focus on:

```text
System health
Users
Organizations
Demo dataset
Sync queue
AI status
API status
```

Admin is not the main hero dashboard.

---

# 91. FARMER EXPERIENCE

Keep simple:

```text
Create Batch
My Batches
Generate QR
Record Event
Offline Status
```

Do not overwhelm field users with analytics.

---

# 92. PROCESSOR EXPERIENCE

Main actions:

```text
Receive Batch
Merge
Split
Transform
Quality Check
Generate Child Batch
View Lineage
```

---

# 93. DISTRIBUTOR / TRANSPORTER EXPERIENCE

Main actions:

```text
Scan
Receive
Dispatch
Checkpoint
Temperature
Location
```

---

# 94. RETAILER EXPERIENCE

Main actions:

```text
Receive
Inventory
Scan
Expiry Alerts
Recall Alerts
Sell
```

Expired inventory should be visually obvious.

---

# 95. OFFLINE FIELD EXPERIENCE

A farmer should be able to:

```text
open installed PWA
create batch
record event
see pending status
close/reopen app
```

without internet.

Upon reconnection:

```text
sync
```

must occur.

---

# 96. PWA TEST

A PWA is not complete merely because:

```text
manifest.json exists
```

Test:

```text
HTTPS deployment
install on Android
turn off network
open app
create event
refresh
restore network
sync
```

---

# 97. TESTING RULE

Every phase must have a manual test.

Example:

```text
PHASE 2
Login → logout → refresh

PHASE 3
Create batch → refresh → batch remains

PHASE 5
Merge → graph shows parent/child

PHASE 6
Trace forward → descendants correct

PHASE 10
QR → public page

PHASE 12
Expiry → correct alert

PHASE 13
Recall → only descendants affected

PHASE 14
Offline → pending → reconnect → synced
```

---

# 98. AI CODING RULES

Every AI coding agent must obey:

```text
1. Inspect before changing.
2. Work on one phase only.
3. Do not rebuild the entire app.
4. Do not invent backend responses.
5. Do not fake Supabase persistence.
6. Do not fake offline sync.
7. Do not expose secrets.
8. Do not add unnecessary dependencies.
9. Run TypeScript/build checks.
10. Fix errors before adding features.
11. Preserve working functionality.
12. Report changed files.
13. Report what was actually tested.
14. Do not claim a feature works unless tested.
```

---

# 99. PROMPT FORMAT FOR EVERY PHASE

Every implementation prompt should follow:

```text
CONTEXT
PHASE
GOAL
FILES TO INSPECT
IMPLEMENTATION
NON-GOALS
TESTS
OUTPUT REPORT
```

This prevents AI agents from wandering.

---

# 100. UNIVERSAL AGENT CONTEXT

Paste this before phase-specific prompts when needed:

```text
You are working on Farm Tracer for SKH031 Digital Food Traceability System.

The goal is a real, working food traceability system, not a fake dashboard.

The primary product flow is:

food batch → events → lineage → visual trace → QR → consumer

The architecture is:

React + TypeScript + Vite
Supabase PostgreSQL + Auth + RLS
IndexedDB for offline edge storage
Leaflet + OpenStreetMap for maps
QR generation/scanning
Optional AI through server-side Gemini/OmniRoute

Do not rebuild the repository blindly.

Inspect the existing source before changing it.

Use real database persistence.

Never fake synchronization.

Never expose secrets.

AI is optional and must never be required for core traceability.

Work only on the requested phase.

After implementation:
- run the project
- fix build/type errors
- test the requested flow
- report changed files
- report what works
- report anything still mocked/incomplete
```

---

# 101. FRONTEND → BACKEND HANDOFF WORKFLOW

The team should work like this.

## Step A

Frontend teammate builds:

```text
UI
forms
buttons
states
layout
```

## Step B

You define:

```text
database
queries
services
Supabase
RLS
```

## Step C

Frontend connects to:

```text
service functions
```

not random SQL scattered through components.

Example:

```text
createBatch()
getBatch()
createEvent()
getEvents()
createLineage()
traceBack()
traceForward()
createRecall()
```

---

# 102. YOUR BACKEND RESPONSIBILITY

Your backend work should follow this order:

```text
1. Supabase project
2. Schema
3. Auth
4. Profiles/roles
5. Batches
6. Events
7. Lineage
8. Trace engine
9. Recall engine
10. Offline sync
11. Realtime
12. AI endpoints
```

Do not start with AI.

---

# 103. FRONTEND TEAMMATE RESPONSIBILITY

Frontend teammate should follow:

```text
1. Login
2. Protected shell
3. Batch creation UI
4. Batch list/detail
5. Event forms
6. Trace view
7. Graph
8. Timeline
9. Map
10. QR
11. Consumer page
12. Authority recall UI
13. Alerts
14. Offline indicators
15. Multilingual UI
16. Final polish
```

---

# 104. PHASE-BY-PHASE TEAM FLOW

Do not build frontend and backend completely independently.

Use:

```text
PHASE
 ↓
FRONTEND UI
 ↓
BACKEND CONTRACT
 ↓
SUPABASE IMPLEMENTATION
 ↓
CONNECT
 ↓
TEST
 ↓
COMMIT
 ↓
NEXT PHASE
```

Example:

```text
LOGIN UI
 ↓
AUTH CONTRACT
 ↓
SUPABASE AUTH
 ↓
CONNECT
 ↓
TEST
```

Then:

```text
BATCH UI
 ↓
BATCH SCHEMA
 ↓
CRUD
 ↓
CONNECT
 ↓
TEST
```

---

# 105. API / SERVICE CONTRACT

Frontend should call services like:

```text
authService.login()

batchService.createBatch()

batchService.getBatch()

eventService.createEvent()

eventService.getEvents()

lineageService.mergeBatches()

lineageService.splitBatch()

lineageService.transformBatch()

traceService.traceBack()

traceService.traceForward()

recallService.createRecall()

qrService.generateTraceUrl()
```

Do not put all business logic inside React components.

---

# 106. CORE TRACE API CONCEPT

For a batch:

```text
GET /trace/:batchCode
```

or equivalent Supabase service query.

Response should conceptually contain:

```text
batch
events
ancestors
descendants
locations
recall
expiry
risk
```

The frontend can then render:

```text
Graph
Timeline
Map
Details
```

from one trace model.

---

# 107. SINGLE SOURCE OF TRUTH

The authoritative cloud source is:

```text
Supabase PostgreSQL
```

The local offline source is:

```text
IndexedDB
```

AI is not a source of truth.

Maps are not a source of truth.

The UI is not a source of truth.

QR is not a source of truth.

---

# 108. TRACE DATA MODEL

Conceptually:

```text
TraceResult {
  batch
  sourceBatches[]
  derivedBatches[]
  events[]
  locations[]
  recall?
  expiry
  risk
}
```

The exact TypeScript type should be created during implementation.

---

# 109. EXPIRY + RECALL INTERACTION

If:

```text
EXPIRED
```

the system should flag it.

If:

```text
RECALLED
```

the recall status takes priority.

Consumer should see:

```text
ACTIVE RECALL
```

rather than only:

```text
EXPIRED
```

when both apply.

---

# 110. TRUST INDICATORS

Use transparent indicators:

```text
Trace completeness
Verified events
Recorded handoffs
Known origin
Known expiry
Recall status
Temperature coverage
```

Example:

```text
Trace completeness: 94%

18 verified events
6 custody transfers
4 source batches
1 active location trail
Expiry recorded
No active recall
```

This is more defensible than an unexplained AI score.

---

# 111. DATA QUALITY FLAGS

The system should detect:

```text
missing location
missing expiry
missing custody event
impossible timestamp order
duplicate event
negative quantity
child quantity > available parent quantity
expired batch transferred
recalled batch transferred
```

These can be rule-based.

AI can explain them later.

---

# 112. BASIC ANOMALY ENGINE

Implement deterministic rules first.

Examples:

```text
if expiry_date < today
→ EXPIRED

if expiry_date - today <= threshold
→ EXPIRING_SOON

if recalled = true
→ RECALL_ALERT

if child_quantity > parent_available_quantity
→ LINEAGE_QUANTITY_ERROR

if event_time < previous_event_time
→ TIMELINE_ANOMALY

if temperature outside configured range
→ TEMPERATURE_ANOMALY
```

---

# 113. AI IS AN EXPLANATION LAYER

Good:

```text
Rule engine detects anomaly.
AI explains anomaly.
```

Bad:

```text
AI invents anomaly.
```

---

# 114. VISUAL DESIGN DIRECTION

The product should feel:

```text
agri-tech
food safety
trustworthy
modern
clear
data-driven
```

Avoid:

```text
generic AI dashboard
crypto/blockchain aesthetic
overly neon UI
too many cards
fake enterprise complexity
```

The visual hero should be:

```text
LINEAGE GRAPH
+
MAP
+
TIMELINE
```

---

# 115. LANDING PAGE

Landing page should explain in one sentence:

> Track food from origin to consumer and trace affected products instantly when something goes wrong.

Primary CTA:

```text
Explore Trace
```

Secondary:

```text
Login
```

Consumer QR does not require login.

---

# 116. FINAL INFORMATION ARCHITECTURE

```text
/
├── Landing
│
├── /login
│
├── /app
│   ├── dashboard
│   ├── batches
│   ├── batches/:id
│   ├── trace/:id
│   ├── alerts
│   ├── recalls
│   └── settings
│
└── /trace/:batchCode
    └── public consumer trace
```

Role-specific dashboards can share the same shell.

---

# 117. FINAL TRACE SCREEN STRUCTURE

```text
------------------------------------------------
BATCH: BSK-001
Biscuit
Status: ACTIVE
Expiry: 21 days
------------------------------------------------

[ GRAPH ] [ TIMELINE ] [ MAP ] [ DETAILS ]

------------------------------------------------
SOURCE
Farmer A
Farmer B
Farmer C
------------------------------------------------

PROCESSING
Wheat
→ Maida
→ Biscuit
------------------------------------------------

DISTRIBUTION
Distributor A
Distributor B
------------------------------------------------

RETAIL
Retailer A
Retailer B
------------------------------------------------
```

---

# 118. DETAILS DRAWER

Clicking a node:

```text
BATCH DETAILS

Batch:
BSK-001

Product:
Biscuit

Quantity:
10,000 packets

Derived from:
MAIDA-001

Organization:
Factory X

Created:
15 Aug 2026

Expiry:
15 Nov 2026

Status:
ACTIVE

[TRACE BACK]
[TRACE FORWARD]
[VIEW MAP]
```

---

# 119. RECALL VISUALIZATION

When a recall is initiated:

```text
Affected node
   ↓
RED highlighted descendants
```

Unrelated nodes:

```text
normal
```

This makes the targeted nature immediately understandable to judges.

---

# 120. MAP RECALL VISUALIZATION

After recall:

```text
Affected retailers
   ↓
highlighted

Unaffected retailers
   ↓
normal
```

Display:

```text
Affected locations: 4
Affected batches: 7
Affected quantity: 3,200 units
```

---

# 121. CONSUMER "FULL TRACE" MODE

Two modes:

```text
Simple View
```

and:

```text
Full Trace
```

Simple:

```text
Origin
Journey
Expiry
Recall
Trust indicators
```

Full:

```text
Every event
Every organization
Every transformation
Every source ingredient
Map
Lineage graph
Audit timestamps
```

This directly addresses both normal consumers and detailed investigators.

---

# 122. QR ON FINAL WRAPPER

For the biscuit example:

```text
Physical wrapper
   ↓
QR
   ↓
PACK-BSK-001
   ↓
Public trace
```

The final packaged product can point to the complete upstream lineage.

Therefore the QR is not merely:

```text
product page
```

It is:

```text
entry point into the lineage graph
```

---

# 123. MULTI-LEVEL PRODUCT TRACE

The system must support:

```text
Raw Material
   ↓
Intermediate Ingredient
   ↓
Processed Product
   ↓
Packaged Product
```

Example:

```text
Wheat
 ↓
Flour
 ↓
Maida
 ↓
Biscuit
 ↓
Wrapper
```

This is a key requirement.

---

# 124. PRODUCT / BATCH DISTINCTION

Remember:

```text
Product = what it is
Batch = which specific production lot
```

Example:

```text
Product:
Biscuit

Batch:
BSK-20260827-001
```

QR points to the batch.

---

# 125. VERSIONING

Do not edit historical events destructively.

Prefer:

```text
new corrective event
```

rather than silently changing history.

This is important for auditability.

---

# 126. ERROR HANDLING

Every critical operation needs:

```text
loading
success
failure
retry
```

Examples:

```text
Batch creation failed
Retry

Sync failed
Retry

QR generation failed
Retry

Trace unavailable
Retry
```

Never leave blank screens.

---

# 127. NETWORK FAILURE

If Supabase unavailable:

```text
core offline-capable operations
```

should continue where possible.

If a public consumer trace cannot load:

```text
Show clear error.
Do not fabricate data.
```

---

# 128. DEMO MODE

A controlled demo dataset is allowed.

But clearly separate:

```text
Demo data
```

from:

```text
Live user data
```

Admin may have:

```text
Seed Demo Dataset
Reset Demo Dataset
```

Do not randomly generate the final demo.

---

# 129. FINAL TEST SCENARIO

Run this exact test before presentation.

### Step 1

Login as Farmer A.

### Step 2

Create:

```text
Wheat A
300 kg
```

### Step 3

Create:

```text
Wheat B
400 kg
```

### Step 4

Create:

```text
Wheat C
300 kg
```

### Step 5

Receive at Mandi.

### Step 6

Merge.

### Step 7

Transform:

```text
Wheat → Maida
```

### Step 8

Add:

```text
Sugar
Oil
Milk Powder
```

### Step 9

Transform:

```text
Ingredients → Biscuit
```

### Step 10

Package:

```text
Pack A
Pack B
```

### Step 11

Distribute.

### Step 12

Retail receive.

### Step 13

Generate QR.

### Step 14

Open consumer page.

### Step 15

Show:

```text
Graph
Timeline
Map
Details
```

### Step 16

Introduce source problem.

### Step 17

Trace forward.

### Step 18

Recall affected descendants.

### Step 19

Open QR again.

### Step 20

Consumer sees recall.

---

# 130. OFFLINE TEST

After online scenario works:

```text
Install PWA
↓
Disable network
↓
Create event
↓
Refresh
↓
Event remains
↓
Status = PENDING
↓
Reconnect
↓
Sync
↓
Status = SYNCED
```

---

# 131. FINAL BUILD ORDER

The actual order is:

```text
PHASE 0
Audit

PHASE 1
Login Frontend

PHASE 2
Supabase Auth + RLS

PHASE 3
Batch CRUD

PHASE 4
Supply-chain Events

PHASE 5
Lineage

PHASE 6
Trace Engine

PHASE 7
Trace UI

PHASE 8
Graph

PHASE 9
Map

PHASE 10
QR

PHASE 11
Consumer

PHASE 12
Expiry

PHASE 13
Recall

PHASE 14
Offline

PHASE 15
Realtime

PHASE 16
Languages

PHASE 17
AI

PHASE 18
Testing

PHASE 19
Polish

PHASE 20
Freeze
```

---

# 132. TODAY'S STRICT PRIORITY

If time becomes short:

## STOP AFTER THIS:

```text
Login
↓
Supabase
↓
Batch
↓
Events
↓
Lineage
↓
Trace
↓
Graph
↓
QR
↓
Consumer
```

That is the core MVP.

If additional time:

```text
Map
↓
Expiry
↓
Recall
↓
Offline
```

Then:

```text
AI
```

last.

---

# 133. WHAT TO CUT FIRST

If something is taking too long, cut in this order:

```text
AI visual inspection
AI natural language assistant
Consumer ratings
Advanced analytics
Heat maps
Extra languages
Advanced cryptography
Complex animations
```

Never cut:

```text
Batch
Lineage
Trace
QR
Consumer
Recall
```

---

# 134. WHAT NOT TO DO

Do not:

```text
1. Build 10 dashboards before the backend.
2. Start with AI.
3. Start with animations.
4. Add blockchain.
5. Add paid map APIs.
6. Fake FSSAI integration.
7. Fake IoT.
8. Claim AI detects food safety.
9. Store API keys in frontend.
10. Mark offline records synced before confirmation.
11. Build only a linear timeline.
12. Lose ingredient lineage.
13. Recall every product.
14. Make consumer login mandatory.
15. Allow AI to invent trace events.
```

---

# 135. JUDGE-FOCUSED VALUE

The judge should understand these five points quickly:

```text
1. Every batch has a digital identity.
2. Every movement is recorded.
3. Food can merge, split and transform.
4. The entire lineage can be visualized.
5. A contaminated source can be traced forward to only affected products.
```

Then:

```text
Offline
QR
Maps
Expiry
AI
```

become supporting advantages.

---

# 136. WINNING ONE-LINER

> **Farm Tracer connects every food batch from origin to consumer, preserves ingredient-to-product lineage across real supply-chain transformations, and lets authorities trace and recall only the products actually affected.**

---

# 137. SHORT PITCH

> Food doesn't travel in a straight line. It gets mixed, processed, split, repackaged and distributed. Farm Tracer models that real-world lineage from farm to final product. Every batch gets a traceable identity, every movement is recorded, and a QR code lets consumers inspect the journey. When a problem is detected, authorities can trace the affected batch forward through the lineage graph and recall only the products that actually came from it.

---

# 138. CORE ARCHITECTURE

```text
                    ┌───────────────────┐
                    │   React PWA       │
                    │                   │
                    │ Login             │
                    │ Dashboards        │
                    │ Trace Graph       │
                    │ Map               │
                    │ QR                │
                    │ Consumer Page     │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Service Layer     │
                    │                   │
                    │ Auth              │
                    │ Batch             │
                    │ Events            │
                    │ Lineage           │
                    │ Trace             │
                    │ Recall            │
                    └─────────┬─────────┘
                              │
                 ┌────────────▼────────────┐
                 │        Supabase         │
                 │                         │
                 │ PostgreSQL              │
                 │ Auth                    │
                 │ RLS                     │
                 │ Realtime                │
                 │ Storage                 │
                 └────────────┬────────────┘
                              │
                   ┌──────────▼──────────┐
                   │ IndexedDB Edge Store│
                   │ Offline Queue       │
                   └─────────────────────┘

Optional:

Supabase/Server
      ↓
Gemini / OmniRoute
      ↓
AI explanation
```

---

# 139. CORE DATABASE RELATIONSHIP

```text
organizations
      │
      ├──────── profiles
      │
      └──────── batches
                    │
                    ├──────── batch_events
                    │
                    ├──────── batch_lineage
                    │             │
                    │             └── other batches
                    │
                    └──────── recalls
```

---

# 140. CORE BUSINESS RULE

The entire application can be reduced to:

```text
A batch exists.
A batch moves.
A batch can change.
A batch can create other batches.
Those relationships are preserved.
The system can traverse those relationships.
```

That is Farm Tracer.

---

# 141. FINAL AGENT INSTRUCTION

Before every code change, the agent must ask itself:

```text
Does this make real traceability better?
Does this preserve lineage?
Does this create real data?
Can this be tested?
Does this work without AI?
Does this work within our free-first constraint?
```

If the answer is no:

```text
Do not prioritize it.
```

---

# 142. FINAL DEFINITION OF DONE

The project is ready for the hackathon when a judge can perform:

```text
LOGIN
  ↓
CREATE BATCH
  ↓
MOVE BATCH
  ↓
MERGE / TRANSFORM
  ↓
CREATE FINAL PRODUCT
  ↓
GENERATE QR
  ↓
SCAN QR
  ↓
SEE FULL TRACE
  ↓
GRAPH
  ↓
MAP
  ↓
TIMELINE
  ↓
DETAILS
  ↓
INTRODUCE RISK
  ↓
TRACE FORWARD
  ↓
RECALL
  ↓
CONSUMER SEES UPDATED STATUS
```

And, ideally:

```text
OFFLINE
  ↓
PENDING
  ↓
RECONNECT
  ↓
SYNCED
```

---

# 143. FINAL RULE

## DO NOT TRY TO WIN WITH THE MOST FEATURES.

Win with:

```text
REAL DATA
+
REAL LINEAGE
+
REAL TRACEABILITY
+
REAL QR
+
REAL RECALL
+
REAL OFFLINE SYNC
+
CLEAR VISUALIZATION
+
RELIABLE DEMO
```

The product should make a judge say:

> "If this batch is contaminated, I can actually see where it came from and where it went."

That is the core.

---

# 144. FINAL PROJECT MANTRA

```text
TRACK THE BATCH.
TRACE THE LINEAGE.
SHOW THE JOURNEY.
PROTECT THE CONSUMER.
RECALL ONLY WHAT'S AFFECTED.
```

