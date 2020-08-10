// Global app controller
import "../scss/main.scss";
import { elements } from "./views/base";
import { Search } from "./models/Search";
import * as searchView from "./views/searchView";

/* Global State of the App
 * - Search Object
 * - Current Recipe
 * - Shopping List Objects
 * - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
   // Get Query form view
   const query = searchView.getInput();

   if (query) {
      // New search object and add to state
      state.search = new Search(query);

      // Prepare UI for result
      searchView.clearInput();
      searchView.clearResults();

      // Search for recipes (make an API call)
      await state.search.getResults();

      // Render results on UI
      // console.log(state.search.result);
      searchView.renderResults(state.search.result);
   }
};

elements.searchForm.addEventListener("submit", (event) => {
   event.preventDefault();
   controlSearch();
});
