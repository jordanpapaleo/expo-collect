import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class App extends Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  doStuff = () => {
    console.log('Here')
  }

  render () {
    return (
      <View style={this.styles.container}>
        <Text>Travis is a BUM!</Text>
      </View>
    )
  }
}
