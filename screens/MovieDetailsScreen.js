import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

// components
import Spinner from "../components/Spinner";

// const
import link from "../constants/links";
import { timeConvert } from "../utils";
import { NavigationContainer } from "@react-navigation/native";

const MovieDetailScreen = ({
  route,
  loading,
  movieDetails,
  fetchMovieDetails,
  clearMovieDetails,
  navigation
}) => {
  useEffect(() => {
    const { params } = route;
    fetchMovieDetails(params);

    return () => {
      clearMovieDetails();
    };
  }, []);

  let movieDetailsView = <Spinner />;

  if (!loading && Object.values(movieDetails).length !== 0) {
    const {
      title,
      overview,
      poster_path,
      release_date,
      vote_average,
      cast,
      runtime
    } = movieDetails;
    movieDetailsView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.movieDetailsContainer}>
          <View style={styles.movieDetialsInfo}>
            <Image
              style={styles.movieDetailsImage}
              source={{ uri: `${link.imagePath}${poster_path}` }}
              resizeMethod={"auto"}
            ></Image>

            <View style={styles.movieDetailsDesc}>
              <Text style={styles.movieHeadline}>{title}</Text>

              <Text style={styles.movieTitle}>Release Date:</Text>
              <Text style={styles.movieDesc}>{release_date}</Text>

              <Text style={styles.movieTitle}>User Score:</Text>
              <Text style={styles.movieDesc}>{vote_average * 10}%</Text>

              <Text style={styles.movieTitle}>Run Time:</Text>
              <Text style={styles.movieDesc}>{timeConvert(runtime)}</Text>
            </View>
          </View>

          <Text style={styles.movieTitle}>Overview:</Text>
          <Text style={styles.movieDesc}>{overview}</Text>
        </View>

        <View style={styles.movieCrewContainer}>
          <Text style={styles.crewTitle}>Top Billed Cast:</Text>

          <View style={styles.flexRow}>
            {cast !== undefined
              ? cast.map((person, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.flexHalf}
                    onPress={() => navigation.navigate("Person", person.id)}
                  >
                    <View>
                      <Image
                        style={styles.castImage}
                        source={{
                          uri: `${link.imagePath}${person.profile_path}`
                        }}
                      />
                      <Text style={styles.movieTitle}>{person.name}</Text>
                      <Text style={styles.movieDesc}>{person.character}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    );
  }

  return movieDetailsView;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  movieDetailsContainer: {
    backgroundColor: "#fff",
    padding: 15
  },
  movieDetialsInfo: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10
  },
  movieDetailsImage: {
    width: "40%",
    height: 200
  },
  movieDetailsDesc: {
    marginLeft: 15
  },
  movieHeadline: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600"
  },
  movieDesc: {
    fontSize: 15,
    marginBottom: 18
  },
  movieCrewContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 15
  },
  flexRow: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"
  },
  flexHalf: {
    width: "50%"
  },
  crewTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  castImage: {
    width: "50%",
    height: 100
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
