import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiConnectionService } from '../api-connection.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { GlobalsService } from '../shared/globals.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../models/Client';

@Component({
  selector: 'app-edicao-clientes',
  templateUrl: './edicao-clientes.component.html',
  styleUrl: './edicao-clientes.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, NgxMaskDirective, MatNativeDateModule, FormsModule, ReactiveFormsModule, CommonModule],
  
  providers: [provideNgxMask(), MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdicaoClientesComponent {

  myForm!: FormGroup;
  InscricaoDesabled: boolean= false;
  submitted = false;
  cliente!:Client;
  erros='';
  
  constructor(private api: ApiConnectionService, private messageService: MessageService, private router: Router, private globals: GlobalsService, private fb: FormBuilder,) { 
    console.log(this.globals.getLine());

    this.myForm = this.fb.group({
      name: [[Validators.required, Validators.maxLength(150)]],
      email: [[Validators.required, Validators.email, Validators.maxLength(150)]],
    });

    
  }

  ngOnInit(){
    if(this.globals.getLine() != -1){
      this.api.getCliente(this.globals.getLine()).subscribe({
        next:(response:Client)=>{
          console.log(response);

          this.cliente = response;
          console.log(this.cliente);
          console.log(this.cliente.telefone);
        },
        error: (error) => {
          console.error('Erro ao obter clientes:', error);
        }
      });
    }
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  checkChange(event: any){
    this.InscricaoDesabled = event.checked;
    console.log(event.checked);
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Data:', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  updateClient(){
    if(this.vericacaoCampos()){
      this.api.verifyMail(this.cliente.email).subscribe({
        next:()=>{
          this.api.verifyCPF(this.cliente.cpf).subscribe({
            next:()=>{
              this.api.verifyCNPJ(this.cliente.cnpj).subscribe({
                next:()=>{
                  this.api.verifyInscricao(this.cliente.inscricaoEstadual).subscribe({
                    next:()=>{
                      this.api.updateCliente(this.cliente).subscribe({
                        next:()=>{
                          this.router.navigate(['']);
                        },
                        error: () => {
                          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao gravar' });
                        }
                      })
                    },
                    error:()=>{
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A inscrição estadual já está vinculada a outro comprador' });
                    }
                  })
                },
                error:()=>{
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'CPF/CNPJ Já está vinculado a outro comprador' });
                }
              })
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'CPF/CNPJ Já está vinculado a outro comprador' });
            }
          })
        },
        error:()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'E-mail já está vinculado a outro comprador' });
        }
      }
        
      );


      // this.api.verifyMail(this.cliente.email).subscribe(
      //   (response: boolean) => {
          
      //     this.api.verifyCPF(this.cliente.cpf).subscribe(
            
      //       (response: boolean) => {
              
      //         this.api.verifyCNPJ(this.cliente.cnpj).subscribe(
      //           (response: boolean) => {
                  
      //             this.api.verifyInscricao(this.cliente.inscricaoEstadual).subscribe(
      //               (response: boolean) => {
                      
      //                 this.api.updateCliente(this.cliente).subscribe(
      //                   (response: any) => {
                          
      //                     this.router.navigate(['']);
                          
      //                   },
      //                   (error: any) => {
      //                     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao gravar' });
      //                   }
      //                 );
      //                 this.router.navigate(['']);
                      
      //               },
      //               (error: any) => {
      //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A inscrição estadual já está vinculada a outro comprador' });
      //               }
      //             );
                  
      //           },
      //           (error: any) => {
      //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'CPF/CNPJ Já está vinculado a outro comprador' });
      //           }
      //         );
              
      //       },
      //       (error: any) => {
      //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'CPF/CNPJ Já está vinculado a outro comprador' });
      //       }
      //     );
          
      //   },
      //   (error: any) => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'E-mail já está vinculado a outro comprador' });
      //   }
      // );

    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Valide os seguintes campos: ${this.erros}` });
    }
  }

  vericacaoCampos(): boolean{
    return true;
  }
}


