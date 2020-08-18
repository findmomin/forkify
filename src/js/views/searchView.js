import { elements } from "./base";

export const getInput = () => {
  // Reads input from the search field
  const input = elements.searchInput.value;

  const defaultQueries = [
    "carrot",
    "broccoli",
    "asparagus",
    "cauliflower",
    "corn",
    "cucumber",
    "green pepper",
    "lettuce",
    "mushrooms",
    "onion",
    "potato",
    "pumpkin",
    "red pepper",
    "tomato",
    "beetroot",
    "brussel sprouts",
    "peas",
    "zucchini",
    "radish",
    "sweet potato",
    "artichoke",
    "leek",
    "cabbage",
    "celery",
    "chili",
    "garlic",
    "basil",
    "coriander",
    "parsley",
    "dill",
    "rosemary",
    "oregano",
    "cinnamon",
    "saffron",
    "green bean",
    "bean",
    "chickpea",
    "lentil",
    "apple",
    "apricot",
    "avocado",
    "banana",
    "blackberry",
    "blackcurrant",
    "blueberry",
    "boysenberry",
    "cherry",
    "coconut",
    "fig",
    "grape",
    "grapefruit",
    "kiwifruit",
    "lemon",
    "lime",
    "lychee",
    "mandarin",
    "mango",
    "melon",
    "nectarine",
    "orange",
    "papaya",
    "passion fruit",
    "peach",
    "pear",
    "pineapple",
    "plum",
    "pomegranate",
    "quince",
    "raspberry",
    "strawberry",
    "watermelon",
    "salad",
    "pizza",
    "pasta",
    "popcorn",
    "lobster",
    "steak",
    "bbq",
    "pudding",
    "hamburger",
    "pie",
    "cake",
    "sausage",
    "tacos",
    "kebab",
    "poutine",
    "seafood",
    "chips",
    "fries",
    "masala",
    "paella",
    "som tam",
    "chicken",
    "toast",
    "marzipan",
    "tofu",
    "ketchup",
    "hummus",
    "chili",
    "maple syrup",
    "parma ham",
    "fajitas",
    "champ",
    "lasagna",
    "poke",
    "chocolate",
    "croissant",
    "arepas",
    "bunny chow",
    "pierogi",
    "donuts",
    "rendang",
    "sushi",
    "ice cream",
    "duck",
    "curry",
    "beef",
    "goat",
    "lamb",
    "turkey",
    "pork",
    "fish",
    "crab",
    "bacon",
    "ham",
    "pepperoni",
    "salami",
    "ribs",
  ];
  const query = Math.round(Math.random() * 127);

  if (input !== "") {
    return input;
  } else {
    return defaultQueries[query];
  }
};

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from(
    document.querySelectorAll(".results__link")
  ).forEach((el) => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`.results__link[href*="#${id}"]`)
    .classList.add("results__link--active");
};

export const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];

    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
   <li>
      <a class="results__link" href="#${recipe.recipe_id}">
         <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
         </figure>
         <div class="results__data">
           <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
           <p class="results__author">${recipe.publisher}</p>
         </div>
      </a>
   </li>
   `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => {
  return `
   <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
   <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
      <svg class="search__icon">
         <use href="img/icons.1c2ce2be29841c292917ca57a84a634c.svg#icon-triangle-${
           type === "prev" ? "left" : "right"
         }"></use>
      </svg>
   </button>
   `;
};

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Button to go to only the next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Button to go to both pages
    button = `
      ${createButton(page, "prev")}
      ${createButton(page, "next")}
      `;
  } else if (page === pages && pages > 1) {
    // Button to go to only the previous page
    button = createButton(page, "prev");
  }

  // Renders buttons
  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach((element) => {
    renderRecipe(element);
  });

  // Renders button for pages
  renderButtons(page, recipes.length, resPerPage);
};
