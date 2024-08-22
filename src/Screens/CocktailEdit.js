import { Divider, Text, FAB, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "~/Constants/theme";
import { useState, useEffect } from "react";
import StepEditList from "~/Components/StepEditList";
import IngredientsList from "~/Components/IngredientsList";
import { getIngredientsNeeded } from "~/Utils/cocktails.utils";
import { allCocktailsSelector, allIngredientsSelector, cocktailSelector } from "~/Utils/selectors.utils";
import {
  addCocktailIngredient,
  addCocktailStep,
  deleteCocktail,
  deleteCocktailIngredient,
  deleteCocktailStep,
  updateCocktail,
  updateCocktailStep,
} from "~/Reducers/cocktailsActions";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { deleteCachedCocktailImage } from "~/Utils/cache.utils";

const CocktailEdit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { cocktailID, create = false } = route.params;
  const selectedCocktail = useSelector((state) => cocktailSelector(state, cocktailID));
  const allIngredients = useSelector(allIngredientsSelector);

  const [name, setNamne] = useState(selectedCocktail?.name);
  const [description, setDescription] = useState(selectedCocktail?.description);
  const [steps, setSteps] = useState(selectedCocktail?.steps);
  const [ingredients, setIngredients] = useState(getIngredientsNeeded(selectedCocktail?.ingredients, allIngredients));

  const handleBack = () => {
    navigation.goBack();
    navigation.navigate("CocktailDetails", { cocktailID: cocktailID });
  };

  useEffect(() => {
    setNamne(selectedCocktail?.name);
    setDescription(selectedCocktail?.description);
    setSteps(selectedCocktail?.steps);
    setIngredients(getIngredientsNeeded(selectedCocktail?.ingredients, allIngredients));
  }, [selectedCocktail]);

  const onEditName = (text = "") => {
    dispatch(updateCocktail({ ...selectedCocktail, name: text }));
  };
  const onEditDescription = (text = "") => {
    dispatch(updateCocktail({ ...selectedCocktail, description: text }));
  };
  const onAddNewStep = () => {
    dispatch(addCocktailStep({ id: selectedCocktail.id }));
  };
  const onEditStep = ({ index = 0, text = "" }) => {
    dispatch(updateCocktailStep({ id: selectedCocktail.id, stepIndex: index, text }));
  };
  const onDeleteStep = ({ index = 0 }) => {
    dispatch(deleteCocktailStep({ id: selectedCocktail.id, stepIndex: index }));
  };
  const onIngredientDelete = ({ index = 0 }) => {
    dispatch(deleteCocktailIngredient({ id: selectedCocktail.id, ingredientIndex: index }));
  };
  const onIngredientAdd = ({ ingredientID = 0, quantity = "", optional = false }) => {
    dispatch(addCocktailIngredient({ id: selectedCocktail.id, ingredientID, quantity, optional }));
  };
  const handleDeleteCocktail = async () => {
    navigation.pop(2);
    if (selectedCocktail.uri) {
      await deleteCachedCocktailImage(selectedCocktail.id);
    }
    dispatch(deleteCocktail({ id: selectedCocktail.id }));
  };

  const [isDeleteVisible, hideDeleteModal, showDeleteModal] = useModalToggler();

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput label="Name" value={name} onChangeText={onEditName} mode="outlined" style={styles.textInput} />
        <TextInput
          label="Description"
          value={description}
          onChangeText={onEditDescription}
          mode="outlined"
          multiline={true}
          style={styles.textInput}
        />
        <Divider />
        <Text variant="headlineMedium">Steps</Text>
        <StepEditList steps={steps} onAddNewStep={onAddNewStep} onEditStep={onEditStep} onDeleteStep={onDeleteStep} />
        <Divider />
        <Text variant="headlineMedium">Ingredients</Text>
        <IngredientsList
          ingredients={ingredients}
          onCardPress={() => {}}
          allowDelete={true}
          onIngredientDelete={onIngredientDelete}
          onIngredientAdd={onIngredientAdd}
          showQuantities={true}
        />
        <View style={styles.footer} />
        <Button
          icon="delete"
          mode="outlined"
          onPress={showDeleteModal}
          style={styles.buttonStyle}
          textColor={theme.colors.onError}
          buttonColor={theme.colors.error}
        >
          Delete Cocktail
        </Button>
      </ScrollView>
      <FAB
        icon="arrow-left"
        style={styles.fab}
        onPress={handleBack}
        theme={{
          colors: {
            primaryContainer: theme.colors.primary,
            onPrimaryContainer: theme.colors.onPrimary,
          },
        }}
      />
      <ConfirmationDialog
        isVisible={isDeleteVisible}
        onOkPress={handleDeleteCocktail}
        hideDialog={hideDeleteModal}
        text="Are you sure you want to delete this cocktail permanently?"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  textInput: {
    marginBottom: 10,
  },
  footer: {
    height: 150,
  },
  buttonStyle: {
    margin: 10,
  },
});
export default CocktailEdit;
