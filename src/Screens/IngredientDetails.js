import { Divider, Text, FAB, IconButton } from "react-native-paper";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CocktailsList from "~/Components/CocktailsList";
import { getCocktailsUsedIn } from "~/Utils/ingredients.utils";
import { capitalizeFirstLetter } from "~/Utils/string.utils";
import { theme } from "~/Constants/theme";
import {
  allCocktailsSelector,
  ingredientSelector,
  selectedProfileIDSelector,
  selectedProfileIngredientIsInCartSelector,
  selectedProfileIngredientIsOwnedSelector,
} from "~/Utils/selectors.utils";
import { toggleInCartIngredient, toggleOwnedIngredient } from "~/Reducers/profilesActions";
import * as WebBrowser from "expo-web-browser";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";
import { createIngredient } from "~/Reducers/ingredientsActions";
import { useEffect } from "react";

const IngredientDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { ingredientID } = route.params;
  const selectedIngredient = useSelector((state) => ingredientSelector(state, ingredientID));
  const cocktails = useSelector(allCocktailsSelector);
  const cocktailsUsedIn = getCocktailsUsedIn(ingredientID, cocktails);

  const selectedProfileID = useSelector(selectedProfileIDSelector);
  const owned = useSelector((state) => selectedProfileIngredientIsOwnedSelector(state, ingredientID));
  const inCart = useSelector((state) => selectedProfileIngredientIsInCartSelector(state, ingredientID));

  const handleSearchPress = async () => {
    const searchQuery = `${selectedIngredient.name.split(" ").join("+")}`;
    const searchURL = `https://www.google.com/search?q=${searchQuery}`;
    await WebBrowser.openBrowserAsync(searchURL);
  };

  const handleEditPress = () => {
    navigation.navigate("IngredientEdit", {
      ingredientID: route.params.ingredientID,
    });
  };

  const handleDuplicatePress = () => {
    const newIngredientID = Date.now();
    dispatch(
      createIngredient({
        ...selectedIngredient,
        id: newIngredientID,
        name: `${selectedIngredient.name} (copy)`,
        editable: true,
      })
    );
    navigation.navigate("IngredientDetails", {
      ingredientID: newIngredientID,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonRow}>
          <IconButton
            icon="content-duplicate"
            size={24}
            onPress={showDuplicateModal}
            style={styles.headerButton}
            iconColor={theme.colors.tertiary}
          />
          {selectedIngredient.editable && (
            <IconButton
              icon="pen"
              size={24}
              onPress={handleEditPress}
              disabled={!selectedIngredient.editable}
              style={styles.headerButton}
              iconColor={theme.colors.tertiary}
            />
          )}
        </View>
      ),
    });
  }, [selectedIngredient]);

  const [isDuplicateVisible, hideDuplicateModal, showDuplicateModal] = useModalToggler();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text variant="headlineLarge" numberOfLines={5} style={styles.title}>
            {capitalizeFirstLetter(selectedIngredient.name)}
          </Text>
          <IconButton icon="open-in-new" onPress={handleSearchPress} />
        </View>
        <View style={styles.subContainerDescription}>
          <Text variant="bodyLarge" numberOfLines={15}>
            {capitalizeFirstLetter(selectedIngredient.description)}
          </Text>
        </View>
        <Divider />
        <View style={styles.subContainer}>
          <Text variant="headlineMedium">Cocktails</Text>
          <CocktailsList
            cocktails={cocktailsUsedIn}
            onCardPress={(item) => {
              navigation.navigate("CocktailDetails", {
                cocktailID: item.id,
              });
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.fabRow}>
        <FAB
          icon="cart"
          onPress={() =>
            dispatch(toggleInCartIngredient({ profileID: selectedProfileID, ingredientID: selectedIngredient.id }))
          }
          variant={inCart ? "primary" : "surface"}
          theme={{
            colors: {
              primaryContainer: theme.colors.primary,
              onPrimaryContainer: theme.colors.onPrimary,
            },
          }}
        />
        <FAB
          icon="check"
          onPress={() =>
            dispatch(toggleOwnedIngredient({ profileID: selectedProfileID, ingredientID: selectedIngredient.id }))
          }
          variant={owned ? "primary" : "surface"}
          theme={{
            colors: {
              primaryContainer: theme.colors.primary,
              onPrimaryContainer: theme.colors.onPrimary,
            },
          }}
        />
      </View>
      <ConfirmationDialog
        isVisible={isDuplicateVisible}
        onOkPress={handleDuplicatePress}
        hideDialog={hideDuplicateModal}
        text="Are you sure you want to create a duplicate of this ingredient?"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  subContainerDescription: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    width: Dimensions.get("window").width * 0.8,
  },
  fabRow: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },
  headerButton: {
    marginHorizontal: 0,
  },
});
export default IngredientDetails;
