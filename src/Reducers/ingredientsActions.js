import Ingredient from "~/Models/ingredient";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const RESET_INGREDIENTS = "RESET_INGREDIENTS";
export const CREATE_INGREDIENT = "CREATE_INGREDIENT";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const REFRESH_DEFAULT_INGREDIENTS = "REFRESH_DEFAULT_INGREDIENTS";

export const setIngredients = (ingredients) => {
  const loadedIngredients = [];
  for (const key in ingredients) {
    loadedIngredients.push(
      new Ingredient({
        id: ingredients[key].id,
        name: ingredients[key].name,
        description: ingredients[key].description,
        editable: ingredients[key].editable,
      })
    );
  }
  return {
    type: SET_INGREDIENTS,
    ingredients: loadedIngredients,
  };
};

export const resetIngredients = () => {
  return { type: RESET_INGREDIENTS };
};

export const createIngredient = ({ id = 0, name = "", description = "", editable = true }) => {
  const newIngredient = new Ingredient({
    id,
    name,
    description,
    editable,
  });
  return {
    type: CREATE_INGREDIENT,
    newIngredient,
  };
};

export const updateIngredient = ({ id = 0, name = "", description = "", editable = true }) => {
  const updatedIngredient = new Ingredient({
    id,
    name,
    description,
    editable,
  });
  return {
    type: UPDATE_INGREDIENT,
    updatedIngredient,
  };
};

export const deleteIngredient = ({ id = 0 }) => {
  return {
    type: DELETE_INGREDIENT,
    ingredientData: {
      id,
    },
  };
};

export const refreshDefaultIngredients = () => {
  return {
    type: REFRESH_DEFAULT_INGREDIENTS,
  };
};
