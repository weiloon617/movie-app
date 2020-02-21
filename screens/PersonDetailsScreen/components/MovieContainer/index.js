import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

// const
import link from "../../../../constants/links";

// components
import InfoContainer from "../../../../components/InfoContainer";

const MovieContainer = ({ movie, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.halfWidth}
      onPress={() => navigation.push("MovieDetails", movie.id)}
    >
      <View>
        <Image
          style={styles.movieImage}
          source={{
            uri: `${link.imagePath}${movie.poster_path}`
          }}
        />
        <InfoContainer title={movie.title} desc={movie.character} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  halfWidth: {
    width: "50%"
  },
  movieImage: {
    width: "70%",
    height: 140
  }
});

export default MovieContainer;
