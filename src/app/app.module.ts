import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EdicaoClientesComponent } from './edicao-clientes/edicao-clientes.component';
import { ListagemCompradoresComponent } from './listagem-compradores/listagem-compradores.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastModule } from 'primeng/toast';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EdicaoClientesComponent,
    ListagemCompradoresComponent,
    
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    NgxMaskDirective,
    MatSlideToggleModule,
ToastModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    MatDatepickerModule,
    provideHttpClient(),
    [provideNgxMask()]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
