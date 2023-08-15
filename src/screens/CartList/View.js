import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, useColorScheme, View, TouchableOpacity} from "react-native";

import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import {CartItem} from "../../components/Application/CartItem/View";
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls.js";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import Config from "../../../branding/boozemart/configuration/Config";
import Axios from 'axios';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import Decimal from 'decimal.js';

export const CartList = (props) => {

    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartLoading, setCartLoading] = useState(true);
    const [userId, setUserId] = useState(-1);
    const setPriceData = (data) => {
        let price = 0;
        for(let item in data){
            price = new Decimal(price).plus(new Decimal(data[item].price).times(new Decimal(data[item].c1.qty)));
        }
        setSubtotal(price);
    }

    useEffect(() => {
        GoogleSignin.isSignedIn().then(isSignedIn => {
            if(isSignedIn){
                GoogleSignin.getCurrentUser().then(user => {
                    Axios.get(ApiUrls.SERVICE_URL+ ApiUrls.GET_USER_SERACH_BY_KEYWORD + user.user.email).then((succResp) => {
                         setUserId(succResp.data[0].id)
                    })
                });
            } else {
                Keychain.getGenericPassword().then(credentials => {
                    if (credentials) {
                        setUserId(credentials.username)
                    }
                })
            }
        });
    }, [])

    useEffect(() => {
        if(userId != -1){
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API, {
                 headers: {
                    userId: userId
                 }
             }).then((CartData) =>{
                 setCart(CartData.data);
                 setCartLoading(false);
                 setPriceData(CartData.data)
             }, err => {
                console.log("cart err",err)
             })
        }
    },[userId])

    useEffect(() => {
        setPriceData(cart);
    }, [cart])

     const orderplaced = () => {
     const productList = JSON.stringify(cart.map((item) => {
                                                 return {
                                                     product_id: item.c1.product_id,
                                                     varients: item.c1.varient_id,
                                                     count: item.c1.qty,
                                                 }
                                             }));
     const totalPriceWithoutDelivery = cart.reduce((total,item) =>{return (Number.parseFloat(item.price)*Number.parseFloat(item.c1.qty))+total},0);
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
      }).then((succResp) =>{
             props.navigation.navigate(Routes.CHECKOUT_DELIVERY, {
             orderid: succResp.data.generatedMaps[0].order_id,
             userId: userId
             })
        },(errorresp) =>{
            console.log(JSON.stringify(errorresp));
        })
    }


    //Theme based styling and colors
    const {colors} = useTheme();
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
                        <>
                        {cartLoading &&
                              <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                            {!cartLoading && !cart.length && (
                                <View>
                                <Text style = {{
                                     marginTop: hp(30),
                                     textAlign:"center",
                                     fontSize:20,
                                     }}>Your cart is empty</Text>
                                </View>
                                )}

                            <FlatList
                                data={cart}
                                keyExtractor={(item, index) => {
                                    return item.id;
                                }}
                                renderItem={({item, index}) =>
                                    index === 0 ? <View style={screenStyles.flatListFirstItemContainer}>
                                    <TouchableOpacity onPress={() => {
                                            props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                            name: 'Profile',
                                            key: index,
                                                item: {
                                                title:item.product_name,
                                                image:item.Image_Thumb_Nail,
                                                bigImage:item.product_image,
                                                price:item.price,
                                                userId: userId,
                                                weight:item.weight,
                                                discount:item.discount,
                                                cartCount:item.c1.qty,
                                                isFavourite:item.isFavourite,
                                                detail:item.detail,
                                                review_count:item.review_count,
                                                ratingValue:item.ratingValue,
                                                id:item.product_id,
                                                cartCountChange:(count) => {
                                                },
                                                favouriteChange:(favourite) => {
                                                },
                                                navigation:props.navigation
                                                }
                                             },
                                              );
                                        }}>


                                        <CartItem
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
                                            price={`${item.price} $`}
                                            weight={item.weight}
                                            discount={item.discount}
                                            cartCount={item.c1.qty}
                                            cartCountChange={(count) => {
                                            }}
                                            userId={userId}
                                            navigation={props.navigation}
                                            setCart={setCart}

                                        />
                                        </TouchableOpacity>
                                    </View> : index === cart.length - 1 ?
                                        <View style={screenStyles.flatListLastItemContainer}>
                                          <TouchableOpacity onPress={() => {
                                                  props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                                  name: 'Profile',
                                                  key: index,
                                                  item: {
                                                        title:item.product_name,
                                                        image:item.Image_Thumb_Nail,
                                                        bigImage:item.product_image,
                                                        price:item.price,
                                                        userId:userId,
                                                        weight:item.weight,
                                                        discount:item.discount,
                                                        cartCount:item.c1.qty,
                                                        isFavourite:item.isFavourite,
                                                        detail:item.detail,
                                                        review_count:item.review_count,
                                                        ratingValue:item.ratingValue,
                                                        id:item.product_id,
                                                        cartCountChange:(count) => {
                                                        },
                                                        favouriteChange:(favourite) => {
                                                        },
                                                        navigation:props.navigation
                                                        }
                                                     },
                                                    );
                                              }}>
                                                <CartItem
                                                cart_id={item.c1.cart_id}
                                               // title={item.product_name}
                                              title={
                                                  <View style={{ height: 100, width: 200 }}>
                                                    <Text>{item.product_name}</Text>
                                                  </View>
                                                }
                                                image={item.product_image}
                                                bigImage={item.product_image}
                                                //price={item.price}
                                                 price={`${item.price} $`}
                                                weight={item.weight}
                                                discount={item.discount}
                                                cartCount={item.c1.qty}
                                                cartCountChange={(count) => {
                                                }}
                                                navigation={props.navigation}
                                                setCart={setCart}
                                                productid={item.product_id}
                                                userId= {userId}
                                            />
                                            </TouchableOpacity>
                                        </View> :
                                        <TouchableOpacity onPress={() => {
                                                props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                                                name: 'Profile',
                                                key: index,
                                                item: {
                                                                 title:item.product_name,
                                                                 image:item.Image_Thumb_Nail,
                                                                 bigImage:item.product_image,
                                                                 price:item.price,
                                                                 weight:item.weight,
                                                                 userId: userId,
                                                                 discount:item.discount,
                                                                 cartCount:item.c1.qty,
                                                                 isFavourite:item.isFavourite,
                                                                 detail:item.detail,
                                                                 review_count:item.review_count,
                                                                 ratingValue:item.ratingValue,
                                                                 id:item.product_id,
                                                                 cartCountChange:(count) => {
                                                                 },
                                                                 favouriteChange:(favourite) => {
                                                                 },
                                                                 navigation:props.navigation
                                                              },
                                                              }
                                                  );
                                            }}>
                                        <CartItem
                                            cart_id={item.c1.cart_id}
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
                                            cartCount={item.c1.qty}
                                            cartCountChange={(count) => {
                                            }}
                                            navigation={props.navigation}
                                            setCart={setCart}
                                            productid={item.product_id}
                                            userId= {userId}
                                        />
                                        </TouchableOpacity>
                                }
                            />
                            </>

                        );


                    }}

                />
            </View>

             {(cart.length !== 0) &&
             <View
                style={[screenStyles.bottomContainerParent, Config.SELECTED_VARIANT === Routes.INTRO_SCREEN1 &&
                screenStyles.bottomContainerParentVariant1]}>
                <View style={screenStyles.bottomContainer}>

                    <View style={screenStyles.totalContainer}>
                        <Text style={screenStyles.totalLabelText}>Total</Text>
                        <Text style={screenStyles.totalValueText}>${subtotal+shipping}</Text>
                    </View>

                    <AppButton
                        title={'Checkout'}
                        onPress={() => {
                        orderplaced()

                        }}
                    />

                </View>
            </View>}

        </View>


    )

}
