import { Card, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "~/Constants/theme";
import { formatCocktailsString, getCocktailsUsedIn } from "~/Utils/ingredients.utils";
import { capitalizeFirstLetter } from "~/Utils/string.utils";
import { ENABLE_SUBTITLE_DYNAMIC_LISTINGS, NOOP } from "~/Constants/constants";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  selectedProfileIDSelector,
  selectedProfileIngredientIsInCartSelector,
  selectedProfileIngredientIsOwnedSelector,
  selectedProfileOwnedIngredientsSelector,
} from "~/Utils/selectors.utils";
import { toggleInCartIngredient, toggleOwnedIngredient } from "~/Reducers/profilesActions";

const IngredientsCard = ({
  item = {},
  onCardPress = NOOP,
  allowDelete = false,
  onIngredientDelete = NOOP,
  showQuantities = false,
}) => {
  const dispatch = useDispatch();
  const allCocktails = useSelector(allCocktailsSelector);
  const allIngredients = useSelector(allIngredientsSelector);
  const selectedProfileID = useSelector(selectedProfileIDSelector);
  const ownedIngredientIDs = useSelector(selectedProfileOwnedIngredientsSelector);
  const owned = useSelector((state) => selectedProfileIngredientIsOwnedSelector(state, item.id));
  const inCart = useSelector((state) => selectedProfileIngredientIsInCartSelector(state, item.id));

  const toggleOwned = () => {
    dispatch(toggleOwnedIngredient({ profileID: selectedProfileID, ingredientID: item.id }));
  };
  const toggleinCart = () => {
    dispatch(toggleInCartIngredient({ profileID: selectedProfileID, ingredientID: item.id }));
  };

  const ingredientsString = ENABLE_SUBTITLE_DYNAMIC_LISTINGS
    ? formatCocktailsString(item.id, allIngredients, allCocktails, ownedIngredientIDs)
    : "";
  const name = showQuantities
    ? `${capitalizeFirstLetter(item.quantity)} - ${capitalizeFirstLetter(item.name)}`
    : capitalizeFirstLetter(item.name);
  const titleString = item?.optional ? `${name} (Optional)` : name;
  return (
    <Card onPress={onCardPress} style={owned ? styles.cardAvailable : styles.card}>
      <Card.Title
        title={titleString}
        subtitle={ingredientsString}
        subtitleNumberOfLines={2}
        subtitleStyle={{ color: "grey" }}
        right={() => (
          <View style={styles.row}>
            {!allowDelete && <IconButton icon="cart" mode={"contained"} selected={inCart} onPress={toggleinCart} />}
            {!allowDelete && <IconButton icon="check" mode={"contained"} selected={owned} onPress={toggleOwned} />}
            {allowDelete && (
              <IconButton icon="close-circle-outline" onPress={onIngredientDelete} iconColor={theme.colors.error} />
            )}
          </View>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  card: {
    height: 80,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: theme.colors.surface,
  },
  cardAvailable: {
    height: 80,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: theme.colors.primaryContainer,
  },
});

export default IngredientsCard;
