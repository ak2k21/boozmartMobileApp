import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Routes from '../../../navigation/Routes';
import {Variant3Home} from '../Home/View';
import {CategoryItems} from '../../CategoryItems/View';
import {ProductDetail} from '../../ProductDetail/View';
import {PopularDeals} from '../../PopularDeals/View';
import { CommonActions } from "@react-navigation/native";

const Stack = createStackNavigator();

export function HomeStack(props) {

    return (
        <Stack.Navigator
//            initialRouteName={Config.SELECTED_VARIANT}
            initialRouteName={Routes.HOME_VARIANT3}
            screenOptions={{
                ...(Platform.OS === 'android' && TransitionPresets.SlideFromRightIOS),
                headerShown: false,
            }}>
            <Stack.Screen name={Routes.HOME_VARIANT3} component={Variant3Home}/>
            <Stack.Screen name={Routes.CATEGORY_ITEMS} component={CategoryItems}/>
            <Stack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetail}/>
            <Stack.Screen name={Routes.POPULAR_DEALS} component={PopularDeals}/>

         </Stack.Navigator>
     )
 }