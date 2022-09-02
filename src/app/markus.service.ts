import { Injectable } from '@angular/core';
import { from, switchMap, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

@Injectable({
  providedIn: 'root'
})
export class MarkusService {

  drink(): string {
    throw new Error("out of beer :-(")
  }


  constructor() { }
}
