import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, useColorScheme, View} from "react-native";

import BaseView from "../BaseView"
import {Text} from "react-native-elements";
import Routes from "../../navigation/Routes";
import {Styles} from "./Styles";
import ApiUrls from "../../utils/ApiUrls.js";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import Axios from 'axios';


export const CheckoutDelivery = (props) => {

const [deliveryCharges, setDeliveryCharges] = useState(0);

const [shippingmethods, setShippingmethods] = useState([]);

    useEffect(() => {
    console.log("search");
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_SHIPPING_API).then((succResp) =>{
            setShippingmethods(succResp.data);
            setDeliveryCharges(succResp.data[0].shipping_charge)
        },(errorresp) =>{
            console.log(JSON.stringify(errorresp));
        })
    }, [])



    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
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
                console.log("deliverycharges", price);
                setDeliveryCharges(price)

            }}>

                <View style={[screenStyles.deliveryContainer, selectedDeliveryIndex === index && {
                    borderWidth: 2,
                    borderColor: colors.activeColor
                }]}>

                    <View style={{width: "80%"}}>
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
                                 index+1
                             ))}
                        </View>

                        <View style={screenStyles.bottomContainer}>

                            <AppButton
                                title={'Next'}
                                onPress={() => {
                                Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API+props.route.params.orderid, {
                                          "delivery_charge": deliveryCharges
                                }).then((succResp) => {
                                if (deliveryCharges == 0 ) {
                                            props.navigation.navigate(Routes.CHECKOUT_PAYMENT, {
                                                 orderid: succResp.data.order_id,
                                                 userId: props.route.params.userId
                                             })
                                } else if (deliveryCharges != 0) {
                                    props.navigation.navigate(Routes.CHECKOUT_ADDRESS, {
                                         orderid: succResp.data.order_id,
                                         userId: props.route.params.userId
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
