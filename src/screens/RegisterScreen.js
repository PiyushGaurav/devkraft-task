import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {registerUser} from '../redux/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_CURRENT_USERS, LOCAL_USERS} from '../utils/constants';
import Title from '../components/Title';
import Genders from '../components/Genders';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import genericShadow from '../utils/genericShadow';

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

  const onRegister = async () => {
    const payload = [
      {
        name,
        email,
        phoneNumber,
        password,
        gender,
        address,
        photo,
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

  const pickImage = () => {
    launchImageLibrary({quality: 0.5}, (data) => {
      if (data.didCancel) {
        console.log('user canceled');
      } else if (data.errorCode) {
        console.log(data.errorMessage);
      } else {
        setPhoto(data.uri);
      }
    });
  };

  const captureImage = () => {
    launchCamera(
      {
        quality: 0.5,
        mediaType: 'photo',
      },
      (data) => {
        if (data.didCancel) {
          console.log('user canceled');
        } else if (data.errorCode) {
          console.log(data.errorMessage);
        } else {
          setPhoto(data.uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconView} onPress={pickImage}>
          <Image
            style={styles.imageLibrary}
            source={require('../Images/imageLibrary.png')}
          />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={photo ? {uri: photo} : require('../Images/avatar.png')}
          />
        </View>
        <TouchableOpacity style={styles.iconView} onPress={captureImage}>
          <Image
            style={styles.imageLibrary}
            source={require('../Images/camera.png')}
          />
        </TouchableOpacity>
      </View>
      <Button onPress={onRegister} title={'Register'} />
      <TouchableOpacity
        style={styles.pressableTextView}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.pressableText}>Already have an account</Text>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...genericShadow,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    ...genericShadow,
  },
  iconView: {
    ...genericShadow,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  imageLibrary: {
    width: 35,
    height: 35,
  },
});

export default RegisterScreen;
