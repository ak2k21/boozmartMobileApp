import React, {useState, useContext, useEffect} from 'react';
import {Platform,LayoutAnimation} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Routes from './Routes';
import Context from '../utils/context'
import {SplashScreen} from '../screens/splash/View';
import {Variant1Intro} from '../screens/Variant1/Intro/View';
import {Variant2Intro} from '../screens/Variant2/intro/View';
import {Variant3Intro} from '../screens/Variant3/intro/View';

import {Variant1LoginScreen} from '../screens/Variant1/Login/View';
import {Variant1LoginFormScreen} from '../screens/Variant1/LoginForm/View';
import {Variant1SignupScreen} from '../screens/Variant1/Signup/View';
import {Variant1ForgotPassword} from '../screens/Variant1/ForgotPassword/View';

import {Variant2LoginScreen} from '../screens/Variant2/Login/View';
import {Variant2LoginFormScreen} from '../screens/Variant2/LoginForm/View';
import {Variant2SignupScreen} from '../screens/Variant2/Signup/View';
import {Variant2ForgotPassword} from '../screens/Variant2/ForgotPassword/View';

import {Variant3LoginScreen} from '../screens/Variant3/Login/View';
import {Variant3LoginFormScreen} from '../screens/Variant3/LoginForm/View';
import {Variant3SignupScreen} from '../screens/Variant3/Signup/View';
import {Variant3ForgotPassword} from '../screens/Variant3/ForgotPassword/View';

