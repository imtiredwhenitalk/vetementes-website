import pool from './connection';
import fs from 'fs';
import path from 'path';

const migrate = async () => {
  try {
    console.log('🔄 Starting database migration...');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(schema);

    console.log('✅ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
