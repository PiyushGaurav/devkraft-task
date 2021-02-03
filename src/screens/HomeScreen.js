import React from 'react';
import {Button, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrentUser} from '../redux/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(updateCurrentUser(null));
    try {
      await AsyncStorage.removeItem('LOCAL_CURRENT_USER');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.gender}</Text>
      <Text>{user.phoneNumber}</Text>
      <Text>{user.password}</Text>
      <Text>{user.address}</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

export default HomeScreen;
