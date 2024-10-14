import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchbar, SegmentedButtons, FAB, IconButton } from "react-native-paper";
import CocktailsList from "~/Components/CocktailsList";
import { isCocktailAvailable } from "~/Utils/cocktails.utils";
import { createCocktail, resetCocktails } from "~/Reducers/cocktailsActions";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "~/Constants/theme";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  selectedProfileFavoritedCocktailsSelector,
  selectedProfileOwnedIngredientsSelector,
} from "~/Utils/selectors.utils";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { defaultTags } from "~/Constants/tags";

const CocktailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(["available", "notAvailable"]);
  const cocktails = useSelector(allCocktailsSelector);
  const ingredients = useSelector(allIngredientsSelector);
  const [searchResults, setSearchResults] = useState(cocktails);
  const ownedIngredientIDs = useSelector(selectedProfileOwnedIngredientsSelector);
  const favoriteCocktailIDs = useSelector(selectedProfileFavoritedCocktailsSelector);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const tagData = [{ value: 0, label: "..." }, ...defaultTags.map((tag) => ({ value: tag.id, label: tag.name }))];
  useEffect(() => {
    filterCocktails();
  }, [cocktails, ingredients, searchQuery, filters, ownedIngredientIDs, favoriteCocktailIDs, selectedTag]);

  const filterCocktails = () => {
    const filteredCocktails = cocktails.filter((item) => {
      const available = isCocktailAvailable(item.ingredients, ingredients, ownedIngredientIDs);
      let visible = true;
      if (
        (!filters.includes("available") && available) ||
        (!filters.includes("notAvailable") && !available) ||
        (filters.includes("favorites") && !favoriteCocktailIDs?.includes(item?.id))
      ) {
        visible = false;
      }
      let tagVisible = true;
      if (selectedTag && selectedTag > 0) {
        tagVisible = item?.tags?.includes(selectedTag);
      }
      const returnValue = visible && tagVisible && item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return returnValue;
    });
    filteredCocktails.sort(function (a, b) {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    setSearchResults(filteredCocktails);
  };

  const [isCreateVisible, hideCreateModal, showCreateModal] = useModalToggler();
  const [isFiltersVisible, hideFilters, showFilters] = useModalToggler();

  const createNewHandler = () => {
    const newID = Date.now();
    dispatch(createCocktail({ id: newID }));
    navigation.navigate("CocktailEdit", {
      cocktailID: newID,
      create: true,
    });
  };

  const searchBarButton = () => (
    <View style={{ flexDirection: "row" }}>
      <IconButton style={{ marginHorizontal: 0 }} icon="label" onPress={() => setDropdownVisible(!dropdownVisible)} />
      <IconButton
        style={{ marginHorizontal: 0 }}
        icon="filter"
        onPress={isFiltersVisible ? hideFilters : showFilters}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          theme={{ colors: { elevation: { level3: theme.colors.elevation.level0 } } }}
          right={searchBarButton}
        />
        {dropdownVisible && (
          <View>
            <DropDownPicker
              open={showDropDown}
              value={selectedTag}
              items={tagData}
              setOpen={setShowDropDown}
              setValue={setSelectedTag}
              searchable={true}
              placeholder="Tag"
              searchPlaceholder="Search"
              listMode="MODAL"
            />
          </View>
        )}
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
                value: "available",
                label: "Available",
              },
              {
                style: styles.button,
                value: "notAvailable",
                label: "Unavailable",
              },
              {
                style: styles.button,
                value: "favorites",
                label: "Favorites Only",
              },
            ]}
          />
        )}
      </View>
      <View style={styles.list}>
        <CocktailsList
          cocktails={searchResults}
          onCardPress={(item) => {
            navigation.navigate("CocktailDetails", {
              cocktailID: item.id,
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
        text="Are you sure you want to create a new cocktail?"
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
export default CocktailsScreen;
