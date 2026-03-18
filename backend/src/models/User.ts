import pool from '../database/connection';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'customer' | 'admin' | 'manager';
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async create(userData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }): Promise<User> {
    const password_hash = await bcrypt.hash(userData.password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, phone, role, is_verified, created_at, updated_at`,
      [userData.email, password_hash, userData.first_name, userData.last_name, userData.phone]
    );
    
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  static async findById(id: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, phone, role, is_verified, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    const fields = Object.keys(updates)
      .filter(key => key !== 'id' && key !== 'password_hash')
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = Object.values(updates).filter((_, index) => 
      Object.keys(updates)[index] !== 'id' && Object.keys(updates)[index] !== 'password_hash'
    );
    
    if (fields.length === 0) return null;
    
    const result = await pool.query(
      `UPDATE users SET ${fields} WHERE id = $1 
       RETURNING id, email, first_name, last_name, phone, role, is_verified, created_at, updated_at`,
      [id, ...values]
    );
    
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async updateLastLogin(id: string): Promise<void> {
    await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    if (!user.password_hash) return false;
    return bcrypt.compare(password, user.password_hash);
  }
}
