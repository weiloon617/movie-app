import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoContainer = ({ title, desc }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  desc: {
    fontSize: 15,
    marginBottom: 18
  }
});

export default InfoContainer;
