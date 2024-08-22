import Profile from "~/Models/profile";

export const SET_PROFILES = "SET_PROFILES";
export const RESET_PROFILES = "RESET_PROFILES";
export const CREATE_PROFILE = "CREATE_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const SET_SELECTED_PROFILE_ID = "SET_SELECTED_PROFILE_ID";
export const TOGGLE_FAVORITED_COCKTAIL = "TOGGLE_FAVORITED_COCKTAIL";
export const TOGGLE_OWNED_INGREDIENT = "TOGGLE_OWNED_INGREDIENT";
export const TOGGLE_IN_CART_INGREDIENT = "TOGGLE_IN_CART_INGREDIENT";

export const setProfiles = (profiles) => {
  const loadedProfiles = [];
  for (const key in profiles) {
    loadedProfiles.push(
      new Profile({
        id: profiles[key].id,
        name: profiles[key].name,
        favoritedCocktails: profiles[key].favoritedCocktails,
        ownedIngredients: profiles[key].ownedIngredients,
        inCartIngredients: profiles[key].inCartIngredients,
      })
    );
  }
  return {
    type: SET_PROFILES,
    profiles: loadedProfiles,
  };
};

export const resetProfiles = () => {
  return { type: RESET_PROFILES };
};

export const createProfile = ({ id = 0, name = "New Profile" }) => {
  const newProfile = new Profile({
    id,
    name,
  });
  return {
    type: CREATE_PROFILE,
    newProfile,
  };
};

export const updateProfile = ({
  id = 0,
  name,
  favoritedCocktails = [],
  ownedIngredients = [],
  inCartIngredients = [],
}) => {
  const updatedProfile = new Profile({
    id,
    name,
    favoritedCocktails,
    ownedIngredients,
    inCartIngredients,
  });
  return {
    type: UPDATE_PROFILE,
    updatedProfile,
  };
};

export const deleteProfile = ({ id = 0 }) => {
  return {
    type: DELETE_PROFILE,
    profileData: {
      id,
    },
  };
};

export const setSelectedProfileIDAction = ({ id = 0 }) => {
  return {
    type: SET_SELECTED_PROFILE_ID,
    id,
  };
};

export const toggleFavoritedCocktail = ({ profileID = 0, cocktailID = 0 }) => {
  return {
    type: TOGGLE_FAVORITED_COCKTAIL,
    profileData: {
      id: profileID,
      cocktailID,
    },
  };
};

export const toggleOwnedIngredient = ({ profileID = 0, ingredientID = 0 }) => {
  return {
    type: TOGGLE_OWNED_INGREDIENT,
    profileData: {
      id: profileID,
      ingredientID,
    },
  };
};

export const toggleInCartIngredient = ({ profileID = 0, ingredientID = 0 }) => {
  return {
    type: TOGGLE_IN_CART_INGREDIENT,
    profileData: {
      id: profileID,
      ingredientID,
    },
  };
};
