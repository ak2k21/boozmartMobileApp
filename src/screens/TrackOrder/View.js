import React, {useEffect, useState} from 'react';
import {useColorScheme, View} from "react-native";
import {Divider, Text} from 'react-native-elements';

import BaseView from "../BaseView";
import {Styles} from "./Styles";
import AppButton from "../../components/Application/AppButton/View";
import Routes from "../../navigation/Routes";
import {StackActions, useTheme} from "@react-navigation/native";
import Config from "../../../branding/boozemart/configuration/Config";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import Axios from 'axios';
import ApiUrls from '../../utils/ApiUrls';

export const TrackOrder = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);
    const [order, setOrder] = useState({});

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDER_BY_ID_API+props.route.params.orderId).then((orderResp) => {
            setOrder(orderResp.data);
        });
    }, [])

    const renderOrderHeader = () => {
        return <View style={screenStyles.headerContainer}>

            <View style={screenStyles.headerLeftIconContainer}>

                <SvgIcon type={IconNames.Box} width={20} height={20} color={colors.activeColor}/>

            </View>

            <View>
                <Text style={screenStyles.headerTitleText}>Order # {order.order_id}</Text>
                <Text style={screenStyles.subtitleText}>Placed on {new Date(order.order_date).toDateString()}</Text>

                <View style={screenStyles.itemsHorizontalContainer}>
                    <Text style={screenStyles.subtitleText}>{"Items: "}</Text>
                    <Text style={[
                        screenStyles.subtitleValueText
                    ]}>{order.products_and_varients?JSON.parse(order.products_and_varients).reduce((total,item) => total+item.count,0):0}</Text>
                    <Text style={screenStyles.subtitleText}>{"Total: "}</Text>
                    <Text style={screenStyles.subtitleValueText}>$ {(order.price_without_delivery || 0) + (order.delivery_charge || 0)}</Text>
                </View>
            </View>

        </View>
    }

    const renderOrderContent = () => {
        return <View style={screenStyles.contentContainer}>

            <View style={screenStyles.orderStatusItemContainer}>
                <View style={screenStyles.orderStatusLeftContainer}>
                    <View
                        style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: colors.tertiaryBackground}]}>
                        <SvgIcon type={IconNames.BoxOpen} width={20} height={20} color={colors.activeColor}/>

                    </View>

                    <Divider style={[screenStyles.orderStatusLine, {backgroundColor: order.isconfirmed?colors.activeColor:colors.switchBorder}]}/>

                </View>
                <View style={screenStyles.orderTitleContainer}>
                    <Text style={screenStyles.orderStatusTitle}>{"Orders Placed"}</Text>
                    <Text style={screenStyles.orderStatusSubtitle}>{new Date(order.order_date).toDateString()}</Text>

                    <View style={screenStyles.centerSeparatorLine}/>

                </View>

            </View>

            {order.isCancelled &&(
                <View style={screenStyles.orderStatusItemContainer}>
                    <View style={screenStyles.orderStatusLeftContainer}>
                        <View
                            style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: order.isconfirmed?colors.tertiaryBackground:colors.inputSecondaryBackground}]}>
                            <SvgIcon type={IconNames.ClipboardCheck} width={20} height={20} color={order.isconfirmed?colors.activeColor:colors.switchBorder}/>
                        </View>
                    </View>
                    <View style={screenStyles.orderTitleContainer}>
                        <Text style={screenStyles.orderStatusTitle}>{"Order Cancelled"}</Text>
                        <Text style={screenStyles.orderStatusSubtitle}>{order.order_cancelled_timestamp?new Date(order.order_cancelled_timestamp).toDateString():""}</Text>
                    </View>
                </View>
            )}

            {!order.isCancelled && (
            <>
            <View style={screenStyles.orderStatusItemContainer}>
                <View style={screenStyles.orderStatusLeftContainer}>
                    <View
                        style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: order.isconfirmed?colors.tertiaryBackground:colors.inputSecondaryBackground}]}>
                        <SvgIcon type={IconNames.ClipboardCheck} width={20} height={20} color={order.isconfirmed?colors.activeColor:colors.switchBorder}/>

                    </View>

                    <Divider style={[screenStyles.orderStatusLine, {backgroundColor: order.isShipped?colors.activeColor:colors.switchBorder}]}/>
                </View>
                <View style={screenStyles.orderTitleContainer}>
                    <Text style={screenStyles.orderStatusTitle}>{"Order Confirmed"}</Text>
                    <Text style={screenStyles.orderStatusSubtitle}>{order.order_confirm_timestamp?new Date(order.order_confirm_timestamp).toDateString():""}</Text>

                    <View style={screenStyles.centerSeparatorLine}/>

                </View>
            </View>

            <View style={screenStyles.orderStatusItemContainer}>
                <View style={screenStyles.orderStatusLeftContainer}>
                    <View
                        style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: order.isShipped?colors.tertiaryBackground:colors.inputSecondaryBackground}]}>
                        <SvgIcon type={IconNames.MapMarkedAlt} width={20} height={20} color={order.isShipped?colors.activeColor:colors.switchBorder}/>
                    </View>

                    <Divider style={[screenStyles.orderStatusLine, {backgroundColor: order.isOutForDelivery?colors.activeColor:colors.switchBorder}]}/>
                </View>
                <View style={screenStyles.orderTitleContainer}>
                    <Text style={screenStyles.orderStatusTitle}>{"Order Shipped"}</Text>
                    <Text style={screenStyles.orderStatusSubtitle}>{order.order_shipped_timestamp?new Date(order.order_shipped_timestamp).toDateString():""}</Text>

                    <View style={screenStyles.centerSeparatorLine}/>

                </View>

            </View>

            <View style={screenStyles.orderStatusItemContainer}>
                <View style={screenStyles.orderStatusLeftContainer}>
                    <View
                        style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: order.isOutForDelivery?colors.tertiaryBackground:colors.inputSecondaryBackground}]}>
                        <SvgIcon type={IconNames.ShippingFast} width={20} height={20} color={order.isOutForDelivery?colors.activeColor:colors.switchBorder}/>

                    </View>
                    <Divider style={[screenStyles.orderStatusLine, {backgroundColor: order.isDelivered?colors.activeColor:colors.switchBorder}]}/>
                </View>
                <View style={screenStyles.orderTitleContainer}>
                    <Text style={screenStyles.orderStatusTitle}>{"Out for Delivery"}</Text>
                    <Text style={screenStyles.orderStatusSubtitle}>{order.order_outForDelivery_timestamp?new Date(order.order_outForDelivery_timestamp).toDateString():""}</Text>

                    <View style={screenStyles.centerSeparatorLine}/>
                </View>

            </View>

            <View style={screenStyles.orderStatusItemContainer}>
                <View style={screenStyles.orderStatusLeftContainer}>
                    <View
                        style={[screenStyles.orderStatusLeftIconContainer, {backgroundColor: order.isDelivered?colors.tertiaryBackground:colors.inputSecondaryBackground}]}>
                        <SvgIcon type={IconNames.Dolly} width={20} height={20} color={order.isDelivered?colors.activeColor:colors.switchBorder}/>
                    </View>
                </View>
                <View style={screenStyles.orderTitleContainer}>
                    <Text style={screenStyles.orderStatusTitle}>{"Order Delivered"}</Text>
                    <Text style={screenStyles.orderStatusSubtitle}>{order.order_delivered_timestamp?new Date(order.order_delivered_timestamp).toDateString():""}</Text>
                </View>

            </View>
            </>)}

        </View>
    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Track Order"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (

                    <View style={screenStyles.container}>

                        <View style={screenStyles.upperContainer}>
                            {renderOrderHeader()}

                            {renderOrderContent()}
                        </View>

                        <View style={screenStyles.bottomContainer}>

                            <AppButton
                                title={'Go Back'}
                                onPress={() => {
                                    props.navigation.dispatch(
                                        StackActions.replace(Config.SELECTED_VARIANT === Routes.INTRO_SCREEN1 ?
                                            Routes.HOME_VARIANT1 : Config.SELECTED_VARIANT === Routes.INTRO_SCREEN2 ?
                                                Routes.HOME_VARIANT2 :
                                                Routes.HOME_VARIANT3)
                                    );
                                }}
                            />

                        </View>
                    </View>
                );

            }}

        />

    );

}
