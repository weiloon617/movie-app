import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";

// utils
import { checkIsCloseToBottom } from "../../utils";

const SearchMoviesScreen = ({
  searchMoviesList,
  searchAllMovies,
  clearAllMoviesList,
  totalPages,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // handle search movie
  const handleSearchMovie = ({ nativeEvent }) => {
    const { text } = nativeEvent;

    // set search
    setSearch(text);

    // clear all movie list
    clearAllMoviesList();

    // if text not empty, then perform search
    if (text !== "") {
      const payload = { query: text, page: 1 };
      searchAllMovies(payload);
    }
  };

  // handle load more data
  const handleLoadMoreData = ({ nativeEvent }) => {
    // check is scroll reach bottom and page is not larger than total pages
    if (checkIsCloseToBottom(nativeEvent) && page <= totalPages) {
      // set page + 1
      const updatePage = page + 1;
      setPage(updatePage);

      // search all movies
      const payload = { query: search, page: updatePage };
      searchAllMovies(payload);
    }
  };

  return (
    <View style={styles.container}>
      {/* search text bar */}
      <TextInput
        placeholder="Search movie title"
        style={styles.searchInput}
        onEndEditing={handleSearchMovie}
        clearTextOnFocus={true}
      />

      {/* movie list */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onMomentumScrollEnd={handleLoadMoreData}
      >
        {searchMoviesList.length !== 0 ? (
          searchMoviesList.map((movie, index) => (
            <MovieContainer
              key={index}
              movieInfo={movie}
              onPress={id => navigation.navigate("MovieDetails", id)}
              isLastMovieContainer={index === searchMoviesList.length - 1}
            />
          ))
        ) : (
          <View style={styles.movieListContainer}>
            <Text>Not Record Found</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 15
  },
  movieListContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const { searchMovies } = state;
  const { loading, searchMoviesList, totalPages } = searchMovies;

  return { loading, searchMoviesList, totalPages };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAllMovies: payload => dispatch(actions.searchAllMovies(payload)),
    clearAllMoviesList: () => dispatch(actions.clearAllMoviesList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoviesScreen);
