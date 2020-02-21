import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

// actions
import * as actions from "../../../store/actions";

// redux
import { connect } from "react-redux";

const mediaTypeList = [
  { label: "Movie", value: "movie" },
  { label: "TV", value: "tv" }
];

const timeWindowList = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" }
];

const FilterContainer = ({
  applyFilter,
  mediaType,
  timeWindow,
  updateFilterState,
  resetFilterState
}) => {
  const handleApplyFilter = () => {
    applyFilter(mediaType, timeWindow);
  };

  const handleClearFilter = () => {
    resetFilterState();
    handleApplyFilter();
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterHeaderContainer}>
        <Text style={styles.filterHeaderText}>Filter Trending List</Text>
      </View>

      <View style={styles.filterFormContainer}>
        <View style={styles.filterFormRow}>
          <Text style={styles.filterFormLabel}>Media Type</Text>
          <RadioForm initial={0} formHorizontal={true} animation={true}>
            {mediaTypeList.map((item, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={item}
                  index={i}
                  isSelected={mediaType === item.value}
                  onPress={value => updateFilterState({ mediaType: value })}
                  borderWidth={1}
                  buttonInnerColor={"#2f95dc"}
                  buttonOuterColor={"#2f95dc"}
                  buttonSize={14}
                  buttonOuterSize={20}
                />
                <RadioButtonLabel
                  obj={item}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => updateFilterState({ mediaType: value })}
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View style={styles.filterFormRow}>
          <Text style={styles.filterFormLabel}>Time Window</Text>
          <RadioForm initial={0} formHorizontal={true} animation={true}>
            {timeWindowList.map((item, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={item}
                  index={i}
                  isSelected={timeWindow === item.value}
                  onPress={value => updateFilterState({ timeWindow: value })}
                  borderWidth={1}
                  buttonInnerColor={"#2f95dc"}
                  buttonOuterColor={"#2f95dc"}
                  buttonSize={14}
                  buttonOuterSize={20}
                />
                <RadioButtonLabel
                  obj={item}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => updateFilterState({ timeWindow: value })}
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>

      <View style={[styles.filterFooterContainer, styles.flexRow]}>
        <TouchableOpacity style={styles.halfWidth} onPress={handleClearFilter}>
          <Text style={styles.clearFilterButtonText}>Clear Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.halfWidth, styles.applyFilterButton]}
          onPress={handleApplyFilter}
        >
          <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    position: "relative"
  },
  filterHeaderContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    position: "relative"
  },
  filterHeaderText: {
    fontSize: 20,
    fontWeight: "600"
  },
  filterFooterContainer: {
    position: "absolute",
    bottom: 20
  },
  flexRow: {
    flexDirection: "row",
    width: "100%"
  },
  halfWidth: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  filterButton: {
    width: "85%"
  },
  clearFilterButtonText: {
    color: "#2f95dc",
    fontSize: 16,
    textAlign: "center",
    margin: 1,
    backgroundColor: "#fff",
    paddingVertical: 12
  },
  applyFilterButton: {
    backgroundColor: "#2f95dc"
  },
  applyFilterButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 12,
    margin: 1
  },
  filterFormContainer: {
    paddingHorizontal: 15,
    paddingTop: 15
  },
  filterFormRow: {
    marginTop: 10,
    marginBottom: 15
  },
  filterFormLabel: {
    fontSize: 16,
    marginBottom: 15
  },
  radioButtonLabel: {
    fontSize: 14,
    color: "gray",
    marginRight: 10
  }
});

const mapStateToProps = state => {
  const { trendingMovie } = state;
  const { mediaType, timeWindow } = trendingMovie;

  return { mediaType, timeWindow };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFilterState: payload => dispatch(actions.updateFilterState(payload)),
    resetFilterState: () => dispatch(actions.resetFilterState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
