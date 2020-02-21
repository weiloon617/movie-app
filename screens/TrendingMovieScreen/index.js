import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  RefreshControl
} from "react-native";
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

const initState = {
  page: 1,
  mediaType: "movie",
  timeWindow: "day"
};

const TrendingMovieScreen = ({
  loading,
  trendingMovieList,
  fetchTrendingMovieList,
  refreshTrendingMovieList,
  totalPages,
  navigation,
  timeWindow,
  mediaType
}) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTrendingMovieList(initState);
  }, []);

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);

    setPage(1);

    refreshTrendingMovieList();

    fetchTrendingMovieList(initState).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  const handleFilterTrendingMovieList = (mediaType, timeWindow) => {
    fetchTrendingMovieList({ page: 1, mediaType, timeWindow });
    closeFilterDrawer();
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  let trendingMovieView = null;

  if (trendingMovieList.length !== 0) {
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
          onMomentumScrollEnd={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && page <= totalPages) {
              setPage(page + 1);
              fetchTrendingMovieList({ page: page + 1, timeWindow, mediaType });
            }
          }}
        >
          <View style={styles.filterButton}>
            <Button onPress={openFilterDrawer} title="Filter" />
          </View>

          <View>
            {trendingMovieList.map((movie, index) => (
              <MovieContainer
                key={index}
                movieInfo={movie}
                onPress={id => navigation.navigate("MovieDetails", id)}
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
  const {
    loading,
    trendingMovieList,
    totalPages,
    timeWindow,
    mediaType
  } = trendingMovie;

  return { loading, trendingMovieList, totalPages, timeWindow, mediaType };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrendingMovieList: payload =>
      dispatch(actions.fetchTrendingMovieList(payload)),
    refreshTrendingMovieList: () => dispatch(actions.refreshTrendingMovieList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingMovieScreen);
