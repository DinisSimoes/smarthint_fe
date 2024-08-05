import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiConnectionService } from '../api-connection.service';
import { SelectionModel } from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EdicaoClientesComponent } from '../edicao-clientes/edicao-clientes.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Client } from '../models/Client';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GlobalsService } from '../shared/globals.service';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listagem-compradores',
  templateUrl: './listagem-compradores.component.html',
  styleUrl: './listagem-compradores.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, MatSlideToggleModule, CommonModule],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "shortDate" }
    }
  ],
})
export class ListagemCompradoresComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'nome', 'email', 'telefone', 'dataCadastro', 'bloqueado', 'acoes'];
  clientes!: Client[];
  dataSource = new MatTableDataSource<Client>(this.clientes);
  selection = new SelectionModel<Client>(true, []);
  dialog = inject(MatDialog);

constructor(private api: ApiConnectionService, private router: Router, private globals:GlobalsService) {
  //this.dataSource.data = this.api.getClientes();

  this.api.getClientes().subscribe({
    next: (response) => {
      this.clientes = response;
      console.log(response);
      this.dataSource.data = response;
    },
    error: (error) => {
      console.error('Erro ao obter clientes:', error);
    }
  });
}

 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.nome));
  }

  addClient(value: any): void{
    console.log('Button clicked - ' + value);
    this.globals.setLine(value);
    this.router.navigate(['/cliente']);
    //this.router.navigateByUrl('/cliente');
    // const dialogRef = this.dialog.open(EdicaoClientesComponent, {
    //   data: {},
    //   maxWidth: '90vw',
    //   maxHeight: '90vh',
    //   height: '90%',
    //   width: '90%',
    //   panelClass: 'full-screen-modal'
    // });
  }

  onClick(){
    console.log('Button clicked');
    
  }

}