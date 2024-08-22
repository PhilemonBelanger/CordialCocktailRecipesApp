import { Divider, Text, FAB, IconButton } from "react-native-paper";
import { View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IngredientsList from "~/Components/IngredientsList";
import { getIngredientsNeeded } from "~/Utils/cocktails.utils";
import StepList from "~/Components/StepList";
import { capitalizeFirstLetter } from "~/Utils/string.utils";
import { theme } from "~/Constants/theme";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  cocktailSelector,
  selectedProfileCocktailIsInFavoritesSelector,
  selectedProfileIDSelector,
} from "~/Utils/selectors.utils";
import { getCocktailImage } from "~/Utils/images.utils";
import { toggleFavoritedCocktail } from "~/Reducers/profilesActions";
import * as WebBrowser from "expo-web-browser";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { createCocktail, updateCocktail } from "~/Reducers/cocktailsActions";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { cacheCocktailImage } from "~/Utils/cache.utils";
import { MIN_ID_FOR_NEW_ITEMS } from "~/Constants/constants";

const CocktailDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { cocktailID } = route.params;
  const selectedCocktail = useSelector((state) => cocktailSelector(state, cocktailID));
  const ingredients = useSelector(allIngredientsSelector);
  const ingredientsNeeded = getIngredientsNeeded(selectedCocktail.ingredients, ingredients);
  const [cocktailImage, setCocktailImage] = useState(undefined);
  const selectedProfileID = useSelector(selectedProfileIDSelector);
  const favorite = useSelector((state) => selectedProfileCocktailIsInFavoritesSelector(state, cocktailID));

  const handleSearchPress = async () => {
    const searchQuery = `${selectedCocktail.name.split(" ").join("+")}+cocktail`;
    const searchURL = `https://www.google.com/search?q=${searchQuery}`;
    await WebBrowser.openBrowserAsync(searchURL);
  };

  const handleEditPress = () => {
    navigation.navigate("CocktailEdit", {
      cocktailID: route.params.cocktailID,
    });
  };

  const handleDuplicatePress = async () => {
    const newCocktailId = Date.now();
    let uri = undefined;
    if (cocktailID <= MIN_ID_FOR_NEW_ITEMS) {
      const asset = await Asset.loadAsync(getCocktailImage(cocktailID));
      const assetURI = asset[0].localUri;
      uri = await cacheCocktailImage(assetURI, newCocktailId);
    } else if (selectedCocktail.uri) {
      uri = await cacheCocktailImage(selectedCocktail.uri, newCocktailId);
    }
    dispatch(
      createCocktail({
        ...selectedCocktail,
        id: newCocktailId,
        name: `${selectedCocktail.name} (copy)`,
        editable: true,
        uri,
      })
    );
    navigation.navigate("CocktailDetails", {
      cocktailID: newCocktailId,
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
          {selectedCocktail.editable && (
            <IconButton
              icon="pen"
              size={24}
              onPress={handleEditPress}
              disabled={!selectedCocktail.editable}
              style={styles.headerButton}
              iconColor={theme.colors.tertiary}
            />
          )}
        </View>
      ),
    });
    setCocktailImage(selectedCocktail?.uri ? { uri: selectedCocktail?.uri } : getCocktailImage(cocktailID));
  }, [selectedCocktail]);

  const handleCameraPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (!result.canceled) {
      await cacheCocktailImage(result.assets[0].uri, cocktailID);
      dispatch(updateCocktail({ ...selectedCocktail, uri: result.assets[0].uri }));
    }
  };

  const [isDuplicateVisible, hideDuplicateModal, showDuplicateModal] = useModalToggler();

  return (
    <View style={styles.container}>
      <ScrollView>
        {cocktailImage && <Image style={styles.image} source={cocktailImage} />}
        {cocktailImage && selectedCocktail.editable && (
          <IconButton icon="camera" onPress={handleCameraPress} mode="contained" style={styles.cameraButtonChange} />
        )}
        {!cocktailImage && selectedCocktail.editable && (
          <IconButton icon="camera" onPress={handleCameraPress} mode="contained" style={styles.cameraButtonNew} />
        )}
        <View style={styles.titleContainer}>
          <Text variant="headlineLarge" numberOfLines={5} style={styles.title}>
            {capitalizeFirstLetter(selectedCocktail.name)}
          </Text>
          <IconButton icon="open-in-new" onPress={handleSearchPress} />
        </View>
        <View style={styles.subContainerDescription}>
          <Text variant="bodyLarge" numberOfLines={15}>
            {capitalizeFirstLetter(selectedCocktail.description)}
          </Text>
        </View>
        <Divider />
        <View style={styles.subContainer}>
          <Text variant="headlineMedium">Steps</Text>
          <StepList steps={selectedCocktail.steps} />
        </View>
        <Divider />
        <View style={styles.subContainer}>
          <Text variant="headlineMedium">Ingredients</Text>
          <IngredientsList
            ingredients={ingredientsNeeded}
            onCardPress={(item) => {
              navigation.navigate("IngredientDetails", {
                ingredientID: item.id,
              });
            }}
            showQuantities={true}
          />
        </View>
      </ScrollView>
      <FAB
        icon="star"
        style={styles.fab}
        onPress={() =>
          dispatch(toggleFavoritedCocktail({ profileID: selectedProfileID, cocktailID: selectedCocktail.id }))
        }
        variant={favorite ? "primary" : "surface"}
        theme={{
          colors: {
            primaryContainer: theme.colors.primary,
            onPrimaryContainer: theme.colors.onPrimary,
          },
        }}
      />
      <ConfirmationDialog
        isVisible={isDuplicateVisible}
        onOkPress={handleDuplicatePress}
        hideDialog={hideDuplicateModal}
        text="Are you sure you want to create a duplicate of this cocktail?"
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    resizeMode: "contain",
  },
  buttonRow: {
    flexDirection: "row",
  },
  headerButton: {
    marginHorizontal: 0,
  },
  cameraButtonChange: {
    position: "absolute",
    margin: 16,
    left: 0,
    top: 0,
  },
  cameraButtonNew: {
    margin: 16,
    left: Dimensions.get("window").width / 2 - 35,
  },
});
export default CocktailDetails;
