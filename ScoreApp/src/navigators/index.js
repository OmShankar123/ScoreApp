import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SplashScreen ,
    LoginScreen,ScoreScreen

} from "../screens";



const Stack = createStackNavigator()
const Navigators=(props)=>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Score" component={ScoreScreen}/>    
            
                
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigators;
