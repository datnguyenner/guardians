import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
    },
    sensor: {
      marginTop: 45,
      paddingHorizontal: 10,
      backgroundColor: '#8FD5A6',
    },
    text:{
      textAlign: 'center'
    },
    title:{
      textAlign: 'center',
      fontSize: 20
    }
  });

export { styles }