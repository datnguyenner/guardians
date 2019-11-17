import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  sensor: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#8FD5A6',
  },
  text: {
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: 'bold',
  },
  em: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 45,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: 'bold',
  },
  myButton: {
    padding: 5,
    height: 200,
    width: 200,
    borderRadius: 400,
    backgroundColor: '#E5C2C0',
  }
});

export { styles }