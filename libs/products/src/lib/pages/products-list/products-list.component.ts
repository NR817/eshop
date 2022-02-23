/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean;
    endsubs$: Subject<any> = new Subject();


    constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
            params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
        this._getCategories();
    }

    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.productsService.getProducts(categoriesFilter).pipe(takeUntil(this.endsubs$)).subscribe((products) => {
            this.products = products;
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
            this.categories = categories;
        });
    }

    categoryFilter() {
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);
        this._getProducts(selectedCategories);
    }
}
