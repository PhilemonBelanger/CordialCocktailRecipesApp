class Ingredient {
  constructor({ id = 0, name = "", description = "", editable = false }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.editable = editable;
  }
}

export default Ingredient;
