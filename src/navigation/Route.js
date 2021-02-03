import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useDispatch, useSelector} from 'react-redux';
import {LOCAL_CURRENT_USER, LOCAL_USERS} from '../utils/constants';
import {registerUser, updateCurrentUser} from '../redux/user/userActions';
import Loader from '../components/Loader';

const Routes = () => {
  const currentUserData = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(readItem, []);

  function readItem() {
    AsyncStorage.getItem('LOCAL_CURRENT_USER').then((itemValue) => {
      console.log('LOCAL_CURRENT_USER : ', itemValue);
      if (itemValue) {
        dispatch(updateCurrentUser(JSON.parse(itemValue)));
      }
    });
    AsyncStorage.getItem('LOCAL_USERS')
      .then((itemValue) => {
        console.log('LOCAL_USERS : ', itemValue);
        if (itemValue) {
          dispatch(registerUser(JSON.parse(itemValue)));
        }
      })
      .then(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {currentUserData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
