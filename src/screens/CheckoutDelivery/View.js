import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, useColorScheme, View, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import BaseView from "../BaseView"
import { Text } from "react-native-elements";
import Routes from "../../navigation/Routes";
import { Styles } from "./Styles";
import ApiUrls from "../../utils/ApiUrls.js";
import AppButton from "../../components/Application/AppButton/View";
import { useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import Axios from 'axios';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const CheckoutDelivery = (props) => {

    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() + 2);
    const maximumDate = new Date();
    maximumDate.setDate(maximumDate.getDate() + 30);

    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [shippingmethods, setShippingmethods] = useState([]);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
    const [date, setDate] = useState(minimumDate)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_SHIPPING_API).then((succResp) => {
            setShippingmethods(succResp.data);
            setDeliveryCharges(succResp.data[0].shipping_charge)
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }, [])



    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);

    const screenStyles = Styles(scheme, globalStyles, colors);

    //Internal states
    const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(1);


    const renderDeliveryContainer = (title, description, price, index) => {

        return (

            <TouchableWithoutFeedback onPress={() => {

                setSelectedDeliveryIndex(selectedDeliveryIndex => {
                    //                    if (selectedDeliveryIndex === index)
                    //                        return 0
                    //                    else
                    return index;
                })
                setSelectedShippingMethod(title)
                setDeliveryCharges(price)

            }}>

                <View style={[screenStyles.deliveryContainer, selectedDeliveryIndex === index && {
                    borderWidth: 2,
                    borderColor: colors.activeColor
                }]}>

                    <View style={{ width: "80%" }}>
                        <Text style={screenStyles.deliveryHeader}>{title}</Text>
                        <Text style={screenStyles.deliveryDescription}>{description}</Text>

                    </View>

                    <Text style={screenStyles.deliveryPrice}>${price}</Text>

                </View>

            </TouchableWithoutFeedback>


        );

    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Shipping Method"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>

                        <View style={screenStyles.upperContainer}>
                            {shippingmethods.map((item, index) => renderDeliveryContainer(
                                item.shipping_method,
                                item.description,
                                item.shipping_charge,
                                index + 1
                            ))}

                            {selectedShippingMethod.includes("Future") && <View>
                                <TouchableOpacity onPress={() => setOpen(true)} >
                                    <Text style={{...screenStyles.deliveryDescription,
                                        marginTop: heightPercentageToDP("2.5%"),
                                    }}>Delivery Date</Text>
                                    <Text style={{
                                        ...screenStyles.deliveryHeader,
                                        marginTop: heightPercentageToDP("1%"),
                                        height: heightPercentageToDP("6%"),
                                        width: widthPercentageToDP("90%"),
                                        borderRadius: heightPercentageToDP("1%"),
                                        backgroundColor: "#fff",
                                        padding: widthPercentageToDP("3%")
                                    }}>{date ? date.toDateString(): "Select a date"}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode={"date"}
                                    minimumDate={minimumDate}
                                    maximumDate={maximumDate}
                                    onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    }}
                                    onCancel={() => {
                                    setOpen(false)
                                    }}
                                />
                            </View>}
                        </View>

                        <View style={screenStyles.bottomContainer}>

                            <AppButton
                                title={'Next'}
                                onPress={() => {
                                    let orderData = {
                                        "delivery_charge": deliveryCharges
                                    }
                                    if(selectedShippingMethod.includes("Future")){
                                        orderData.delivery_date = date
                                    }
                                    Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API + props.route.params.orderid, orderData).then((succResp) => {
                                        if (deliveryCharges == 0) {
                                            props.navigation.navigate(Routes.CHECKOUT_PAYMENT, {
                                                orderid: props.route.params.orderid,
                                                userId: props.route.params.userId
                                            })
                                        } else if (deliveryCharges != 0) {
                                            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BY_ADDRESS_ALL_API, {
                                                headers: {
                                                    userId: props.route.params.userId
                                                }
                                            }).then((succResp) => {
                                                if (succResp.data.length) {
                                                    props.navigation.navigate(Routes.CHECKOUT_ADDRESS, {
                                                        orderid: props.route.params.orderid,
                                                        userId: props.route.params.userId
                                                    })
                                                } else {
                                                    props.navigation.push(Routes.Add_Address, {
                                                        userId: props.route.params.userId,
                                                        orderId: props.route.params.orderid
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }}
                            />
                        </View>
                    </View>

                );
            }}
        />
    );

}
