import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { userService } from '../services/user.service';
import { useDispatch } from 'react-redux';
import { IUser } from '../contracts/auth/IUser';
import { useAppSelector } from '../hooks';
import { setToken, setUser } from '../features/auth/auth.slice';
import Constants from 'expo-constants';

maybeCompleteAuthSession();

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth.user);

  const [request, response, promtAsync] = useAuthRequest({
    androidClientId: Constants.expoConfig?.extra?.gcpOauthAndroidId,
    expoClientId: Constants.expoConfig?.extra?.gcpOauthExpoId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const accessToken = response.authentication?.accessToken;
      if (accessToken) {
        dispatch(setToken(accessToken))
        fetchUserInfo(accessToken)
      }
    }
  }, [response]);

  async function fetchUserInfo(accessToken: string) {
    userService.getGoogleUser(accessToken)
    .then((user: IUser) => {
      dispatch(setUser(user));
    });
  }

  useEffect(() => {
    if (user) {
    }
  }, []);

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
