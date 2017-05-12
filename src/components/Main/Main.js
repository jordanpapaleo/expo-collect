import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import mainStyles from './main.styles'
import {Button} from '../ui'
import TestView from '../TestView'
import TestCaptures from '../TestCaptures'
import TestFloorPlans from '../TestFloorPlans'
import TestHotspots from '../TestHotspots'
import TestRooms from '../TestRooms'
import {getCameraInfo, takePicture} from '../../actions/cameraActions'
import {propertyStore} from '../../services/localStorage'

const mapStateToProps = state => ({
  properties: state.properties
})

const mapDispatchToProps = dispatch => (bindActionCreators({
  getCameraInfo, takePicture
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

  componentWillMount () {
    // propertyStore.set('property-1234', {id: '1234', floorplans: [], rooms: []})
  }

  componentDidMount () {
    propertyStore.get('property-1234').then((data) => {
      console.log('PLOP', data)
    })
  }

  styles = StyleSheet.create(mainStyles)

  goPlaces = () => {
    const {navigate} = this.props.navigation
    navigate('Test')
  }

  render () {
    const {getCameraInfo, takePicture} = this.props
    const {navigate} = this.props.navigation

    return (
      <View style={this.styles.container}>
        <Text>Travis is a BUM!</Text>
        <Button cb={this.goPlaces}>Go View</Button>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button cb={() => { navigate('TestFloorPlans') }}>Floorplans</Button>
          <Button cb={() => { navigate('TestRooms') }}>Rooms</Button>
          <Button cb={() => { navigate('TestCaptures') }}>Captures</Button>
          <Button cb={() => { navigate('TestHotspots') }}>Hotspots</Button>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button cb={getCameraInfo}>Get Camera Info</Button>
          <Button cb={takePicture}>Take Picture</Button>
        </View>
      </View>
    )
  }
}

const Main = StackNavigator({
  Home: {screen: MainComponent},
  Test: {screen: TestView},
  TestCaptures: {screen: TestCaptures},
  TestFloorPlans: {screen: TestFloorPlans},
  TestHotspots: {screen: TestHotspots},
  TestRooms: {screen: TestRooms}
})

export default Main
