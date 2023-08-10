import { OrderItem } from "./orderItem";

export interface Order{

    id?: any;
    customerId?: number;
    addressId?: number;
    productId?: number;
    instant: string;
    discount: number;
    quantity: number;
    items: OrderItem[];

}