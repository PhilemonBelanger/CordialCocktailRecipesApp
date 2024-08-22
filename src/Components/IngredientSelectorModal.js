import { Portal, Button, Dialog, Checkbox, TextInput } from "react-native-paper";
import { View, Dimensions, StyleSheet } from "react-native";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { useState } from "react";
import { theme } from "~/Constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
import { ingredientDataSelector } from "~/Utils/selectors.utils";
import { useSelector } from "react-redux";
import { NOOP } from "~/Constants/constants";

export const IngredientSelectorModal = ({ onIngredientAdd = NOOP }) => {
  const [isVisible, hideModal, showModal] = useModalToggler();
  const allIngredients = useSelector(ingredientDataSelector);
  const [selectedIngredientID, setSelectedIngredientID] = useState();
  const [quantity, setQuantity] = useState("");
  const [optional, setOptional] = useState(false);
  const [ingredientsData, setIngredientsData] = useState(allIngredients);
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <View>
      <Portal>
        <Dialog visible={isVisible} onDismiss={hideModal}>
          <Dialog.Content>
            <DropDownPicker
              open={showDropDown}
              value={selectedIngredientID}
              items={ingredientsData}
              setOpen={setShowDropDown}
              setValue={setSelectedIngredientID}
              setItems={setIngredientsData}
              searchable={true}
              placeholder="Ingredient"
              searchPlaceholder="Search"
              listMode="MODAL"
            />
            <TextInput
              label="Quantity"
              placeholder="Ex: 2 oz, 1 1/2 barspoon, 1 twist..."
              value={quantity}
              onChangeText={setQuantity}
              mode="outlined"
            />
            <Checkbox.Item
              label="Optional"
              status={optional ? "checked" : "unchecked"}
              onPress={() => {
                setOptional(!optional);
              }}
              mode="android"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => {
                onIngredientAdd({ ingredientID: selectedIngredientID, quantity, optional });
                hideModal();
              }}
              style={{ marginVertical: 10, width: "30%" }}
            >
              Ok
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                hideModal();
              }}
              style={{ marginVertical: 10, width: "30%" }}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button icon="plus" mode="contained" onPress={showModal} style={{ marginVertical: 10 }}>
        Add Ingredient
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.8,
    backgrournColor: theme.colors.surfaceVariant,
  },
});
