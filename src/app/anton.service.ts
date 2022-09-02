import { Injectable } from '@angular/core';
import { Observable, switchMap, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

@Injectable({
  providedIn: 'root',
})
export class AntonService {
  drinkRemoteBeer(): Observable<string> {
    return fromFetch('/beer-store/beer').pipe(
      switchMap((response) => from(response.text()))
    );
  }
}
