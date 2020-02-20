import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// actions
import * as actions from "../store/actions";

// redux
import { connect } from "react-redux";

// components
import Spinner from "../components/Spinner";

const PersonDetailsScreen = ({
  route,
  loading,
  personDetails,
  fetchPersonDetails,
  clearPersonDetails
}) => {
  useEffect(() => {
    const { params } = route;
    fetchPersonDetails(params);

    return () => {
      clearPersonDetails();
    };
  }, []);

  let personDetailsView = <Spinner />;

  if (!loading && Object.values(personDetails).length !== 0) {
    personDetailsView = (
      <ScrollView style={styles.container}>
        <View>
          <Text>HAAHA</Text>
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
    fetchPersonDetails: payload =>
      dispatch(actions.fetchPersonDetails(payload)),
    clearPersonDetails: () => dispatch(actions.clearPersonDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonDetailsScreen);
