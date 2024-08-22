import { Button } from "react-native-paper";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createBackupFile, importBackupFile } from "~/Utils/backup.utils";
import {
  allCocktailsSelector,
  allIngredientsSelector,
  allProfilesSelector,
  selectedProfileSelector,
} from "~/Utils/selectors.utils";
import { ProfileSelectorModal } from "~/Components/ProfileSelectorModal";
import { ConfirmationDialog } from "~/Components/ConfirmationDialog";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { contactSupport } from "~/Utils/support.utils";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  const cocktails = useSelector(allCocktailsSelector);
  const ingredients = useSelector(allIngredientsSelector);
  const profiles = useSelector(allProfilesSelector);
  const selectedProfile = useSelector(selectedProfileSelector);

  const handleBackupPress = async () => {
    await createBackupFile(cocktails, ingredients, profiles);
  };
  const handleImportBackupPress = async () => {
    await importBackupFile(dispatch);
  };

  const [isCreateBackupVisible, hideCreateBackupModal, showCreateBackupModal] = useModalToggler();
  const [isImportBackupVisible, hideImportBackupModal, showImportBackupModal] = useModalToggler();

  return (
    <ScrollView style={styles.container}>
      <ProfileSelectorModal />
      <Button icon="export" mode="outlined" onPress={showCreateBackupModal} style={styles.buttonStyle}>
        Create Backup File
      </Button>
      <Button icon="import" mode="outlined" onPress={showImportBackupModal} style={styles.buttonStyle}>
        Import Backup File
      </Button>
      <Button icon="mail" mode="outlined" onPress={contactSupport} style={styles.buttonStyle}>
        Contact support
      </Button>
      <ConfirmationDialog
        isVisible={isCreateBackupVisible}
        onOkPress={handleBackupPress}
        hideDialog={hideCreateBackupModal}
        text="Are you sure you want to create a backup file of app data? This will not include any images taken for new cocktails."
      />
      <ConfirmationDialog
        isVisible={isImportBackupVisible}
        onOkPress={handleImportBackupPress}
        hideDialog={hideImportBackupModal}
        text="Are you sure you want to import a backup file of app data? This will override all current data so make sure to create a backup beforehand if desired."
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    padding: 10,
  },
  buttonStyle: {
    margin: 10,
  },
});
