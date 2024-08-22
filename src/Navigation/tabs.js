import * as React from "react";
import { Icon } from "react-native-paper";
import CocktailsScreen from "~/Screens/CocktailsScreen";
import IngredientsScreen from "~/Screens/IngredientsScreen";
import { StyleSheet } from "react-native";
import { theme } from "~/Constants/theme";
import CartScreen from "~/Screens/CartScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={theme.colors.tertiary}
      inactiveColor={theme.colors.secondary}
      barStyle={{ backgroundColor: theme.colors.secondaryContainer }}
    >
      <Tab.Screen
        name="Cocktails"
        component={CocktailsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon source="glass-cocktail" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon source="bottle-wine" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon source="cart" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
