import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

const StepList = ({ steps = [] }) => {
  return (
    <FlashList
      data={steps}
      renderItem={({ item }) => (
        <Text variant="bodyLarge" numberOfLines={3} style={{ paddingHorizontal: 10 }}>
          {`- ${item}`}
        </Text>
      )}
      estimatedItemSize={20}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      ListFooterComponent={() => <View style={{ height: 10 }} />}
    />
  );
};
export default StepList;
