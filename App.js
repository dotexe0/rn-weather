import React, { Component } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { fetchLocationId, fetchWeather } from './utils/api'
import getImageForWeather from './utils/getImageForWeather'

import SearchInput from './components/SearchInput'

export default class App extends Component {
  state = {
    location: '',
    loading: false,
    error: false,
    temperature: 0,
    weather: ''
  }

  componentDidMount() {
    this.handleUpdateLocation()
  }

  handleUpdateLocation = city => {
    if (!city) return

    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          const locationId = await fetchLocationId(city)
          const { location, weather, temperature } = await fetchWeather(locationId)
          this.setState({
            loading: false,
            error: false,
            location,
            weather,
            temperature
          })
        } catch (e) {
          this.setState({
            error: true,
            loading: false
          })
        }
      }
    )
  }
  
  renderContent() {
    const { error } = this.state
    return (
      <View>
        {error && <Text>Error</Text>}
        {!error && this.renderInfo()}
      </View>
    )
  }
  
  renderInfo() {
    const { info } = this.state
    return <Text>{info}</Text>
  }

  render() {
    const { location, loading, error, weather, temperature } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer} imageStyle={styles.image}>
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" sizing="large" />
            />
            {!loading && this.renderContent()}
   
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}
                {!error && (
                  <View >
                    <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                  </View>
                )}
                <SearchInput placeholder="Search any city" onSubmit={this.handleUpdateLocation} />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular'
      },
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
})
