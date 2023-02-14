import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, View } from 'react-native'
import { WorkoutList } from '../components/WorkoutList'
import { RootTabParamList } from '../navigator'

type Props = NativeStackScreenProps<RootTabParamList, 'Sheet'>

export const SheetScreen = ({ route, navigation }: Props) => {
  return (
    <View>
      <WorkoutList />
    </View>
  )
}
