import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/Login.screen';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import { WorkoutScreen } from '../screens/Workout.screen';
import 'react-native-gesture-handler';
import { useAppSelector } from '../hooks';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { EvolutionScreen } from '../screens/Evolution.screen';
import { SheetScreen } from '../screens/Sheet.screen';
import { SettingScreen } from '../screens/Setting.screen';
import { TabataScreen } from '../screens/Tabata.screen';

export type RootTabParamList = {
  Sheet: undefined;
  Tabata: undefined;
  Workout: undefined;
  Evolution: undefined;
  Setting: undefined;
};


export const Navigator = () => {
  const user = useAppSelector(state => state.auth.user);
  const Tab = createBottomTabNavigator<RootTabParamList>();
  
  const tabSheet = (
    <Tab.Screen
      name="Sheet"
      component={SheetScreen}
      options={{
        title: 'Ficha',
        tabBarIcon: ({ color, size }) => <AntDesign name="folderopen" size={size} color={color} />
      }}
      />
  );

  const tabTabata = (
    <Tab.Screen
      name="Tabata"
      component={TabataScreen}
      options={{
        title: 'Tabata',
        tabBarIcon: ({ color, size }) => <Feather name="clock" size={size} color={color} />
      }}
    />
  );

  const tabWorkout = (
    <Tab.Screen
      name="Workout"
      component={WorkoutScreen}
      options={{
        title: 'Treino',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="weight-lifter" size={size} color={color} />
      }}
    />
  );

  const tabEvolution = (
    <Tab.Screen
      name="Evolution"
      component={EvolutionScreen}
      options={{
        title: 'Evolução',
        tabBarIcon: ({ color, size }) => <Feather name="bar-chart" size={size} color={color} />
      }}
    />
  );

  const tabSetting = (
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        title: 'Configurações',
        tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />
      }}
    />
  );




  const navigator = (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Workout'>
        {tabSheet}
        {tabTabata}
        {tabWorkout}
        {tabEvolution}
        {tabSetting}
      </Tab.Navigator>
    </NavigationContainer>
  )

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {user ? navigator : <LoginScreen /> }
      </PersistGate>
    </Provider>
  );
}