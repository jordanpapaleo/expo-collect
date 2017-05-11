import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

export default class TestView extends Component {
  static navigationOptions = {
    title: 'Test View'
  }

  static propTypes = {}

  state = {}

  render () {
    return (
      <View><Text>TestView</Text></View>
    )
  }
}
