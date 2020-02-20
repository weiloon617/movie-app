import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import PersonDetailsScreen from "../screens/PersonDetailsScreen";

// bottom tab navigator
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const { Navigator, Screen } = createStackNavigator();

const stackHeaderConfig = {
  headerBackTitle: "",
  headerTitle: ""
};

const StackNavigator = () => {
  return (
    <Navigator>
      <Screen name="Root" component={BottomTabNavigator} />
      <Screen
        name="Movie"
        component={MovieDetailsScreen}
        options={stackHeaderConfig}
      />
      <Screen
        name="Person"
        component={PersonDetailsScreen}
        options={stackHeaderConfig}
      />
    </Navigator>
  );
};

export default StackNavigator;
