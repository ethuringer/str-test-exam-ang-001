import { Category } from "./category.enum";

export class Product {
    id: number = 1;
    name: string = '';
    price: number = 0;
    category?: Category;
}
