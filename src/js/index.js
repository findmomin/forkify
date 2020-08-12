// Global app controller
import "../scss/main.scss";
import { elements, renderLoader, clearLoader } from "./views/base";
import { Search } from "./models/Search";
import { Recipe } from "./models/Recipe";
import * as searchView from "./views/searchView";

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
   const query = searchView.getInput();

   if (query) {
      // New search object and add to state
      state.search = new Search(query);

      // Prepare UI for result
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);

      // Search for recipes (make an API call)
      await state.search.getResults();

      // Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
   }
};

elements.searchForm.addEventListener("submit", (event) => {
   event.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener("click", (event) => {
   const btn = event.target.closest(".btn-inline");

   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();

      searchView.renderResults(state.search.result, goToPage);
   }
});

// The Recipe controller
const res = new Recipe(47746);
res.getRecipe();

console.log(res);
