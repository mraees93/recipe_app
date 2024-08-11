import React from "react";
import Recipe from "./Recipe";
import { useSelector } from "react-redux";

export default function RecipesLayout() {
  const recipes = useSelector((state) => state.recipes);
  const showRecipes = useSelector((state) => state.showRecipes);

  return (
    <div className="recipes" data-testid="recipesLayoutID">
      {showRecipes &&
        recipes.map((recipe, idx) => (
          <Recipe
            key={idx}
            name={recipe.recipe.label}
            ingredients={recipe.recipe.ingredients}
            image={recipe.recipe.image}
          />
        ))}
    </div>
  );
}
