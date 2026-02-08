const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

async function run() {
  // Build pool from DATABASE_URL or individual PG env vars
  let pool;
  const schemaPath = path.resolve(__dirname, '..', 'database', 'schema.sql');
  try {
    if (process.env.DATABASE_URL) {
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
    } else {
      const user = process.env.PGUSER || process.env.POSTGRES_USER;
      const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
      const host = process.env.PGHOST || process.env.POSTGRES_HOST || 'localhost';
      const port = process.env.PGPORT || process.env.POSTGRES_PORT || 5432;
      const database = process.env.PGDATABASE || process.env.POSTGRES_DB;

      if (!user || !password || !database) {
        console.error('Missing database configuration. Provide DATABASE_URL or PGUSER/PGPASSWORD/PGDATABASE.');
        process.exit(1);
      }

      // Ensure password is a string (pg requires string)
      const cfg = {
        user,
        password: typeof password === 'string' ? password : String(password),
        host,
        port: Number(port),
        database,
      };
      pool = new Pool(cfg);
    }

    const sql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Running schema from', schemaPath);
    // The schema file may contain multiple statements; execute as a single query
    await pool.query(sql);
    console.log('Schema applied successfully');
  } catch (err) {
    if (err && err.message && err.message.includes('Client password must be a string')) {
      console.error('Database password is invalid: ensure PGPASSWORD/POSTGRES_PASSWORD is a string.');
    }
    console.error('Failed to apply schema:', err);
    process.exitCode = 1;
  } finally {
    if (pool) await pool.end();
  }
}

run();

