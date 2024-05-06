import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import dimensions from "../../utils/dimensions";

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
        fontSize: dimensions.deviceWidth < 400 ? 20 : 24,
        color: Platform.OS === "android" ?  "white" : Colors.accent500,
    },
});
export default InstructionText;
