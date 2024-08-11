import types from "./types";

export function setKeywordInput(keyword) {
  return { type: types.SET_KEYWORD_INPUT, payload: keyword };
}

export function getKeyword(keyword) {
  return { type: types.GET_KEYWORD, payload: keyword };
}

export function setKeyword(show) {
  return { type: types.SET_KEYWORD, payload: show };
}

export function getIngredient(ingredient) {
  return { type: types.GET_INGREDIENT, payload: ingredient };
}

export function addIngredient(ingredient) {
  return { type: types.ADD_INGREDIENT, payload: ingredient };
}

export function removeIngredient(ingredient) {
  return { type: types.REMOVE_INGREDIENT, payload: ingredient };
}

export function getAllIngredients(idx) {
  return { type: types.ALL_INGREDIENTS, payload: idx };
}

export function setError(error) {
  return { type: types.SET_ERROR, payload: error };
}

export function setNoRecipesFound(message) {
  return { type: types.SET_NO_RECIPES_FOUND, payload: message };
}

export function setAllRecipes(recipes) {
  return { type: types.GET_ALL_RECIPES, payload: recipes };
}

export function showRecipes(show) {
  return { type: types.SET_RECIPES, payload: show };
}
