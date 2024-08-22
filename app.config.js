module.exports = {
  name: "Cordial",
  slug: "cordial-cocktail-recipes-app",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#011327",
  },
  plugins: [
    [
      "expo-document-picker",
      {
        iCloudContainerEnvironment: "Production",
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you use them in the app.",
      },
    ],
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.philemonbelanger.cordialCocktailapp",
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#011327",
    },
    package: "com.philemonbelanger.cordialCocktailapp",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "18487ce7-0cdf-4d98-8185-c6f0be8196e3",
    },
  },
  updates: {
    enabled: false,
  },
  owner: "philemon.belanger",
};
