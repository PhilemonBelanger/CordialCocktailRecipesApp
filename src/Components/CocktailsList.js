import { Text, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CocktailCard from "./CocktailCard";
import { useSelector } from "react-redux";
import { allIngredientsSelector } from "~/Utils/selectors.utils";
import { NOOP } from "~/Constants/constants";

const CocktailsList = ({ cocktails = [], onCardPress = NOOP }) => {
  const allIngredients = useSelector(allIngredientsSelector);
  return (
    <FlashList
      data={cocktails}
      renderItem={({ item }) => (
        <CocktailCard
          item={item}
          allIngredients={allIngredients}
          onCardPress={() => {
            onCardPress(item);
          }}
        />
      )}
      estimatedItemSize={200}
      ListFooterComponent={() => <View style={{ height: 150 }} />}
    />
  );
};
export default CocktailsList;
