import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'
import dimensions from '../../utils/dimensions'

const NumberContainer = ({children}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: dimensions.deviceWidth < 400 ? 16 : 24,
        marginHorizontal: 24,
        marginVertical: dimensions.deviceWidth < 400 ? 24 : 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    numberText: {
        color: Colors.accent500,
        fontSize: dimensions.deviceWidth < 400 ? 24 : 36,
        fontWeight: 'bold'
    }
})

export default NumberContainer