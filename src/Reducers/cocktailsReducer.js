import { defaultCocktails } from "~/Constants/defaultCocktails";
import {
  ADD_COCKTAIL_INGREDIENT,
  ADD_COCKTAIL_STEP,
  CREATE_COCKTAIL,
  DELETE_COCKTAIL,
  DELETE_COCKTAIL_INGREDIENT,
  DELETE_COCKTAIL_STEP,
  REFRESH_DEFAULT_COCKTAILS,
  RESET_COCKTAILS,
  SET_COCKTAILS,
  UPDATE_COCKTAIL,
  UPDATE_COCKTAIL_STEP,
} from "./cocktailsActions";

const initialState = {
  availableCocktails: [...defaultCocktails],
};

function createCocktail(state, action) {
  const updatedAvailableCocktails = [...state.availableCocktails, action.newCocktail];
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function updateCocktail(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    let returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      returnValue = action.updatedCocktail;
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function deleteCocktail(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.filter(
    (cocktail) => cocktail.id.toString() !== action.cocktailData.id.toString()
  );
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function refreshDefaultCocktails(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    let returnValue = { ...a };
    if (!a.editable) {
      const defaultCocktail = defaultCocktails.find((cocktail) => cocktail.id?.toString() === a.id?.toString());
      if (defaultCocktail) {
        returnValue = { ...defaultCocktail };
      } else {
        returnValue.toDelete = true;
      }
    }
    return returnValue;
  });
  // Remove deleted cocktails from default
  let filteredUpdatedAvailableCocktails = updatedAvailableCocktails.filter((cocktail) => !cocktail.toDelete);
  // Add new default cocktails
  for (const defaultCocktail of defaultCocktails) {
    const cocktailInState = filteredUpdatedAvailableCocktails.find(
      (cocktail) => cocktail.id?.toString() === defaultCocktail.id?.toString()
    );
    if (!cocktailInState) {
      filteredUpdatedAvailableCocktails = filteredUpdatedAvailableCocktails.concat(defaultCocktail);
    }
  }
  return {
    ...state,
    availableCocktails: filteredUpdatedAvailableCocktails,
  };
}

function updateCocktailStep(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      const updatedSteps = [...a.steps];
      updatedSteps[action.updatedCocktail.stepIndex] = action.updatedCocktail.text;
      returnValue.steps = [...updatedSteps];
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function deleteCocktailStep(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      const updatedSteps = [...a.steps];
      updatedSteps.splice(action.updatedCocktail.stepIndex, 1);
      returnValue.steps = [...updatedSteps];
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function addCocktailStep(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      const updatedSteps = [...a.steps, ""];
      returnValue.steps = [...updatedSteps];
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function addCocktailIngredient(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      const newIngredientObject = {
        id: action.updatedCocktail.ingredientID,
        quantity: action.updatedCocktail.quantity,
        optional: action.updatedCocktail.optional,
      };
      const updatedIngredients = [...a.ingredients, newIngredientObject];
      returnValue.ingredients = [...updatedIngredients];
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

function deleteCocktailIngredient(state, action) {
  const updatedAvailableCocktails = state.availableCocktails.map((a) => {
    const returnValue = { ...a };
    if (a.id.toString() === action.updatedCocktail.id.toString()) {
      const updatedIngredients = [...a.ingredients];
      updatedIngredients.splice(action.updatedCocktail.ingredientIndex, 1);
      returnValue.ingredients = [...updatedIngredients];
    }
    return returnValue;
  });
  return {
    ...state,
    availableCocktails: updatedAvailableCocktails,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COCKTAILS:
      return {
        availableCocktails: action.cocktails,
      };
    case CREATE_COCKTAIL:
      return createCocktail(state, action);
    case UPDATE_COCKTAIL:
      return updateCocktail(state, action);
    case DELETE_COCKTAIL:
      return deleteCocktail(state, action);
    case UPDATE_COCKTAIL_STEP:
      return updateCocktailStep(state, action);
    case DELETE_COCKTAIL_STEP:
      return deleteCocktailStep(state, action);
    case ADD_COCKTAIL_STEP:
      return addCocktailStep(state, action);
    case ADD_COCKTAIL_INGREDIENT:
      return addCocktailIngredient(state, action);
    case DELETE_COCKTAIL_INGREDIENT:
      return deleteCocktailIngredient(state, action);
    case REFRESH_DEFAULT_COCKTAILS:
      return refreshDefaultCocktails(state, action);
    case RESET_COCKTAILS:
      return initialState;
  }
  return state;
};
