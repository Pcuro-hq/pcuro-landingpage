#!/usr/bin/env node

/**
 * Database Migration Runner
 * Converts Waitlist table from SERIAL to UUID
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function runMigration() {
  console.log('🔄 Starting UUID migration...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Read the migration SQL file
    const sqlPath = path.join(__dirname, 'migrate_to_uuid.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Remove the \d command as it's psql-specific
    const cleanSql = sql.split('\n')
      .filter(line => !line.trim().startsWith('\\d'))
      .join('\n');

    // Execute the migration
    await pool.query(cleanSql);

    console.log('✅ Migration completed successfully!\n');
    console.log('Changes applied:');
    console.log('  • Enabled pgcrypto extension');
    console.log('  • Converted id column from SERIAL to UUID');
    console.log('  • Generated UUIDs for existing records');
    console.log('  • Set UUID column as primary key\n');

    // Verify the change
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Waitlist' AND column_name = 'id'
    `);

    if (result.rows[0]?.data_type === 'uuid') {
      console.log('✅ Verification: ID column is now UUID type');
    } else {
      console.warn('⚠️  Warning: Could not verify UUID type');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the migration
runMigration();
