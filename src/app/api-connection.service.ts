import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { response } from 'express';
import { Client } from './models/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {





  private apiUrl = 'https://api.example.com'; // replace with your API URL
  private httpClient = inject(HttpClient);
 
  


  constructor() { 
    
  }

  getClientes():Observable<Client[]>{
    return this.httpClient.get<Client[]>('https://localhost:7235/api/Client/GetAllClients');
  }

  getCliente(id: number):Observable<Client>{
    return this.httpClient.get<Client>(`https://localhost:7235/api/Client/${id}`);
  }

  verifyMail(email: string):Observable<boolean>{
    return this.httpClient.get<boolean>(`https://localhost:7235/api/verifyMail?email=${email}`);
  }

  verifyCNPJ(cnpj: number):Observable<boolean>{
    return this.httpClient.get<boolean>(`https://localhost:7235/api/verifyCNPJ?CNPJ=${cnpj}`);
  }

  verifyCPF(cpf: number):Observable<boolean>{
    return this.httpClient.get<boolean>(`https://localhost:7235/api/verifyCPF?CPF=${cpf}`);
  }

  verifyInscricao(inscricao: string):Observable<boolean>{
    return this.httpClient.get<boolean>(`https://localhost:7235/api/verifyInscricao?inscricaoEstadual=${inscricao}`);
  }

  updateCliente(client: Client):any{
    this.httpClient.post(`https://localhost:7235/api/Client/EditClient`, client);
  }
}
