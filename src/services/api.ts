// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiError {
  error: string;
  message?: string;
  details?: any;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ApiError;
    }

    return data as T;
  }

  // Auth
  async register(userData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) {
    return this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyToken() {
    return this.request<{ user: any }>('/auth/verify');
  }

  // Products
  async getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    return this.request<{ products: any[]; total: number }>(
      `/products?${params.toString()}`
    );
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request<{ product: any }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, updates: any) {
    return this.request<{ product: any }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProduct(id: string) {
    return this.request<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(orderData: {
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
  }) {
    return this.request<{ order: any }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`);
  }

  async getOrderByNumber(orderNumber: string) {
    return this.request<any>(`/orders/number/${orderNumber}`);
  }

  async getUserOrders(userId: string) {
    return this.request<{ orders: any[] }>(`/orders/user/${userId}`);
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request<{ order: any }>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async addOrderTracking(id: string, trackingNumber: string, trackingUrl?: string) {
    return this.request<{ message: string }>(`/orders/${id}/tracking`, {
      method: 'PATCH',
      body: JSON.stringify({ tracking_number: trackingNumber, tracking_url: trackingUrl }),
    });
  }

  // User
  async getCurrentUser() {
    return this.request<any>('/users/me');
  }

  async updateProfile(updates: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) {
    return this.request<{ user: any }>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
}

export const api = new ApiService();
export default api;
