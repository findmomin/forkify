// Global app controller
import "../scss/main.scss";
import { elements, renderLoader, clearLoader } from "./views/base";
import { Search } from "./models/Search";
import { Recipe } from "./models/Recipe";
import { List } from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import Likes from "./models/Likes";

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

// Pagination
elements.searchResPages.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.result, goToPage);
  }
});

// The Search hdndler
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Like controller
    controllLike();
  }
});

// List Controller
const controlList = () => {
  // Create new list if theres none
  if (!state.list) {
    state.list = new List();
  }

  // Add each ingredient to the list & UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// Update and handle list item events
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // Delete from state
    state.list.deleteItem(id);

    // Delete form UI
    listView.deleteItem(id);
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// Likes controller
const controllLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }

  const currentID = state.recipe.id;

  // If user hasn't liked the recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to the UI
    likesView.renderLike(newLike);

    // If user has liked the recipe
  } else {
    // Remove like from the state
    state.likes.deleteLike(currentID);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like to the UI
    likesView.deleteLike(currentID);
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Test
const init = () => {
  window.addEventListener("load", (event) => {
    event.preventDefault();
    controlSearch();

    // Restore liked recipes on page load
    state.likes = new Likes();

    state.likes.readStorage();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach((like) => {
      likesView.renderLike(like);
    });
  });

  ["hashchange", "load"].forEach((event) =>
    window.addEventListener(event, controlRecipe)
  );
};

init();
