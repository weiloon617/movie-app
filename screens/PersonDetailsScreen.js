import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
import { renderViewLess, renderViewMore } from "../utils/viewMore";

const PersonDetailsScreen = ({
  navigation,
  route,
  loading,
  personDetails,
  fetchPersonDetails
}) => {
  useEffect(() => {
    const { params } = route;
    fetchPersonDetails(params);
  }, []);

  let personDetailsView = <Spinner />;

  if (!loading && Object.values(personDetails).length !== 0) {
    const {
      name,
      birthday,
      gender,
      biography,
      place_of_birth,
      profile_path,
      cast
    } = personDetails;

    personDetailsView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.personDetailsContainer}>
          <View style={styles.personDetialsInfo}>
            <Image
              style={styles.personDetailsImage}
              source={{ uri: `${link.imagePath}${profile_path}` }}
              resizeMethod={"auto"}
            ></Image>

            <View style={styles.personDetailsDesc}>
              <Text style={styles.personName}>{name}</Text>

              <Text style={styles.title}>Gender:</Text>
              <Text style={styles.desc}>
                {gender === 2 ? "Male" : "Female"}
              </Text>

              <Text style={styles.title}>Birthday:</Text>
              <Text style={styles.desc}>{birthday}</Text>

              <Text style={styles.title}>Place of birth: </Text>
              <Text style={styles.desc}>{place_of_birth}</Text>
            </View>
          </View>

          <ViewMoreText
            numberOfLines={5}
            renderViewLess={renderViewLess}
            renderViewMore={renderViewMore}
          >
            <Text style={styles.desc}>{biography}</Text>
          </ViewMoreText>
        </View>

        <View style={styles.movieListContainer}>
          <Text style={styles.movieListHeadline}>Acting Movies:</Text>

          <View style={styles.flexRow}>
            {cast !== undefined
              ? cast.map((movie, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.halfWidth}
                    onPress={() => navigation.push("Movie", movie.id)}
                  >
                    <View>
                      <Image
                        style={styles.movieImage}
                        source={{
                          uri: `${link.imagePath}${movie.poster_path}`
                        }}
                      />
                      <Text style={styles.title}>{movie.title}</Text>
                      <Text style={styles.desc}>{movie.character}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    );
  }

  return personDetailsView;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  personDetailsContainer: {
    backgroundColor: "#fff",
    padding: 15
  },
  personDetialsInfo: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10
  },
  personDetailsImage: {
    width: "40%",
    height: 200
  },
  personDetailsDesc: {
    width: "60%",
    marginLeft: 15,
    paddingRight: 10
  },
  personName: {
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

  movieListContainer: {
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

  movieListHeadline: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  movieImage: {
    width: "70%",
    height: 140
  }
});

const mapStateToProps = state => {
  const { personDetails } = state;
  return {
    loading: personDetails.loading,
    personDetails: personDetails.personDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPersonDetails: payload => dispatch(actions.fetchPersonDetails(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonDetailsScreen);
