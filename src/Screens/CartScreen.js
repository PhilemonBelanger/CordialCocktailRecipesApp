import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Searchbar } from "react-native-paper";
import { resetIngredients } from "~/Reducers/ingredientsActions";
import IngredientsList from "~/Components/IngredientsList";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  selectedProfileInCartIngredientsSelector,
} from "~/Utils/selectors.utils";
import { theme } from "~/Constants/theme";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const cocktails = useSelector(allCocktailsSelector);
  const ingredients = useSelector(allIngredientsSelector);
  const inCartIngredientsIDs = useSelector(selectedProfileInCartIngredientsSelector);
  const [searchResults, setSearchResults] = useState(
    ingredients.filter((ingredient) => inCartIngredientsIDs?.map(String)?.includes(ingredient.id?.toString()))
  );
  useEffect(() => {
    const newSearchResult = ingredients.filter((ingredient) =>
      inCartIngredientsIDs?.map(String)?.includes(ingredient.id?.toString())
    );
    setSearchResults(newSearchResult);
    onChangeSearch(searchQuery);
  }, [cocktails, ingredients, inCartIngredientsIDs]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setSearchResults(
      ingredients
        .filter((ingredient) => inCartIngredientsIDs?.includes(ingredient?.id) === true)
        .filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          theme={{ colors: { elevation: { level3: theme.colors.elevation.level0 } } }}
        />
      </View>
      <IngredientsList
        ingredients={searchResults}
        onCardPress={(item) => {
          navigation.navigate("IngredientDetails", {
            ingredientID: item.id,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    margin: 5,
  },
});
export default CartScreen;