import {ProductDetail} from '../screens/ProductDetail/View';
import {ReviewList} from '../screens/ReviewList/View';
import {AddReview} from '../screens/AddReview/View';
import {CartList} from '../screens/CartList/View';
import {CheckoutDelivery} from '../screens/CheckoutDelivery/View';
import {CheckoutAddress} from '../screens/CheckoutAddress/View';
import {CheckoutPayment} from '../screens/CheckoutPayment/View';
import {OrderSuccess} from '../screens/OrderSuccess/View';
import {AboutMe} from '../screens/AboutMe/View';
import {MyOrders} from '../screens/MyOrders/View';
import {Variant1Profile} from '../screens/Variant1/Profile/View';
import {Variant2Profile} from '../screens/Variant2/Profile/View';
import {Variant3Profile} from '../screens/Variant3/Profile/View';
import {Variant1Home} from '../screens/Variant1/Home/View';
import {Variant2Home} from '../screens/Variant2/Home/View';
import {Variant3Home} from '../screens/Variant3/Home/View';
import {Favourites} from '../screens/Favourites/View';
import {Gift} from '../screens/Gift/View';
import {PopularDeals} from '../screens/PopularDeals/View';
import {CategoryList} from '../screens/CategoryList/View';
import {CategoryItems} from '../screens/CategoryItems/View';
import {Search} from '../screens/Search/View';
import {AddAddress} from '../screens/AddAddress/View';
import {UpdateAddress} from '../screens/UpdateAddress/View';
import {MyAddress} from '../screens/MyAddress/View';
import {LocationSelection} from '../screens/LocationSelection/View';
import {MyCreditCards} from '../screens/MyCreditCards/View';
import {AddCreditCard} from '../screens/AddCreditCard/View';
import {UpdateCreditCard} from '../screens/UpdateCreditCard/View';
import {Transactions} from '../screens/Transactions/View';
import {Notifications} from '../screens/Notifications/View';
import {ApplyFilters} from '../screens/ApplyFilters/View';
import {TrackOrder} from '../screens/TrackOrder/View';
import {CancelOrder} from '../screens/CancelOrder/View';
import {CheckoutSelectCard} from '../screens/CheckoutSelectCard/View';
import {CheckoutSelectAccount} from '../screens/CheckoutSelectAccount/View';
import {SelfPickup} from '../screens/SelfPickup/View';
import {CartSummary} from '../screens/CartSummary/View';
import Config from '../../branding/boozemart/configuration/Config';
import {Variant1BottomTabBar} from '../components/Application/Variant1BottomTabBar/View';
import {Variant2BottomTabBar} from '../components/Application/Variant2BottomTabBar/View';
import {Variant3BottomTabBar} from '../components/Application/Variant3BottomTabBar/View';
import {VerifyPhone} from '../screens/VerifyNumber/View';
import {VerifyPhoneOTP} from '../screens/VerifyNumberOTP/View';
import {HomeStack} from '../screens/Variant3/HomeStack/View';
import {ProfileStack} from '../screens/Variant3/ProfileStack/View';
import {FavouritesStack} from "../screens/FavouritesStack/View"
import {GiftStack} from '../screens/GiftStack/View'
//import {StripeCheckoutForm} from '../screens/StripeCheckout/View'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function RootStack() {
    return (
        <Stack.Navigator
//            initialRouteName={Config.SELECTED_VARIANT}
            initialRouteName={Routes.INTRO_SCREEN3}
            screenOptions={{
                ...(Platform.OS === 'android' && TransitionPresets.SlideFromRightIOS),
                headerShown: false,
            }}>
            <Stack.Screen name={Routes.SPLASH_SCREEN} component={SplashScreen}/>

            {/*Variant1*/}
            <Stack.Screen name={Routes.INTRO_SCREEN1} component={Variant1Intro}/>

            <Stack.Screen
                name={Routes.LOGIN_SCREEN1}
                component={Variant1LoginScreen}
            />
            <Stack.Screen
                name={Routes.LOGIN_FORM_SCREEN1}
                component={Variant1LoginFormScreen}
            />
            <Stack.Screen
                name={Routes.SIGNUP_FORM_SCREEN1}
                component={Variant1SignupScreen}
            />
            <Stack.Screen
                name={Routes.FORGOT_PASSWORD_FORM_SCREEN1}
                component={Variant1ForgotPassword}
            />

            <Stack.Screen
                name={Routes.VERIFY_NUMBER_SCREEN}
                component={VerifyPhone}
            />
            <Stack.Screen
                name={Routes.VERIFY_NUMBER_OTP_SCREEN}
                component={VerifyPhoneOTP}
            />

            {/*Variant2*/}
            <Stack.Screen name={Routes.INTRO_SCREEN2} component={Variant2Intro}/>

            <Stack.Screen
                name={Routes.LOGIN_SCREEN2}
                component={Variant2LoginScreen}
            />
            <Stack.Screen
                name={Routes.LOGIN_FORM_SCREEN2}
                component={Variant2LoginFormScreen}
            />
            <Stack.Screen
                name={Routes.SIGNUP_FORM_SCREEN2}
                component={Variant2SignupScreen}
            />
            <Stack.Screen
                name={Routes.FORGOT_PASSWORD_FORM_SCREEN2}
                component={Variant2ForgotPassword}
            />

            {/*Variant3*/}
            <Stack.Screen name={Routes.INTRO_SCREEN3} component={Variant3Intro}/>

            <Stack.Screen
                name={Routes.LOGIN_SCREEN3}
                component={Variant3LoginScreen}
            />
            <Stack.Screen
                name={Routes.LOGIN_FORM_SCREEN3}
                component={Variant3LoginFormScreen}
            />
            <Stack.Screen
                name={Routes.SIGNUP_FORM_SCREEN3}
                component={Variant3SignupScreen}
            />
            <Stack.Screen
                name={Routes.FORGOT_PASSWORD_FORM_SCREEN3}
                component={Variant3ForgotPassword}
            />

            <Stack.Screen
                name={Routes.HOME_VARIANT1}
                component={BottomTabsVariant1}
            />
            <Stack.Screen
                name={Routes.HOME_VARIANT2}
                component={BottomTabsVariant2}
            />
            <Stack.Screen
                name={Routes.HOME_VARIANT3}
                component={BottomTabsVariant3}
            />

            <Stack.Screen
                name={Routes.HOME_STACK}
                component={HomeStack}
            />

            <Stack.Screen name={Routes.CATEGORY_LIST} component={CategoryList}/>
            <Stack.Screen name={Routes.CATEGORY_ITEMS} component={CategoryItems}/>
            <Stack.Screen name={Routes.POPULAR_DEALS} component={PopularDeals}/>
            <Stack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetail}/>

            <Stack.Screen name={Routes.REVIEW_LIST} component={ReviewList}/>
            <Stack.Screen name={Routes.ADD_REVIEW} component={AddReview}/>

            <Stack.Screen
                name={Routes.CHECKOUT_DELIVERY}
                component={CheckoutDelivery}
            />
            <Stack.Screen
                name={Routes.CHECKOUT_ADDRESS}
                component={CheckoutAddress}
            />
            <Stack.Screen
                name={Routes.CHECKOUT_PAYMENT}
                component={CheckoutPayment}
            />
            <Stack.Screen
                name={Routes.CHECKOUT_SELECT_CARD}
                component={CheckoutSelectCard}
            />
            <Stack.Screen
                name={Routes.CHECKOUT_SELECT_ACCOUNT}
                component={CheckoutSelectAccount}
            />
            <Stack.Screen name={Routes.SELF_PICKUP} component={SelfPickup}/>
            <Stack.Screen name={Routes.CART_SUMMARY} component={CartSummary}/>
            <Stack.Screen name={Routes.TRACK_ORDERS} component={TrackOrder}/>
            <Stack.Screen name={Routes.CANCEL_ORDERS} component={CancelOrder}/>

            <Stack.Screen name={Routes.ORDER_SUCCESS} component={OrderSuccess}/>

            <Stack.Screen name={Routes.ABOUT_ME} component={AboutMe}/>
            <Stack.Screen name={Routes.MY_ORDERS} component={MyOrders}/>
            <Stack.Screen name={Routes.My_Address} component={MyAddress}/>
            <Stack.Screen name={Routes.Add_Address} component={AddAddress}/>
            <Stack.Screen name={Routes.Update_Address} component={UpdateAddress}/>
            <Stack.Screen name={Routes.Location_Selection} component={LocationSelection}/>
            <Stack.Screen name={Routes.My_CREDIT_CARDS} component={MyCreditCards}/>
            <Stack.Screen name={Routes.ADD_CREDIT_CARD} component={AddCreditCard}/>
            <Stack.Screen name={Routes.UPDATE_CREDIT_CARD} component={UpdateCreditCard}/>

            <Stack.Screen name={Routes.TRANSACTIONS} component={Transactions}/>
            <Stack.Screen name={Routes.NOTIFICATIONS} component={Notifications}/>
            <Stack.Screen name={Routes.SEARCH} component={Search}/>
            <Stack.Screen name={Routes.APPLY_FILTERS} component={ApplyFilters}/>
        </Stack.Navigator>
    );
}

