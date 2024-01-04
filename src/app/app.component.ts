import { Component } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'magic-cook';
  loadedFeature = 'recipe'

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }

  constructor() {}

  ngOnInit(){
    
  }
}
