import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Product } from './product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProductComponent implements OnInit {

  productForm!: FormGroup;
  public products!: any[];
  categories!: any;
  product!: Product;
  selectedProducts!: any[] | null;
  statuses!: any[];

  submitted: boolean = false;
  productDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    protected Sproduct: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    protected Scategory: CategoryService
  ) { }

  ngOnInit(): void {
    // category List

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productDescription: ['', Validators.required],
      productStatus: ['', Validators.required],
      productCategory: ['', Validators.required],
      productImage: ['', Validators.required],
    })
    this.Scategory.getCategory().subscribe((res: any) => {
      this.categories = res.$values;
    });

    this.Sproduct.getProducts()
      .subscribe((res: any) => {
        this.products = res.$values;
        console.log(this.products)
      });

    this.statuses = [
      { label: 'AVAILABLE', value: 'Availabe' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];


  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: any) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  editProduct(product: any) {
    // this.product = { product };
    console.table(this.product)
    console.table(this.products)
    this.productDialog = true;
  }
  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: Product) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(data:any) {
    this.submitted = true;

    this.product.CategoryId=data.productCategory.id;
    this.product.ProductName=data.productName;
    this.product.ProductPrice=data.productPrice;
    this.product.ProductDescription=data.productDescription;
    this.product.ProductQuantity=data.productQuantity;
    this.product.ProductStatus=data.productStatus.value;
    this.product.ProductImage=data.productImage;
    console.log(this.product)
    this.Sproduct.addProducts(this.productForm.value).subscribe((res: any) => {
      console.log(res)
    });


    // if (this.product.productName?.trim()) {
    //   console.log(this.product.id)
    //   if (this.product.id) {
    //     console.log(this.product.id)
        // this.products[this.findIndexById(this.product.id)] = this.product;
      //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      // } else {
        // this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //   }

    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
  }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }

}
