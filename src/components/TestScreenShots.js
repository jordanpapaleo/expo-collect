import React, {Component} from 'react'
import {StyleSheet, Text, ListView} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = state => ({
  screenshots: state.screenshots
})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestScreenShots extends Component {
  static propTypes = {}

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(this.props.screenshots)
    }
  }

  render () {
    const {dataSource} = this.state
    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{rowData.name}</Text>}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})
