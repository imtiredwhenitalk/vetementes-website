// Mock Database for Development (when PostgreSQL is not available)
// This provides an in-memory database that simulates the PostgreSQL pool interface

let mockDatabase: any = {
  users: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@vetementes.com',
      password: '$2a$10$...' // Mock bcrypt hash
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'user@example.com',
      password: '$2a$10$...'
    }
  ],
  products: [
    {
      id: '550e8400-e29b-41d4-a716-446655440101',
      name: 'Classic Hoodie',
      description: 'Comfortable and stylish hoodie',
      price: 7999,
      image_url: 'https://images.unsplash.com/photo-1556821552-5b0d5b8e44c2',
      category: 'hoodies',
      colors: ['#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1'],
      stock: 50
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440102',
      name: 'Sport T-Shirt',
      description: 'Breathable sports t-shirt',
      price: 4999,
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      category: 't-shirts',
      colors: ['#000000', '#FFFFFF', '#FF6B6B'],
      stock: 100
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440103',
      name: 'Premium Pants',
      description: 'High-quality durable pants',
      price: 9999,
      image_url: 'https://images.unsplash.com/photo-1542272604-787c62d465d1',
      category: 'pants',
      colors: ['#000000', '#2E3440', '#8B4513'],
      stock: 40
    }
  ],
  orders: [],
  carts: [],
  reviews: [],
  wishlist: []
};

export class MockPool {
  async query(text: string, values?: any[]): Promise<any> {
    console.log('🔄 Mock Query:', text.substring(0, 50) + '...');
    
    // Mock SELECT * FROM products
    if (text.includes('SELECT') && text.includes('products') && !text.includes('WHERE')) {
      return { rows: mockDatabase.products, rowCount: mockDatabase.products.length };
    }
    
    // Mock SELECT * FROM products WHERE id
    if (text.includes('SELECT') && text.includes('products') && text.includes('WHERE')) {
      const product = mockDatabase.products.find((p: any) => p.id === values?.[0]);
      return { rows: product ? [product] : [], rowCount: product ? 1 : 0 };
    }
    
    // Mock INSERT
    if (text.includes('INSERT')) {
      const newItem = { id: Math.random().toString(36).substr(2, 9), ...values };
      if (text.includes('products')) mockDatabase.products.push(newItem);
      return { rows: [newItem], rowCount: 1 };
    }
    
    // Mock UPDATE
    if (text.includes('UPDATE')) {
      return { rowCount: 1 };
    }
    
    // Mock DELETE
    if (text.includes('DELETE')) {
      return { rowCount: 1 };
    }
    
    return { rows: [], rowCount: 0 };
  }

  async connect(): Promise<any> {
    return this;
  }

  release(): void {
    // Mock release
  }

  async end(): Promise<void> {
    console.log('📡 Mock pool ended');
  }

  on(event: string, callback: Function): void {
    console.log(`📡 Mock pool event listener: ${event}`);
  }
}

export const mockPool = new MockPool();
