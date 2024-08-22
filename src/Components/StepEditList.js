import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { theme } from "~/Constants/theme";
import { NOOP } from "~/Constants/constants";

const StepEditList = ({ steps = [], onAddNewStep = NOOP, onEditStep = NOOP, onDeleteStep = NOOP }) => {
  return (
    <FlashList
      data={steps}
      renderItem={({ item, index }) => (
        <TextInput
          label="-"
          value={item}
          onChangeText={(text) => onEditStep({ text, index })}
          mode="outlined"
          multiline={true}
          right={
            <TextInput.Icon
              icon="close-circle-outline"
              onPress={() => onDeleteStep({ index })}
              color={theme.colors.error}
            />
          }
        />
      )}
      estimatedItemSize={20}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      ListFooterComponent={() => (
        <Button icon="plus" mode="contained" onPress={onAddNewStep} style={{ marginVertical: 10 }}>
          Add Step
        </Button>
      )}
    />
  );
};
export default StepEditList;
