import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";

// const
import link from "../../constants/links";

const MovieContainer = ({ movieInfo, isLastMovieContainer, onPress }) => {
  const { poster_path, title, release_date, overview, id } = movieInfo;

  return (
    <RectButton
      style={[
        styles.movieContainer,
        isLastMovieContainer && styles.lastMovieContainer
      ]}
      onPress={() => onPress(id)}
    >
      <View style={styles.movieInnerContainer}>
        {/* movie image */}
        <View style={styles.movieImageContainer}>
          <Image
            style={styles.movieImage}
            source={{ uri: `${link.imagePath}${poster_path}` }}
          ></Image>
        </View>

        <View style={styles.movieTextContainer}>
          {/* title */}
          <Text style={styles.movieHeadline}>{title}</Text>

          {/* release date */}
          <Text style={styles.movieTitle}>Release Date:</Text>
          <Text style={styles.movieText}>{release_date}</Text>

          {/* overview */}
          <Text style={styles.movieTitle}>Overview:</Text>
          <ViewMoreText numberOfLines={3}>
            <Text style={styles.movieText}>{overview}</Text>
          </ViewMoreText>
        </View>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  movieInnerContainer: {
    flexDirection: "row",
    width: "100%"
  },
  movieImageContainer: {
    marginRight: 12,
    width: "30%"
  },
  movieImage: {
    width: "100%",
    height: 150
  },
  lastMovieContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  movieTextContainer: {
    width: "70%"
  },
  movieHeadline: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 13
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2
  },
  movieText: {
    fontSize: 14,
    marginBottom: 13
  }
});

export default MovieContainer;
