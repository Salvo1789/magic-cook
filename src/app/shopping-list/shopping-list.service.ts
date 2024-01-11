import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  EditRecipe = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Spoons of sugar', 4),
    new Ingredient('Onions', 3),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number){
    return this.ingredients[id];
  }

  addIngredient(newIng: Ingredient) {
    this.ingredients.push(newIng);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(newIngs: Ingredient[]) {
    this.ingredients.push(...newIngs);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: number, ing: Ingredient){
    this.ingredients[id] = ing;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number){
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
