import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import Tabs from "./tabs";
import { navigationTheme, theme } from "~/Constants/theme";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "~/Screens/Settings";
import CocktailDetails from "~/Screens/CocktailDetails";
import CocktailEdit from "~/Screens/CocktailEdit";
import IngredientDetails from "~/Screens/IngredientDetails";
import IngredientEdit from "~/Screens/IngredientEdit";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshDefaultCocktails } from "~/Reducers/cocktailsActions";
import { refreshDefaultIngredients } from "~/Reducers/ingredientsActions";

const StackNavigator = createStackNavigator();

function Stack() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshDefaultCocktails());
    dispatch(refreshDefaultIngredients());
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StackNavigator.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.secondaryContainer,
          },
          headerTintColor: theme.colors.tertiary,
        })}
      >
        <StackNavigator.Screen
          name={"Cordial"}
          component={Tabs}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <IconButton
                icon="cog"
                size={30}
                onPress={() => {
                  navigation.navigate("Settings");
                }}
                iconColor={theme.colors.tertiary}
              />
            ),
          })}
        />
        <StackNavigator.Screen name="Settings" component={Settings} />
        <StackNavigator.Screen
          name="CocktailDetails"
          component={CocktailDetails}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Cocktail Details",
          })}
        />
        <StackNavigator.Screen
          name="CocktailEdit"
          component={CocktailEdit}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Edit Cocktail",
          })}
        />
        <StackNavigator.Screen
          name="IngredientDetails"
          component={IngredientDetails}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Ingredient Details",
          })}
        />
        <StackNavigator.Screen
          name="IngredientEdit"
          component={IngredientEdit}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Edit Ingredient",
          })}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
export default Stack;
