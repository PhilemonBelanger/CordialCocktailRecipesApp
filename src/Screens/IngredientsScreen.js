import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchbar, SegmentedButtons, FAB, IconButton } from "react-native-paper";
import IngredientsList from "~/Components/IngredientsList";
import { isCocktailAvailable } from "~/Utils/cocktails.utils";
import { getNumberOfCocktailsUsedIn } from "~/Utils/ingredients.utils";
import { theme } from "~/Constants/theme";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  selectedProfileOwnedIngredientsSelector,
} from "~/Utils/selectors.utils";
import { createIngredient } from "~/Reducers/ingredientsActions";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";

const IngredientsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(["owned", "notOwned"]);
  const cocktails = useSelector(allCocktailsSelector);
  const ingredients = useSelector(allIngredientsSelector);
  const [searchResults, setSearchResults] = useState(ingredients);
  const ownedIngredientIDs = useSelector(selectedProfileOwnedIngredientsSelector);

  useEffect(() => {
    filterIngredients();
  }, [cocktails, ingredients, searchQuery, filters, ownedIngredientIDs]);

  const filterIngredients = () => {
    const filteredIngredients = ingredients.filter((item) => {
      const available = isCocktailAvailable(item.ingredients, ingredients, ownedIngredientIDs);
      let visible = true;
      if (
        (!filters.includes("owned") && ownedIngredientIDs?.includes(item?.id)) ||
        (!filters.includes("notOwned") && !ownedIngredientIDs?.includes(item?.id))
      ) {
        visible = false;
      }
      const returnValue = visible && item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return returnValue;
    });
    if (filters.includes("sortAZ")) {
      filteredIngredients.sort(function (a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    } else {
      filteredIngredients.sort(function (a, b) {
        let textA = getNumberOfCocktailsUsedIn(b.id, cocktails);
        let textB = getNumberOfCocktailsUsedIn(a.id, cocktails);
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }

    setSearchResults(filteredIngredients);
  };

  const createNewHandler = () => {
    const newID = Date.now();
    dispatch(createIngredient({ id: newID }));
    navigation.navigate("IngredientEdit", {
      ingredientID: newID,
      create: true,
    });
  };

  const [isCreateVisible, hideCreateModal, showCreateModal] = useModalToggler();
  const [isFiltersVisible, hideFilters, showFilters] = useModalToggler();

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          theme={{ colors: { elevation: { level3: theme.colors.elevation.level0 } } }}
          right={() => <IconButton icon="filter" onPress={isFiltersVisible ? hideFilters : showFilters} />}
        />
        {isFiltersVisible && (
          <SegmentedButtons
            multiSelect
            onValueChange={setFilters}
            value={filters}
            style={styles.group}
            density="regular"
            buttons={[
              {
                style: styles.button,
                value: "owned",
                label: "Owned",
              },
              {
                style: styles.button,
                value: "notOwned",
                label: "Not Owned",
              },
              {
                style: styles.button,
                value: "sortAZ",
                label: "Sort A-Z",
              },
            ]}
          />
        )}
      </View>
      <View style={styles.list}>
        <IngredientsList
          ingredients={searchResults}
          onCardPress={(item) => {
            navigation.navigate("IngredientDetails", {
              ingredientID: item.id,
            });
          }}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showCreateModal}
        theme={{
          colors: {
            primaryContainer: theme.colors.primary,
            onPrimaryContainer: theme.colors.onPrimary,
          },
        }}
      />
      <ConfirmationDialog
        isVisible={isCreateVisible}
        onOkPress={createNewHandler}
        hideDialog={hideCreateModal}
        text="Are you sure you want to create a new ingredient?"
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
  group: { justifyContent: "center", marginTop: 5 },
  button: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    marginHorizontal: 3,
    flex: 1,
  },
});
export default IngredientsScreen;
