import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'
import dimensions from '../../utils/dimensions'

const Title = ({children}) => {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'openSans-bold',
        fontSize: dimensions.deviceWidth < 400 ? 20 : 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12
    }
})
export default Title