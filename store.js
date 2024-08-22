import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import cocktailsReducer from "~/Reducers/cocktailsReducer";
import ingredientsReducer from "~/Reducers/ingredientsReducer";
import profilesReducer from "~/Reducers/profilesReducer";
import { configureStore } from "@reduxjs/toolkit";

export const expoFileSystemStorage = createExpoFileSystemStorage();

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
  ingredients: ingredientsReducer,
  profiles: profilesReducer,
});

const persistConfig = {
  key: "root",
  storage: expoFileSystemStorage,
  whitelist: ["cocktails", "ingredients", "profiles"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
