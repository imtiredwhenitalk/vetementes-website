import pool from './connection';
import bcrypt from 'bcryptjs';

const seed = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified)
       VALUES ('admin@vetementes.com', $1, 'Admin', 'User', 'admin', true)
       ON CONFLICT (email) DO NOTHING`,
      [adminPassword]
    );

    // Create categories
    const categories = [
      { name: 'Hoodies', slug: 'hoodies', description: 'Premium hoodies and sweatshirts' },
      { name: 'Верхній одяг', slug: 'outerwear', description: 'Jackets, coats, and blazers' },
      { name: 'Штани', slug: 'pants', description: 'Jeans, trousers, and cargo pants' },
      { name: 'Футболки', slug: 't-shirts', description: 'T-shirts and tops' },
      { name: 'Аксесуари', slug: 'accessories', description: 'Bags, hats, and jewelry' }
    ];

    for (const cat of categories) {
      await pool.query(
        `INSERT INTO categories (name, slug, description)
         VALUES ($1, $2, $3)
         ON CONFLICT (slug) DO NOTHING`,
        [cat.name, cat.slug, cat.description]
      );
    }

    // Get category IDs
    const categoriesResult = await pool.query('SELECT id, slug FROM categories');
    const catMap: Record<string, string> = {};
    categoriesResult.rows.forEach((row: any) => {
      catMap[row.slug] = row.id;
    });

    // Create sample products
    const products = [
      {
        name: 'Oversized Logo Hoodie',
        slug: 'oversized-logo-hoodie',
        description: 'Наш іконічний оверсайз худі з вишитим логотипом VETEMENTES. Преміум бавовна 400gsm.',
        category_id: catMap['hoodies'],
        price: 890,
        sku: 'VTM-HOOD-001',
        stock_quantity: 100,
        is_new: true,
        badge: 'BESTSELLER'
      },
      {
        name: 'Deconstructed Blazer',
        slug: 'deconstructed-blazer',
        description: 'Деконструйований блейзер з асиметричним кроєм. Італійська вовна.',
        category_id: catMap['outerwear'],
        price: 1450,
        original_price: 1890,
        sku: 'VTM-BLZ-001',
        stock_quantity: 50,
        is_sale: true,
        badge: 'SALE'
      },
      {
        name: 'Distressed Wide Jeans',
        slug: 'distressed-wide-jeans',
        description: 'Широкі джинси з ефектом потертості. Японський денім 14oz.',
        category_id: catMap['pants'],
        price: 720,
        sku: 'VTM-JNS-001',
        stock_quantity: 75,
        is_new: true
      },
      {
        name: 'Graphic Print Tee',
        slug: 'graphic-print-tee',
        description: 'Футболка з ексклюзивним принтом. 100% органічна бавовна.',
        category_id: catMap['t-shirts'],
        price: 390,
        sku: 'VTM-TEE-001',
        stock_quantity: 200
      },
      {
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        description: 'Сумка через плече з натуральної шкіри. Ручна робота.',
        category_id: catMap['accessories'],
        price: 890,
        sku: 'VTM-BAG-001',
        stock_quantity: 30,
        is_featured: true
      }
    ];

    for (const product of products) {
      const result = await pool.query(
        `INSERT INTO products 
         (name, slug, description, category_id, price, original_price, sku, stock_quantity, 
          is_new, is_sale, is_featured, badge)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (slug) DO NOTHING
         RETURNING id`,
        [
          product.name, product.slug, product.description, product.category_id,
          product.price, product.original_price, product.sku, product.stock_quantity,
          product.is_new || false, product.is_sale || false,
          product.is_featured || false, product.badge
        ]
      );

      if (result.rows[0]) {
        const productId = result.rows[0].id;

        // Add product images
        await pool.query(
          `INSERT INTO product_images (product_id, url, is_primary, sort_order)
           VALUES ($1, $2, true, 1)
           ON CONFLICT DO NOTHING`,
          [productId, `https://via.placeholder.com/600x750?text=${product.name}`]
        );

        // Add product variants
        const sizes = ['S', 'M', 'L', 'XL'];
        const colors = [
          { name: 'Чорний', hex: '#0a0a0a' },
          { name: 'Сірий', hex: '#808080' },
          { name: 'Білий', hex: '#ffffff' }
        ];

        for (const size of sizes) {
          for (const color of colors) {
            await pool.query(
              `INSERT INTO product_variants (product_id, size, color_name, color_hex, stock_quantity)
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT (product_id, size, color_name) DO NOTHING`,
              [productId, size, color.name, color.hex, 10]
            );
          }
        }
      }
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Admin credentials:');
    console.log('   Email: admin@vetementes.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
