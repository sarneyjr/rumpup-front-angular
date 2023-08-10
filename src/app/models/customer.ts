import { Order } from "./order";
import { Address } from "c:/Users/ehtilsi/my-first-app/src/app/models/address";

export interface Customer{
  
    id: any;
    userId: number;
    customerName: string;
    documentNumber: number;
    customerStatus: string;
    creditScore: string;
    customerType: string;
    orders: Order[];
    address: Address[];

}