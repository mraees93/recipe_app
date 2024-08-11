import store from "./store";
import {
  setAllRecipes,
  setError,
  setNoRecipesFound,
  showRecipes,
} from "./actions";

export function getAllRecipes() {
  const ingredients = store.getState().ingredients;
  const keyword = store.getState().keyword;

  return async function (dispatch) {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&q=${keyword},${ingredients}&type=public`
      );
      const recipes = await response.json();

      if (recipes.hits.length === 0) {
        dispatch(setNoRecipesFound("Recipes were not found"));
        return;
      }

      dispatch(showRecipes(true));
      dispatch(setAllRecipes(recipes.hits));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}
