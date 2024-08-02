import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() { }

  line: number = 0;

  setLine(line: number){
this.line = line
  }

  getLine(){
    return this.line;
  }
}
