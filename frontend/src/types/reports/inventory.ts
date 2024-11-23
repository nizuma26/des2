export interface Inventory {
    id: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    stock: number;
    min_stock: number;
    max_stock: number;
    reserved:number;
    available:number;
    price: number;
}