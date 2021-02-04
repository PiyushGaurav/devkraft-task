import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import genericShadow from '../utils/genericShadow';

const TextField = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  textContentType,
}) => {
  return (
    <TextInput
      style={{
        height: 50,
        marginVertical: 10,
        paddingLeft: 15,
        fontSize: 15,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 25,
        borderColor: 'gray',
        backgroundColor: 'white',
        ...genericShadow,
      }}
      placeholder={placeholder}
      placeholderTextColor={'grey'}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      textContentType={textContentType}
      keyboardType={keyboardType}
      value={value}
    />
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  textContentType: PropTypes.string,
};

TextField.defaultProps = {
  keyboardType: 'default',
  textContentType: 'none',
};

export default TextField;
