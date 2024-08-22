import "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./store.js";
import { theme } from "~/Constants/theme.js";
import Stack from "~/Navigation/stack.js";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Stack />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
