import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * render view more
 * @param {*} onPress
 */
export const renderViewMore = onPress => (
  <Text onPress={onPress} style={styles.viewLink}>
    View More
  </Text>
);

/**
 * render view less
 * @param {*} onPress
 */
export const renderViewLess = onPress => (
  <Text onPress={onPress} style={styles.viewLink}>
    View Less
  </Text>
);

const styles = StyleSheet.create({
  viewLink: {
    fontSize: 15,
    color: "#2f95dc"
  }
});
