import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import IngredientsCard from "./IngredientsCard";
import { IngredientSelectorModal } from "./IngredientSelectorModal";
import { NOOP } from "~/Constants/constants";

const IngredientsList = ({
  ingredients = [],
  onCardPress = NOOP,
  allowDelete = false,
  onIngredientDelete = NOOP,
  onIngredientAdd = NOOP,
  showQuantities = false,
}) => {
  return (
    <FlashList
      data={ingredients}
      renderItem={({ item, index }) => (
        <IngredientsCard
          item={item}
          onCardPress={() => {
            onCardPress(item);
          }}
          allowDelete={allowDelete}
          onIngredientDelete={() => {
            onIngredientDelete({ index });
          }}
          showQuantities={showQuantities}
        />
      )}
      estimatedItemSize={200}
      ListFooterComponent={() =>
        allowDelete ? <IngredientSelectorModal onIngredientAdd={onIngredientAdd} /> : <View style={{ height: 150 }} />
      }
    />
  );
};
export default IngredientsList;