function BottomTabsVariant1() {
    return (
        <Tab.Navigator tabBar={props => <Variant1BottomTabBar {...props} />}>
            <Tab.Screen name={Routes.HOME_VARIANT1} component={Variant1Home}/>
            <Tab.Screen name={Routes.FAVOURITE} component={Favourites}/>
            <Tab.Screen name={Routes.PROFILE1} component={Variant1Profile}/>
            <Tab.Screen name={Routes.CART} component={CartList}/>
        </Tab.Navigator>
    );
}

function BottomTabsVariant2() {
    return (
        <Tab.Navigator tabBar={props => <Variant2BottomTabBar {...props} />}>
            <Tab.Screen name={Routes.HOME_VARIANT2} component={Variant2Home}/>
            <Tab.Screen name={Routes.FAVOURITE} component={Favourites}/>
            <Tab.Screen name={Routes.CART} component={CartList}/>
            <Tab.Screen
                name={Routes.MY_ORDERS}
                component={props => <MyOrders hideBack={true}/>}
            />
            <Tab.Screen name={Routes.PROFILE2} component={Variant2Profile}/>
        </Tab.Navigator>
    );
}

function BottomTabsVariant3() {
    const contextData = useContext(Context)
    useEffect(() => {
        LayoutAnimation.configureNext({
              duration: 800,
              create: {type: 'easeInEaseOut', property: 'opacity'},
              update: {type: 'easeInEaseOut', property: 'opacity'},
              delete: {type: 'easeInEaseOut', property: 'opacity'}
            });
    }, [contextData])

    return (
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <Variant3BottomTabBar {...props} style={{display: contextData.stateData.common.isTabBarVisible?"flex":"none"}} />}>
            <Tab.Screen name={Routes.HOME_STACK} component={HomeStack} options={{unmountOnBlur: true}}/>
            <Tab.Screen name={Routes.FAVOURITES_STACK} component={FavouritesStack} options={{unmountOnBlur: true}}/>
            <Tab.Screen name={Routes.GIFT_STACK} component={GiftStack} options={{unmountOnBlur: true}}/>
            <Tab.Screen name={Routes.PROFILE_STACK} component={ProfileStack} options={{unmountOnBlur: true}}/>
            <Tab.Screen name={Routes.CART} component={CartList} options={{unmountOnBlur: true}}/>


        </Tab.Navigator>
    );
}
