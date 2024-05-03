import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { Colors } from "../constants/colors";
import { fontKeys } from "../assets/fonts";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({userNumber, roundsNumber, startNewGameHandler}) => {
    return (
        <View style={styles.rootContainer}>
            <Title>Game Over</Title>
            {renderSuccessImage()}
            {renderSuccessText()}
            <PrimaryButton onPressHandler={startNewGameHandler}>Start New Game</PrimaryButton>
        </View>
    );

  function renderSuccessImage() {
    return <View style={styles.successImageContainer}>
      <Image
        style={styles.successImage}
        source={require("../assets/images/success.png")} />
    </View>;
  }

  function renderSuccessText() {
    return <Text style={styles.successNoteText}>
      Your phone needed{" "}
      <Text style={styles.successNoteHighlightText}>{roundsNumber}</Text> rounds to
      guess the number{" "}
      <Text style={styles.successNoteHighlightText}>{userNumber}</Text>.
    </Text>;
  }
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    successImageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36,
    },
    successImage: {
        height: "100%",
        width: "100%",
    },
    successNoteText: {
        fontSize: 24,
        fontFamily: "openSans",
        textAlign: "center",
        marginVertical: 18
    },
    successNoteHighlightText: {
        fontFamily: "openSans-bold",
        color: Colors.primary500,
    },
});
export default GameOverScreen;
