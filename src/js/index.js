// Global app controller
import "../scss/main.scss";
import Search from "./models/Search";

/* Global State of the App
 * - Search Object
 * - Current Recipe
 * - Shopping List Objects
 * - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
   // Get Query form view
   const query = "pizza";

   if (query) {
      // New search object and add to state
      state.search = new Search(query);

      // Prepare UI for result

      // Search for recipes (make an API call)
      await state.search.getResults();

      // Render results on UI
      console.log(state.search.result);
   }
};

document.querySelector(".search").addEventListener("submit", (event) => {
   event.preventDefault();
   controlSearch();
});

// search.getResults();
