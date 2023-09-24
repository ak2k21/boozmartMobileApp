import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, useColorScheme, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import { CartItem } from "../../components/Application/CartItem/View";
import { Divider, Text } from "react-native-elements";
import { Styles } from "./Styles";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls.js";

import AppButton from "../../components/Application/AppButton/View";
import { SvgIcon } from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import { ReorderItem } from "../../components/Application/ReorderItem/View";
import { CommonActions, useTheme } from "@react-navigation/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import Config from "../../../branding/Boozemart2/configuration/Config";
import Axios from 'axios';
import Decimal from 'decimal.js';
import { useSelector } from 'react-redux';
import FlashMessage, { showMessage } from "react-native-flash-message";
import store from '../../store/index';
import { commonActions } from '../../store/commonStore'
const dispatch = store.dispatch
let commonStore = store.getState().commonStore
store.subscribe(function () {
    commonStore = store.getState().commonStore
})

export const CartList = (props) => {

    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartLoading, setCartLoading] = useState(true);
    const [savedForLaterItems, setSavedForLaterItems] = useState([]);
    const setPriceData = (data) => {
        let price = 0;
        for (let item in data) {
            price = new Decimal(price).plus(new Decimal(data[item].varient_details.base_price).times(new Decimal(data[item].c1.qty)));
        }
        setSubtotal(price);
    }

    const userId = useSelector(state => {
        return state.commonStore.userInfo.userId
    })
    const cartData = useSelector(state => {
        return state.commonStore.cart
    })
    // const userPhone = useSelector(state => {
    //     return state.commonStore.userInfo.phone
    // })

    const populateSavedForLaterItems = () => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_SAVED_PRODUCTS + userId)
        .then((savedProductData) => {
            setSavedForLaterItems(savedProductData.data);
        })
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API, {
            headers: {
                userId: userId
            }
        }).then((CartData) => {
            setCart(CartData.data);
            setPriceData(CartData.data)
        })
    }

    useEffect(() => {
        if (userId != -1) {
            if (cartData.length > 0) {
                cartData.map(async item => {
                    await Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_INSERT_INTO_CART_API, {
                        "cart_id": 0,
                        "product_id": item.product_id,
                        "varient_id": item.varient_id,
                        "user_id": userId,
                        "is_gift": false,
                        "qty": item.count
                    })
                })
                dispatch(commonActions.emptyCart())
            }
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API, {
                headers: {
                    userId: userId
                }
            }).then((CartData) => {
                setCart(CartData.data);
                setCartLoading(false);
                setPriceData(CartData.data)
            }, err => {
                console.log("cart err", err)
            })
            populateSavedForLaterItems();
        } else {
            setCart(cartData);
            setCartLoading(false);
        }
    }, [userId])

    useEffect(() => {
        if (userId != -1) {
            setPriceData(cart);
            let quantity = 0;
            for (let item in cart) {
                quantity += cart[item].c1.qty;
            }
            dispatch(commonActions.setCartCount(quantity));
        } else {
            let quantity = 0;
            for (let item in cart) {
                quantity += cart[item].count;
            }
            dispatch(commonActions.setCartCount(quantity));
        }
    }, [cart])

    const orderplaced = () => {
        let productMap = [];
        cart.forEach(item => {
            if(JSON.stringify(productMap).includes(item.c1.product_id)){
                productMap = productMap.map(prod => {
                    if(Object.keys(prod).includes(""+item.c1.product_id)){
                        prod[item.c1.product_id][item.c1.varient_id] = item.c1.qty
                    }
                    return prod
                })
            } else {
                var tempProd = {}
                tempProd[item.c1.product_id] = {}
                tempProd[item.c1.product_id][item.c1.varient_id] = item.c1.qty
                productMap.push(tempProd)
            }
        })
        const productList = JSON.stringify(productMap);
        const totalPriceWithoutDelivery = cart.reduce((total, item) => { return (new Decimal(item.varient_details.base_price).times(item.c1.qty)).plus(total) }, 0);
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDERS_BY_STATUS_AND_USERS_API + Globals.orderStatus.PENDING, {
            headers: {
                user_id: userId
            }
        }).then((succResp) => {
            if (succResp.data.length)
                updatePendingOrder(succResp.data[0].order_id, productList, totalPriceWithoutDelivery)
            else
                placeNewOrder(productList, totalPriceWithoutDelivery)
        }, (errorresp) => {
            console.log(errorresp);
        })
    }

    const placeNewOrder = (productList, totalPriceWithoutDelivery) => {
        Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_YOUR_ORDER_PLACED_API, {
            "order_id": 0,
            "user_id": userId,
            "products_and_varients": productList,
            "count": 0,
            "store_id": 1,
            "address_id": 0,
            "cart_id": 0,
            "total_price": 0,
            "price_without_delivery": totalPriceWithoutDelivery,
            "total_products_mrp": 0,
            "payment_method": "",
            "order_date": new Date(),
            "is_gift": cart.reduce((prevVal, currVal) => prevVal && currVal.c1.is_gift, true),
            "status": Globals.orderStatus.PENDING
        }).then((succResp) => {
            props.navigation.navigate(Routes.CHECKOUT_DELIVERY, {
                orderid: succResp.data.generatedMaps[0].order_id,
                userId: userId
            })
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }

    const updatePendingOrder = (orderId, productList, totalPriceWithoutDelivery) => {
        Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API + orderId, {
            "products_and_varients": productList,
            "price_without_delivery": totalPriceWithoutDelivery,
            "is_gift": cart.reduce((prevVal, currVal) => prevVal && currVal.c1.is_gift, true),
            "order_date": new Date(),
        }).then((succResp) => {
            props.navigation.navigate(Routes.CHECKOUT_DELIVERY, {
                orderid: orderId,
                userId: userId
            })
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }

    //Theme based styling and colors
    const { colors } = useTheme();
    const scheme = useColorScheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    return (

        <View style={screenStyles.mainContainer}>

            <View style={[screenStyles.flatListContainer]}>
                <BaseView
                    showAppHeader={true}
                    title={"Shopping Cart"}
                    headerWithBack={false}
                    applyBottomSafeArea={false}
                    navigation={props.navigation}
                    childView={() => {

                        return (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlashMessage floating={true} position="top" />
                                {cartLoading &&
                                    <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>}
                                {!cartLoading && !cart.length && (
                                    <View>
                                        <Text style={{
                                            marginVertical: hp(5),
                                            textAlign: "center",
                                            fontSize: 20,
                                        }}>Your cart is empty</Text>
                                    </View>
                                )}

                                <View style={{
                                    minHeight: hp("50%")
                                }}>
                                    {(userId != -1 && cart.length > 0 && cart[0].c1) && 
                                    <View style={{
                                        marginVertical: hp(2),
                                    }}>
                                        <FlatList
                                            data={cart}
                                            keyExtractor={(item, index) => {
                                                return item.id;
                                            }}
                                            renderItem={({ item, index }) =>
                                                <View style={{}}>
                                                    <TouchableOpacity onPress={() => {
                                                        props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                                            name: 'Profile',
                                                            key: index,
                                                            item: {
                                                                ...item,
                                                                title: item.product_name,
                                                                image: item.Image_Thumb_Nail,
                                                                bigImage: item.product_image,
                                                                price: item.price,
                                                                userId: userId,
                                                                weight: item.weight,
                                                                discount: item.discount,
                                                                cartCount: item.c1.qty,
                                                                isFavourite: item.isFavourite,
                                                                detail: item.detail,
                                                                review_count: item.review_count,
                                                                ratingValue: item.ratingValue,
                                                                id: item.product_id,
                                                                cartCountChange: (count) => {
                                                                },
                                                                favouriteChange: (favourite) => {
                                                                },
                                                                navigation: props.navigation
                                                            }
                                                        },
                                                        );
                                                    }}>
                                                        <CartItem
                                                            item={{...item, VARIENTS: [item.varient_details]}}
                                                            cart_id={item.c1.cart_id}
                                                            productid={item.product_id}
                                                            // title={item.product_name}
                                                            title={
                                                                <View style={{ height: 100, width: 200 }}>
                                                                    <Text>{item.product_name}</Text>
                                                                </View>
                                                            }
                                                            image={item.product_image}
                                                            bigImage={item.product_image}
                                                            // price={item.price}
                                                            price={`${parseFloat(item.varient_details.base_price).toFixed(2)} $`}
                                                            weight={item.varient_details.quantity}
                                                            discount={item.discount}
                                                            cartCount={item.c1.qty}
                                                            cartCountChange={(count) => {
                                                            }}
                                                            userId={userId}
                                                            navigation={props.navigation}
                                                            setCart={setCart}
                                                            populateSavedForLaterItems={populateSavedForLaterItems}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        />
                                    </View>}

                                    {(savedForLaterItems.length > 0) && <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate(Routes.POPULAR_DEALS, { 
                                                userId: userId, 
                                                action: "showSavedForLaterItems",
                                                title: "Saved For Later" 
                                            });
                                        }}
                                    >
                                        <View style={screenStyles.sectionHeading}>
                                            <Text style={screenStyles.BuyAgainTitle}>Saved for Later</Text>

                                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                top={-10} color={colors.subHeadingColor} />
                                        </View>
                                    </TouchableOpacity>}

                                    {(userId != -1 && savedForLaterItems.length > 0) &&
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={savedForLaterItems}
                                        keyExtractor={(item, index) => {
                                            return item.id;
                                        }}
                                        renderItem={({ item, index }) => {
                                                const savedForLaterProduct = item.product;
                                                if(savedForLaterProduct)
                                                return (<View style={{borderRadius: 5,
                                                            margin: hp("1"),
                                                            backgroundColor: colors.primaryBackground,
                                                            width: wp("30%"),
                                                            height: hp("29%"),
                                                            position: "relative"}}>
                                                    <TouchableOpacity onPress={() => {
                                                        props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                                            name: 'Profile',
                                                            key: index,
                                                            item: {
                                                                ...savedForLaterProduct,
                                                                title: savedForLaterProduct.product_name,
                                                                image: savedForLaterProduct.Image_Thumb_Nail,
                                                                bigImage: savedForLaterProduct.product_image,
                                                                price: savedForLaterProduct.price,
                                                                userId: userId,
                                                                weight: savedForLaterProduct.weight,
                                                                discount: savedForLaterProduct.discount,
                                                                cartCount: 0,
                                                                isFavourite: savedForLaterProduct.isFavourite,
                                                                detail: savedForLaterProduct.detail,
                                                                review_count: savedForLaterProduct.review_count,
                                                                ratingValue: savedForLaterProduct.ratingValue,
                                                                id: savedForLaterProduct.product_id,
                                                                cartCountChange: (count) => {
                                                                },
                                                                favouriteChange: (favourite) => {
                                                                },
                                                                navigation: props.navigation
                                                            }
                                                        },
                                                        );
                                                    }}>
                                                        <View style={{
                                                            position: "absolute",
                                                            top: -10,
                                                            right: -10
                                                        }}>
                                                            <TouchableOpacity 
                                                                onPress={() => {
                                                                    Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_SAVED_PRODUCT, {
                                                                        data:item.Saved_Product
                                                                    })
                                                                    .then((delResp) => {
                                                                        populateSavedForLaterItems()
                                                                    })
                                                                }}>
                                                                <SvgIcon type={IconNames.MinusFull} width={25} height={25} color={colors.activeColor}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <ReorderItem
                                                            navigation={props.navigation}
                                                            secondaryTitle={savedForLaterProduct.price}
                                                            ratingValue={savedForLaterProduct.ratingValue}
                                                            secondaryColor={savedForLaterProduct.secondaryColor}
                                                            primaryTitle={savedForLaterProduct.product_name}
                                                            primaryColor={savedForLaterProduct.primaryColor}
                                                            iconBgColor={savedForLaterProduct.iconBgColor}
                                                            iconURI={savedForLaterProduct.iconURI}
                                                            bgURI={savedForLaterProduct.bgURI}
                                                            img={savedForLaterProduct.product_image}
                                                            item={{ ...savedForLaterProduct, cartCount: 0 }}
                                                            id={savedForLaterProduct.product_id}
                                                            userid={userId}
                                                        />
                                                        <View style={{
                                                            width: wp("30%"),
                                                            height: hp("3%"),
                                                            borderWidth: 1,
                                                            borderColor: "black",
                                                            paddingHorizontal: hp(1),
                                                            paddingVertical: wp(1),
                                                            borderRadius: 5,
                                                              // background color must be set
                                                            backgroundColor: colors.primaryBackground,

                                                        }}>
                                                            <TouchableOpacity onPress={() => {
                                                                Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_SAVED_PRODUCT, {
                                                                    data: item.Saved_Product
                                                                })
                                                                .then((delResp) => {
                                                                    Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_INSERT_INTO_CART_API, {
                                                                        "cart_id": 0,
                                                                        "product_id": savedForLaterProduct.product_id,
                                                                        "varient_id": item.Saved_Product.varient_id,
                                                                        "user_id": userId,
                                                                        "is_gift": false,
                                                                        "qty": 1
                                                                    }).then(function (response) {
                                                                        dispatch(commonActions.incrementCartCount())
                                                                        populateSavedForLaterItems()
                                                                    })
                                                                })
                                                            }}>
                                                                <Text style={{
                                                                    display: 'flex',
                                                                    justifyContent: "center",
                                                                    textAlign: "center",
                                                                    fontWeight: "bold"
                                                                }}>Move To Cart</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>)
                                            }
                                        }
                                    />}

                                    {(userId == -1) && <FlatList
                                        data={cartData}
                                        keyExtractor={(item, index) => {
                                            return item.id;
                                        }}
                                        renderItem={({ item, index }) =>
                                            <View style={screenStyles.flatListFirstItemContainer}>
                                                <TouchableOpacity onPress={() => {
                                                    props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                                        name: 'Profile',
                                                        key: index,
                                                        item: {
                                                            ...item,
                                                            title: item.product_name,
                                                            image: item.Image_Thumb_Nail,
                                                            bigImage: item.product_image,
                                                            price: item.price,
                                                            userId: userId,
                                                            weight: item.weight,
                                                            discount: item.discount,
                                                            cartCount: item.count,
                                                            isFavourite: item.isFavourite,
                                                            detail: item.detail,
                                                            review_count: item.review_count,
                                                            ratingValue: item.ratingValue,
                                                            id: item.product_id,
                                                            cartCountChange: (count) => {
                                                            },
                                                            favouriteChange: (favourite) => {
                                                            },
                                                            navigation: props.navigation
                                                        }
                                                    },
                                                    );
                                                }}>
                                                    <CartItem
                                                        item={item}
                                                        cart_id={0}
                                                        productid={item.product_id}
                                                        // title={item.product_name}
                                                        title={
                                                            <View style={{ height: 100, width: 200 }}>
                                                                <Text>{item.product_name}</Text>
                                                            </View>
                                                        }
                                                        image={item.product_image}
                                                        bigImage={item.product_image}
                                                        // price={item.price}
                                                        price={`${item.price} $`}
                                                        weight={item.weight}
                                                        discount={item.discount}
                                                        cartCount={item.count}
                                                        cartCountChange={(count) => {
                                                        }}
                                                        userId={userId}
                                                        navigation={props.navigation}
                                                        setCart={setCart}

                                                    />
                                                </TouchableOpacity>
                                            </View>}
                                    />}
                                </View>

                                {(cart.length !== 0 && userId !== -1) &&
                                    <View
                                        style={[screenStyles.bottomContainerParent, Config.SELECTED_VARIANT === Routes.INTRO_SCREEN1 &&
                                            screenStyles.bottomContainerParentVariant1, {marginTop: hp("2%")}]}>
                                        <View style={{...screenStyles.bottomContainer, marginLeft: wp("15%")}}>
                                            <View style={screenStyles.totalContainer}>
                                                <Text style={screenStyles.totalLabelText}>Total</Text>
                                                <Text style={screenStyles.totalValueText}>${Number.parseFloat(subtotal + shipping).toFixed(2)}</Text>
                                            </View>
                                            <AppButton
                                                title={'Checkout'}
                                                onPress={() => {
                                                    // if(userPhone){
                                                        orderplaced()
                                                    // } else {
                                                    //     showMessage({
                                                    //         message: "Please complete your profile to proceed to checkout",
                                                    //         type: "danger",
                                                    //       });
                                                    // }
                                                }}
                                            />
                                        </View>
                                    </View>}

                                {(userId == -1) &&
                                    <AppButton
                                        style={{
                                            marginHorizontal: wp("7%"),
                                            marginTop: hp("10%")
                                        }}
                                        title={'Sign In'}
                                        onPress={() => {
                                            props.navigation.navigate(Routes.LOGIN_FORM_SCREEN3, {
                                                action: 'goToCartList'
                                            })
                                        }}
                                    />}
                            </ScrollView>
                        );
                    }}
                />
            </View>
        </View>
    )
}
