import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCompradoresComponent } from './listagem-compradores/listagem-compradores.component';
import { EdicaoClientesComponent } from './edicao-clientes/edicao-clientes.component';

const routes: Routes = [
  { path: '', component: ListagemCompradoresComponent },
  { path: 'cliente', component: EdicaoClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
