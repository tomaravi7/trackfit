import { Pool } from 'pg';

// Global cache for database pools to prevent memory leaks and multiple connections in serverless environments
interface GlobalPools {
  [key: string]: Pool;
}

declare global {
  var _postgresPools: GlobalPools | undefined;
}

const pools: GlobalPools = globalThis._postgresPools || {};
if (process.env.NODE_ENV !== 'production') {
  globalThis._postgresPools = pools;
}

// MD5 or simple string hashing helper to safely key pools in our global cache
function getPoolKey(connectionString: string): string {
  // A simple hashing function is sufficient
  let hash = 0;
  for (let i = 0; i < connectionString.length; i++) {
    const chr = connectionString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return `pool_${hash}`;
}

export async function getDbPool(connectionString: string): Promise<Pool> {
  if (!connectionString) {
    throw new Error('Database connection string is required');
  }

  // Fix WSL/Windows IPv6 issue: rewrite localhost → 127.0.0.1
  // When running Postgres inside WSL, 'localhost' resolves to ::1 (IPv6)
  // but Postgres typically only listens on 127.0.0.1 (IPv4)
  const normalizedConnString = connectionString.replace(
    /(@localhost)(:\d+\/)/,
    '@127.0.0.1$2'
  );

  const key = getPoolKey(normalizedConnString);

  if (!pools[key]) {
    // Instantiate a new connection pool
    const pool = new Pool({
      connectionString: normalizedConnString,
      ssl: normalizedConnString.includes('neon.tech') || normalizedConnString.includes('supabase') || normalizedConnString.includes('render.com')
        ? { rejectUnauthorized: false } // Required for cloud hosted DBs like Neon/Supabase/Render
        : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pools[key] = pool;
  }

  const pool = pools[key];

  // Test the connection and initialize tables if they don't exist
  await initializeSchema(pool);

  return pool;
}

async function initializeSchema(pool: Pool) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create user_goals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_goals (
        id SERIAL PRIMARY KEY,
        calories INTEGER DEFAULT 2000,
        protein INTEGER DEFAULT 130,
        carbs INTEGER DEFAULT 220,
        fiber INTEGER DEFAULT 30,
        fat INTEGER DEFAULT 65,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default goals if table is empty
    const goalsCheck = await client.query('SELECT COUNT(*) FROM user_goals');
    if (parseInt(goalsCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO user_goals (calories, protein, carbs, fiber, fat)
        VALUES (2000, 130, 220, 30, 65)
      `);
    }

    // Create workouts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS workouts (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        exercise_name VARCHAR(255) NOT NULL,
        weight NUMERIC NOT NULL,
        reps INTEGER NOT NULL,
        set_number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for workouts
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_workouts_date ON workouts(date)
    `);

    // Create food_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS food_logs (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        food_name VARCHAR(255) NOT NULL,
        quantity NUMERIC NOT NULL,
        calories NUMERIC NOT NULL,
        protein NUMERIC NOT NULL,
        carbs NUMERIC NOT NULL,
        fiber NUMERIC NOT NULL,
        fat NUMERIC NOT NULL,
        meal_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for food_logs
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_food_logs_date ON food_logs(date)
    `);

    // Create weight_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS weight_logs (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL UNIQUE,
        weight NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for weight_logs
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_weight_logs_date ON weight_logs(date)
    `);

    // Create water_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS water_logs (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        amount_ml INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for water_logs
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_water_logs_date ON water_logs(date)
    `);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database schema:', error);
    throw error;
  } finally {
    client.release();
  }
}
