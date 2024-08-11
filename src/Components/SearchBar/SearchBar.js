import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateIngredientInput } from "../../helperFunctions";
import IngredientsList from "../IngredientsList/IngredientsList";
import { getAllRecipes } from "../../state/fetchRecipesThunk";
import {
  getIngredient,
  addIngredient,
  setError,
  getKeyword,
  setKeyword,
  setKeywordInput,
} from "../../state/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const keywordInput = useSelector((state) => state.keywordInput);
  const keyword = useSelector((state) => state.keyword);
  const showKeyword = useSelector((state) => state.showKeyword);
  const ingredient = useSelector((state) => state.ingredient);
  const ingredients = useSelector((state) => state.ingredients);
  const error = useSelector((state) => state.error);
  const noRecipesFoundMessage = useSelector(
    (state) => state.noRecipesFoundMessage
  );

  const handleKeywordInput = (e) => {
    e.preventDefault();
    dispatch(setKeyword(false));
    dispatch(setKeywordInput(e.target.value));
    dispatch(getKeyword(e.target.value));
  };

  const handleSetKeywordClick = () => {
    if (keyword) {
      dispatch(setKeyword(true));
      dispatch(setKeywordInput(""));
    }
  };

  const handleIngredientInput = (e) => {
    e.preventDefault();
    dispatch(getIngredient(e.target.value));
    dispatch(setError(""));
  };

  const handleAddIngredientClick = () => {
    if (ingredient) {
      if (ingredient.length === 1) dispatch(setError("Invalid ingredient"));
      else if (
        ingredient.length > 1 &&
        !validateIngredientInput(ingredient, ingredients)
      ) {
        dispatch(addIngredient(ingredient));
        dispatch(getIngredient(""));
        dispatch(setError(""));
      } else dispatch(setError("Ingredient already added"));
    }
  };

  const handleGetAllRecipes = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  return (
    <div className="form-center">
      <form onSubmit={handleGetAllRecipes}>
        <div data-testid="keywordID">
          <input
            data-testid="keywordInputID"
            type="text"
            placeholder="Add keyword"
            onChange={handleKeywordInput}
            value={keywordInput}
          />
          <button
            data-testid="setKeywordID"
            type="button"
            onClick={handleSetKeywordClick}
          >
            Set keyword
          </button>
          {showKeyword && <p>{keyword}</p>}
        </div>
        <div data-testid="ingredientID">
          <input
            data-testid="ingredientInputID"
            type="text"
            placeholder="Add ingredient"
            onChange={handleIngredientInput}
            onKeyDown={(e) => e.key === "Enter" && handleAddIngredientClick()}
            value={ingredient}
          />
          <button
            data-testid="addIngredientID"
            type="button"
            onClick={handleAddIngredientClick}
          >
            Add ingredient
          </button>
          <div data-testid="errorID" style={{ color: "red" }}>
            {error.length ? error : ""}
          </div>
        </div>
        <button data-testid="submitID" type="submit">
          Search recipe
        </button>
        <div style={{ color: "blue" }}>
          {noRecipesFoundMessage.length ? noRecipesFoundMessage : ""}
        </div>
      </form>
      <div className="ingredientsList">
        <IngredientsList />
      </div>
    </div>
  );
}
