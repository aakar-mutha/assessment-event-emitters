import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReadfileService {


  constructor() { }

  urlEncoded = '/Test.text';
  getText(){
  }
}
