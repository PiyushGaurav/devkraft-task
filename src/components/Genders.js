import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Genders = ({gender, onChangeGender}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        marginHorizontal: '10%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginRigh: 20,
        }}>
        Gender
      </Text>
      <TouchableOpacity
        onPress={() => {
          onChangeGender('Male');
        }}
        style={{
          width: 20,
          height: 20,
          marginLeft: 20,
          borderRadius: 10,
          backgroundColor: gender === 'Male' ? 'white' : 'black',
          borderWidth: 3,
          borderColor: 'green',
        }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          marginHorizontal: 10,
        }}>
        Male
      </Text>
      <TouchableOpacity
        onPress={() => {
          onChangeGender('Female');
        }}
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          marginHorizontal: 10,
          backgroundColor: gender === 'Female' ? 'white' : 'black',
          borderWidth: 3,
          borderColor: 'green',
        }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          marginHorizontal: 10,
        }}>
        Female
      </Text>
    </View>
  );
};

export default Genders;
