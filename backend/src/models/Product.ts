import pool from '../database/connection';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  price: number;
  original_price?: number;
  sku?: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_sale: boolean;
  badge?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size?: string;
  color_name?: string;
  color_hex?: string;
  stock_quantity: number;
  price_adjustment: number;
}

export class ProductModel {
  static async findAll(filters?: {
    category?: string;
    is_active?: boolean;
    is_featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (filters?.category) {
      query += ` AND category_id = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters?.is_active !== undefined) {
      query += ` AND is_active = $${paramCount}`;
      values.push(filters.is_active);
      paramCount++;
    }

    if (filters?.is_featured !== undefined) {
      query += ` AND is_featured = $${paramCount}`;
      values.push(filters.is_featured);
      paramCount++;
    }

    if (filters?.search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
      paramCount++;
    }

    if (filters?.offset) {
      query += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
    }

    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id: string): Promise<Product | null> {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findBySlug(slug: string): Promise<Product | null> {
    const result = await pool.query('SELECT * FROM products WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  static async create(productData: Partial<Product>): Promise<Product> {
    const {
      name, slug, description, category_id, price, original_price,
      sku, stock_quantity, is_active, is_featured, is_new, is_sale, badge
    } = productData;

    const result = await pool.query(
      `INSERT INTO products 
       (name, slug, description, category_id, price, original_price, sku, 
        stock_quantity, is_active, is_featured, is_new, is_sale, badge)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [name, slug, description, category_id, price, original_price, sku,
       stock_quantity ?? 0, is_active ?? true, is_featured ?? false,
       is_new ?? false, is_sale ?? false, badge]
    );

    return result.rows[0];
  }

  static async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const fields = Object.keys(updates)
      .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = Object.values(updates).filter((_, index) =>
      !['id', 'created_at', 'updated_at'].includes(Object.keys(updates)[index])
    );

    if (fields.length === 0) return null;

    const result = await pool.query(
      `UPDATE products SET ${fields} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async getVariants(productId: string): Promise<ProductVariant[]> {
    const result = await pool.query(
      'SELECT * FROM product_variants WHERE product_id = $1 ORDER BY size, color_name',
      [productId]
    );
    return result.rows;
  }

  static async getImages(productId: string): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM product_images WHERE product_id = $1 ORDER BY sort_order, is_primary DESC',
      [productId]
    );
    return result.rows;
  }

  static async updateStock(id: string, quantity: number): Promise<void> {
    await pool.query(
      'UPDATE products SET stock_quantity = stock_quantity + $2 WHERE id = $1',
      [id, quantity]
    );
  }
}
