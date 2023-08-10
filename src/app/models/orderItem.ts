import { Product } from "./product";

export interface OrderItem{

    discount: number;
    quantity: number;
    totalPrice: number;
    productOffering: Product;
}