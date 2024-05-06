import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    FlatList,
    ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLog from "../components/ui/GuessLog";
import dimensions from "../utils/dimensions";
import { KeyboardAvoidingView } from "react-native";

function generateRandomNumber(min, max, skipNumber) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (randomNumber === skipNumber) {
        randomNumber = generateRandomNumber(min, max, skipNumber);
    }

    return randomNumber;
}

let minNumber = 1;
let maxNumber = 100;

const GameScreen = ({ pickedNumber, onCorrectGuessHandler, metadata }) => {
    console.log("min: ", minNumber, " max: ", maxNumber);
    const [guessNumber, setGuessNumber] = useState(null);
    const [guessList, setGuessList] = useState([]);

    const styles = getStyles(metadata);
    const { isLandscape } = metadata;

    updateGuessList = (newGuessNumber) => {
        setGuessList((prevGuessList) => [...prevGuessList, newGuessNumber]);
    };

    useEffect(() => {
        resetMinMax();
        const initialGuessNumber = generateRandomNumber(
            minNumber,
            maxNumber,
            pickedNumber
        );
        setGuessNumber(initialGuessNumber);
        updateGuessList(initialGuessNumber);
    }, []);

    useEffect(() => {
        if (guessNumber === pickedNumber) {
            resetMinMax();
            onCorrectGuessHandler(guessList.length);
        }
    }, [guessNumber, pickedNumber, onCorrectGuessHandler]);

    function handleGuess(direction) {
        const isValid = checkAndHandleInvalidGuess(
            direction,
            guessNumber,
            pickedNumber
        );
        if (!isValid) return;

        if (direction === "lower") {
            maxNumber = guessNumber;
        } else {
            minNumber = guessNumber + 1;
        }

        console.log("min - max", minNumber, maxNumber);

        const newGuessNumber = generateRandomNumber(
            minNumber,
            maxNumber,
            guessNumber
        );
        setGuessNumber(newGuessNumber);
        updateGuessList(newGuessNumber);
    }

    function checkAndHandleInvalidGuess(direction, guessNumber, pickedNumber) {
        if (
            (direction === "lower" && guessNumber < pickedNumber) ||
            (direction === "higher" && guessNumber > pickedNumber)
        ) {
            generateInvalidAlert();
            return false;
        }

        return true;
    }

    const portraitLayout = (
        <View style={styles.container}>
            <View style={styles.title}>
                <Title>Opponent's Guess</Title>
            </View>

            <NumberContainer>{guessNumber}</NumberContainer>
            {renderAddAndSubtractButtons()}
            {renderGuessList()}
        </View>
    );

    const landscapeLayout = (
        <View style={styles.container}>
            <View style={styles.title}>
                <Title>Opponent's Guess</Title>
            </View>
            <View style={styles.landscapeViewContentView}>
            <View
                style={[
                    styles.landscapeNumberAndButtonsSection,
                    styles.landscapeContentSectionGeneric,
                ]}
            >
                {renderNumberAndButtonsForLandscape()}
                </View>
                <View style={styles.landscapeContentSectionGeneric}>
                    {renderGuessList()}
                </View>
            </View>
        </View>
    );

    return <>{isLandscape ? landscapeLayout : portraitLayout}</>;

    function renderNumberAndButtonsForLandscape() {
        return (
            <>
                <View>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPressHandler={() => handleGuess("lower")}
                        >
                            <Ionicons
                                name="remove"
                                size={dimensions.deviceWidth < 400 ? 16 : 24}
                            />
                        </PrimaryButton>
                    </View>
                </View>
                <NumberContainer metadata={metadata}>
                    {guessNumber}
                </NumberContainer>
                <View style={styles.button}>
                    <PrimaryButton onPressHandler={() => handleGuess("higher")}>
                        <Ionicons
                            name="add"
                            size={dimensions.deviceWidth < 400 ? 16 : 24}
                        />
                    </PrimaryButton>
                </View>
            </>
        );
    }

    function renderGuessList() {
        return (
            <View style={styles.guessLogContainer}>
                <FlatList
                    data={guessList}
                    keyExtractor={(guessNumber, index) =>
                        `guessNumber${index}-${guessNumber}`
                    }
                    renderItem={renderGuessItem}
                />
            </View>
        );
    }

    function renderGuessItem(guessData) {
        const { item: guessNumber, index } = guessData;
        return <GuessLog roundNumber={index + 1} guessNumber={guessNumber} />;
    }

    function renderAddAndSubtractButtons() {
        return (
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher Or Lower?
                </InstructionText>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPressHandler={() => handleGuess("lower")}
                        >
                            <Ionicons
                                name="remove"
                                size={dimensions.deviceWidth < 400 ? 16 : 24}
                            />
                        </PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPressHandler={() => handleGuess("higher")}
                        >
                            <Ionicons
                                name="add"
                                size={dimensions.deviceWidth < 400 ? 16 : 24}
                            />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        );
    }

    function generateInvalidAlert() {
        Alert.alert("Dont lie!", "You know that is wrong...", [
            {
                text: "Sorry!",
                style: "cancel",
            },
        ]);
    }
};

const getStyles = ({ width, height }) =>
    StyleSheet.create({
        title: {
            alignItems: "center",
        },
        guessLogContainer: {
            flex: 1,
            marginVertical: 10,
            paddingHorizontal: 26,
        },
        instructionText: {
            marginBottom: 12,
        },
        container: {
            flex: 1,
            padding: 24,
        },
        buttonContainer: {
            flexDirection: "row",
            gap: 12,
        },
        button: {},
        landscapeViewContentView: {
            flexDirection: "row",
            flex: 1
        },
        landscapeContentSectionGeneric: {
            flex: 1,
        },
        landscapeNumberAndButtonsSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
    });

export default GameScreen;
function resetMinMax() {
    minNumber = 1;
    maxNumber = 100;
}
