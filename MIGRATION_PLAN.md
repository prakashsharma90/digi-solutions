# Vercel Postgres Integration Plan

We will migrate from JSON file storage to Vercel Postgres for permanent, scalable data storage.

## 1. Environment Setup
- Install `@vercel/postgres`.
- Define database connection utility.
- Add instructions for the user to create the Postgres instance in the Vercel Dashboard and link it.

## 2. Table Schemas
We need tables for:
- `leads`
- `services`
- `blogs`
- `pricing`
- `case_studies`

## 3. Database Utility (`src/lib/postgres.ts`)
Create a utility to:
- Connect to Postgres.
- Initialize tables if they don't exist.
- provide CRUD helpers (or use raw SQL with `@vercel/postgres` `sql` tag).

## 4. Migration Strategy
- Create a temporary API route `/api/db/init` to create tables.
- Update API routes to prefer Postgres but fallback to JSON (or just switch completely).

## 5. Deployment
- Push changes.
- Ensure Vercel environment variables are set.
