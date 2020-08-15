// Global app controller
import "../scss/main.scss";
import { elements, renderLoader, clearLoader } from "./views/base";
import { Search } from "./models/Search";
import { Recipe } from "./models/Recipe";
import { List } from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

/* Global State of the App
 * - Search Object
 * - Current Recipe
 * - Shopping List Objects
 * - Liked Recipes
 */
const state = {};

// The Search controller
const controlSearch = async () => {
  // Get Query form view
  //   const query = searchView.getInput();
  //   TEST
  const query = "pizza";

  if (query) {
    // New search object and add to state
    state.search = new Search(query);

    // Prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // Search for recipes (make an API call)
      await state.search.getResults();

      // Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert(err);
      clearLoader();
    }
  }
};

// The Search controller
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});

// Pagination
elements.searchResPages.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.result, goToPage);
  }
});

// The Recipe controller
const controlRecipe = async () => {
  // Get ID form URL
  const id = window.location.hash.replace("#", "");

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected result
    if (state.search && state.search.result) {
      searchView.highlightSeletcted(id);
    }

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
      // Get Recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate time and servings
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert(err);
    }
  }
};

// Recipe handler
// ["hashchange", "load"].forEach((event) =>
// window.addEventListener(event, controlRecipe)
// );

// Recipe buttons handler
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      // For the decrease button
      state.recipe.updateServings("dec");
      recipeView.updateServingsIng(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // For the increase button
    state.recipe.updateServings("inc");
    recipeView.updateServingsIng(state.recipe);
  }
});

// List Controller

// Test
const init = () => {
  window.addEventListener("load", (event) => {
    event.preventDefault();
    controlSearch();
  });

  ["hashchange", "load"].forEach((event) =>
    window.addEventListener(event, controlRecipe)
  );
};

init();
