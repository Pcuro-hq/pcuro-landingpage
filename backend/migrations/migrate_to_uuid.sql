-- Migration: Convert Waitlist table from SERIAL to UUID
-- This script will:
-- 1. Create a new UUID column
-- 2. Generate UUIDs for existing records
-- 3. Drop the old id column
-- 4. Rename the new UUID column to id

-- Step 1: Add pgcrypto extension for UUID generation (if not exists)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Step 2: Add new UUID column with default values
ALTER TABLE "Waitlist" ADD COLUMN "id_uuid" UUID DEFAULT gen_random_uuid();

-- Step 3: Generate UUIDs for all existing records (if any)
UPDATE "Waitlist" SET "id_uuid" = gen_random_uuid() WHERE "id_uuid" IS NULL;

-- Step 4: Drop the old SERIAL id column
ALTER TABLE "Waitlist" DROP CONSTRAINT "Waitlist_pkey";
ALTER TABLE "Waitlist" DROP COLUMN "id";

-- Step 5: Rename the UUID column to id
ALTER TABLE "Waitlist" RENAME COLUMN "id_uuid" TO "id";

-- Step 6: Set the UUID column as primary key with NOT NULL constraint
ALTER TABLE "Waitlist" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "Waitlist" ADD PRIMARY KEY ("id");

-- Verify the change
\d "Waitlist"
