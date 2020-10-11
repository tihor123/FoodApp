import React, {u} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';

import SelectFood from './src/screens/SelectFood';
import PlaceOrder from './src/screens/PlaceOrder';
import store from './src/Redux/store'

const Stack = createStackNavigator();

const App = () =>{
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={SelectFood} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;