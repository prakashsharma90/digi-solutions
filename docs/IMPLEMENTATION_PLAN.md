# Digihub Solutions Implementation Plan

Based on the [Agency Workflow](./AGENCY_WORKFLOW.md), this plan outlines the phases to build the complete operating system for Digihub Solutions.

## ✅ Phase 1: Lead Management 2.0 (Immediate Priority)
Refining the entry point to capture and manage high-quality leads.
- [ ] **Database Schema Update:**
    - [ ] Add `status` enum (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Closed Won`, `Closed Lost`).
    - [ ] Add qualification fields: `budget_range`, `business_size`, `timeline`, `company_name`.
    - [ ] Add `assigned_to` (User ID) and `notes` columns.
- [ ] **Admin Leads Dashboard:**
    - [ ] Update Kanban/List view to support new statuses.
    - [ ] Add "Quick Edit" for Status.
    - [ ] Add "Lead Details" view to see/edit qualification info.
- [ ] **Public Form Update:**
    - [ ] (Optional) Add 'Budget' and 'Company' fields to the contact form? (Or keep it simple and qualify later).
    - [ ] Ensure API handles the new fields.

## ⏳ Phase 2: Client & Project Management
Transitioning from Lead to Client.
- [ ] **Database:** Create `clients` and `projects` tables.
- [ ] **Admin:** "Convert to Client" button on Leads.
- [ ] **Onboarding:** Simple form to capture `business_info`, `assets_link`.

## ⏳ Phase 3: Service Execution & Tasks
Managing the work.
- [ ] **Database:** Create `tasks` table linked to Projects.
- [ ] **Admin:** Task Board (Kanban) for `In Progress`, `Review`, `Done`.
- [ ] **Roles:** Basic RBAC (Super Admin vs. Team Member).

## ⏳ Phase 4: Content & Blog Engine (Enhanced)
- [ ] Ensure Blog Workflow (Draft -> Publish) is robust.
- [ ] Add SEO fields (meta title, desc) to Database if missing.

## ⏳ Phase 5: Reporting & Dashboard
- [ ] Admin Home: High-level stats (Total Leads, Active Clients, Revenue).
- [ ] Client View (Optional): Restricted view for clients to see their report?

---

## Current Focus: Phase 1 (Leads)
We will begin by updating the `leads` table schema to support the new workflow requirements.
