import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { Colors } from "../constants/colors";
import { fontKeys } from "../assets/fonts";
import PrimaryButton from "../components/ui/PrimaryButton";
import dimensions from "../utils/dimensions";

const GameOverScreen = ({
    userNumber,
    roundsNumber,
    startNewGameHandler,
    metadata,
}) => {
    const { isLandscape } = metadata;
    const styles = getStyles(metadata);
    const portraitView = (
        <View style={styles.rootContainer}>
            <Title>Game Over</Title>
            {renderSuccessImage()}
            {renderSuccessText()}
            <PrimaryButton onPressHandler={startNewGameHandler}>
                Start New Game
            </PrimaryButton>
        </View>
    );

    const landscapeView = (
        <View style={[styles.rootContainer]}>
            <Title>Game Over</Title>
            <View style={styles.landscapeContentView}>
                <View style={styles.landscapeContentSectionGeneric}>
                    {renderSuccessImage()}
                </View>
                <View style={styles.landscapeContentSectionGeneric}>
                    {renderSuccessText()}
                    <PrimaryButton onPressHandler={startNewGameHandler}>
                        Start New Game
                    </PrimaryButton>
                </View>
            </View>
        </View>
    );
    return isLandscape ? landscapeView : portraitView;

    function renderSuccessImage() {
        return (
            <View style={styles.successImageContainer}>
                <Image
                    style={styles.successImage}
                    source={require("../assets/images/success.png")}
                />
            </View>
        );
    }

    function renderSuccessText() {
        return (
            <Text style={styles.successNoteText}>
                Your phone needed{" "}
                <Text style={styles.successNoteHighlightText}>
                    {roundsNumber}
                </Text>{" "}
                rounds to guess the number{" "}
                <Text style={styles.successNoteHighlightText}>
                    {userNumber}
                </Text>
                .
            </Text>
        );
    }
};

const getStyles = ({ width, height, isLandscape }) =>
    StyleSheet.create({
        rootContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        successImageContainer: {
            width: isLandscape ? 170 : width < 400 ? 180 : 300,
            height: isLandscape ? 170 : width < 400 ? 180 : 300,
            borderRadius: isLandscape ? 85 : width < 400 ? 90 : 150,
            borderWidth: 3,
            borderColor: Colors.primary800,
            overflow: "hidden",
            margin: isLandscape ? 10 : width < 400 ? 20 : 36,
        },
        successImage: {
            height: "100%",
            width: "100%",
        },
        successNoteText: {
            fontSize: isLandscape ? 20 : width < 400 ? 16 : 24,
            fontFamily: "openSans",
            textAlign: "center",
            marginVertical: isLandscape ? 12 : width < 400 ? 12 : 18,
        },
        successNoteHighlightText: {
            fontFamily: "openSans-bold",
            color: Colors.primary500,
        },
        landscapeContentView: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        landscapeContentSectionGeneric: {
            flex: 1,
            alignItems: "center",
            marginVertical: 24,
            marginHorizontal: 12
        },
    });
export default GameOverScreen;
