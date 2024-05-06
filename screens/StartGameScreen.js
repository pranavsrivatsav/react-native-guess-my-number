import React, { useState } from "react";
import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import Title from "../components/ui/Title"; 
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onPickNumberHandler, metadata }) => {
    const [enteredNumber, setEnteredNumber] = useState("");

    function numberInputHandler(enteredNumber) {
        setEnteredNumber(enteredNumber);
    }

    function resetEnteredNumber() {
        setEnteredNumber("");
    }

    function onConfirmPressHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number!",
                "Please choose a number between 1 and 99.",
                [{ text: "OK", style: "destructive" }]
            );

            resetEnteredNumber();
            return;
        }

        onPickNumberHandler(chosenNumber);
        console.log("valid entered number", chosenNumber);
    }

    const styles = getStyles(metadata);

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen}>
                <View>
                    <View style={styles.gameTitle}>
                        <Title>Guess My Number</Title>
                    </View>

                    <Card>
                        <InstructionText style={styles.instructionText}>
                            Enter a Number
                        </InstructionText>
                        <TextInput
                            style={styles.textInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    onPressHandler={resetEnteredNumber}
                                >
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    onPressHandler={onConfirmPressHandler}
                                >
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const getStyles = ({ width, height, isLandscape }) => {

    return StyleSheet.create({
        screen: {
            flex: 1,
        },
        gameTitle: {
            marginTop: isLandscape ? 20 : width < 400 ? 50 : 70,
            alignItems: "center",
        },
        instructionText: {
            fontSize: 24,
            color: Colors.accent500,
        },
        textInput: {
            height: 50,
            width: 50,
            fontSize: 32,
            color: Colors.accent500,
            borderBottomColor: Colors.accent500,
            borderBottomWidth: 2,
            marginVertical: 8,
            textAlign: "center",
        },
        buttonsContainer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
        buttonContainer: {
            flex: 1,
        },
    });
};

export default StartGameScreen;
