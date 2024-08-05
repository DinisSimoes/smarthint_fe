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

  verifyMail(email: string){
    return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyMail?email=${email}`);
  }

  verifyCNPJ(cnpj: Number | null):Observable<boolean>{
    if(cnpj != null){
      return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyCNPJ?CNPJ=${cnpj}`);
    }
    else{
      return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyCNPJ`);
    }
  }

  verifyCPF(cpf: Number | null):Observable<boolean>{
    if(cpf != null){
      return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyCPF?CPF=${cpf}`);
    }
    else{
      return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyCPF`);
    }
    
  }

  verifyInscricao(inscricao: string):Observable<boolean>{
    return this.httpClient.get<boolean>(`https://localhost:7235/api/Client/verifyInscricao?inscricaoEstadual=${inscricao}`);
  }

  updateCliente(client: Client):Observable<any>{
    return this.httpClient.post(`https://localhost:7235/api/Client/EditClient`, client);
  }
}
