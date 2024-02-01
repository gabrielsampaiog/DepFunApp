import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepComponent } from './components/dep_component/dep/dep.component';
import { FunComponent } from './components/fun_component/fun/fun.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'app-dep',component:DepComponent},
  {path:'app-fun/:id',component:FunComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
