import Cocktail from "~/Models/cocktail";

export const SET_COCKTAILS = "SET_COCKTAILS";
export const RESET_COCKTAILS = "RESET_COCKTAILS";
export const CREATE_COCKTAIL = "CREATE_COCKTAIL";
export const UPDATE_COCKTAIL = "UPDATE_COCKTAIL";
export const DELETE_COCKTAIL = "DELETE_COCKTAIL";
export const UPDATE_COCKTAIL_STEP = "UPDATE_COCKTAIL_STEP";
export const DELETE_COCKTAIL_STEP = "DELETE_COCKTAIL_STEP";
export const ADD_COCKTAIL_STEP = "ADD_COCKTAIL_STEP";
export const ADD_COCKTAIL_INGREDIENT = "ADD_COCKTAIL_INGREDIENT";
export const DELETE_COCKTAIL_INGREDIENT = "DELETE_COCKTAIL_INGREDIENT";
export const REFRESH_DEFAULT_COCKTAILS = "REFRESH_DEFAULT_COCKTAILS";

export const setCocktails = (cocktails) => {
  const loadedCocktails = [];
  for (const key in cocktails) {
    loadedCocktails.push(
      new Cocktail({
        id: cocktails[key].id,
        name: cocktails[key].name,
        description: cocktails[key].description,
        steps: [...cocktails[key].steps],
        ingredients: [...cocktails[key].ingredients],
        editable: cocktails[key].editable,
        uri: cocktails[key].uri,
      })
    );
  }
  return {
    type: SET_COCKTAILS,
    cocktails: loadedCocktails,
  };
};

export const resetCocktails = () => {
  return { type: RESET_COCKTAILS };
};

export const createCocktail = ({
  id = 0,
  name = "",
  description = "",
  steps = [],
  ingredients = [],
  editable = true,
  uri = undefined,
}) => {
  const newCocktail = new Cocktail({
    id,
    name,
    description,
    steps,
    ingredients,
    editable,
    uri,
  });
  return {
    type: CREATE_COCKTAIL,
    newCocktail,
  };
};

export const updateCocktail = ({
  id = 0,
  name = "",
  description = "",
  steps = [],
  ingredients = [],
  editable = true,
  uri = undefined,
}) => {
  const updatedCocktail = new Cocktail({
    id,
    name,
    description,
    steps,
    ingredients,
    editable,
    uri,
  });
  return {
    type: UPDATE_COCKTAIL,
    updatedCocktail,
  };
};

export const deleteCocktail = ({ id = 0 }) => {
  return {
    type: DELETE_COCKTAIL,
    cocktailData: {
      id,
    },
  };
};

export const updateCocktailStep = ({ id = 0, stepIndex = 0, text = "" }) => {
  return {
    type: UPDATE_COCKTAIL_STEP,
    updatedCocktail: {
      id,
      stepIndex,
      text,
    },
  };
};

export const deleteCocktailStep = ({ id = 0, stepIndex = 0 }) => {
  return {
    type: DELETE_COCKTAIL_STEP,
    updatedCocktail: {
      id,
      stepIndex,
    },
  };
};

export const addCocktailStep = ({ id = 0 }) => {
  return {
    type: ADD_COCKTAIL_STEP,
    updatedCocktail: {
      id,
    },
  };
};

export const addCocktailIngredient = ({ id = 0, ingredientID = 0, quantity = "", optional = false }) => {
  return {
    type: ADD_COCKTAIL_INGREDIENT,
    updatedCocktail: {
      id,
      ingredientID,
      quantity,
      optional,
    },
  };
};

export const deleteCocktailIngredient = ({ id = 0, ingredientIndex = 0 }) => {
  return {
    type: DELETE_COCKTAIL_INGREDIENT,
    updatedCocktail: {
      id,
      ingredientIndex,
    },
  };
};

export const refreshDefaultCocktails = () => {
  return {
    type: REFRESH_DEFAULT_COCKTAILS,
  };
};
