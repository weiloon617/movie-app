import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";
import Spinner from "../../components/Spinner";

const PopularMovieScreen = ({
  loading,
  popularMovieList,
  fetchPopularMovieList,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPopularMovieList({ page });
  }, []);

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);

    fetchPopularMovieList({ page }).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  let popularMovieView = <Spinner />;

  if (!loading && popularMovieList.length !== 0) {
    popularMovieView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
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
  const { loading, popularMovieList } = popularMovie;

  return { loading, popularMovieList };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPopularMovieList: payload =>
      dispatch(actions.fetchPopularMovieList(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovieScreen);
