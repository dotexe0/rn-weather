import React, { Component } from 'react'
import {TextInput} from 'react-native'

export default class SearchInput extends Component {
  render() {
    return <TextInput
      autoCorrect={false}
      placeholder={this.props.placeholder}
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      style={styles.textInput}
      clearButtonMode="always"
    />
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
