import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from './ui'
import {newFloorPlan, deleteFloorPlan, updateFloorPlan} from '../actions/floorplanActions'

const mapStateToProps = state => ({
  floorplans: state.floorplans
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  newFloorPlan, deleteFloorPlan, updateFloorPlan
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestFloorPlans extends Component {
  static propTypes = {
    floorplans: PropTypes.array,
    newFloorPlan: PropTypes.func,
    deleteFloorPlan: PropTypes.func,
    updateFloorPlan: PropTypes.func
  }

  updateFloorplan = (floorplanId) => {
    this.props.updateFloorPlan(floorplanId, {
      name: 'New Name',
      rooms: [
        ['delete', 'room-1493925821533'],
        ['add', 'room-1493925891930']
      ]
    })
  }

  render () {
    const {newFloorPlan, deleteFloorPlan, floorplans} = this.props
    return (
      <View>
        {floorplans.map((floorplan, i) => (
            <View style={styles.container} key={`floorplan-${i}`}>
              <Text style={{flexGrow: 1}}>{floorplan.name}</Text>
              <Button cb={this.updateFloorplan.bind(this, floorplan.id)}>Update</Button>
              <Button cb={deleteFloorPlan.bind(this, floorplan.id)}>X</Button>
            </View>
          )
        )}
        <Button cb={newFloorPlan}>Add</Button>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row'}
})
