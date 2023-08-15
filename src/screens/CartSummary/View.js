import React, {useState, useEffect} from "react";
import {Animated, Image, ScrollView, useColorScheme, View, FlatList} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import {AddressItem} from "../../components/Application/AddressItem/View";
import {CardItem} from "../../components/Application/CardItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';

import FlashMessage from "react-native-flash-message";

import { showMessage, hideMessage } from "react-native-flash-message";
 


export const CartSummary = (props) => {

const [cart, setCart] = useState([]);
const [orderDetails, setOrderDetails] = useState({});
const [addressDetails, setAddressDetails] = useState({});
const [creditCardDetails, setCreditCardDetails] = useState({});
const [subtotal, setSubtotal] = useState(0);
const [promotionalDiscounts, setPromotionalDiscounts] = useState(0);
const [deliveryCharges, setDeliveryCharges] = useState(0);
const [total, setTotal] = useState(0);


    useEffect(() => {
//        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API).then((succResp) =>{
//        console.log(succResp.data[0].product_image);
//            setCart(succResp.data);
//            let price = 0;
//            for(let item in succResp.data){
//            price += Number.parseInt(succResp.data[item].price);
////            console.log(item.price);
//
//            }
//            setSubtotal(price);
//        },(errorresp) =>{
//            console.log("From error")
//            console.log(JSON.stringify(errorresp));
//        })

        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDER_BY_ID_API+props.route.params.orderId).then((orderResp) =>{
            setCart(orderResp.data.products)
            setOrderDetails(orderResp.data);
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ADDRESS_ID_API+orderResp.data.address_id).then((addressResp) =>{
                setAddressDetails(addressResp.data);
            },(addressErrorResp) =>{
                console.log(JSON.stringify(addressErrorResp));
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CREDIT_CARD_BY_ID_API+orderResp.data.creditCardId).then((cardResp) =>{
                console.log("card: ",orderDetails.creditCardId, cardResp.data)
                setCreditCardDetails(cardResp.data);
            },(errorresp) =>{
                console.log(JSON.stringify(errorresp));
            })
        },(errorresp) =>{
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(scheme, globalStyles, colors);


    const renderCartItems = (item, index) => {
        return (
<> 
            <View
                key={index}
                style={[
                    screenStyles.cartItemContainer,
                    {marginVertical: hp("0.5")},
                    index !== cart.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderColorLight,
                    },
                    index === 0 && screenStyles.cartTopBorder,
                    index === cart.length - 1 && screenStyles.cartBottomBorder,
                    index === cart.length - 1 && screenStyles.cartBottomMargin,
                ]}>
                <Image
                    source={{uri: item.product_image}}
                    style={screenStyles.cartItemLeftImage}
                />

                <View>

                    <Text style={{...screenStyles.cartItemNameText, width: wp("55%")}}>{item.product_name}</Text>
                    <Text style={screenStyles.cartItemWeightText}>{item.weight}</Text>
                    <Text style={screenStyles.cartItemWeightText}>Count {item.cartCount}</Text>
                </View>

                <Text style={screenStyles.cartItemPriceText}>${item.price}</Text>

            </View>
        </>);
    };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Cart Summary"}
            childContainerStyle={screenStyles.baseViewChildContainerStyle}
            headerWithBack
            childView={() => {

                return (
                    <View style={screenStyles.container}>

                        <ScrollView
                            style={screenStyles.listContainer}
                        >
                            <FlashMessage position="top" />
                            {(orderDetails.payment_method != undefined && orderDetails.payment_method != "Cash on Delivery" && orderDetails.payment_method != "Self Pickup" && orderDetails.payment_method != "Paypal")
                                && <View style={screenStyles.cardContainer}>
                                <CardItem
                                    isActive={false}
                                    item={{...creditCardDetails, spinValue : new Animated.Value(0)}}
                                    onPress={() => {
                                    }}/>
                            </View>}

                            {(orderDetails.payment_method != undefined && orderDetails.payment_method == "Paypal")
                                && <View style={screenStyles.cardContainer}>
                                <CardItem
                                    isActive={false}
                                    item={Globals.paymentMethodItems.paypalItems.filter(elem => {
                                        if(elem.id == orderDetails.creditCardId)
                                            return elem;
                                    })[0]}
                                    onPress={() => {
                                    }}/>
                            </View>}

                            {(orderDetails.payment_method != undefined && orderDetails.payment_method != "Self Pickup")
                                && <AddressItem
                                isActive={false}
                                item={{...addressDetails, spinValue : new Animated.Value(0)}}
                                onPress={() => {
                                }}
                            />}

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={cart}
                                numColumns={1}
                                keyExtractor={(item, index) => {
                                    return index;
                                }}
                                renderItem={({item, index}) =>{
                                    return renderCartItems(item, index);
                                }}
                            />

                        </ScrollView>

                        <View style={screenStyles.bottomContainer}>

                            <View style={screenStyles.bottomTotalContainer}>
                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.boldLabelText}>Subtotal ({orderDetails.products_and_varients?JSON.parse(orderDetails.products_and_varients).reduce((total,item) => total+item.count,0):0}) Items:</Text>
                                    <Text style={screenStyles.boldLabelValueText}>${orderDetails.price_without_delivery || 0}</Text>
                                </View>

                                <Divider style={screenStyles.receiptItemDivider}/>

                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.normalLabelText}>Promotional Discounts:</Text>
                                    <Text style={screenStyles.normalLabelValueText}>-${promotionalDiscounts}</Text>
                                </View>

                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.normalLabelText}>Delivery Charges:</Text>
                                    <Text style={screenStyles.normalLabelValueText}>${orderDetails.delivery_charge || 0}</Text>
                                </View>

                                <Divider style={screenStyles.receiptItemDivider}/>

                                <View style={[screenStyles.receiptItemContainer, {marginBottom: 0}]}>
                                    <Text style={screenStyles.boldLabelText}>Total</Text>
                                    <Text style={screenStyles.boldLabelValueText}>${(orderDetails.price_without_delivery || 0)-promotionalDiscounts+(orderDetails.delivery_charge || 0)}</Text>
                                </View>

                            </View>

                            <View style={screenStyles.bottomButtonContainer}>
                                <AppButton
                                    title={"Place Order"}
                                    onPress={() => {
                                        showMessage({
                                            message: "Your order has been placed successfully!! ",
                                            type: "info",
                                          });
//                                        props.navigation.navigate(Routes.STRIPE_CHECKOUT);

                                            setTimeout(()=>{

                                                Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API+props.route.params.orderId, {
                                                    "isPlaced": true,
                                                    "status": "placed"
                                          }).then((succResp) => {
                                              Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_ALL_FROM_CART_API + props.route.params.userId);
                                              props.navigation.navigate(Routes.ORDER_SUCCESS, {
                                                  orderId: props.route.params.orderId,
                                                  userId: props.route.params.userId
                                              });
                                          })


                                            },2000);
                                       
                                    }}
                                />
                            </View>

                        </View>


                    </View>
                );

            }}

        />



    );

};

