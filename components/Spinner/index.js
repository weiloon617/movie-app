import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2f95dc" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center"
  }
});

export default Spinner;
