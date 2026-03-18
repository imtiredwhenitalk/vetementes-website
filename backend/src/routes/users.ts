import { Router, Response } from 'express';
import { UserModel } from '../models/User';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middleware/auth';

const router = Router();

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      role: user.role,
      is_verified: user.is_verified,
      created_at: user.created_at
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile', message: error.message });
  }
});

// Update current user profile
router.put('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { first_name, last_name, phone } = req.body;

    const updatedUser = await UserModel.update(req.user.id, {
      first_name,
      last_name,
      phone
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
});

// Get all users (Admin only)
router.get('/', authenticateToken, authorizeRoles('admin'), async (req: AuthRequest, res: Response) => {
  try {
    // This would need a UserModel.findAll method
    res.json({ message: 'Get all users - to be implemented' });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users', message: error.message });
  }
});

// Delete user (Admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user', message: error.message });
  }
});

export default router;
