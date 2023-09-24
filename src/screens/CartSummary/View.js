import React, { useState, useEffect } from "react";
import { Animated, Image, ScrollView, useColorScheme, View, FlatList } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import { Divider, Text } from "react-native-elements";
import { Styles } from "./Styles";
import Globals from "../../utils/Globals";
import { AddressItem } from "../../components/Application/AddressItem/View";
import { CardItem } from "../../components/Application/CardItem/View";
import AppButton from "../../components/Application/AppButton/View";
import { CommonActions, useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';
import Decimal from 'decimal.js';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { CartItem } from "../../components/Application/CartItem/View";
import { TouchableOpacity } from "react-native";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import { SvgIcon } from "../../components/Application/SvgIcon/View";

export const CartSummary = (props) => {

    const [cart, setCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [addressDetails, setAddressDetails] = useState({});
    const [creditCardDetails, setCreditCardDetails] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [promotionalDiscounts, setPromotionalDiscounts] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [total, setTotal] = useState(0);
    const [isGift, setIsGift] = useState(false);
    const [isDefaultAddress, setIsDefaultAddress] = useState(false);
    const [isDefaultCreditCard, setIsDefaultCreditCard] = useState(false);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDER_BY_ID_API + props.route.params.orderId).then((orderResp) => {
            setCart(orderResp.data.products_info)
            setIsGift(orderResp.data.is_gift)
            setPriceData(orderResp.data.products_info);
            setOrderDetails(orderResp.data);
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ADDRESS_ID_API + orderResp.data.address_id).then((addressResp) => {
                setAddressDetails(addressResp.data);
            }, (addressErrorResp) => {
                console.log(JSON.stringify(addressErrorResp));
            })
            if (!props.route.params.card_Number)
                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CREDIT_CARD_BY_ID_API + orderResp.data.creditCardId).then((cardResp) => {
                    setCreditCardDetails(cardResp.data);
                }, (errorresp) => {
                    console.log(JSON.stringify(errorresp));
                })
            else {
                setCreditCardDetails({
                    "card_Number": props.route.params.card_Number,
                    "user_Id": props.route.params.userId,
                    "company": props.route.params.company,
                    "card_holder_name": props.route.params.card_holder_name,
                    "cvv": props.route.params.cvv,
                    "expires_on": props.route.params.expires_on
                });
            }
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    const setPriceData = (data) => {
        let price = 0;
        for (let item in data) {
                for(let variant in data[item].varient_info){
                    price = new Decimal(price).plus(new Decimal(data[item].varient_info[variant].base_price).times(new Decimal(data[item].varient_info[variant].total_count)));
                }
        }
        setSubtotal(price);
    }

    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(scheme, globalStyles, colors);


    const renderCartItems = (item, index) => {
        const cartCountChange = (behavior, variantIndex) => {
            let quantity = behavior === "add" ? item.varient_info[variantIndex].total_count + 1 : item.varient_info[variantIndex].total_count - 1
            let modifiedCart = cart.map((cartItem, cartItemIndex) => {
                if(cartItemIndex == index){
                    let modifiedVarients = cartItem.varient_info.map((varientElem, varientElemIndex) => {
                        if(varientElemIndex == variantIndex){
                            if(quantity > 0)
                                return {...varientElem, total_count : quantity}
                        }
                        else return varientElem
                    });
                    let modifiedCartItem = {...cartItem, varient_info: modifiedVarients}
                    if(modifiedVarients.length)
                        return modifiedCartItem
                } else return cartItem
            })
            setCart(modifiedCart)
        };
        return (
            <>
                {item.varient_info?.map((varientObj, varientIndex) => {
                        return (
                            <View
                                key={varientIndex+"OrderItem"}
                                style={[
                                    screenStyles.cartItemContainer,
                                    { marginVertical: hp("0.5") },
                                    index !== cart.length - 1 && {
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColorLight,
                                    },
                                    index === 0 && screenStyles.cartTopBorder,
                                    index === cart.length - 1 && screenStyles.cartBottomBorder,
                                    index === cart.length - 1 && screenStyles.cartBottomMargin,
                                ]}>
                                <Image
                                    source={{ uri: item.product_info.product_image }}
                                    style={screenStyles.cartItemLeftImage}
                                />
                                <View>
                                    <Text style={{ ...screenStyles.cartItemNameText, width: wp("55%") }}>{item.product_info.product_name}</Text>
                                    <View style={{display: "flex", flexDirection: "row", gap: wp("4%")}}>
                                        {(props.route?.params?.action !== "repeatLastOrder") && <View>
                                            <Text style={screenStyles.cartItemWeightText}>{varientObj.quantity}</Text>
                                            <Text style={screenStyles.cartItemWeightText}>Count {varientObj.total_count}</Text>
                                        </View>}

                                        {(props.route?.params?.action == "repeatLastOrder") &&<>
                                            <Text style={{...screenStyles.cartItemWeightText, marginVertical: hp("1%")}}>{varientObj.quantity}</Text>
                                            <View style={{...screenStyles.cartUpdateContainer, width: wp("20%"), 
                                                            height: hp("2.5%"), marginTop: hp("0.6%")}}>
                                                <TouchableOpacity
                                                    style={[screenStyles.cartUpdateActionContainer, { borderRightWidth: 1 }]}
                                                    onPress={() => {
                                                        cartCountChange("subtract", varientIndex)
                                                    }}>
            
                                                    <SvgIcon type={IconNames.Minus} width={15} height={15}
                                                        color={colors.activeColor} />
            
                                                </TouchableOpacity>
            
                                                <Text style={screenStyles.cartNumberText}>{varientObj.total_count}</Text>
            
                                                <TouchableOpacity
                                                    style={[screenStyles.cartUpdateActionContainer, { borderLeftWidth: 1 }]}
                                                    onPress={() => {
                                                        cartCountChange("add", varientIndex)
                                                    }}>
            
                                                    <SvgIcon type={IconNames.Plus} width={15} height={15}
                                                        color={colors.activeColor} />
            
                                                </TouchableOpacity>
            
                                            </View></>
                                        }
                                        {(props.route?.params?.action == "repeatLastOrder") && <View style={{marginTop:hp(0.6)}}>
                                            <TouchableOpacity onPress={() =>{
                                                const filteredCart = [];
                                                cart.forEach(productItem => {
                                                    if(productItem.product_info.product_id == item.product_info.product_id){
                                                        const filteredVarientData = productItem.varient_info.filter(varientItem => varientItem.varient_id != varientObj.varient_id)
                                                        if(filteredVarientData.length){
                                                            filteredCart.push({...productItem, varient_info: filteredVarientData})
                                                        }
                                                    } else {
                                                        filteredCart.push(productItem)
                                                    }
                                                })
                                                setCart(filteredCart)
                                                setPriceData(filteredCart)
                                                let productMap = [];
                                                filteredCart.forEach(filteredCartItem => {
                                                    var tempProd = {}
                                                    tempProd[filteredCartItem.product_info.product_id] = {}
                                                    filteredCartItem.varient_info.forEach(varientItem => {
                                                        tempProd[filteredCartItem.product_info.product_id][varientItem.varient_id] = varientItem.total_count
                                                    })
                                                    productMap.push(tempProd)
                                                })
                                                setOrderDetails({...orderDetails, products_info: filteredCart, 
                                                    products_and_varients: JSON.stringify(productMap)})
                                            }}>
                                                <Text style={{
                                                borderColor: "black",
                                                borderWidth: 1,
                                                paddingHorizontal: hp(1),
                                                paddingVertical: wp(1),
                                                borderRadius: 5,
                                                position: "relative",
                                                elevation: 1,
                                                zIndex: 1,
                                                backgroundColor: "#FFF",
                                                marginVertical: wp(-1)
                                            }}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>}
                                    </View>
                                </View>
                                <Text style={screenStyles.cartItemPriceText} numberOfLines={1}>${varientObj.base_price}</Text>
                            </View>
                        ) 
                    })
                }
            </>);
    };

    const navigateToOrderSuccessScreen = (orderId) => {
        Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_ALL_FROM_CART_API + props.route.params.userId);
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ 
                name: Routes.ORDER_SUCCESS,
                params: {
                    orderId: orderId,
                    userId: props.route.params.userId,
                    },
                }]
            })
        );
    }

    const saveDefaultAddressAndCard = () => {
        if(isDefaultAddress)
            Axios.put(ApiUrls.SERVICE_URL + ApiUrls.UPDATE_DEFAULT_ADDRESS + addressDetails.address_id, {}, {
                headers: {userId: props.route.params.userId}})
        if (!props.route.params.card_Number && isDefaultCreditCard)
            Axios.put(ApiUrls.SERVICE_URL + ApiUrls.UPDATE_DEFAULT_CREDIT_CARD + orderDetails.creditCardId, {}, {
                headers: {userId: props.route.params.userId}})    
    }

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
                            showsVerticalScrollIndicator={false}
                            style={screenStyles.listContainer}
                        >
                            <FlashMessage floating={true} position="top" />
                            {(orderDetails.payment_method != undefined && orderDetails.payment_method != "Cash on Delivery" && orderDetails.payment_method != "Self Pickup" && orderDetails.payment_method != "Paypal" && orderDetails.payment_method != "Apple Pay")
                                && <View style={screenStyles.cardContainer}>
                                    <CardItem
                                        isActive={false}
                                        item={{ ...creditCardDetails, spinValue: new Animated.Value(0) }}
                                        onPress={() => {
                                        }} />
                                </View>}
                            {(orderDetails.payment_method != undefined && orderDetails.payment_method == "Paypal")
                                && <View style={screenStyles.cardContainer}>
                                    <CardItem
                                        isActive={false}
                                        item={Globals.paymentMethodItems.paypalItems.filter(elem => {
                                            if (elem.id == orderDetails.creditCardId)
                                                return elem;
                                        })[0]}
                                        onPress={() => {
                                        }} />
                                </View>}
                            {(orderDetails.payment_method != undefined && orderDetails.payment_method != "Self Pickup")
                                && <AddressItem
                                    isActive={false}
                                    item={{ ...addressDetails, spinValue: new Animated.Value(0) }}
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
                                renderItem={({ item, index }) => {
                                    return renderCartItems(item, index);
                                }}
                            />
                        
                            <View style={{
                                paddingBottom: hp("5%")
                            }}>
                                <View style={screenStyles.bottomTotalContainer}>
                                    <View style={{display: "flex", flexDirection: 'row'}}>
                                        <CheckBox
                                            checked={isGift}
                                            onPress={(value) => {
                                                setIsGift(!isGift)
                                            }}
                                            style={{alignSelf: 'center', marginTop: hp(1)}}
                                        />
                                        <Text style={{...screenStyles.normalLabelText, marginTop: hp(2)}}>Is this a gift?</Text>
                                    </View>
                                    <View style={{display: "flex", flexDirection: 'row'}}>
                                        <CheckBox
                                            checked={isDefaultAddress}
                                            onPress={(value) => {
                                                setIsDefaultAddress(!isDefaultAddress)
                                            }}
                                            style={{alignSelf: 'center', marginTop: hp(1)}}
                                        />
                                        <Text style={{...screenStyles.normalLabelText, marginTop: hp(2)}}>Save this address as default for future orders?</Text>
                                    </View>
                                    {(!props.route?.params?.card_Number && orderDetails.payment_method == "Credit Card") && <View style={{display: "flex", flexDirection: 'row'}}>
                                        <CheckBox
                                            checked={isDefaultCreditCard}
                                            onPress={(value) => {
                                                setIsDefaultCreditCard(!isDefaultCreditCard)
                                            }}
                                            style={{alignSelf: 'center', marginTop: hp(1)}}
                                        />
                                        <Text style={{...screenStyles.normalLabelText, marginTop: hp(2)}}>Save this card as default for future orders?</Text>
                                    </View>}
                                    {(props.route?.params?.action !== "repeatLastOrder") &&
                                    <View style={screenStyles.receiptItemContainer}>
                                        <Text style={screenStyles.boldLabelText}>Subtotal ({orderDetails.products_info ? orderDetails.products_info.reduce((total, item) => total + item.varient_info.reduce((varient_total, varient_item) => varient_total + varient_item.total_count, 0), 0) : 0}) Items:</Text>
                                        <Text style={screenStyles.boldLabelValueText}>${Number.parseFloat(orderDetails.price_without_delivery || 0).toFixed(2)}</Text>
                                    </View>}
                                    {(props.route?.params?.action == "repeatLastOrder") &&
                                    <View style={screenStyles.receiptItemContainer}>
                                        <Text style={screenStyles.boldLabelText}>Subtotal ({orderDetails.products_info ? orderDetails.products_info.reduce((total, item) => total + item.varient_info.reduce((varient_total, varient_item) => varient_total + varient_item.total_count, 0), 0) : 0}) Items:</Text>
                                        <Text style={screenStyles.boldLabelValueText}>${Number.parseFloat(subtotal || 0).toFixed(2)}</Text>
                                    </View>}
                                    <Divider style={screenStyles.receiptItemDivider} />
                                    <View style={screenStyles.receiptItemContainer}>
                                        <Text style={screenStyles.normalLabelText}>Promotional Discounts:</Text>
                                        <Text style={screenStyles.normalLabelValueText}>-${promotionalDiscounts}</Text>
                                    </View>
                                    <View style={screenStyles.receiptItemContainer}>
                                        <Text style={screenStyles.normalLabelText}>Delivery Charges:</Text>
                                        <Text style={screenStyles.normalLabelValueText}>${orderDetails.delivery_charge || 0}</Text>
                                    </View>
                                    <Divider style={screenStyles.receiptItemDivider} />
                                    <View style={[screenStyles.receiptItemContainer, { marginBottom: 0 }]}>
                                        <Text style={screenStyles.boldLabelText}>Total</Text>
                                        {(props.route?.params?.action !== "repeatLastOrder") &&
                                        <Text style={screenStyles.boldLabelValueText}>${new Decimal(orderDetails.price_without_delivery || 0).minus(promotionalDiscounts).plus(orderDetails.delivery_charge || 0).toFixed(2)}</Text>}
                                        {(props.route?.params?.action == "repeatLastOrder") &&
                                        <Text style={screenStyles.boldLabelValueText}>${new Decimal(subtotal || 0).minus(promotionalDiscounts).plus(orderDetails.delivery_charge || 0).toFixed(2)}</Text>}
                                    </View>
                                </View>

                                {isGift && (<View style={screenStyles.bottomButtonContainer}>
                                    <AppButton
                                        title={"Enter Gifting Details"}
                                        onPress={() => {
                                            saveDefaultAddressAndCard()
                                            if(props.route?.params?.action == "repeatLastOrder"){
                                                let productMap = [];
                                                cart.forEach(filteredCartItem => {
                                                    var tempProd = {}
                                                    tempProd[filteredCartItem.product_info.product_id] = {}
                                                    filteredCartItem.varient_info.forEach(varientItem => {
                                                        tempProd[filteredCartItem.product_info.product_id][varientItem.varient_id] = varientItem.total_count
                                                    })
                                                    productMap.push(tempProd)
                                                })
                                                Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_YOUR_ORDER_PLACED_API, {
                                                    ...orderDetails,
                                                    products_info: cart,
                                                    products_and_varients: JSON.stringify(productMap),
                                                    "order_id": 0,
                                                    "order_date": new Date(),
                                                    "isPlaced": true,
                                                    "status": Globals.orderStatus.PLACED
                                                }).then((succResp) => {
                                                    props.navigation.navigate(Routes.GIFT_DETAILS, {
                                                        orderId: succResp.data?.generatedMaps[0]?.order_id,
                                                        userId: props.route.params.userId
                                                    });
                                                }, (errorresp) => {
                                                    console.log(JSON.stringify(errorresp));
                                                })
                                            } else {
                                                props.navigation.navigate(Routes.GIFT_DETAILS, {
                                                    orderId: props.route.params.orderId,
                                                    userId: props.route.params.userId
                                                });
                                            }
                                        }}
                                    />
                                </View>)}
                                
                                {!isGift && (<View style={screenStyles.bottomButtonContainer}>
                                    <AppButton
                                        title={"Place Order"}
                                        onPress={() => {
                                            showMessage({
                                                message: "Your order has been placed successfully!! ",
                                                type: "danger",
                                            });
                                            saveDefaultAddressAndCard()
                                            //                                        props.navigation.navigate(Routes.STRIPE_CHECKOUT);
                                            setTimeout(() => {
                                                if(props.route?.params?.action == "repeatLastOrder"){
                                                    let productMap = [];
                                                    cart.forEach(filteredCartItem => {
                                                        var tempProd = {}
                                                        tempProd[filteredCartItem.product_info.product_id] = {}
                                                        filteredCartItem.varient_info.forEach(varientItem => {
                                                            tempProd[filteredCartItem.product_info.product_id][varientItem.varient_id] = varientItem.total_count
                                                        })
                                                        productMap.push(tempProd)
                                                    })
                                                    Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_YOUR_ORDER_PLACED_API, {
                                                        ...orderDetails,
                                                        products_info: cart,
                                                        products_and_varients: JSON.stringify(productMap),
                                                        "order_id": 0,
                                                        "order_date": new Date(),
                                                        "isPlaced": true,
                                                        "status": Globals.orderStatus.PLACED
                                                    }).then((succResp) => {
                                                        navigateToOrderSuccessScreen(succResp.data?.generatedMaps[0]?.order_id)
                                                    }, (errorresp) => {
                                                        console.log(JSON.stringify(errorresp));
                                                    })
                                                } else {
                                                    Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API + props.route.params.orderId, {
                                                        "isPlaced": true,
                                                        "status": Globals.orderStatus.PLACED
                                                    }).then((succResp) => {
                                                        navigateToOrderSuccessScreen(props.route.params.orderId)
                                                    })
                                                }
                                            }, 2000);
                                        }}
                                    />
                                </View>)}
                            </View>
                        </ScrollView>
                    </View>
                );
            }}
        />
    );
};
