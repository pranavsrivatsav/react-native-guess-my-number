import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const InstructionText = ({ children, style }) => {
    return (
        <View style={style}>
            <Text style={styles.instructionText}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'openSans',
        fontSize: 24,
        color: Colors.accent500,
    },
});
export default InstructionText;
