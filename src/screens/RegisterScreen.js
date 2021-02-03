import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {registerUser} from '../redux/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_CURRENT_USERS, LOCAL_USERS} from '../utils/constants';
import Title from '../components/Title';
import Genders from '../components/Genders';

const RegisterScreen = ({navigation}) => {
  const userData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, onChangeAddress] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [dob, onChangedob] = useState('');

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    const payload = [
      {
        name,
        email,
        phoneNumber,
        password,
        gender,
        address,
      },
    ];
    dispatch(registerUser(payload));
    try {
      await AsyncStorage.setItem(
        'LOCAL_USERS',
        JSON.stringify([...userData, ...payload]),
      );
    } catch (e) {
      // saving error
    }
  };

  const readItem = () => {
    AsyncStorage.getItem('LOCAL_USERS').then((itemValue) => {
      console.log('LOCAL_USERS : ', JSON.parse(itemValue));
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Title name={'REGISTER'} />
      <TextField
        placeholder={'First Name'}
        onChangeText={(text) => {
          onChangeName(text);
        }}
        value={name}
      />
      <TextField
        placeholder={'Email'}
        onChangeText={(text) => {
          onChangeEmail(text);
        }}
        value={email}
      />
      <TextField
        placeholder={'Phone Number'}
        onChangeText={(text) => {
          onChangePhoneNumber(text);
        }}
        value={phoneNumber}
      />
      <Genders gender={gender} onChangeGender={(g) => setGender(g)} />
      <TextField
        placeholder={'Password'}
        onChangeText={(text) => {
          onChangePassword(text);
        }}
        value={password}
      />
      <TextField
        placeholder={'Confirm Password'}
        onChangeText={(text) => {
          onChangeConfirmPassword(text);
        }}
        value={confirmPassword}
      />
      <TextField
        placeholder={'Address'}
        onChangeText={(text) => {
          onChangeAddress(text);
        }}
        value={address}
      />
      <Button onPress={onRegister} title={'Register'} />
      <TouchableOpacity
        style={{
          marginVertical: 20,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text
          style={{
            color: 'green',
            fontSize: 15,
          }}>
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
