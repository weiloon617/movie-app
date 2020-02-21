import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";

const PopularMovieScreen = ({
  totalPages,
  popularMovieList,
  fetchPopularMovieList,
  navigation,
  refreshPopularMovieList
}) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPopularMovieList({ page });
  }, []);

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);

    refreshPopularMovieList();

    setPage(1);

    fetchPopularMovieList({ page }).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

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

  let popularMovieView = null;

  if (popularMovieList.length !== 0) {
    popularMovieView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && page <= totalPages) {
            setPage(page + 1);
            fetchPopularMovieList({ page: page + 1 });
          }
        }}
      >
        <View>
          {popularMovieList.map((movie, index) => (
            <MovieContainer
              key={index}
              movieInfo={movie}
              onPress={id => navigation.navigate("MovieDetails", id)}
              isLastMovieContainer={index === popularMovieList.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  return popularMovieView;
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
    refreshPopularMovieList: () => dispatch(actions.refreshPopularMovieList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovieScreen);
