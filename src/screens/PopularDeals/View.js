import React, {useState, useEffect} from 'react';
import {FlatList, View, ActivityIndicator, TouchableOpacity, useColorScheme} from "react-native";
import {FoodItem} from "../../components/Application/FoodItem/View";
import BaseView from "../BaseView";
import ApiUrls from "../../utils/ApiUrls";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Axios from 'axios';
import Routes from '../../navigation/Routes';
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import {Styles} from "./Style";
import { SvgIcon } from '../../components/Application/SvgIcon/View';
import { Text } from 'react-native-elements';
import IconNames from '../../../branding/Boozemart2/assets/IconNames';
import AppButton from '../../components/Application/AppButton/View';

export const PopularDeals = (props) => {

    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        let productsURL = ApiUrls.GET_BY_PRODUCTS_API;
        if(props.route.params && props.route.params.title == 'Past Orders'){
            productsURL = ApiUrls.GET_USER_ORDER_PRODUCTS + props.route.params.userId;
            Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_ORDERS_ALL_API, {
                headers: {
                userId: props.route.params.userId
            }}).then((succResp) =>{
                setOrders(succResp.data)
            })
        }
        if(props.route?.params?.action == "showSavedForLaterItems")
            productsURL = ApiUrls.GET_SAVED_PRODUCTS + props.route.params.userId;
        Axios.get(ApiUrls.SERVICE_URL + productsURL, {
             headers: {
                  user_id: props.route.params.userId
              }
        }).then((succResp) =>{
            if(props.route?.params?.action == "showSavedForLaterItems")
                setProducts(succResp.data.map(item => {return {...item.product, cartCount: 0}}))
            else
                setProducts(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    const renderOrdersHeader = (section, index, isActive) => {
        return (
            <TouchableOpacity style={{ verticalPadding: hp("2") }}
                onPress={() => {
                    props.navigation.navigate(Routes.CART_SUMMARY, {
                        userId: props.route.params.userId,
                        orderId: section.order_id
                    });
                }}>
                <View style={screenStyles.ordersListFirstItem}>
                    <View style={[screenStyles.headerContainer, isActive && screenStyles.headerContainerActive]}>
                        <View
                            style={[screenStyles.headerLeftIconContainer,
                            section.isOrderDelivered && { backgroundColor: colors.subHeadingTertiaryColor }]}>
                            <SvgIcon type={IconNames.BoxOpen} width={30} height={30}
                                color={section.isOrderDelivered ? colors.subHeadingColor : colors.subHeadingSecondaryColor} />
                        </View>

                        <View>
                            <Text
                                style={[
                                    screenStyles.headerTitleText,
                                    section.isOrderDelivered && { color: colors.subHeadingColor }
                                ]}>Order # {section.order_id}</Text>
                            <Text style={screenStyles.headerSubtitleText}>Placed on {new Date(section.order_date).toDateString()}</Text>
                            <View style={screenStyles.itemsHorizontalContainer}>
                                <Text style={screenStyles.headerSubtitleText}>{"Items: "}</Text>
                                <Text style={[
                                    {
                                        color: section.isOrderDelivered ? colors.subHeadingColor : colors.headingColor,
                                        marginRight: wp(2)
                                    },
                                    screenStyles.headerSubtitleValueText
                                ]}>{JSON.parse(section.products_and_varients).reduce((total, item) => { return Number.parseFloat(item.count) + total }, 0)}</Text>
                                <Text style={screenStyles.headerSubtitleText}>{"Total: "}</Text>
                                <Text style={[
                                    {
                                        color: section.isOrderDelivered ? colors.subHeadingColor : colors.headingColor
                                    },
                                    screenStyles.headerSubtitleValueText
                                ]}>${section.price_without_delivery + section.delivery_charge}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        section.isOrderDelivered && !isActive &&
                        <View style={screenStyles.headerOrderDeliverContainer}>
                            <View style={screenStyles.headerOrderDeliverCircle} />
                            <Text style={screenStyles.headerSubtitleText}>{"Order Delivered"}</Text>
                            <Text style={screenStyles.headerOrderDeliverDateText}>{new Date(section.order_delivered_timestamp).toDateString()}</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <BaseView
            navigation={props.navigation}
            title={(props.route.params && props.route.params.title)? props.route.params.title : "Popular Deals"}
            headerWithBack={props.route?.params?.action != "showSavedForLaterItems"}
            applyBottomSafeArea
            childView={() => {
                return (
                    <>
                    {!products.length &&
                        <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={({ item, index }) => {
                            return renderOrdersHeader(item)
                        }}
                    />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        numColumns={2}
                        renderItem={({item, index}) => {

                            if (index === 0 || index === 1) {
                                return <View style={screenStyles.foodFirstItem}>

                                    <FoodItem
                                    item={item}
                                        id={item.product_id}
                                        title={item.product_name}
                                        image={item.Image_Thumb_Nail}
                                        bigImage={item.product_image}
                                        price={item.price}
                                        weight={item.weight}
                                        discount={item.discount}
                                        cartCount={item.cartCount}
                                        isFavourite={item.isFavourite}
                                        detail={item.detail}
                                        review_count={item.review_count}
                                        ratingValue={item.ratingValue}
                                        userid={props.route.params.userId}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
        //                                    if (favourite) {
        //                                        _favouriteSheet.open()
        //                                    }
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else if (index === products.length - 1) {
                                return <View style={screenStyles.foodLastItem}>

                                    <FoodItem
                                    item={item}
                                        id={item.product_id}
                                        title={item.product_name}
                                        image={item.Image_Thumb_Nail}
                                        bigImage={item.product_image}
                                        price={item.price}
                                        weight={item.weight}
                                        discount={item.discount}
                                        cartCount={item.cartCount}
                                        isFavourite={item.isFavourite}
                                        detail={item.detail}
                                        review_count={item.review_count}
                                        ratingValue={item.ratingValue}
                                        userid={props.route.params.userId}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
        //                                    if (favourite) {
        //                                        _favouriteSheet.open()
        //                                    }
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else {
                                return <FoodItem
                                item={item}
                                    id={item.product_id}
                                    title={item.product_name}
                                    image={item.Image_Thumb_Nail}
                                    bigImage={item.product_image}
                                    price={item.price}
                                    weight={item.weight}
                                    discount={item.discount}
                                    cartCount={item.cartCount}
                                    isFavourite={item.isFavourite}
                                    detail={item.detail}
                                    review_count={item.review_count}
                                    ratingValue={item.ratingValue}
                                    userid={props.route.params.userId}
                                    cartCountChange={(count) => {
                                    }}
                                    favouriteChange={(favourite) => {
    //                                    if (favourite) {
    //                                        _favouriteSheet.open()
    //                                    }
                                    }}
                                    navigation={props.navigation}
                                />
                            }


                        }}
                    />

                    {(props.route?.params?.action == "showSavedForLaterItems") &&
                        <AppButton
                            style={{
                                marginHorizontal: wp("3%"),
                                marginVertical: hp("2%")
                            }}
                            title={'Back To Cart'}
                            onPress={() => {
                                props.navigation.push(Routes.CART)
                            }}
                    />}
                    </>
                );
            }}
        />


    );
}
