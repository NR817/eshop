import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@nr-space/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})

export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  endsubs$: Subject<any> = new Subject()
  orderStatus = this.ordersService.ORDER_STATUS;

  constructor(
    private ordersService: OrdersService, 
    private router: Router, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endsubs$.complete();
}

  private _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(orders => {
      this.orders = orders;      
    })
  }

  showOrder(orderId: string){
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this order?',
        header: 'Delete Order',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.ordersService.deleteOrder(orderId).subscribe(
                () => {
                    this._getOrders();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order is deleted` });
                },
                () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order is not deleted' });
                }
            );
        }
    });
}
}
