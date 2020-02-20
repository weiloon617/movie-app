import React, { useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Drawer from "react-native-drawer";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";
import Spinner from "../../components/Spinner";
import FilterContainer from "./components/FilterContainer";

// const
import { filterDrawerConfig } from "../../constants/drawer";

let drawer;

/**
 * Close Filter Drawer
 * @returns {*}
 */
const closeFilterDrawer = () => drawer.close();

/**
 * Open Filter Drawer
 * @returns {*}
 */
const openFilterDrawer = () => drawer.open();

const TrendingMovieScreen = ({
  loading,
  trendingMovieList,
  fetchTrendingMovieList,
  navigation
}) => {
  useEffect(() => {
    handleFetchTrendingMovieList();
  }, []);

  const handleFetchTrendingMovieList = (
    page = 1,
    mediaType = "movie",
    timeWindow = "day"
  ) => {
    fetchTrendingMovieList({ page, mediaType, timeWindow });
  };

  const handleFilterTrendingMovieList = (mediaType, timeWindow) => {
    handleFetchTrendingMovieList(1, mediaType, timeWindow);
    closeFilterDrawer();
  };

  let trendingMovieView = <Spinner />;

  if (!loading && trendingMovieList.length !== 0) {
    trendingMovieView = (
      <Drawer
        ref={ref => (drawer = ref)}
        content={
          <FilterContainer applyFilter={handleFilterTrendingMovieList} />
        }
        {...filterDrawerConfig}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.filterButton}>
            <Button onPress={openFilterDrawer} title="Filter" />
          </View>

          <View>
            {trendingMovieList.map((movie, index) => (
              <MovieContainer
                key={index}
                movieInfo={movie}
                onPress={id => navigation.navigate("Movie", id)}
                isLastMovieContainer={index === trendingMovieList.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </Drawer>
    );
  }

  return trendingMovieView;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 5
  },
  filterButton: {
    alignItems: "flex-end",
    paddingRight: 15
  }
});

const mapStateToProps = state => {
  const { trendingMovie } = state;
  const { loading, trendingMovieList } = trendingMovie;

  return { loading, trendingMovieList };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrendingMovieList: payload =>
      dispatch(actions.fetchTrendingMovieList(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingMovieScreen);
