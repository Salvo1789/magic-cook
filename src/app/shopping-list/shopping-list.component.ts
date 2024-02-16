import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { StartEditAction } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }), animate(300)]),
        transition('* => void', [
           animate(300), style({
            transform: 'translateY(100px)',
            opacity: 0
           })]),
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
      private store: Store<fromApp.AppState>
    ){

  }

  ngOnInit(){
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  onEditIngredient(id: number){
    // this.shoppingListService.EditRecipe.next(id);
    this.store.dispatch(new StartEditAction(id));
  }

  
}
