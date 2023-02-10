import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../App";
import { logout } from "../features/auth/auth.slice";
import { useAppSelector } from "../hooks";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth.user);

  function dispatchLogout() {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  if (user) {
    return (
      <View style={styles.container}>
        {user.picture && <Image style={styles.image} source={{ uri: user.picture }} />}
        <Text style={styles.text2}>{user.name}</Text>
        <TouchableOpacity
          onPress={() => dispatchLogout()}
          style={styles.button}
        >
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Text>Loading...</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});