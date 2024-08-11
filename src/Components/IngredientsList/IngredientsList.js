import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient, getAllIngredients } from "../../state/actions";
import { FaTrash } from "react-icons/fa";

export default function IngredientsList() {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients);

  const handleRemoveIngredient = (_, ingredientIdx) => {
    dispatch(removeIngredient(ingredientIdx));
    dispatch(getAllIngredients(ingredients));
  };

  return (
    <div data-testid="ingredientsListID">
      <h3>{ingredients.length ? "Ingredients:" : ""}</h3>
      {ingredients.length
        ? ingredients.map((ingredient, idx) => {
            return (
              <div key={idx} className="ingredient">
                <div>{ingredient}</div>
                <div>
                  <FaTrash
                    data-testid="removeIngredientID"
                    onClick={(e) => handleRemoveIngredient(e, idx)}
                    style={{ fontSize: "15px" }}
                  />
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
