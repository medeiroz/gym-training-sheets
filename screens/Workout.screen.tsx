import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootTabParamList } from "../navigator";

type Props = NativeStackScreenProps<RootTabParamList, 'Workout'>;

export const WorkoutScreen = ({ route, navigation }: Props) => {
  return <Text>Workout</Text>
}
