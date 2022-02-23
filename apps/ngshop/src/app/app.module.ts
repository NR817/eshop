import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';


import { ProductsModule } from '@nr-space/products';
import { UiModule } from '@nr-space/ui';
import { OrdersModule } from '@nr-space/orders';
import { JwtInterceptor, UsersModule } from '@nr-space/users';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';

import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        UsersModule,
        AccordionModule,
        ProductsModule,
        UiModule,
        OrdersModule,
        ToastModule,
        NgxStripeModule.forRoot('pk_test_51KVx4qLcRpdNDQPmIxZhLCVOd4dJay2FUkExNdj78ZwCpsP9T8z3Vzyuuug3JJeDSpMiOLTU03Dv2CBb2zogmfze003Hu3BPPD')
    ],
    providers: [MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent],
    exports: [MessagesComponent]
})
export class AppModule {}
