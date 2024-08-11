import React from "react";

export default function Recipe({ name, ingredients, image }) {
  return (
    <div className="recipe" data-testid="recipeID">
      <div>
        <h1>{name}</h1>
        <ol>
          {ingredients
            ? ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient.text}</li>
              ))
            : null}
        </ol>
        <img className="image" src={image} alt="" />
      </div>
    </div>
  );
}
