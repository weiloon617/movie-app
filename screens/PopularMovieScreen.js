import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../components/MovieContainer";

const PopularMovieScreen = ({
  loading,
  popularMovieList,
  fetchPopularMovieList,
  navigation
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPopularMovieList({ page });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        {popularMovieList.map((movie, index) => (
          <MovieContainer
            key={index}
            movieInfo={movie}
            onPress={id => navigation.navigate("Movie", id)}
            isLastMovieContainer={index === popularMovieList.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
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
