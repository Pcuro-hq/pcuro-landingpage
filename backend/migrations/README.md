# Database Migration to UUID

This migration converts the `Waitlist` table's `id` column from auto-incrementing integers (SERIAL) to UUIDs for improved security.

## Why UUID?

- **Security**: Prevents ID enumeration attacks
- **Privacy**: Hides business metrics (signup counts)
- **Unpredictable**: Cannot guess other users' IDs

## Running the Migration

### Option 1: Using psql (Recommended)

```bash
psql $DATABASE_URL -f migrations/migrate_to_uuid.sql
```

### Option 2: Using Node.js script

```bash
node -e "
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sql = fs.readFileSync('./migrations/migrate_to_uuid.sql', 'utf8');

pool.query(sql)
  .then(() => {
    console.log('✅ Migration completed successfully');
    pool.end();
  })
  .catch(err => {
    console.error('❌ Migration failed:', err);
    pool.end();
    process.exit(1);
  });
"
```

### Option 3: Manually via Database Client

1. Connect to your Neon PostgreSQL database
2. Copy and paste the contents of `migrate_to_uuid.sql`
3. Execute the SQL commands

## What This Migration Does

1. ✅ Enables `pgcrypto` extension for UUID generation
2. ✅ Adds new `id_uuid` column with auto-generated UUIDs
3. ✅ Generates UUIDs for all existing records
4. ✅ Drops the old SERIAL `id` column
5. ✅ Renames `id_uuid` to `id`
6. ✅ Sets `id` as PRIMARY KEY

## Important Notes

⚠️ **This migration is destructive** - it drops the old `id` column. Make sure you:
- Have a database backup
- Are not using the old integer IDs anywhere else
- Run this migration during low-traffic periods

## Rollback

If you need to rollback (before running the migration):
1. Restore from your database backup
2. Revert the repository code changes

## After Migration

The application code has been updated to:
- Handle UUIDs natively (no more `.toString()` conversions)
- Validate UUID format in `findById()`
- Auto-generate UUIDs on insert

All existing functionality remains the same - only the ID format changes.
