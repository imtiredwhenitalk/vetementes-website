import { User } from "./User";
import { Product } from "./Product";
import { Order } from "./Order";
import { OrderItem } from "./OrderItem";

export interface Claim {
    id: string;
    userId: string;
    user: User;
    title: string;
    description: string;
    status: 'pending' | 'approved 200 OK' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export interface ClaimItem {
    id: string;
    claimId: string;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface claimOrder {
    id: string;
    orderId: string;
    order: Order;
    claimItems: ClaimItem[];
    totalAmount: number;
    status: 'pending' | 'approved 200 OK' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export interface claimOrderItem {
    id: string;
    claimOrderId: string;
    claimOrderItemId: string;
    claimOrder: claimOrder;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface claimProduct {
    id: string;
    claimId: string;
    claim: Claim;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface claimProductItem {
    id: string;
    claimProductId: string;
    claimProductItemId: string;
    claimProduct: claimProduct; 
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export default claim;