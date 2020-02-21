import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";
import Spinner from "../../components/Spinner";

const SearchMoviesScreen = ({
  loading,
  searchMoviesList,
  searchAllMovies,
  navigation
}) => {
  const [page, setPage] = useState(1);

  const handleSearchMovie = event => {
    const { nativeEvent } = event;
    const { text } = nativeEvent;
    searchAllMovies(text);
  };

  let searchMoviesView = <Spinner />;

  if (!loading) {
    searchMoviesView = (
      <View>
        {searchMoviesList.map((movie, index) => (
          <MovieContainer
            key={index}
            movieInfo={movie}
            onPress={id => navigation.navigate("MovieDetails", id)}
            isLastMovieContainer={index === searchMoviesList.length - 1}
          />
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        inlineImageLeft="search_icon"
        placeholder="Search movie title"
        style={styles.searchInput}
        onEndEditing={handleSearchMovie}
        clearTextOnFocus={true}
      />
      {searchMoviesView}
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
  },
  searchInput: {
    height: 30,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginHorizontal: 15,
    fontSize: 15
  }
});

const mapStateToProps = state => {
  const { searchMovies } = state;
  const { loading, searchMoviesList } = searchMovies;

  return { loading, searchMoviesList };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAllMovies: payload => dispatch(actions.searchAllMovies(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoviesScreen);
