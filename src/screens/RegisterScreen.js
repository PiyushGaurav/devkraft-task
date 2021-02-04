import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {registerUser} from '../redux/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_USERS} from '../utils/constants';
import Title from '../components/Title';
import Genders from '../components/Genders';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import genericShadow from '../utils/genericShadow';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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
  const [show, setShow] = useState(false);
  const [dob, onChangedob] = useState(new Date(1598051730000));

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
        dob,
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(false);
    onChangedob(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
        style={{
          paddingVertical: 10,
          marginHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 25,
          width: '80%',
          height: 50,
          margin: 10,
          alignSelf: 'center',
          ...genericShadow,
        }}>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 20,
          }}>
          Date of birth
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 20,
          }}>
          {moment(dob).format('DD/MM/YYYY')}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Button onPress={onRegister} title={'Register'} />
      <TouchableOpacity
        style={styles.pressableTextView}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.pressableText}>Already have an account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
