import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import("./pages/pages.routes").then(m => m.routes),
    },
    {
        path: '',
        loadChildren: () => import("./auth/auth.routes").then(m => m.routes),
    },
    {
        path: '**',
        redirectTo: ''
    }
];
