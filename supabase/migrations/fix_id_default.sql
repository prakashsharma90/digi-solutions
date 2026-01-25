-- FIX: ID column missing default value generator
-- This ensures 'id' is automatically generated when inserting new rows

-- 1. Ensure the ID column has a default value
ALTER TABLE services ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2. If for some reason gen_random_uuid() is not available (older pg versions), try uuid_generate_v4()
-- You likely don't need this if the above works, but just in case:
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- ALTER TABLE services ALTER COLUMN id SET DEFAULT uuid_generate_v4();
