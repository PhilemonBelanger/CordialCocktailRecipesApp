import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  SET_PROFILES,
  RESET_PROFILES,
  SET_SELECTED_PROFILE_ID,
  TOGGLE_FAVORITED_COCKTAIL,
  TOGGLE_IN_CART_INGREDIENT,
  TOGGLE_OWNED_INGREDIENT,
} from "./profilesActions";

export const DEFAULT_PROFILE_ID = 1;
export const CREATE_NEW_PROFILE_ID = -1;

const defaultProfiles = [
  {
    id: DEFAULT_PROFILE_ID,
    name: "Profile 1",
    favoritedCocktails: [],
    ownedIngredients: [],
    inCartIngredients: [],
  },
];

const initialState = {
  availableProfiles: [...defaultProfiles],
  selectedProfileID: DEFAULT_PROFILE_ID,
};

function createProfile(state, action) {
  const updatedAvailableProfiles = [...state.availableProfiles, action.newProfile];
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
  };
}

function updateProfile(state, action) {
  const updatedAvailableProfiles = state.availableProfiles.map((a) => {
    let returnValue = { ...a };
    if (a.id.toString() === action.updatedProfile.id.toString()) {
      returnValue = action.updatedProfile;
    }
    return returnValue;
  });
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
  };
}

function deleteProfile(state, action) {
  if (action.profileData.id.toString() === DEFAULT_PROFILE_ID.toString()) {
    // Do not delete the default profile
    return { ...state };
  }
  const updatedAvailableProfiles = state.availableProfiles.filter(
    (profile) => profile.id.toString() !== action.profileData.id.toString()
  );
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
    selectedProfileID: state.selectedProfileID === action.profileData.id ? DEFAULT_PROFILE_ID : state.selectedProfileID,
  };
}

function toggleFavoritedCocktail(state, action) {
  const updatedAvailableProfiles = state.availableProfiles.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.profileData.id.toString()) {
      if (a.favoritedCocktails.includes(action.profileData.cocktailID)) {
        returnValue.favoritedCocktails = a.favoritedCocktails.filter(
          (cocktailID) => cocktailID.toString() !== action.profileData.cocktailID.toString()
        );
      } else {
        returnValue.favoritedCocktails = [...a.favoritedCocktails, action.profileData.cocktailID];
      }
    }
    return returnValue;
  });
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
  };
}

function toggleOwnedIngredient(state, action) {
  const updatedAvailableProfiles = state.availableProfiles.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.profileData.id.toString()) {
      if (a.ownedIngredients.includes(action.profileData.ingredientID)) {
        returnValue.ownedIngredients = a.ownedIngredients.filter(
          (ingredientID) => ingredientID.toString() !== action.profileData.ingredientID.toString()
        );
      } else {
        returnValue.ownedIngredients = [...a.ownedIngredients, action.profileData.ingredientID];
      }
    }
    return returnValue;
  });
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
  };
}

function toggleInCartIngredient(state, action) {
  const updatedAvailableProfiles = state.availableProfiles.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.profileData.id.toString()) {
      if (a.inCartIngredients.includes(action.profileData.ingredientID)) {
        returnValue.inCartIngredients = a.inCartIngredients.filter(
          (ingredientID) => ingredientID.toString() !== action.profileData.ingredientID.toString()
        );
      } else {
        returnValue.inCartIngredients = [...a.inCartIngredients, action.profileData.ingredientID];
      }
    }
    return returnValue;
  });
  return {
    ...state,
    availableProfiles: updatedAvailableProfiles,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return {
        availableProfiles: action.profiles,
        selectedProfileID: DEFAULT_PROFILE_ID,
      };
    case CREATE_PROFILE:
      return createProfile(state, action);
    case UPDATE_PROFILE:
      return updateProfile(state, action);
    case DELETE_PROFILE:
      return deleteProfile(state, action);
    case SET_SELECTED_PROFILE_ID:
      return {
        ...state,
        selectedProfileID: action.id ?? DEFAULT_PROFILE_ID,
      };
    case TOGGLE_FAVORITED_COCKTAIL:
      return toggleFavoritedCocktail(state, action);
    case TOGGLE_OWNED_INGREDIENT:
      return toggleOwnedIngredient(state, action);
    case TOGGLE_IN_CART_INGREDIENT:
      return toggleInCartIngredient(state, action);
    case RESET_PROFILES:
      return initialState;
  }
  return state;
};
