import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";

// utils
import { checkIsCloseToBottom } from "../../utils";

const PopularMovieScreen = ({
  totalPages,
  popularMovieList,
  fetchPopularMovieList,
  clearPopularMovieList,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // load popular movie list
  useEffect(() => {
    fetchPopularMovieList({ page });
  }, []);

  // handle on refresh
  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    // clear the popular movie list
    clearPopularMovieList();
    // set page to 1
    setPage(1);
    // load popular movie list
    fetchPopularMovieList({ page: 1 }).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  // handle load more popular movie list
  const handleLoadMoreData = ({ nativeEvent }) => {
    // check is scroll reach bottom and page is not larger than total pages
    if (checkIsCloseToBottom(nativeEvent) && page <= totalPages) {
      // set page + 1
      const updatePage = page + 1;
      setPage(updatePage);

      // load popular movie list
      const payload = { page: updatePage };
      fetchPopularMovieList(payload);
    }
  };

  if (popularMovieList.length === 0) {
    return null;
  } else {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        onMomentumScrollEnd={handleLoadMoreData}
      >
        {/* popular movie list */}
        {popularMovieList.map((movie, index) => (
          <MovieContainer
            key={index}
            movieInfo={movie}
            onPress={id => navigation.navigate("MovieDetails", id)}
            isLastMovieContainer={index === popularMovieList.length - 1}
          />
        ))}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  }
});

const mapStateToProps = state => {
  const { popularMovie } = state;
  const { loading, popularMovieList, totalPages } = popularMovie;

  return { loading, popularMovieList, totalPages };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPopularMovieList: payload =>
      dispatch(actions.fetchPopularMovieList(payload)),
    clearPopularMovieList: () => dispatch(actions.clearPopularMovieList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovieScreen);
