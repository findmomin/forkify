import { elements } from "./base";

export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute(
      "href",
      `img/icons.1c2ce2be29841c292917ca57a84a634c.svg#${iconString}`
    );
};

export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = (like) => {
  //
};
