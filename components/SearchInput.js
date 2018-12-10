import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

export default class SearchInput extends Component {
  state = {
    text: ''
  }
  handleChangeText = text => {
    this.setState({ text })
  }

  handleSubmitEditing = () => {
    const { onSubmit } = this.props
    const { text } = this.state

    if (!text) return

    onSubmit(text)
    this.setState({ text: '' })
  }

  render() {
    const { placeholder } = this.props
    const { text } = this.state

    return (
      <TextInput
        autoCorrect={false}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}
      />
    )
  }
}

const styles = {
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: ''
}
