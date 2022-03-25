import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {postDeviceTimers, getDeviceTimers, getDeviceFunctions, toggleDevice, getAccessToken, getDeviceInfo} from './Api';
import {device_id} from './config';

let access_token;

class App extends Component {
  state = {
    isDeviceOnline: false,
    socketState: false
  }

  async componentDidMount() {
    let token = await getAccessToken()
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log("error", error));

    access_token = token.result.access_token;

    this.isDeviceOnline();
  }

  async isDeviceOnline() {
    const device = await getDeviceInfo(access_token, device_id)
      .then(response => response.json())
      .then(result =>{return result})
      .catch(error => console.log("error", error));

    this.setState({isDeviceOnline: device.result.online});
    this.setState({socketState: device.result.status.find(elem => elem.code == "switch").value});
  }

  toggleSocket() {
    /*
    this.setState(prevState => ({
      socketState: !prevState.socketState
    }));

    toggleDevice(access_token, this.state.socketState);
    */
    //postDeviceTimers(access_token, device_id);
    getDeviceTimers(access_token, device_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.imageContainer} onPress={()=> {this.toggleSocket()}}>
          <Image style={styles.image} source={require('./assets/socket.jpg')}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageContainer: {
    width: '80%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '80%',
    height: '50%',
    borderWidth: 3,
    borderRadius: 30,
    borderColor: 'black'
  }
});
