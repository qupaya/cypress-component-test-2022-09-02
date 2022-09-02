import {Component, Input} from '@angular/core';
import { MarkusService } from './markus.service';
import {first} from 'rxjs';
import { AntonService } from './anton.service';

@Component({
  selector: 'app-app',
  template: `<div>
    <button aria-label="decrement" (click)="decrement()">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" (click)="increment()">+</button>

    <button aria-label="drink-markus" (click)="drink()">drink Martkus!"</button>
    <button aria-label="drink-anton" (click)="drinkRemoteBeer()">drink Anton!</button>
    drinks: <span aria-label="drinks">{{ drinks }}</span>
  </div>`,
})
export class AppComponent {
  @Input() count = 0
  drinks = "";

  constructor(
    public readonly markus: MarkusService,
    public readonly anton: AntonService) {
    
  }

  drink() {
    const newDrink = this.markus.drink();
    console.log("new drink:", newDrink);
    this.drinks += newDrink;
    console.log("new drinks:", this.drinks);
  }

  drinkRemoteBeer(): void {
    this.anton.drinkRemoteBeer().pipe(first()).subscribe(remoteBeer => {
      this.drinks += remoteBeer;
    })
  }

  decrement(): void {
    this.count--
  }

  increment(): void {
    this.count++
  }
}
