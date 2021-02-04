import React, {Component} from 'react';
import {Text, View} from 'react-native';

const Title = ({name}) => {
  return (
    <Text
      style={{
        fontSize: 40,
        paddingBottom: 10,
        fontWeight: '800',
        alignSelf: 'center',
        color: 'green',
      }}>
      {name}
    </Text>
  );
};

export default Title;
