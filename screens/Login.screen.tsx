import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBroser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import { useDispatch } from 'react-redux';
import { IUser } from '../contracts/auth/IUser';
import { useAppSelector } from '../hooks';
import { setToken, setUser } from '../features/auth/auth.slice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

WebBroser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ route, navigation }: Props) => {

  const dispatch = useDispatch();
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  const [request, response, promtAsync] = Google.useAuthRequest({
    clientId: '310650945633-llfa1vqjnpv1u850nmortf03j4klu6kn.apps.googleusercontent.com',
    androidClientId: '310650945633-searr1sktu0j8tgt8urpu8n2fnj4v2je.apps.googleusercontent.com',
    expoClientId: '310650945633-nd60frgcmroacfsfcpqnqtn21omqc1s1.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(setToken(response.authentication?.accessToken || null))
      token && fetchUserInfo();
    }
  }, [response, token]);

  async function fetchUserInfo() {
    if (token) {
      userService.getGoogleUser(token)
      .then((user: IUser) => {
        dispatch(setUser(user));
      });
    }
  }

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!request}
        onPress={() => promtAsync()}
        style={styles.button}
      >
        <Image source={require('../assets/images/g-logo.png')} style={styles.googleLogo} />
        <Text>ENTRE COM O GOOGLE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: 260,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#CFCFCF',
    borderWidth: 1,
  },
  googleLogo: {
    marginRight: 24,
    height: 24,
    width: 24,
  },
});
