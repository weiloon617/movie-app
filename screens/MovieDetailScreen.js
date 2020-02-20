import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

const MovieDetailScreen = ({
  route,
  loading,
  movieDetails,
  fetchMovieDetails,
  clearMovieDetails
}) => {
  useEffect(() => {
    const { params } = route;
    fetchMovieDetails(params);

    return () => {
      clearMovieDetails();
    };
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <Text>Movie Detials</Text>
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
  const { movieDetails } = state;

  return {
    loading: movieDetails.loading,
    movieDetails: movieDetails.movieDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovieDetails: payload => dispatch(actions.fetchMovieDetails(payload)),
    clearMovieDetails: () => dispatch(actions.clearMovieDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailScreen);
