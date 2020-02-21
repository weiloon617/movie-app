import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import MovieContainer from "../../components/MovieContainer";

const SearchMoviesScreen = ({
  searchMoviesList,
  searchAllMovies,
  resetAllMoviesList,
  totalPages,
  navigation
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearchMovie = event => {
    const { nativeEvent } = event;
    const { text } = nativeEvent;

    setSearch(text);

    if (text !== "") {
      searchAllMovies({ query: text, page: 1 });
    } else {
      resetAllMoviesList();
    }
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

  return (
    <View style={styles.container}>
      <TextInput
        inlineImageLeft="search_icon"
        placeholder="Search movie title"
        style={styles.searchInput}
        onEndEditing={handleSearchMovie}
        clearTextOnFocus={true}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && page <= totalPages) {
            setPage(page + 1);
            searchAllMovies({ query: search, page: page + 1 });
          }
        }}
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
    resetAllMoviesList: () => dispatch(actions.resetAllMoviesList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoviesScreen);
