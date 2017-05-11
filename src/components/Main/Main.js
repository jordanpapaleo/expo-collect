import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import mainStyles from './main.styles'
import {Button} from '../ui'
import TestView from '../TestView'
import {checkSession} from '../../actions/cameraActions'

const mapStateToProps = state => ({
  properties: state.properties
})

const mapDispatchToProps = dispatch => (bindActionCreators({
  checkSession
}, dispatch))
@connect(mapStateToProps, mapDispatchToProps)
class MainComponent extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
      navigate: PropTypes.func.isRequired
    })
  }

  styles = StyleSheet.create(mainStyles)

  goPlaces = () => {
    const {navigate} = this.props.navigation
    navigate('Test')
  }

  testCamera = () => {
    this.props.checkSession()
  }

  render () {
    console.log('this.props', this.props)
    return (
      <View style={this.styles.container}>
        <Text>Travis is a BUM!</Text>
        <Button cb={this.goPlaces}>Go</Button>
        <Button cb={this.testCamera}>Test Camera</Button>
      </View>
    )
  }
}

const Main = StackNavigator({
  Home: {screen: MainComponent},
  Test: {screen: TestView}
})

export default Main
