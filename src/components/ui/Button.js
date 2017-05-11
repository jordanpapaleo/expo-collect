import React from 'react'
import {Text, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'

const Button = ({children, cb}) => {
  return (
    <TouchableHighlight onPress={cb.bind(this)}>
      <Text>{children}</Text>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  cb: PropTypes.func.isRequired
}

export default Button
