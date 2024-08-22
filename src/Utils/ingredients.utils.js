export const getCocktailsUsedIn = (ingredientID = 0, cocktails = []) => {
  const cocktailsUsingIngredient = cocktails.filter((cocktail) =>
    cocktail.ingredients.some((ingredient) => ingredient?.id?.toString() === ingredientID?.toString())
  );
  return cocktailsUsingIngredient;
};

export const getCocktailsUsedInNotOptional = (ingredientID = 0, cocktails = []) => {
  const cocktailsUsingIngredient = cocktails.filter((cocktail) =>
    cocktail.ingredients.some(
      (ingredient) => ingredient?.id?.toString() === ingredientID?.toString() && !ingredient.optional
    )
  );
  return cocktailsUsingIngredient;
};

export const getNumberOfCocktailsUsedIn = (ingredientID = 0, cocktails = []) => {
  const cocktailsUsingIngredient = getCocktailsUsedIn(ingredientID, cocktails) ?? [];
  return cocktailsUsingIngredient.length;
};

export const getNumberOfCocktailsWhichIsOnlyMissingIngredient = (
  ingredientID = 0,
  ingredients = [],
  cocktails = [],
  ownedIngredientIDs = []
) => {
  const selectedIngredient = ingredients.find((ingredient) => ingredient?.id?.toString() === ingredientID?.toString());
  if (ownedIngredientIDs?.includes(selectedIngredient?.id)) return 0;
  const cocktailsUsingIngredient = getCocktailsUsedInNotOptional(ingredientID, cocktails) ?? [];
  let numberOfCocktailsWhichIsOnlyMissingIngredient = 0;
  cocktailsUsingIngredient?.forEach((cocktail) => {
    let numberOfMissingIngredients = 0;
    cocktail?.ingredients?.forEach((cocktailIngredient) => {
      const relatedIngredient = ingredients.find(
        (ingredient) => ingredient?.id?.toString() === cocktailIngredient?.id?.toString()
      );
      if (!ownedIngredientIDs?.includes(relatedIngredient?.id) && !cocktailIngredient.optional)
        numberOfMissingIngredients = numberOfMissingIngredients + 1;
    });
    if (numberOfMissingIngredients === 1)
      numberOfCocktailsWhichIsOnlyMissingIngredient = numberOfCocktailsWhichIsOnlyMissingIngredient + 1;
  });
  return numberOfCocktailsWhichIsOnlyMissingIngredient;
};

export const formatCocktailsString = (ingredientID, ingredients, cocktails, ownedIngredientIDs) => {
  const cocktailsUsedIn = getCocktailsUsedIn(ingredientID, cocktails);
  const usedInString =
    !cocktailsUsedIn.length > 0
      ? ""
      : cocktailsUsedIn.length == 1
      ? `Used in 1 cocktail`
      : `Used in ${cocktailsUsedIn.length} cocktails`;
  const numberOfCocktailsWhichIsOnlyMissingIngredient = getNumberOfCocktailsWhichIsOnlyMissingIngredient(
    ingredientID,
    ingredients,
    cocktails,
    ownedIngredientIDs
  );
  const avaialbleString = !(numberOfCocktailsWhichIsOnlyMissingIngredient > 0)
    ? ""
    : `Add for access to +${numberOfCocktailsWhichIsOnlyMissingIngredient}`;
  const fullString = `${usedInString}\n${avaialbleString}`;
  return fullString;
};
