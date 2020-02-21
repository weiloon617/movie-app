import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import PersonDetailsScreen from "../screens/PersonDetailsScreen";

// top tab navigator
import TopTabNavigator from "../navigation/TopTabNavigator";

// const
import { stackHeaderConfig } from "../constants/navigator";

const { Navigator, Screen } = createStackNavigator();

const StackNavigator = () => {
  return (
    <Navigator>
      <Screen name="Movies" component={TopTabNavigator} />
      <Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={stackHeaderConfig}
      />
      <Screen
        name="PersonDetails"
        component={PersonDetailsScreen}
        options={stackHeaderConfig}
      />
    </Navigator>
  );
};

export default StackNavigator;
