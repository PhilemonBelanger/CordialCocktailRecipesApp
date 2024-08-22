import { MD3LightTheme } from "react-native-paper";
export const theme = {
  ...MD3LightTheme,
  colors: {
    primary: "#172e48",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "#d1eaff",
    onPrimaryContainer: "rgb(0, 31, 42)",
    secondary: "rgb(77, 97, 107)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "#172e48",
    onSecondaryContainer: "#cfe6ff",
    tertiary: "#d2a355",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(226, 223, 255)",
    onTertiaryContainer: "rgb(25, 24, 54)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 252, 254)",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 254)",
    onSurface: "rgb(25, 28, 30)",
    surfaceVariant: "rgb(220, 228, 233)",
    onSurfaceVariant: "rgb(64, 72, 76)",
    outline: "rgb(112, 120, 125)",
    outlineVariant: "rgb(192, 200, 205)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 50)",
    inverseOnSurface: "rgb(239, 241, 243)",
    inversePrimary: "rgb(99, 211, 255)",
    elevation: {
      level0: "transparent",
      level1: "#fafdff",
      level2: "#f3f9ff",
      level3: "#eef7ff",
      level4: "#e7f4ff",
      level5: "#ddefff",
    },
    surfaceDisabled: "rgba(25, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
    backdrop: "rgba(42, 50, 53, 0.4)",
  },
};

export const navigationTheme = {
  dark: false,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.onSurface,
    border: theme.colors.surfaceVariant,
    notification: theme.colors.error,
  },
};
