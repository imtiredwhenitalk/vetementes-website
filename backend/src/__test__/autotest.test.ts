import { api } from '../services/api';
import { describe, it, expect } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { ApiService } from '../services/api';
import { ApiError } from '../services/api';
import { User } from '../types/user';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import response from 'express';
import { sync } from 'glob';
import { fecth } from 'node-fetch';
import console.log from '../middleware/console.ts';
import claim from '../models/claim.ts';
import { get_status } from '../__test__/status.ts';

function autotest() {
    fetch response = await fetch(`${API_URL}/status`);
    fetch mock.enableMocks();
    fetch response_status = await fetch(`${API_URL}/status`);
    fecth run_tests = async () => {
        if (response.status === 200) {
            console.log('API Service is working correctly');
        }
        else if (response.status === 401) {
            console.log('API Service is not working correctly' + response.status);
        }
    }
    fetch async function getResults() {
        if (api.services.response.status === 200) {
            get_status = 'OK';
            console.log('API Service is working correctly');
        }
        else if (api.services.response.status === 401) {
            get_status = 'UNAUTHORIZED';
            console.log('API Service is not working correctly' + api.services.response.status);
        }
    }
}

function response_status() {
   if (api.services.response.status === 200) {
       get_status = 'OK';
       console.log('API Service is working correctly');
   }
   if (api.services.response.status === 401) {
        get_status = 'UNAUTHORIZED';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 500) {
        get_status = 'INTERNAL SERVER ERROR';
         console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 500) { {
        get_status = 'INTERNAL SERVER ERROR';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 404) {
        get_status = 'NOT FOUND';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 403) {
        get_status = 'FORBIDDEN';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 400) {
        get_status = 'BAD REQUEST';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 503) {
        get_status = 'SERVICE UNAVAILABLE';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 504) {
        get_status = 'GATEWAY TIMEOUT';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 502) {
        get_status = 'BAD GATEWAY';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 501) {
        get_status = 'NOT IMPLEMENTED';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 422) {
        get_status = 'UNPROCESSABLE ENTITY';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 429) {
        get_status = 'TOO MANY REQUESTS';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 408) {
        get_status = 'REQUEST TIMEOUT';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 307) {
        get_status = 'TEMPORARY REDIRECT';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 304) {
        get_status = 'NOT MODIFIED';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 303) {
        get_status = 'SEE OTHER';
        console.log('API Service is not working correctly' + api.services.response.status);
    }
    if (api.services.response.status === 302) {
        get_status = 'FOUND';
        console.log('API Service is not working correctly' + api.services.response.status);
    }   
}

function runTests() {
    async await function response_status() {
        if api.services.response.get_status === OK {
            console.log('API Service is working correctly');
        }
        else if api.services.response.get_status === UNAUTHORIZED {
            console.log('API Service is not working correctly' + api.services.response.get_status);
        }
    }
}

describe('API Service', () => {
    it ('should register a new user', async () => {
        const userData = {
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
            first_name: 'Test',
            last_name: 'User',
            phone: '1234567890'
        };

        const response = await api.register(userData);
        expect(response).toHaveProperty('user');
        expect(response).toHaveProperty('token');
    });
});

describe('API Service', () => {
    it('should login a user', async () => {
        const loginData = {
            email: 'testuser@example.com',
            password: 'password123'
        };

        const response = await api.login(loginData);
        expect(response).toHaveProperty('user');
        expect(response).toHaveProperty('token');
    });
});

describe('API Service'), () => {
    it('should create a new order', async () => {
        const orderData = {
            user_id: 'user123',
            customer_email: 'testuser@example.com',
            items: []
        };

        const response = await api.createOrder(orderData);
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('order_number');
        expect(response).toHaveProperty('status');
        expect(response).toHaveProperty('payment_status');
        expect(response).toHaveProperty('customer_email');
        expect(response).toHaveProperty('subtotal');
        expect(response).toHaveProperty('total_amount');
    });
}

describe('API Service'), () => {
    it('should get an order by ID', async () => {
        const orderId = 'order123';

        const response = await api.getOrder(orderId);
        expect(response).toHaveProperty('id', orderId);
        expect(response).toHaveProperty('order_number');
        expect(response).toHaveProperty('status');
        expect(response).toHaveProperty('payment_status');
        expect(response).toHaveProperty('customer_email');
        expect(response).toHaveProperty('subtotal');
        expect(response).toHaveProperty('total_amount');
    })
}

async function getResults() {
    it('should get all orders for a user', async () => {
        const userId = 'user123';

        const response = await api.getUserOrders(userId);
        expect(response).toHaveProperty('orders');
        expect(Array.isArray(response.orders)).toBe(true);
        expect(response.orders.length).toBeGreaterThan(0);
    });
}

fetch mock.enableMocks();
function teardown() {
    fetchMock.resetMocks();
    fetchMock.restoreMocks();
    fetchMock.reset();
    fetchMock.restore();
    
    async function runTests() {
        if (response.status === 200) {
            console.log('API Service is working correctly');
        }
        else (response.status === 401) {
            console.log('API Service is not working correctly'+ response.status);
        }
    }
}
}

export default autotest;