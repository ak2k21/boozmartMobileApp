import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Routes from '../../navigation/Routes';
import {PopularDeals} from '../PopularDeals/View';
import { CartList } from '../CartList/View';
import { CheckoutAddress } from '../CheckoutAddress/View';
import { CheckoutDelivery } from "../CheckoutDelivery/View";
import { CheckoutPayment } from "../CheckoutPayment/View";
import { CheckoutSelectCard } from "../CheckoutSelectCard/View";
import { CartSummary } from "../CartSummary/View";

const Stack = createStackNavigator();

export function CartStack() {
    
    return (
        <Stack.Navigator
//            initialRouteName={Config.SELECTED_VARIANT}
            initialRouteName={Routes.CART}
            screenOptions={{
                ...(Platform.OS === 'android' && TransitionPresets.SlideFromRightIOS),
                headerShown: false,
            }}>
            <Stack.Screen name={Routes.CART} component={CartList}/>
            <Stack.Screen name={Routes.POPULAR_DEALS} component={PopularDeals}/>
            <Stack.Screen name={Routes.CHECKOUT_ADDRESS} component={CheckoutAddress}/>
            <Stack.Screen name={Routes.CHECKOUT_DELIVERY} component={CheckoutDelivery}/>
            <Stack.Screen name={Routes.CHECKOUT_PAYMENT} component={CheckoutPayment}/>
            <Stack.Screen name={Routes.CHECKOUT_SELECT_CARD} component={CheckoutSelectCard}/>
            <Stack.Screen name={Routes.CART_SUMMARY} component={CartSummary}/>
         </Stack.Navigator> 
     )
 }