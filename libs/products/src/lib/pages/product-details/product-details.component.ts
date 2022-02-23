import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@nr-space/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-product-details',
    templateUrl: './product-details.component.html',
    styles: []
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product: Product;
    endsubs$: Subject<any> = new Subject();
    quantity = 1;

    constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productId) {
                this._getProduct(params.productId);
            }
        });
    }

    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    private _getProduct(id: string) {
        this.productsService
            .getProduct(id)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((product) => {
                this.product = product;
            });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.cartService.setCartItem(cartItem);
    }
}
