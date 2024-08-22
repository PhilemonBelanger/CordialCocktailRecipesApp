import { MAX_NUMBER_OF_LISTED_INGREDIENTS } from "~/Constants/constants";

export const formatIngredientsString = (usedIngredients = [], allIngredients = [], ownedIngredientIDs = []) => {
  let ingredientsListString = "";
  let missingIngredientsListString = "Missing ";
  let ingredientMissingCount = 0;
  let nonOptionalIngredientMissingCount = 0;
  if (usedIngredients.length === 0) return "No ingredients";
  for (let i = 0; i < usedIngredients.length; i++) {
    const usedIngredient = usedIngredients[i];
    if (!usedIngredient) break;
    const ingredientObject = allIngredients.find(
      (ingredient) => ingredient?.id?.toString() === usedIngredient?.id?.toString()
    );
    if (!ingredientObject) break;
    if (!ownedIngredientIDs?.includes(ingredientObject?.id)) {
      if (ingredientMissingCount < MAX_NUMBER_OF_LISTED_INGREDIENTS) {
        missingIngredientsListString = missingIngredientsListString.concat(
          ingredientObject?.name,
          usedIngredient?.optional ? "*, " : ", "
        );
      }
      ingredientMissingCount++;
      if (!usedIngredient?.optional) {
        nonOptionalIngredientMissingCount++;
      }
    }
    if (i < MAX_NUMBER_OF_LISTED_INGREDIENTS) {
      ingredientsListString = ingredientsListString.concat(ingredientObject?.name, ", ");
    }
  }

  ingredientsListString = ingredientsListString.substring(0, ingredientsListString.length - 2).concat(" ");
  missingIngredientsListString = missingIngredientsListString
    .substring(0, missingIngredientsListString.length - 2)
    .concat(" ");

  if (usedIngredients?.length > MAX_NUMBER_OF_LISTED_INGREDIENTS) {
    ingredientsListString = ingredientsListString.concat(
      `+${usedIngredients.length - MAX_NUMBER_OF_LISTED_INGREDIENTS}`
    );
  }
  if (ingredientMissingCount > MAX_NUMBER_OF_LISTED_INGREDIENTS) {
    missingIngredientsListString = missingIngredientsListString.concat(
      `+${ingredientMissingCount - MAX_NUMBER_OF_LISTED_INGREDIENTS}`
    );
  }
  if (nonOptionalIngredientMissingCount > 0) {
    ingredientsListString = missingIngredientsListString; //ingredientsListString.concat("\n", missingIngredientsListString);
  }
  return ingredientsListString;
};

export const isCocktailAvailable = (usedIngredients = [], allIngredients = [], ownedIngredientIDs = []) => {
  let ingredientMissingCount = 0;
  for (let i = 0; i < usedIngredients.length; i++) {
    const usedIngredient = usedIngredients[i];
    if (!usedIngredient) break;
    const ingredientObject = allIngredients.find(
      (ingredient) => ingredient?.id?.toString() === usedIngredient?.id?.toString()
    );
    if (!ingredientObject) break;
    if (!ownedIngredientIDs?.includes(ingredientObject?.id) && !usedIngredient.optional) {
      ingredientMissingCount++;
    }
  }
  return ingredientMissingCount === 0;
};

export const getIngredientsNeeded = (usedIngredients = [], allIngredients = []) => {
  let ingredientsNeeded = [];
  for (let i = 0; i < usedIngredients.length; i++) {
    const usedIngredient = usedIngredients[i];
    const ingredientObject = allIngredients.find(
      (ingredient) => ingredient?.id?.toString() === usedIngredient?.id?.toString()
    );
    if (!ingredientObject) continue;
    ingredientsNeeded = [
      ...ingredientsNeeded,
      { ...ingredientObject, optional: usedIngredient?.optional, quantity: usedIngredient?.quantity },
    ];
  }
  return ingredientsNeeded;
};
