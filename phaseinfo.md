**\# 55\. PHASED BUILD PLAN**

**\#\# PHASE 0 — REPOSITORY AUDIT**

DO NOT MODIFY CODE YET.

AI agent must inspect:

\`\`\`text  
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
\`\`\`

Report:

\`\`\`text  
WORKING  
PARTIAL  
MOCK  
BROKEN  
MISSING  
\`\`\`

Specifically audit:

\`\`\`text  
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
\`\`\`

**\#\#\# Phase 0 success:**

A short implementation audit exists.

**\---**

**\# 56\. PHASE 1 — LOGIN FRONTEND**

This is the first implementation phase.

Frontend teammate / AI agent builds:

\`\`\`text  
Login page  
Role selector if needed  
Validation  
Loading state  
Error state  
Responsive layout  
Language selector  
\`\`\`

Do NOT connect database yet if the backend is not ready.

Use a temporary controlled auth state only for UI preview.

**\#\#\# Important:**

Do not build all dashboards now.

Only:

\`\`\`text  
Login  
\+  
basic protected shell  
\`\`\`

**\---**

**\# 57\. PHASE 1 FRONTEND PROMPT**

Give this to the coding agent:

\`\`\`text  
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
1\. run the project  
2\. fix TypeScript/build errors  
3\. report changed files  
4\. report how the login UI is reached  
5\. do not modify unrelated features.  
\`\`\`

**\---**

**\# 58\. PHASE 2 — AUTH BACKEND**

After Phase 1 frontend works:

Implement:

\`\`\`text  
Supabase project  
Supabase Auth  
profiles  
organizations  
organization\_members  
RLS  
role routing  
\`\`\`

Workflow:

\`\`\`text  
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
\`\`\`

**\#\#\# Phase 2 success:**

A real user can:

\`\`\`text  
register/login  
logout  
refresh page  
remain authenticated  
receive correct role  
\`\`\`

**\---**

**\# 59\. PHASE 2 BACKEND PROMPT**

\`\`\`text  
Phase 2: implement real Supabase authentication for the existing Farm Tracer login UI.

Do not rebuild the frontend.

Create the minimum database structures required for:  
profiles  
organizations  
organization\_members

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
\`\`\`

**\---**

**\# 60\. PHASE 3 — BATCH CORE**

Build:

\`\`\`text  
products  
batches  
batch\_events  
locations  
\`\`\`

First workflow:

\`\`\`text  
Farmer login  
 ↓  
Create batch  
 ↓  
Save to Supabase  
 ↓  
Show batch  
\`\`\`

Required fields:

\`\`\`text  
Product  
Quantity  
Unit  
Harvest/production date  
Expiry  
Location  
Organization  
Status  
\`\`\`

**\---**

**\# 61\. PHASE 4 — SUPPLY-CHAIN EVENTS**

Create reusable event service:

\`\`\`text  
createEvent()  
getBatchEvents()  
\`\`\`

Example:

\`\`\`text  
Farmer  
→ HARVEST

Mandi  
→ MANDI\_RECEIVE

Warehouse  
→ STORAGE

Processor  
→ PROCESS

Distributor  
→ TRANSFER

Retailer  
→ RETAIL\_RECEIVE  
\`\`\`

Every event must include:

\`\`\`text  
who  
what  
when  
where  
batch  
\`\`\`

**\---**

**\# 62\. PHASE 5 — BATCH LINEAGE**

Implement:

\`\`\`text  
batch\_lineage  
\`\`\`

Operations:

\`\`\`text  
MERGE  
SPLIT  
TRANSFORM  
REPACK  
\`\`\`

First demo:

\`\`\`text  
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
\`\`\`

This phase is the most important backend phase.

**\---**

**\# 63\. PHASE 6 — TRACE ENGINE**

Create reusable functions:

\`\`\`text  
traceBack(batchId)  
traceForward(batchId)  
getAncestors(batchId)  
getDescendants(batchId)  
getFullLineage(batchId)  
\`\`\`

Do not implement separate hardcoded logic for each dashboard.

One trace engine.

**\---**

**\# 64\. PHASE 7 — VISUAL TRACE EXPERIENCE**

Create:

\`\`\`text  
Trace View  
\`\`\`

with:

\`\`\`text  
Graph  
Timeline  
Map  
Details  
\`\`\`

This becomes the hero screen.

**\---**

**\# 65\. PHASE 8 — GRAPH**

Use existing graph component if viable.

Graph requirements:

\`\`\`text  
zoom  
pan  
node selection  
parent/child highlighting  
trace-back  
trace-forward  
details panel  
\`\`\`

The graph must represent real database lineage.

No fake static graph for the final demo.

**\---**

**\# 66\. PHASE 9 — MAP**

Use:

\`\`\`text  
Leaflet  
OpenStreetMap  
\`\`\`

Map requirements:

\`\`\`text  
origin  
processing  
warehouse  
transport checkpoints  
retailer  
route  
risk marker  
\`\`\`

Map data must come from trace events/locations.

**\---**

**\# 67\. PHASE 10 — QR**

Implement:

\`\`\`text  
Generate QR  
Scan QR  
Open public trace  
\`\`\`

QR:

\`\`\`text  
/trace/:batchCode  
\`\`\`

Consumer does not log in.

**\---**

**\# 68\. PHASE 11 — CONSUMER TRACE**

Public page:

\`\`\`text  
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
\`\`\`

The consumer should see both:

\`\`\`text  
Simple summary  
\`\`\`

and:

\`\`\`text  
Full trace details  
\`\`\`

**\---**

**\# 69\. PHASE 12 — SHELF LIFE**

Implement deterministic engine first.

Inputs:

\`\`\`text  
production date  
expiry date  
current date  
\`\`\`

Outputs:

\`\`\`text  
days remaining  
status  
\`\`\`

Then integrate:

\`\`\`text  
dashboard alerts  
retailer alerts  
authority alerts  
consumer status  
\`\`\`

**\---**

**\# 70\. PHASE 13 — TARGETED RECALL**

Implement:

\`\`\`text  
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
\`\`\`

This is a hero demo feature.

**\---**

**\# 71\. PHASE 14 — OFFLINE**

Only after online core works.

Implement:

\`\`\`text  
IndexedDB  
syncQueue  
idempotency  
retry  
network detection  
PWA service worker  
\`\`\`

Do not attempt offline sync before the online data model is stable.

**\---**

**\# 72\. PHASE 15 — REALTIME**

Use Supabase Realtime for:

\`\`\`text  
recall alerts  
expiry alerts  
inventory changes  
authority actions  
\`\`\`

Do not make the core trace page dependent on realtime.

**\---**

**\# 73\. PHASE 16 — MULTILINGUAL**

First:

\`\`\`text  
English  
Hindi  
Marathi  
\`\`\`

Then remaining languages if time permits.

Priority is consumer/field vocabulary.

**\---**

**\# 74\. PHASE 17 — AI**

Only after the core works.

AI features:

\`\`\`text  
Trace summary  
Risk explanation  
Expiry-risk explanation  
Visual inspection  
Natural-language investigation  
\`\`\`

**\---**  
