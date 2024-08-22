class Profile {
  constructor({ id = 0, name = "", favoritedCocktails = [], ownedIngredients = [], inCartIngredients = [] }) {
    this.id = id;
    this.name = name;
    this.favoritedCocktails = favoritedCocktails;
    this.ownedIngredients = ownedIngredients;
    this.inCartIngredients = inCartIngredients;
  }
}

export default Profile;
