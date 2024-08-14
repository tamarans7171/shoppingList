export interface Product {
    id?: string;
    name: string;
    categoryId: number;
    qty:number;
  }

  export interface CategoryWithProducts {
    id: number;
    name: string;
    productsCategory: Product[];
  }