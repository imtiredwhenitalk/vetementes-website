import { Router, Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validateRequest, productSchema } from '../middleware/validation';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, featured, limit = 50, offset = 0 } = req.query;

    const products = await ProductModel.findAll({
      category: category as string,
      search: search as string,
      is_featured: featured === 'true',
      is_active: true,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });

    // Get images and variants for each product
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const [images, variants] = await Promise.all([
          ProductModel.getImages(product.id),
          ProductModel.getVariants(product.id)
        ]);

        return {
          ...product,
          images,
          colors: variants.reduce((acc: any[], v) => {
            if (v.color_name && !acc.find(c => c.name === v.color_name)) {
              acc.push({ name: v.color_name, hex: v.color_hex });
            }
            return acc;
          }, []),
          sizes: [...new Set(variants.map(v => v.size).filter(Boolean))]
        };
      })
    );

    res.json({
      products: productsWithDetails,
      total: products.length
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const [images, variants] = await Promise.all([
      ProductModel.getImages(product.id),
      ProductModel.getVariants(product.id)
    ]);

    res.json({
      ...product,
      images,
      variants,
      colors: variants.reduce((acc: any[], v) => {
        if (v.color_name && !acc.find(c => c.name === v.color_name)) {
          acc.push({ name: v.color_name, hex: v.color_hex });
        }
        return acc;
      }, []),
      sizes: [...new Set(variants.map(v => v.size).filter(Boolean))]
    });
  } catch (error: any) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product', message: error.message });
  }
});

// Create product (Admin only)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  validateRequest(productSchema),
  async (req: Request, res: Response) => {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json({ message: 'Product created', product });
    } catch (error: any) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product', message: error.message });
    }
  }
);

// Update product (Admin only)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.update(id, req.body);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product updated', product });
    } catch (error: any) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Failed to update product', message: error.message });
    }
  }
);

// Delete product (Admin only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await ProductModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product deleted' });
    } catch (error: any) {
      console.error('Delete product error:', error);
      res.status(500).json({ error: 'Failed to delete product', message: error.message });
    }
  }
);

export default router;
