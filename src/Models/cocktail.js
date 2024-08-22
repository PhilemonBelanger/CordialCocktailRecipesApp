class Cocktail {
  constructor({
    id = 0,
    name = "",
    description = "",
    steps = [],
    ingredients = [],
    editable = false,
    uri = undefined,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.steps = steps;
    this.ingredients = ingredients;
    this.editable = editable;
    this.uri = uri;
  }
}

export default Cocktail;
