import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const GuessLog = ({ roundNumber, guessNumber }) => {
    return (
        <View style={[styles.container]}>
            <Text
                style={[styles.roundNumberContainer, styles.genericTextStyle]}
            >
                Round #{roundNumber}
            </Text>
            <Text
                style={[styles.guessNumberContainer, styles.genericTextStyle]}
            >
                Guess: {guessNumber}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        borderRadius: 50,
        overflow: "hidden"
    },
    genericTextStyle: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 4,
        textAlign: "center",
    },
    roundNumberContainer: {
        width: 120,
        backgroundColor: Colors.accent500,
        fontFamily: "openSans-bold",
    },
    guessNumberContainer: {
        flex: 1,
        backgroundColor: Colors.primary600,
        fontFamily: "openSans",
        color: "white",
    },
});

export default GuessLog;
