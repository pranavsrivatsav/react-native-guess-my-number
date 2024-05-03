import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const PrimaryButton = ({children, onPressHandler}) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [
                              styles.buttonInnerContainer,
                              styles.pressedIos,
                        ]
                        : styles.buttonInnerContainer
                }
                onPress={onPressHandler}
                android_ripple={{ color: Colors.primary500 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary600,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
    },
    pressedIos: {
        opacity: 0.75,
    },
});
export default PrimaryButton;
