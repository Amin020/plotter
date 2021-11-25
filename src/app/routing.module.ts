import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./modules/data-analytics/data-analytics.module").then(m => m.DataAnalyticsModule)
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
