import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

// const
import link from "../../../../constants/links";

// components
import InfoContainer from "../../../../components/InfoContainer";

const CastContainer = ({ navigation, person }) => {
  return (
    <TouchableOpacity
      style={styles.halfWidth}
      onPress={() => navigation.navigate("PersonDetails", person.id)}
    >
      <View>
        <Image
          style={styles.castImage}
          source={{
            uri: `${link.imagePath}${person.profile_path}`
          }}
        />
        <InfoContainer title={person.name} desc={person.character} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  halfWidth: {
    width: "50%"
  },
  castImage: {
    width: "70%",
    height: 140
  }
});

export default CastContainer;
