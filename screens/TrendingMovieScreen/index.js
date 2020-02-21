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
import FilterContainer from "./components/FilterContainer";

// const
import { filterDrawerConfig } from "../../constants/drawer";

// utils
import { checkIsCloseToBottom } from "../../utils";

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
  trendingMovieList,
  fetchTrendingMovieList,
  clearTrendingMovieList,
  totalPages,
  timeWindow,
  mediaType,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // load trending movie list
  useEffect(() => {
    const payload = { page: 1, mediaType, timeWindow };
    fetchTrendingMovieList(payload);
  }, []);

  // handle on refresh
  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    // set page to 1
    setPage(1);
    // clear trending movie list
    clearTrendingMovieList();

    // load trending movie list
    const payload = { page: 1, timeWindow, mediaType };
    fetchTrendingMovieList(payload).then(() => {
      setRefreshing(false);
    });
  }, [refreshing, mediaType, timeWindow]);

  // handle filter trending movie list
  const handleFilterTrendingMovieList = (mediaType, timeWindow) => {
    // clear trending movie list
    clearTrendingMovieList();

    // load trending movie list
    const payload = { page: 1, timeWindow, mediaType };
    fetchTrendingMovieList(payload);

    // close drawer
    closeFilterDrawer();
  };

  // handle load more data
  const handleLoadMoreData = ({ nativeEvent }) => {
    // check is scroll reach bottom and page is not larger than total pages
    if (checkIsCloseToBottom(nativeEvent) && page <= totalPages) {
      // set page + 1
      const updatePage = page + 1;
      setPage(updatePage);

      // load trending movie list
      const payload = { page: updatePage, timeWindow, mediaType };
      fetchTrendingMovieList(payload);
    }
  };

  if (trendingMovieList.length === 0) {
    return null;
  } else {
    return (
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
          onMomentumScrollEnd={handleLoadMoreData}
        >
          {/* filte button */}
          <View style={styles.filterButton}>
            <Button onPress={openFilterDrawer} title="Filter" />
          </View>

          {/* trending movie list */}
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
    clearTrendingMovieList: () => dispatch(actions.clearTrendingMovieList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingMovieScreen);
