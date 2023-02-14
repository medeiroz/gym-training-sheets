import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text } from 'react-native'
import { RootTabParamList } from '../navigator'

type Props = NativeStackScreenProps<RootTabParamList, 'Evolution'>

export const EvolutionScreen = ({ route, navigation }: Props) => {
  return <Text>Evolution</Text>
}
