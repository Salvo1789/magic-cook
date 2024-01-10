import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe test1',
      'Description',
      'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
      [
        new Ingredient('Tomatoes', 2),
        new Ingredient('Cloves of garlic', 2)
      ]
    ),
    new Recipe(
      'Recipe test2',
      'Description',
      'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
      [
        new Ingredient('Burger', 1),
        new Ingredient('Leaves of lettuce', 1)
      ]
    ),
    new Recipe(
      'Recipe test3',
      'Description',
      'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
      [
        new Ingredient('Tuna', 1),
        new Ingredient('lemon', 1)
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
}
