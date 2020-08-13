import { axios } from "../vendor";
import { APIRecipe } from "../config";

export class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${APIRecipe}${this.id}`);

      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      alert(err);
    }
  }

  calcTime() {
    // Assuming that for every 3 ingredients,
    // we need 15 minutes cooking time
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);

    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];

    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];

    const newIngredients = this.ingredients.map((element) => {
      // Uniform Units
      let ingredient = element.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // Remove parentheses and its content
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // Parse ingredients into count, unit and ingredient

      return ingredient;
    });

    this.ingredients = newIngredients;
    console.log(this.ingredients);
  }
}
