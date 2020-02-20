import * as React from "react";

// navigations
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// components
// import TabBarIcon from "../components/TabBarIcon";

// screens
import PopularMovieScreen from "../screens/PopularMovieScreen";
import TrendingMovieScreen from "../screens/TrendingMovieScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = "Popular";

const BottomTabNavigator = ({ navigation, route }) => {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab.
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Screen
        name="Popular"
        component={PopularMovieScreen}
        options={{
          title: "Popular Movies"
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon focused={focused} name="md-code-working" />
          // )
        }}
      />
      <Screen
        name="Trending"
        component={TrendingMovieScreen}
        options={{
          title: "Trending List"
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon focused={focused} name="md-book" />
          // )
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigator;

const getHeaderTitle = route => {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Popular":
      return "Popular Movies";
    case "Trending":
      return "Trending List";
    default:
      return null;
  }
};
