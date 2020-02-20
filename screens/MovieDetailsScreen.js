import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

// components
import Spinner from "../components/Spinner";

// const
import link from "../constants/links";

// utils
import { timeConvert } from "../utils";
import { renderViewMore, renderViewLess } from "../utils/viewMore";

const MovieDetailScreen = ({
  route,
  loading,
  movieDetails,
  fetchMovieDetails,
  navigation
}) => {
  useEffect(() => {
    const { params } = route;
    fetchMovieDetails(params);
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
            />

            <View style={styles.movieDetailsDesc}>
              <Text style={styles.movieHeadline}>{title}</Text>

              <Text style={styles.title}>Release Date:</Text>
              <Text style={styles.desc}>{release_date}</Text>

              <Text style={styles.title}>User Score:</Text>
              <Text style={styles.desc}>{vote_average * 10}%</Text>

              <Text style={styles.title}>Run Time:</Text>
              <Text style={styles.desc}>{timeConvert(runtime)}</Text>
            </View>
          </View>

          <Text style={styles.title}>Overview:</Text>
          <ViewMoreText
            numberOfLines={5}
            renderViewLess={renderViewLess}
            renderViewMore={renderViewMore}
          >
            <Text style={styles.desc}>{overview}</Text>
          </ViewMoreText>
        </View>

        <View style={styles.movieCastContainer}>
          <Text style={styles.castHeadline}>Casts:</Text>

          <View style={styles.flexRow}>
            {cast !== undefined
              ? cast.map((person, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.halfWidth}
                    onPress={() => navigation.navigate("Person", person.id)}
                  >
                    <View>
                      <Image
                        style={styles.castImage}
                        source={{
                          uri: `${link.imagePath}${person.profile_path}`
                        }}
                      />
                      <Text style={styles.title}>{person.name}</Text>
                      <Text style={styles.desc}>{person.character}</Text>
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
    width: "60%",
    marginLeft: 15,
    paddingRight: 10
  },
  movieHeadline: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18
  },

  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  desc: {
    fontSize: 15,
    marginBottom: 18
  },

  movieCastContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 15
  },

  flexRow: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"
  },
  halfWidth: {
    width: "50%"
  },

  castHeadline: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  castImage: {
    width: "70%",
    height: 140
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
    fetchMovieDetails: payload => dispatch(actions.fetchMovieDetails(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailScreen);
