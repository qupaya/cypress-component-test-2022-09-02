import {AppComponent} from "./app.component";
import { MarkusService } from "./markus.service";
import {instance, when, mock} from "ts-mockito";

describe('AppComponent', () => {
  it('mounts', () => {
    cy.mount(`<app-app></app-app>`, {
      declarations: [AppComponent],
    })
  })
  const counterSelector = '[data-cy=counter]'
  const incrementSelector = '[aria-label=increment]'
  const decrementSelector = '[aria-label=decrement]'
  const drinkMarkusSelector = '[aria-label=drink-markus]'
  const drinkAntonSelector = '[aria-label=drink-anton]'
  const drinksSelector = '[aria-label=drinks]'

  it('stepper should default to 0', () => {
    // Arrange
    cy.mount(AppComponent, {
      declarations: [AppComponent],
    })
    // Assert
    cy.get(counterSelector).should('have.text', '0')
  })

  it('stepper should default to the given count from input', () => {
    // Arrange
    cy.mount('<app-app [count]="42"></app-app>', {
      declarations: [AppComponent],
    })
    // Assert
    cy.get(counterSelector).should('have.text', '42')
  })


  it('supports an "Input()" count that sets the value', () => {
    // Arrange
    cy.mount('<app-app [count]="100"></app-app>', {
      declarations: [AppComponent],
    })
    // Assert
    cy.get(counterSelector).should('have.text', '100')
  })

  it('increase', () => {
    cy.mount('<app-app></app-app>', {
      declarations: [AppComponent],
    })
    cy.get(incrementSelector).click()
    cy.get(counterSelector).should('have.text', '1')
  })

  it('should drink beer', () => {
    const mockMarkus = mock(MarkusService);

    when(mockMarkus.drink()).thenCall(()=> {
      console.log("CALLED")
      return '🍺️';});

    cy.mount('<app-app></app-app>', {
      declarations: [AppComponent],
      providers: [{provide: MarkusService, useFactory: () => instance(mockMarkus)}]
    })
    
    cy.get(drinkMarkusSelector).click()
    cy.get(drinksSelector).should('have.text', '🍺️')

    cy.intercept('/beer-store/beer', {body: '🍺️'})
    cy.get(drinkAntonSelector).click()
    cy.get(drinksSelector).should('have.text', '🍺️🍺️')
  })
})
