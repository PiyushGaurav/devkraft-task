import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {registerUser} from '../redux/user/userActions';
import genericShadow from '../utils/genericShadow';

const TextField = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '80%',
        height: 50,
        margin: 10,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        ...genericShadow,
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
