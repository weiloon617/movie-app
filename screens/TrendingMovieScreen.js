import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../components/MovieContainer";

const TrendingMovieScreen = ({
  loading,
  trendingMovieList,
  fetchTrendingMovieList,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [mediaType, setMediaType] = useState("all");
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    fetchTrendingMovieList({ page, mediaType, timeWindow });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
