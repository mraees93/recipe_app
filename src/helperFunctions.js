function validateIngredientInput(input, ingredients) {
  ingredients = ingredients.map((ingredient) => ingredient.toLowerCase());
  input = input.toLowerCase();
  for (const ingredient of ingredients) {
    const inputCopy = input.split("").slice();
    let j = 0;
    for (const letter of ingredient) {
      if (inputCopy[j] !== letter) {
        inputCopy.splice(j, 1);
      }
      j++;
    }
    if (
      ingredient.startsWith(inputCopy.join("")) ||
      (ingredient.length === inputCopy.length &&
        inputCopy.join("") === ingredient)
    )
      return true;
  }
  return false;
}
module.exports = { validateIngredientInput };
