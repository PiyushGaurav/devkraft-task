import React from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

export default function DialogView({show, errorText, onDismiss}) {
  return (
    <Modal
      onDismiss={onDismiss}
      animationType="fade"
      transparent={true}
      visible={show}>
      <View style={styles.containerStyle}>
        <View style={styles.innerContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
          <Button title={'Okay'} onPress={onDismiss} />
        </View>
      </View>
    </Modal>
  );
}

DialogView.propTypes = {
  show: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  innerContainer: {
    width: '80%',
    height: 150,
    marginHorizontal: '5%',
    marginVertical: '80%',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
  },
});
