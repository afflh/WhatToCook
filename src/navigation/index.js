import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipeSearchScreen from '../screens/RecipeSearchScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LogInScreen from '../screens/LogInScreen';
import RecipeListScreen from '../screens/RecipeListScreen';

// import RecipeDetailSearchScreen from '../screens/RecipeDetailSearchScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeSearch" component={RecipeSearchScreen} /> 
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />
        <Stack.Screen name="RecipeDetail" options={{ presentation: 'fullScreenModal' }} component={RecipeDetailScreen} />
        {/* <Stack.Screen name="RecipeDetailSearch" options={{ presentation: 'fullScreenModal' }} component={RecipeDetailSearchScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
