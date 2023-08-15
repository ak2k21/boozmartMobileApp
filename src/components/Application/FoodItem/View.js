import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Text} from 'react-native-elements';
import Routes from "../../../navigation/Routes";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";

export const FoodItem = (props) => {

    //Theme based styling and colors
    const {colors} = useTheme();
    const scheme = useColorScheme();
    const itemStyles = Styles(scheme, colors);

    //Internal states
    const [cartCount, setCartCount] = useState(props.cartCount);
    const [favourite, setFavourite] = useState(props.isFavourite ? props.isFavourite : false);

    useEffect(() => {
        props.favouriteChange(favourite)
    }, [favourite])

    useEffect(() => {
        props.cartCountChange(cartCount)
    }, [cartCount])

    const _favouriteChange = () => {
    console.log("userId: ", props.userid)
        if(!favourite)
            Axios.post(ApiUrls.SERVICE_URL+ ApiUrls.POST_ADD_FAVOUITES_API,{
              "fav_id": 0,
              "user_id": props.userid,
              "prod_id": id
            })
        else
            Axios.delete(ApiUrls.SERVICE_URL+ApiUrls.DELETE_FAVOUITES_BY_USERID_AND_PRODUCTID_API,{
            data:{
                "user_id": props.userid,
                "prod_id": id
                }
            }).then((deleteFavResp) => {
                   props.setFavourites(deleteFavResp.data)
             })
        setFavourite((favourite) => {
            return !favourite;
        })

    };

    const _cartCountChange = (behavior) => {
    let quantity = behavior === "add" ? cartCount+1 : cartCount-1
    Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_INSERT_INTO_CART_API, {
            "cart_id": 0,
            "product_id": id,
            "varient_id": 0,
            "user_id": props.userid,
            "qty": quantity
      })
      .then(function (response) {
        console.log(response);
      })
        if (behavior === "add") {

            setCartCount((cartCount) => {
                return cartCount + 1
            })

        } else if (behavior === "subtract" && !(cartCount === 0)) {
            setCartCount((cartCount) => {
                return cartCount - 1
            })
        }

    };

    const {
        id,
        title,
        image,
        price,
        weight,
        discount,
        navigation,
        ratingValue
    } = props;

    return (

        <View>
            <View style={itemStyles.container}>
                <View style={itemStyles.upperContainer}>
                    <View style={itemStyles.discountContainer}>
                        {(discount>0) && <View style={itemStyles.discountBanner}>
                            <Text style={itemStyles.discountText}>- {discount}</Text>
                        </View>}
                    </View>
                    <View style={itemStyles.favouriteContainer}>
                        <TouchableOpacity onPress={() => {
                            _favouriteChange()
                        }}>
                            <View>

                                <SvgIcon
                                    type={favourite ? IconNames.HeartFilled : IconNames.Heart} width={20} height={20}
                                    color={favourite ? colors.heartFilled : colors.heartEmpty}/>

                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate(
                            Routes.PRODUCT_DETAIL, {
                                item: {...props, isFavourite: favourite, cartCount: cartCount, userId: props.userid}
                            }
                        );
                    }}>

                    <View style={[itemStyles.mainContainer]}>
                        <View style={{
                            backgroundColor: "#fff",
                            paddingTop: hp("5")
                        }}>
                            {(typeof image) == "string"? <Image
                                source={
                                {uri:image}}
                                style={itemStyles.foodItemImage}
                            />:
                            <Image
                                source={image}
                                style={itemStyles.foodItemImage}
                            />
                            }
                        </View>
                        <View style={itemStyles.infoContainer}>
                            <View style={itemStyles.foodItemBox_rating}>
                            <SvgIcon type={IconNames.StarFull} width={15} height={15}
                                 color={"#ce890c"}/>
                            <Text>{ratingValue}</Text>
                            </View>
                            <Text style={itemStyles.titleText}>{title}</Text>
                            <View>
                                <Text style={itemStyles.weightText}>${price} - {weight}</Text>
                            </View>
                        </View>

                        <View style={itemStyles.bottomContainer}>
                            {cartCount === 0 ?

                                <TouchableOpacity
                                    onPress={() => _cartCountChange("add")}
                                    style={itemStyles.addToCartContainer}>

                                    <SvgIcon type={IconNames.BagShopping} width={20} height={20}
                                             color={colors.activeColor} style={itemStyles.addCartIcon}/>

                                    <Text style={itemStyles.addCartText}>{"Add to cart"}</Text>

                                </TouchableOpacity>
                                : <View style={itemStyles.cartUpdateContainer}>
                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, {borderRightWidth: 1}]}
                                        onPress={() => {
                                            _cartCountChange("subtract")
                                        }}>

                                        <SvgIcon type={IconNames.Minus} width={15} height={15}
                                                 color={colors.activeColor}/>

                                    </TouchableOpacity>

                                    <Text style={itemStyles.cartNumberText}>{cartCount}</Text>

                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, {borderLeftWidth: 1}]}
                                        onPress={() => {
                                            _cartCountChange("add")
                                        }}>

                                        <SvgIcon type={IconNames.Plus} width={15} height={15}
                                                 color={colors.activeColor}/>

                                    </TouchableOpacity>

                                </View>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>

    );


}
