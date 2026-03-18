import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors 
      });
    }
    
    next();
  };
};

// Validation schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().min(2).max(100).optional(),
  last_name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  slug: Joi.string().min(3).max(255).required(),
  description: Joi.string().optional(),
  category_id: Joi.string().uuid().optional(),
  price: Joi.number().positive().required(),
  original_price: Joi.number().positive().optional(),
  sku: Joi.string().max(100).optional(),
  stock_quantity: Joi.number().integer().min(0).optional(),
  is_active: Joi.boolean().optional(),
  is_featured: Joi.boolean().optional(),
  is_new: Joi.boolean().optional(),
  is_sale: Joi.boolean().optional(),
  badge: Joi.string().max(50).optional()
});

export const orderSchema = Joi.object({
  customer_email: Joi.string().email().required(),
  customer_phone: Joi.string().optional(),
  items: Joi.array().items(
    Joi.object({
      product_id: Joi.string().uuid().required(),
      variant_id: Joi.string().uuid().optional(),
      quantity: Joi.number().integer().min(1).required(),
      unit_price: Joi.number().positive().required()
    })
  ).min(1).required(),
  shipping_address: Joi.object({
    full_name: Joi.string().required(),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string().optional()
  }).required(),
  billing_address: Joi.object({
    full_name: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required()
  }).optional(),
  shipping_cost: Joi.number().min(0).required(),
  payment_method: Joi.string().valid('card', 'cash', 'bank_transfer').optional()
});

export const addressSchema = Joi.object({
  type: Joi.string().valid('shipping', 'billing').required(),
  full_name: Joi.string().required(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().optional(),
  postal_code: Joi.string().required(),
  address_line1: Joi.string().required(),
  address_line2: Joi.string().optional(),
  is_default: Joi.boolean().optional()
});
