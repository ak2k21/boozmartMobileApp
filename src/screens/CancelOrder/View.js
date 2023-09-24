import React, {useEffect, useState} from 'react';
import {useColorScheme, View, Image, ScrollView, Modal, TouchableOpacity} from "react-native";
import {Divider, Text} from 'react-native-elements';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseView from "../BaseView";
import {Styles} from "./Styles";
import AppButton from "../../components/Application/AppButton/View";
import Routes from "../../navigation/Routes";
import {StackActions, useTheme} from "@react-navigation/native";
import Config from "../../../branding/Boozemart2/configuration/Config";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import Axios from 'axios';
import ApiUrls from '../../utils/ApiUrls';
import Globals from '../../utils/Globals';

export const CancelOrder = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);
    const [order, setOrder] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

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
                    ]}>
                        {order.products_and_varients && JSON.parse(order.products_and_varients).reduce((total, item) => { 
                                        return total + Object.values(Object.values(item)[0]).reduce((val, elem) => val+elem,0)
                                    }, 0)}
                        </Text>
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

        </View>
    }

    const renderCartItems = (item, index) => {
            return (
                <>
                {item.varient_info?.map((varientObj, varientIndex) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(
                                    Routes.PRODUCT_DETAIL, {
                                    item: { ...item.product_info, 
                                        cartCount: 0,
                                        VARIENTS: item.varient_info.map(varientItem => {
                                            return {...varientItem, total_count:0} 
                                        })
                                    },
                                    userid: props.route.params.userid
                                })
                            }}>
                                <View
                                    key={varientIndex+"OrderItem"}
                                    style={{
                                        ...screenStyles.cartItemContainer,
                                        marginVertical: hp("0.5") 
                                    }}>
                                
                                    <Image
                                        source={{ uri: item.product_info.product_image }}
                                        style={screenStyles.cartItemLeftImage}
                                    />
                                    <View>
                                        <Text style={{ ...screenStyles.cartItemNameText, width: wp("55%") }}>{item.product_info.product_name}</Text>
                                        <View style={{display: "flex", flexDirection: "row", gap: wp("4%")}}>
                                            <View>
                                                <Text style={screenStyles.cartItemWeightText}>{varientObj.quantity}</Text>
                                                <Text style={screenStyles.cartItemWeightText}>Count {varientObj.total_count}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={screenStyles.cartItemPriceText} numberOfLines={1}>${varientObj.base_price}</Text>
                                </View>
                            </TouchableOpacity>
                        ) 
                    })
                }
            </>
            );
        };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Order Details"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{}}>

                            <View style={screenStyles.upperContainer}>
                                {renderOrderHeader()}

                                {
                                    order.products_info && order.products_info.map((item, index) => {
                                        return renderCartItems(item, index);
                                    })
                                }

                                {renderOrderContent()}

                                <View style={{marginVertical: hp("2%"),marginLeft: wp("3%"), display: "flex", flexDirection: "row", gap: wp("2%")}}>
                                    <AppButton
                                        style={{
                                            marginHorizontal: 10
                                        }}
                                        buttonStyle={{
                                            backgroundColor: "white",
                                            shadowColor: "#ccc"
                                        }}
                                        titleStyle={{
                                            color: "red"
                                        }}
                                        buttonWidth={ wp("35%")}
                                        title={'Cancel Order'}
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                        }}
                                    />

                                    <AppButton
                                        style={{
                                            marginHorizontal: 10
                                        }}
                                        buttonWidth={ wp("35%")}
                                        title={'Track Order'}
                                        onPress={() => {
                                            props.navigation.navigate(Routes.ORDER_TRACK, {
                                                orderId: props.route.params.orderId,
                                                userId: props.route.params.userId
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={screenStyles.bottomContainer}>
                            <View style={screenStyles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                        setSaveCardRespReceived(true);
                                    }}>
                                        <View style={screenStyles.centeredView}>
                                            <View style={screenStyles.modalView}>
                                                <Text style={screenStyles.modalText}>Do you want to cancel the order #{order.order_id}?</Text>
                                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%")}}>
                                                    <AppButton
                                                        style={{
                                                            marginHorizontal: 10
                                                        }}
                                                        buttonStyle={{
                                                            backgroundColor: "white",
                                                            shadowColor: "#ccc"
                                                        }}
                                                        titleStyle={{
                                                            color: "red"
                                                        }}
                                                        buttonWidth={ wp("35%")}
                                                        title={"Go Back"}
                                                        onPress={() => {
                                                            setModalVisible(!modalVisible)
                                                        }}
                                                    ></AppButton>
                                                    <AppButton
                                                        style={{
                                                            marginHorizontal: 10
                                                        }}
                                                        buttonWidth={ wp("35%")}
                                                        title={"Cancel Order"}
                                                        onPress={() => {
                                                            setModalVisible(!modalVisible)
                                                            Axios.put(ApiUrls.SERVICE_URL+ApiUrls.PUT_ORDER_BY_ID_API+order.order_id,{
                                                                "status": Globals.orderStatus.CANCELLED,
                                                                "isCancelled": true,
                                                                "order_cancelled_timestamp": new Date()
                                                            })
                                                            props.navigation.navigate(Routes.ORDER_CANCELLED, {
                                                                orderId: props.route.params.orderId,
                                                                userId: props.route.params.userId
                                                            });
                                                        }}
                                                    ></AppButton>
                                                </View>
                                            </View>
                                        </View>
                                </Modal>
                            </View>
                        </View>
                    </View>

                );

            }}

        />

    );

}
