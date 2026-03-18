import pool from '../database/connection';

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  status: 'pending' | 'processing' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  customer_email: string;
  customer_phone?: string;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  shipping_address: any;
  billing_address?: any;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  variant_id?: string;
  product_name: string;
  variant_details?: any;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export class OrderModel {
  static async create(orderData: {
    user_id?: string;
    customer_email: string;
    customer_phone?: string;
    items: Array<{
      product_id: string;
      variant_id?: string;
      quantity: number;
      unit_price: number;
    }>;
    shipping_address: any;
    billing_address?: any;
    shipping_cost: number;
    payment_method?: string;
  }): Promise<Order> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Calculate totals
      const subtotal = orderData.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
      const tax_amount = subtotal * 0.1; // 10% tax
      const total_amount = subtotal + orderData.shipping_cost + tax_amount;

      // Generate order number
      const order_number = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders 
         (order_number, user_id, customer_email, customer_phone, subtotal, 
          shipping_cost, tax_amount, total_amount, shipping_address, billing_address, payment_method)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          order_number,
          orderData.user_id,
          orderData.customer_email,
          orderData.customer_phone,
          subtotal,
          orderData.shipping_cost,
          tax_amount,
          total_amount,
          JSON.stringify(orderData.shipping_address),
          orderData.billing_address ? JSON.stringify(orderData.billing_address) : null,
          orderData.payment_method
        ]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of orderData.items) {
        // Get product details
        const productResult = await client.query(
          'SELECT name FROM products WHERE id = $1',
          [item.product_id]
        );
        
        const product = productResult.rows[0];
        const total_price = item.unit_price * item.quantity;

        await client.query(
          `INSERT INTO order_items 
           (order_id, product_id, variant_id, product_name, quantity, unit_price, total_price)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [order.id, item.product_id, item.variant_id, product.name, item.quantity, item.unit_price, total_price]
        );

        // Update stock
        await client.query(
          'UPDATE products SET stock_quantity = stock_quantity - $2 WHERE id = $1',
          [item.product_id, item.quantity]
        );
      }

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findById(id: string): Promise<Order | null> {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const result = await pool.query('SELECT * FROM orders WHERE order_number = $1', [orderNumber]);
    return result.rows[0] || null;
  }

  static async findByUser(userId: string, limit: number = 20): Promise<Order[]> {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );
    return result.rows;
  }

  static async getItems(orderId: string): Promise<OrderItem[]> {
    const result = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [orderId]
    );
    return result.rows;
  }

  static async updateStatus(id: string, status: Order['status']): Promise<Order | null> {
    const result = await pool.query(
      'UPDATE orders SET status = $2 WHERE id = $1 RETURNING *',
      [id, status]
    );
    return result.rows[0] || null;
  }

  static async updatePaymentStatus(id: string, paymentStatus: Order['payment_status']): Promise<void> {
    await pool.query(
      'UPDATE orders SET payment_status = $2 WHERE id = $1',
      [id, paymentStatus]
    );
  }

  static async addTracking(id: string, trackingNumber: string, trackingUrl?: string): Promise<void> {
    await pool.query(
      'UPDATE orders SET tracking_number = $2, tracking_url = $3, shipped_at = CURRENT_TIMESTAMP WHERE id = $1',
      [id, trackingNumber, trackingUrl]
    );
  }
}
