import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Routes from '../../../navigation/Routes';
import {Variant3Profile} from '../Profile/View';
import {MyOrders} from '../../MyOrders/View';
import {AboutMe} from '../../AboutMe/View';
import {MyAddress} from '../../MyAddress/View';
import {MyCreditCards} from '../../MyCreditCards/View';
import {Transactions} from '../../Transactions/View';
import {Notifications} from '../../Notifications/View';
import { CommonActions } from "@react-navigation/native";

const Stack = createStackNavigator();

export function ProfileStack(props) {

    return (
        <Stack.Navigator
//            initialRouteName={Config.SELECTED_VARIANT}
            initialRouteName={Routes.PROFILE3}
            screenOptions={{
                ...(Platform.OS === 'android' && TransitionPresets.SlideFromRightIOS),
                headerShown: false,
            }}>
            <Stack.Screen name={Routes.PROFILE3} component={Variant3Profile}/>
            <Stack.Screen name={Routes.MY_ORDERS} component={MyOrders}/>
            <Stack.Screen name={Routes.ABOUT_ME} component={AboutMe}/>
            <Stack.Screen name={Routes.My_Address} component={MyAddress}/>
            <Stack.Screen name={Routes.My_CREDIT_CARDS} component={MyCreditCards}/>
            <Stack.Screen name={Routes.TRANSACTIONS} component={Transactions}/>
            <Stack.Screen name={Routes.NOTIFICATIONS} component={Notifications}/>

         </Stack.Navigator>
     )
 }