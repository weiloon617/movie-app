import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";

// actions
import * as actions from "../../store/actions";

// redux
import { connect } from "react-redux";

// components
import Spinner from "../../components/Spinner";
import InfoContainer from "../../components/InfoContainer";
import MovieContainer from "./components/MovieContainer";

// const
import link from "../../constants/links";

// utils
import { renderViewLess, renderViewMore } from "../../utils/viewMore";

const PersonDetailsScreen = ({
  navigation,
  route,
  loading,
  personDetails,
  fetchPersonDetails
}) => {
  // load person details
  useEffect(() => {
    const { params } = route;
    fetchPersonDetails(params);
  }, []);

  let personDetailsView = <Spinner />;

  if (!loading && Object.values(personDetails).length !== 0) {
    personDetailsView = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.personDetailsContainer}>
          <View style={styles.personDetialsInfo}>
            {/* cast member image */}
            <Image
              style={styles.personDetailsImage}
              source={{ uri: `${link.imagePath}${personDetails.profile_path}` }}
              resizeMethod={"auto"}
            ></Image>

            <View style={styles.personDetailsDesc}>
              <Text style={styles.personName}>{personDetails.name}</Text>

              {/* gender */}
              <InfoContainer
                title="Gender:"
                desc={personDetails.gender === 2 ? "Male" : "Female"}
              />

              {/* birthday */}
              <InfoContainer title="Birthday:" desc={personDetails.birthday} />

              {/* place of birth */}
              <InfoContainer
                title="Place of birth:"
                desc={personDetails.place_of_birth}
              />
            </View>
          </View>

          {/* biography */}
          <ViewMoreText
            numberOfLines={5}
            renderViewLess={renderViewLess}
            renderViewMore={renderViewMore}
          >
            <Text style={styles.desc}>{personDetails.biography}</Text>
          </ViewMoreText>
        </View>

        {/* movie list */}
        <View style={styles.movieListContainer}>
          <Text style={styles.movieListHeadline}>Acting Movies:</Text>

          <View style={styles.flexRow}>
            {personDetails.cast.map((movie, index) => (
              <MovieContainer
                key={index}
                movie={movie}
                navigation={navigation}
              />
            ))}
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

  movieListHeadline: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
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
