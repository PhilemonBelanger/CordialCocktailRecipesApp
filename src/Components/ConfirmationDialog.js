import { Portal, Button, Dialog } from "react-native-paper";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { theme } from "~/Constants/theme";
import { NOOP } from "~/Constants/constants";

export const ConfirmationDialog = ({
  isVisible = false,
  onOkPress = NOOP,
  hideDialog = NOOP,
  text = "Are you sure?",
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text>{text}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={() => {
              hideDialog();
              onOkPress();
            }}
            style={{ marginVertical: 10, width: "30%" }}
          >
            Ok
          </Button>
          <Button mode="contained" onPress={hideDialog} style={{ marginVertical: 10, width: "30%" }}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
