import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {updateCurrentUser} from '../redux/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_CURRENT_USER} from '../utils/constants';
import Title from '../components/Title';

const LoginScreen = ({navigation}) => {
  const userData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const login = async () => {
    const dataFound = userData.find((data) => data.email === email);
    if (dataFound) {
      if (dataFound.password !== password) {
        alert('Incorrect Passward');
      } else {
        dispatch(updateCurrentUser(dataFound));
        try {
          await AsyncStorage.setItem(
            'LOCAL_CURRENT_USER',
            JSON.stringify(dataFound),
          );
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert('Data not found');
    }
  };

  return (
    <View style={styles.container}>
      <Title name={'LOGIN'} />
      <TextField
        placeholder={'Email'}
        onChangeText={(text) => {
          onChangeEmail(text);
        }}
        value={email}
      />
      <TextField
        placeholder={'Password'}
        onChangeText={(text) => {
          onChangePassword(text);
        }}
        value={password}
      />
      <Button onPress={login} title={'Login'} />
      <TouchableOpacity
        style={styles.pressableTextView}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.pressableText}>Dont have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#16191A',
  },
  pressableTextView: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  pressableText: {
    color: 'green',
    fontSize: 15,
  },
});

export default LoginScreen;
