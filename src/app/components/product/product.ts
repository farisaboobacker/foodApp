export interface Product {
  id?:number,
  CategoryId?:string,
  ProductName?:string,
  ProductPrice?:number,
  ProductImage?:string,
  ProductQuantity?:number,
  ProductDescription?:string,
  ProductStatus?: string,
  category?:Category
}

interface Category{
  categoryName:string
}
