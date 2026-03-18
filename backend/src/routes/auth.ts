import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation';

const router = Router();

// Helper function to generate tokens
const generateToken = (userId: string, email: string, role: string): string => {
  const secret: string = String(process.env.JWT_SECRET || 'your-secret-key');
  const expiresIn: string = String(process.env.JWT_EXPIRES_IN || '7d');
  return jwt.sign(
    { id: userId, email, role },
    secret as any,
    { expiresIn } as any
  );
};

// Register
router.post('/register', validateRequest(registerSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await UserModel.create({
      email,
      password,
      first_name,
      last_name,
      phone
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
});

// Login
router.post('/login', validateRequest(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await UserModel.verifyPassword(user, password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await UserModel.updateLastLogin(user.id);

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Verify token
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

export default router;
