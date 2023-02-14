import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text} from "react-native";
import { RootTabParamList } from "../navigator";

type Props = NativeStackScreenProps<RootTabParamList, 'Tabata'>;

export const TabataScreen = ({ route, navigation }: Props) => {
  return <Text>Tabata</Text>
}
