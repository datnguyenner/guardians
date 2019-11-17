import React from 'react';
import { Text, TouchableOpacity, View, Alert, AppState } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { styles } from './styles';

const token = 'c4e156b0-eaed-0137-ac9b-16781295b070';

export default class AccelerometerSensor extends React.Component {

  state = {
    accelerometerData: {},
    appState: AppState.currentState,
    isCrash: false,
    alertSent: false
  };

  componentDidMount() {
    this._toggle();
    this._slow();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps, prevState) {

    const crashBound = 3;
    let { x, y, z } = this.state.accelerometerData;
    let isCrash = this.state.isCrash;
    if ((round(x) > crashBound || round(y) > crashBound || round(z) > crashBound) && isCrash===false) {
      this.setState({ isCrash: true });
    }

  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _sendAlert = () => {
    fetch('https://guardians-app.herokuapp.com/notify_contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    }).then(response => console.log(response));
    console.log('Alert Sent');
  };

  _toggleAlert = () => {
    this.setState({ isCrash: false, alertSent: false });
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _renderAlert = () => {
    if (this.state.isCrash) {
      
      if(this.state.alertSent===false){
        this._sendAlert();
        this.setState({alertSent: true});
      }
      
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.myButton} onPress={this._toggleAlert}>
            <Text style={styles.buttonText}>Are you safe?</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.sensor}>
        <Text style={styles.title}>Guardians</Text>
        <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <Text style={styles.em}>Emergency Contacts: </Text>
        {this._renderAlert()}
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.abs(Math.floor(n * 100) / 100);
}