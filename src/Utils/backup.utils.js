import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";
import { setCocktails } from "~/Reducers/cocktailsActions";
import { setIngredients } from "~/Reducers/ingredientsActions";
import { setProfiles } from "~/Reducers/profilesActions";
import { DEFAULT_PROFILE_ID } from "~/Reducers/profilesReducer";
import { stringifyError } from "./string.utils";

const BACKUP_FILE_NAME = "cordial_backup.json";
const BACKUP_FILE_INTERNAL_PATH = FileSystem.cacheDirectory + BACKUP_FILE_NAME;

export const saveFile = async (uri, filename = BACKUP_FILE_NAME, mimetype = "application/json") => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const fileString = await FileSystem.readAsStringAsync(uri);
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype).then(
        async (uri) => {
          await FileSystem.writeAsStringAsync(uri, fileString);
        }
      );
    } else {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Error", "This feature is not avaialble for your device.");
      }
    }
  } else {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Error", "This feature is not avaialble for your device.");
    }
  }
};

export const createBackupFile = async (cocktails, ingredients, profiles) => {
  try {
    const jsonString = JSON.stringify({ cocktails: cocktails, ingredients: ingredients, profiles: profiles });
    await FileSystem.writeAsStringAsync(BACKUP_FILE_INTERNAL_PATH, jsonString);
    await saveFile(BACKUP_FILE_INTERNAL_PATH);
  } catch (error) {
    Alert.alert("Error while creating backup file", stringifyError(error));
  }
};

export const importBackupFile = async (dispatch) => {
  try {
    const pickerResult = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/json",
    });
    if (!pickerResult?.assets?.length > 0) {
      return;
    }
    const fileUri = pickerResult?.assets[0].uri;
    const fileString = await FileSystem.readAsStringAsync(fileUri);
    const json = JSON.parse(fileString);
    if (!json?.cocktails?.length > 0 || !json?.ingredients?.length > 0 || !json?.profiles?.length > 0) {
      Alert.alert("Import Error", "Json file is invalid.");
      return;
    }
    dispatch(setCocktails(json?.cocktails));
    dispatch(setIngredients(json?.ingredients));
    dispatch(setProfiles(json?.profiles));
  } catch (error) {
    Alert.alert("Error while importing backup file", stringifyError(error));
  }
};
