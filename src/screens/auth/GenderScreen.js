import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import PurposeButton from "../../components/PurposeButton";
import Screen from "../../components/Screen";
import colors from "../../config/colors";

function GenderScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>Choose your gender</AppText>
      </View>
      <PurposeButton title="Female" />
      <PurposeButton title="Male" />
      <View style={styles.buttonContainer}>
        <AppButton
          title="Next"
          color={colors.green}
          onPress={() => navigation.navigate("BirthDate")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default GenderScreen;
