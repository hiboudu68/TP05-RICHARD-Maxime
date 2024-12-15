import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/liste', pathMatch: 'full' },
    {
        path: 'liste',
        loadChildren: () =>
            import('./liste/liste.module').then(m => m.ListModule)
    },
    {
        path: 'cart',
        loadChildren: () =>
            import('./cart/cart.module').then(m => m.CartModule)
    },
    {
        path: '**',
        redirectTo: '/liste',
    }
];