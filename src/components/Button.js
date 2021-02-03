import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {registerUser} from '../redux/user/userActions';

const TextField = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '80%',
        height: 50,
        margin: 10,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextField;
