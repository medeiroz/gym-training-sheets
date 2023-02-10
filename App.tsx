import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBroser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';

//web: 310650945633-llfa1vqjnpv1u850nmortf03j4klu6kn.apps.googleusercontent.com
//android: 310650945633-llfa1vqjnpv1u850nmortf03j4klu6kn.apps.googleusercontent.com

WebBroser.maybeCompleteAuthSession();

export default function App() {

  const [accessToken, setAccessToken] = useState<string|null>(null);
  const [user, setUser] = useState<any>(null);
  const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
    clientId: '310650945633-llfa1vqjnpv1u850nmortf03j4klu6kn.apps.googleusercontent.com',
    androidClientId: '310650945633-llfa1vqjnpv1u850nmortf03j4klu6kn.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken || null);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    const userResponse = await fetch('https://www.googleapis/usrinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = await userResponse.json();
    setUser(userInfo);
  }

  const ShowUserInfo = () => {
    return (
      <View style={styles.userContainer}>
        <Text style={styles.text1}>Bem-Vindo</Text>
        <Image style={styles.image} source={{uri: user.picture}}/>
        <Text style={styles.text2}>{user.name}</Text>
      </View>
    );
  };

  const ShowLoginButton = () => {
    return (
      <>
        <Text style={styles.text1}>Bem-Vindo</Text>
        <Text style={styles.text2}></Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => promtAsync()}
          style={styles.button}
        >
          <Image source={require('./assets/images/g-logo.png')} style={styles.googleLogo} />
          <Text>ENTRE COM O GOOGLE</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null && <ShowLoginButton />}
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
  userContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
