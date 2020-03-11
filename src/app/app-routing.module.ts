import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {InformacionComponent} from './informacion/informacion.component';
import {PersonalComponent} from './personal/personal.component';
import {LoginComponent} from './login/login.component';
import {IntermedioComponent} from './intermedio/intermedio.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'intermedio', component: IntermedioComponent},
  {path: 'main', component: MainComponent},
  {path: 'informacion', component: InformacionComponent},
  {path: 'personal', component: PersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
