import { Pool } from 'pg';
import dotenv from 'dotenv';
import { mockPool } from './mock';

dotenv.config();

let pool: Pool | any;
let usingMock = false;

try {
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'vetementes_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on('connect', () => {
    console.log('📦 Database pool connected');
  });

  pool.on('error', (err: Error) => {
    console.error('⚠️  Database error, falling back to mock database:', err.message);
    usingMock = true;
    pool = mockPool;
  });

  // Test connection
  pool.query('SELECT NOW()').catch((err: any) => {
    console.warn('⚠️  PostgreSQL not available, using mock database for development');
    usingMock = true;
    pool = mockPool;
  });

} catch (err) {
  console.warn('⚠️  Could not initialize PostgreSQL, using mock database');
  usingMock = true;
  pool = mockPool;
}

export { pool, usingMock };
export default pool;
