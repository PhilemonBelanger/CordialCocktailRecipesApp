import { FAB, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "~/Constants/theme";
import { ingredientSelector } from "~/Utils/selectors.utils";
import { deleteIngredient, updateIngredient } from "~/Reducers/ingredientsActions";
import { useEffect, useState } from "react";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";

const IngredientEdit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { ingredientID, create = false } = route.params;
  const selectedIngredient = useSelector((state) => ingredientSelector(state, ingredientID));
  const [name, setNamne] = useState(selectedIngredient?.name);
  const [description, setDescription] = useState(selectedIngredient?.description);

  const handleBack = () => {
    navigation.goBack();
    navigation.navigate("IngredientDetails", { ingredientID: ingredientID });
  };

  useEffect(() => {
    setNamne(selectedIngredient?.name);
    setDescription(selectedIngredient?.description);
  }, [selectedIngredient]);

  const onEditName = (text = "") => {
    dispatch(updateIngredient({ ...selectedIngredient, name: text }));
  };
  const onEditDescription = (text = "") => {
    dispatch(updateIngredient({ ...selectedIngredient, description: text }));
  };
  const handleDeleteIngredient = () => {
    navigation.pop(2);
    dispatch(deleteIngredient({ id: selectedIngredient.id }));
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
        <Button
          icon="delete"
          mode="outlined"
          onPress={showDeleteModal}
          style={styles.buttonStyle}
          textColor={theme.colors.onError}
          buttonColor={theme.colors.error}
        >
          Delete Ingredient
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
        onOkPress={handleDeleteIngredient}
        hideDialog={hideDeleteModal}
        text="Are you sure you want to delete this ingredient permanently?"
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
export default IngredientEdit;
