import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import Spinner from "../../components/Spinner";
import CastContainer from "./components/CastContainer";
import InfoContainer from "../../components/InfoContainer";

// const
import link from "../../constants/links";

// utils
import { timeConvert } from "../../utils";
import { renderViewMore, renderViewLess } from "../../utils/viewMore";

const MovieDetailScreen = ({
  route,
  loading,
  movieDetails,
  fetchMovieDetails,
  navigation
}) => {
  // load movie detials
  useEffect(() => {
    const { params } = route;
    fetchMovieDetails(params);
  }, []);

  let movieDetailsView = <Spinner />;

  if (!loading && Object.values(movieDetails).length !== 0) {
    movieDetailsView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.movieDetailsContainer}>
          <View style={styles.movieDetialsInfo}>
            {/* movie poster */}
            <Image
              style={styles.movieDetailsImage}
              source={{ uri: `${link.imagePath}${movieDetails.poster_path}` }}
            />

            <View style={styles.movieDetailsDesc}>
              {/* title */}
              <Text style={styles.movieHeadline}>{movieDetails.title}</Text>

              {/* release date */}
              <InfoContainer
                title="Release Date:"
                desc={movieDetails.release_date}
              />

              {/* user score */}
              <InfoContainer
                title="User Score:"
                desc={`${movieDetails.vote_average * 10}%`}
              />

              {/* run time */}
              <InfoContainer
                title="Run Time:"
                desc={timeConvert(movieDetails.runtime)}
              />
            </View>
          </View>

          {/* overview */}
          <Text style={styles.title}>Overview:</Text>
          <ViewMoreText
            numberOfLines={5}
            renderViewLess={renderViewLess}
            renderViewMore={renderViewMore}
          >
            <Text style={styles.desc}>{movieDetails.overview}</Text>
          </ViewMoreText>
        </View>

        {/* Cast Member */}
        <View style={styles.movieCastContainer}>
          <Text style={styles.castHeadline}>Casts:</Text>

          <View style={styles.flexRow}>
            {movieDetails.cast !== undefined ? movieDetails.cast.map((person, index) => (
              <CastContainer
                key={index}
                person={person}
                navigation={navigation}
              />
            )): null}
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

  castHeadline: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
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
