import * as FileSystem from "expo-file-system";

export const IMAGE_DOCUMENT_FOLDER = `${FileSystem.documentDirectory}images/`;

export const cacheCocktailImage = async (sourceURI = "", cocktailID = "") => {
  if (!sourceURI) return;
  try {
    const fileName = `${IMAGE_DOCUMENT_FOLDER}${cocktailID}.jpg`;
    const dirInfo = await FileSystem.getInfoAsync(IMAGE_DOCUMENT_FOLDER);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(IMAGE_DOCUMENT_FOLDER, { intermediates: true });
    }
    await FileSystem.copyAsync({ from: sourceURI, to: fileName });
    return fileName;
  } catch (error) {
    console.log("Error in cacheCocktailImage", error);
    return undefined;
  }
};

export const deleteCachedCocktailImage = async (cocktailID = "") => {
  const fileName = `${IMAGE_DOCUMENT_FOLDER}${cocktailID}.jpg`;
  try {
    await FileSystem.deleteAsync(fileName);
  } catch (error) {
    console.log("Error in deleteCachedCocktailImage", error);
  }
};
