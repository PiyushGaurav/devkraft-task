import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrentUser} from '../redux/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Title from '../components/Title';
import moment from 'moment';

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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          user?.photo ? {uri: user.photo} : require('../Images/avatar.png')
        }
      />
      <Title name={user.name} />
      <>
        <Text
          style={{
            fontSize: 20,
            paddingBottom: 30,
            color: 'white',
          }}>
          {user.email}
        </Text>
        <Text style={styles.details}>Gender : {user.gender}</Text>
        <Text style={styles.details}>
          DOB: {moment(user.dob).format('DD/MM/YYYY')}
        </Text>
        <Text style={styles.details}>Phone Number : {user.phoneNumber}</Text>
        <Text style={styles.details}>Address : {user.address}</Text>
      </>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#16191A',
    paddingVertical: '25%',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  details: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;
