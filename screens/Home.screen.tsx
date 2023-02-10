import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks";

export const HomeScreen = () => {
  const user = useAppSelector(state => state.auth.user);


  if (user) {
    return (
      <View style={styles.container}>
        {user.picture && <Image style={styles.image} source={{ uri: user.picture }} />}
        <Text style={styles.text2}>{user.name}</Text>
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
});