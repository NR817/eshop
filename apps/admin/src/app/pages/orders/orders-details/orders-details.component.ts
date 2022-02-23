import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@nr-space/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-orders-details',
    templateUrl: './orders-details.component.html',
    styles: []
})
export class OrdersDetailsComponent implements OnInit {
    order: Order;
    orderStatuses = [];
    selectedStatus: number;

    constructor(private ordersService: OrdersService, private route: ActivatedRoute, private messageService: MessageService) {}

    ngOnInit(): void {
        this._mapOrderStatuses();
        this._getOrder();
    }

    private _mapOrderStatuses() {
        this.orderStatuses = Object.keys(this.ordersService.ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: this.ordersService.ORDER_STATUS[key].label
            };
        });
    }

    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.ordersService.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = order.status;
                });
            }
        });
    }

    onStatusChange(event) {
        this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order is updated!` });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: `Order is not updated!` });
            }
        );
    }
}
