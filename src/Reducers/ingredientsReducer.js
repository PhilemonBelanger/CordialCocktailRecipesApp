import { defaultIngredients } from "~/Constants/defaultIngredients";
import {
  CREATE_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  SET_INGREDIENTS,
  UPDATE_INGREDIENT,
  REFRESH_DEFAULT_INGREDIENTS,
} from "./ingredientsActions";

const initialState = {
  availableIngredients: [...defaultIngredients],
};

function createIngredient(state, action) {
  const updatedAvailableIngredients = [...state.availableIngredients, action.newIngredient];
  return {
    ...state,
    availableIngredients: updatedAvailableIngredients,
  };
}

function updateIngredient(state, action) {
  const updatedAvailableIngredients = state.availableIngredients.map((a) => {
    let returnValue = { ...a };
    if (a.id.toString() === action.updatedIngredient.id.toString()) {
      returnValue = action.updatedIngredient;
    }
    return returnValue;
  });
  return {
    ...state,
    availableIngredients: updatedAvailableIngredients,
  };
}

function deleteIngredient(state, action) {
  const updatedAvailableIngredients = state.availableIngredients.filter(
    (ingredient) => ingredient.id.toString() !== action.ingredientData.id.toString()
  );
  return {
    ...state,
    availableIngredients: updatedAvailableIngredients,
  };
}

function refreshDefaultIngredients(state, action) {
  const updatedAvailableIngredients = state.availableIngredients.map((a) => {
    let returnValue = { ...a };
    if (!a.editable) {
      const defaultIngredient = defaultIngredients.find((ingredient) => ingredient.id?.toString() === a.id?.toString());
      if (defaultIngredient) {
        returnValue = { ...defaultIngredient };
      } else {
        returnValue.toDelete = true;
      }
    }
    return returnValue;
  });
  // Remove deleted ingredients from default
  let filteredUpdatedAvailableIngredients = updatedAvailableIngredients.filter((ingredient) => !ingredient.toDelete);
  // Add new default ingredients
  for (const defaultIngredient of defaultIngredients) {
    const ingredientInState = filteredUpdatedAvailableIngredients.find(
      (ingredient) => ingredient.id?.toString() === defaultIngredient.id?.toString()
    );
    if (!ingredientInState) {
      filteredUpdatedAvailableIngredients = filteredUpdatedAvailableIngredients.concat(defaultIngredient);
    }
  }
  return {
    ...state,
    availableIngredients: filteredUpdatedAvailableIngredients,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        availableIngredients: action.ingredients,
      };
    case CREATE_INGREDIENT:
      return createIngredient(state, action);
    case UPDATE_INGREDIENT:
      return updateIngredient(state, action);
    case DELETE_INGREDIENT:
      return deleteIngredient(state, action);
    case REFRESH_DEFAULT_INGREDIENTS:
      return refreshDefaultIngredients(state, action);
    case RESET_INGREDIENTS:
      return initialState;
  }
  return state;
};
