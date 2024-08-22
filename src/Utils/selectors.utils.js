import { createSelector } from "@reduxjs/toolkit";
import { CREATE_NEW_PROFILE_ID, DEFAULT_PROFILE_ID } from "~/Reducers/profilesReducer";

export const allIngredientsSelector = (state) => state.ingredients.availableIngredients;
export const allCocktailsSelector = (state) => state.cocktails.availableCocktails;
export const allProfilesSelector = (state) => state.profiles.availableProfiles;
export const selectedProfileIDSelector = (state) => state.profiles.selectedProfileID;

export const ingredientSelector = createSelector(
  [allIngredientsSelector, (_state, ingredientID) => ingredientID],
  (availableIngredients, ingredientID) =>
    availableIngredients.find((ingredient) => ingredient?.id?.toString() === ingredientID?.toString())
);
export const cocktailSelector = createSelector(
  [allCocktailsSelector, (_state, cocktailID) => cocktailID],
  (availableCocktails, cocktailID) =>
    availableCocktails.find((cocktail) => cocktail?.id?.toString() === cocktailID?.toString())
);

export const ingredientDataSelector = createSelector([allIngredientsSelector], (availableIngredients) => {
  const newArray = availableIngredients?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
  newArray.sort(function (a, b) {
    let textA = a.label.toUpperCase();
    let textB = b.label.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return newArray;
});

export const profileDataSelector = createSelector([allProfilesSelector], (availableProfiles) => {
  const newArray = availableProfiles?.map(({ name, id }) => ({
    label: id === DEFAULT_PROFILE_ID ? `${name} (default)` : name,
    value: id,
  }));
  newArray.sort(function (a, b) {
    let textA = a.label.toUpperCase();
    let textB = b.label.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  newArray.push({ label: "Create new profile", value: CREATE_NEW_PROFILE_ID });
  return newArray;
});

export const profileSelector = createSelector(
  [allProfilesSelector, (_state, profileID) => profileID],
  (availableProfiles, profileID) =>
    availableProfiles.find((profile) => profile?.id?.toString() === profileID?.toString())
);

export const selectedProfileSelector = createSelector(
  [allProfilesSelector, selectedProfileIDSelector],
  (availableProfiles, selectedProfileID) =>
    availableProfiles.find((profile) => profile?.id?.toString() === selectedProfileID?.toString())
);

export const selectedProfileFavoritedCocktailsSelector = createSelector(
  [selectedProfileSelector],
  (selectedProfile) => selectedProfile?.favoritedCocktails
);

export const selectedProfileCocktailIsInFavoritesSelector = createSelector(
  [selectedProfileFavoritedCocktailsSelector, (_state, cocktailID) => cocktailID],
  (favoritedCocktails, cocktailID) => favoritedCocktails?.includes(cocktailID)
);

export const selectedProfileOwnedIngredientsSelector = createSelector(
  [selectedProfileSelector],
  (selectedProfile) => selectedProfile?.ownedIngredients
);

export const selectedProfileIngredientIsOwnedSelector = createSelector(
  [selectedProfileOwnedIngredientsSelector, (_state, ingredientID) => ingredientID],
  (ownedIngredients, ingredientID) => ownedIngredients?.includes(ingredientID)
);

export const selectedProfileInCartIngredientsSelector = createSelector(
  [selectedProfileSelector],
  (selectedProfile) => selectedProfile?.inCartIngredients
);

export const selectedProfileIngredientIsInCartSelector = createSelector(
  [selectedProfileInCartIngredientsSelector, (_state, ingredientID) => ingredientID],
  (inCartIngredients, ingredientID) => inCartIngredients?.includes(ingredientID)
);
