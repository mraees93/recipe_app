import types from "./types";

const initialState = {
  error: "",
  keywordInput: "",
  keyword: "",
  showKeyword: false,
  ingredient: "",
  ingredients: [],
  recipes: [],
  showRecipes: false,
  noRecipesFoundMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_KEYWORD_INPUT:
      return { ...state, keywordInput: action.payload };
    case types.GET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        error: "",
        noRecipesFoundMessage: "",
      };
    case types.SET_KEYWORD:
      return { ...state, showKeyword: action.payload };
    case types.GET_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
        noRecipesFoundMessage: "",
      };
    case types.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case types.REMOVE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: ingredients,
      };
    case types.ALL_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients] };
    case types.SET_ERROR:
      return { ...state, error: action.payload, recipes: [] };
    case types.GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        error: "",
        noRecipesFoundMessage: "",
      };
    case types.SET_RECIPES:
      return { ...state, showRecipes: action.payload };
    case types.SET_NO_RECIPES_FOUND:
      return { ...state, noRecipesFoundMessage: action.payload, recipes: [] };
    default:
      return state;
  }
};

export default reducer;
