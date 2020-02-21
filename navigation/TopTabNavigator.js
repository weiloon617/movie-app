import * as React from "react";

// navigations
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// screens
import PopularMovieScreen from "../screens/PopularMovieScreen";
import TrendingMovieScreen from "../screens/TrendingMovieScreen";
import SearchMovieScreen from "../screens/SearchMoviesScreen";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const INITIAL_ROUTE_NAME = "Popular";

const tabBarConfig = {
  labelStyle: { fontSize: 14 },
  tabStyle: { padding: 5 }
};

const TopTabNavigator = () => {
  return (
    <Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={tabBarConfig}
    >
      <Screen
        name="Popular"
        component={PopularMovieScreen}
        options={{ title: "Popular" }}
      />
      <Screen
        name="Trending"
        component={TrendingMovieScreen}
        options={{ title: "Trending" }}
      />
      <Screen
        name="Search"
        component={SearchMovieScreen}
        options={{ title: "Search" }}
      />
    </Navigator>
  );
};

export default TopTabNavigator;
