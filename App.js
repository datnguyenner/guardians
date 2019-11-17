import React from 'react';
import { Text, TouchableOpacity, View, Alert, AppState } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { styles } from './styles';

const token = 'c4e156b0-eaed-0137-ac9b-16781295b070';

export default class AccelerometerSensor extends React.Component {

  state = {
    accelerometerData: {},
    appState: AppState.currentState,
    isCrash: false
  };

  componentDidMount() {
    this._toggle();
    this._slow();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps, prevState) {
    
      const crashBound = 1.7;
      let { x, y, z } = this.state.accelerometerData;
      if(round(x) > crashBound || round(y) > crashBound || round(z) > crashBound) {
        this.setState({isCrash: true});
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
    /*fetch('https://guardians-app.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'dat.nguyen.win@gmail.com',
      }),
    });*/
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(500);
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

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.sensor}>
        <Text style={styles.title}>Guardians</Text>
        <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._sendAlert} style={styles.button}>
            <Text>Send Alert</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}