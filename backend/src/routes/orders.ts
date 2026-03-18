import { Router, Request, Response } from 'express';
import { OrderModel } from '../models/Order';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middleware/auth';
import { validateRequest, orderSchema } from '../middleware/validation';

const router = Router();

// Create order
router.post('/', validateRequest(orderSchema), async (req: Request, res: Response) => {
  try {
    const orderData = {
      ...req.body,
      user_id: (req as AuthRequest).user?.id
    };

    const order = await OrderModel.create(orderData);

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        order_number: order.order_number,
        status: order.status,
        total_amount: order.total_amount
      }
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await OrderModel.getItems(order.id);

    res.json({
      ...order,
      items
    });
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order', message: error.message });
  }
});

// Get order by order number
router.get('/number/:orderNumber', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const order = await OrderModel.findByOrderNumber(orderNumber);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await OrderModel.getItems(order.id);

    res.json({
      ...order,
      items
    });
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order', message: error.message });
  }
});

// Get user orders
router.get('/user/:userId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    // Check if user is requesting their own orders or is admin
    if (req.user?.id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const orders = await OrderModel.findByUser(userId);

    res.json({ orders });
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
});

// Update order status (Admin only)
router.patch(
  '/:id/status',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'processing', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const order = await OrderModel.updateStatus(id, status);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ message: 'Order status updated', order });
    } catch (error: any) {
      console.error('Update order status error:', error);
      res.status(500).json({ error: 'Failed to update order status', message: error.message });
    }
  }
);

// Add tracking info (Admin only)
router.patch(
  '/:id/tracking',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { tracking_number, tracking_url } = req.body;

      await OrderModel.addTracking(id, tracking_number, tracking_url);

      res.json({ message: 'Tracking info updated' });
    } catch (error: any) {
      console.error('Update tracking error:', error);
      res.status(500).json({ error: 'Failed to update tracking', message: error.message });
    }
  }
);

export default router;
