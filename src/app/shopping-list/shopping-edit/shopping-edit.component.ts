import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;
  editedIngId: number;

 constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: { ingredients: Ingredient[] }}>
    ){}

 ngOnInit(){
  this.subscription = this.shoppingListService.EditRecipe.subscribe(
    (id: number) => {
      this.editMode = true;
      this.editedIngId = id;
      this.editedIngredient = this.shoppingListService.getIngredient(id);
      this.slForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      })
    }
  );
 }

 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

 onAddIngredient(form: NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  if(this.editMode){
    this.shoppingListService.updateIngredient(this.editedIngId, newIngredient)
  }else{
    // this.shoppingListService.addIngredient(newIngredient);
    this.store.dispatch(new ShoppingListActions.AddIngredientAction(newIngredient))
  }
  this.editMode = false;
  form.reset();
 }

onDeleteIngredient(){
  this.shoppingListService.deleteIngredient(this.editedIngId);
  this.onClearForm();
}

 onClearForm(){
  this.slForm.reset();
  this.editMode = false;
 }
}
