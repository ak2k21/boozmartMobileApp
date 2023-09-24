import React, { useState, useEffect } from 'react';
import { Animated, Image, useColorScheme, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Accordion from 'react-native-collapsible/Accordion';
import BaseView from "../BaseView"
import { Divider, Text } from "react-native-elements";
import { Styles } from "./Styles";
import Easing from "react-native/Libraries/Animated/Easing";
import Globals from "../../utils/Globals";
import { useTheme } from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import { SvgIcon } from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import Routes from "../../navigation/Routes";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

const assets = AppConfig.assets.default;

//Animation Constants
const activeAnimConfig = {
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
};

const deActiveAnimConfig = {
    toValue: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
};
export const MyOrders = (props) => {

    const [ordersLoading, setOrdersLoading] = useState(true);
    const [myorderlist, setMyorderlist] = useState([]);

    useEffect(() => {
        if (!props.route.params.title) {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDERS_ALL_API, {
                headers: {
                    userId: props.route.params.userid
                }
            }).then((succResp) => {
                setOrdersLoading(false);
                setMyorderlist(succResp.data);
            })
        }
        else {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDERS_BY_STATUS_AND_USERS_API + props.route.params.orderType, {
                headers: {
                    user_id: props.route.params.userid
                }
            }).then((succResp) => {
                setOrdersLoading(false);
                setMyorderlist(succResp.data);

            }, (errorresp) => {
                console.log(errorresp);
            })
        }
    }, [])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const screenStyles = Styles(scheme, colors);

    //Internal States
    const [activeSections, setActiveSections] = useState([]);

    const renderOrdersHeader = (section, index, isActive) => {

        return (
            <TouchableOpacity style={{ verticalPadding: hp("2") }}
                onPress={() => {
                    if (section.isCancelled)
                        props.navigation.navigate(Routes.TRACK_ORDERS, {
                            "orderId": section.order_id
                        })
                    else
                        props.navigation.navigate(Routes.CANCEL_ORDERS, {
                            "orderId": section.order_id,
                            userid: props.route.params.userid
                        })
                }}>
                <View style={screenStyles.ordersListFirstItem}>
                    <View style={[screenStyles.headerContainer, isActive && screenStyles.headerContainerActive]}>

                        <Image
                                source={{ uri: section.order_DETAILS[0]?.product_info?.product_image }}
                                style={screenStyles.cartItemLeftImage}
                            />

                        <View>
                            <Text
                                style={[
                                    {width: wp("60%")},
                                    screenStyles.headerTitleText,
                                    section.isOrderDelivered && { color: colors.subHeadingColor }
                                ]} numberOfLines={1}>{section.order_DETAILS.reduce((total, currVal) => total+currVal.product_info.product_name+"|","")}</Text>
                            <Text style={screenStyles.headerSubtitleText}>Placed on {new Date(section.order_date).toDateString()}</Text>
                            <View style={screenStyles.itemsHorizontalContainer}>
                                <Text style={screenStyles.headerSubtitleText}>{"Items: "}</Text>
                                <Text style={[
                                    {
                                        color: section.isOrderDelivered ? colors.subHeadingColor : colors.headingColor,
                                        marginRight: wp(2)
                                    },
                                    screenStyles.headerSubtitleValueText
                                ]}>{JSON.parse(section.products_and_varients).reduce((total, item) => { 
                                        return total + Object.values(Object.values(item)[0]).reduce((val, elem) => val+elem,0)
                                    }, 0)}</Text>
                                <Text style={screenStyles.headerSubtitleText}>{"Total: "}</Text>
                                <Text style={[
                                    {
                                        color: section.isOrderDelivered ? colors.subHeadingColor : colors.headingColor
                                    },
                                    screenStyles.headerSubtitleValueText
                                ]}>${parseFloat(section.price_without_delivery + section.delivery_charge).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        section.isOrderDelivered && !isActive &&
                        <View style={screenStyles.headerOrderDeliverContainer}>
                            <View style={screenStyles.headerOrderDeliverCircle} />

                            <Text style={screenStyles.headerSubtitleText}>{"Order Delivered"}</Text>

                            <Text style={screenStyles.headerOrderDeliverDateText}>{"Dec 10, 2020"}</Text>

                        </View>
                    }

                </View>
            </TouchableOpacity>
        );
    };

    const renderOrdersContent = section => {
        return (
            <View style={screenStyles.contentContainerStyle}>

                <View style={screenStyles.contentItemContainer}>
                    <View style={screenStyles.contentItemLeftContainer}>
                        <View
                            style={[
                                screenStyles.contentItemCircle,
                                {
                                    backgroundColor: section.isOrderPlaced ? colors.subHeadingSecondaryColor : colors.inputColor
                                }
                            ]} />

                        <Divider
                            style={[
                                screenStyles.contentItemLine,
                                {
                                    backgroundColor: section.isOrderConfirmed ? colors.subHeadingSecondaryColor : colors.borderColorLight
                                }
                            ]} />
                    </View>
                    <Text style={screenStyles.contentItemLeftText}>{"Orders Placed"}</Text>
                    <Text style={screenStyles.contentItemRightText}>{section.orderPlaced}</Text>
                </View>

                <View style={screenStyles.contentItemContainer}>
                    <View style={screenStyles.contentItemLeftContainer}>
                        <View
                            style={[
                                screenStyles.contentItemCircle,
                                {
                                    backgroundColor: section.isOrderConfirmed ? colors.subHeadingSecondaryColor : colors.inputColor
                                }
                            ]} />

                        <Divider
                            style={[
                                screenStyles.contentItemLine,
                                {
                                    backgroundColor: section.isOrderShipped ? colors.subHeadingSecondaryColor : colors.borderColorLight
                                }
                            ]} />
                    </View>
                    <Text style={screenStyles.contentItemLeftText}>{"Order Confirmed"}</Text>
                    <Text style={screenStyles.contentItemRightText}>{section.orderConfirmed}</Text>
                </View>

                <View style={screenStyles.contentItemContainer}>
                    <View style={screenStyles.contentItemLeftContainer}>
                        <View
                            style={[
                                screenStyles.contentItemCircle,
                                {
                                    backgroundColor: section.isOrderShipped ? colors.subHeadingSecondaryColor : colors.inputColor
                                }
                            ]} />

                        <Divider
                            style={[
                                screenStyles.contentItemLine,
                                {
                                    backgroundColor: section.isOrderOutOfDelivery ? colors.subHeadingSecondaryColor : colors.borderColorLight
                                }
                            ]} />
                    </View>
                    <Text style={screenStyles.contentItemLeftText}>{"Order Shipped"}</Text>
                    <Text style={screenStyles.contentItemRightText}>{section.orderShipped}</Text>
                </View>

                <View style={screenStyles.contentItemContainer}>
                    <View style={screenStyles.contentItemLeftContainer}>
                        <View
                            style={[
                                screenStyles.contentItemCircle,
                                {
                                    backgroundColor: section.isOrderOutOfDelivery ? colors.subHeadingSecondaryColor : colors.inputColor
                                }
                            ]} />


                        <Divider
                            style={[
                                screenStyles.contentItemLine,
                                {
                                    backgroundColor: section.isOrderDelivered ? colors.subHeadingSecondaryColor : colors.borderColorLight
                                }
                            ]} />
                    </View>
                    <Text
                        style={[screenStyles.contentItemLeftText, { color: section.isOrderOutOfDelivery ? colors.headingColor : colors.subHeadingColor }]}>{"Out of Delivery"}</Text>
                    <Text style={[screenStyles.contentItemRightText]}>{section.outOfDelivery}</Text>
                </View>

                <View style={screenStyles.contentItemContainer}>
                    <View style={screenStyles.contentItemLeftContainer}>
                        <View
                            style={[
                                screenStyles.contentItemCircle,
                                {
                                    backgroundColor: section.isOrderDelivered ? colors.subHeadingSecondaryColor : colors.inputColor
                                }
                            ]} />

                    </View>
                    <Text
                        style={[screenStyles.contentItemLeftText, { color: section.isOrderOutOfDelivery ? colors.headingColor : colors.subHeadingColor }]}>{"Order Delivered"}</Text>
                    <Text style={screenStyles.contentItemRightText}>{section.orderDelivered}</Text>
                </View>

            </View>
        );
    };


    const _updateSections = allActiveSections => {
        if (allActiveSections.length > 0) {

            if (!myorderlist[allActiveSections[0]].isOrderDelivered) {
                setActiveSections(allActiveSections)
            }

        } else {
            setActiveSections(allActiveSections)
        }

    };

    return (

        <BaseView
            title={(props.route.params.title ? props.route.params.title : "My") + " Orders"}
            navigation={props.navigation}
            showAppHeader={true}
            headerWithBack={!props.hideBack}
            applyBottomSafeArea
            childView={() => {
                return (
                    <>
                        {ordersLoading &&
                            <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>}
                        {!ordersLoading && !myorderlist.length && (
                            <View>
                                <Text style={{
                                    marginTop: hp(40),
                                    textAlign: "center",
                                    fontSize: 20,
                                }}>No Orders to display</Text>
                            </View>
                        )}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={myorderlist}
                            renderItem={({ item, index }) => {
                                return renderOrdersHeader(item)
                            }}
                        />


                    </>


                );
            }}

        />

    );

}
