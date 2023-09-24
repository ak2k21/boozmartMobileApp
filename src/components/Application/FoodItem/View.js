import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'react-native-elements';
import Routes from "../../../navigation/Routes";
import { Styles } from "./Styles";
import { useTheme } from "@react-navigation/native";
import { SvgIcon } from "../SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";
import store from '../../../store/index';
import { commonActions } from '../../../store/commonStore'
import AppConfig from "../../../../branding/App_config";
import { useSelector } from 'react-redux';
const dispatch = store.dispatch
let commonStore = store.getState().commonStore
store.subscribe(function () {
    commonStore = store.getState().commonStore
})

export const FoodItem = (props) => {

    const {
        id,
        title,
        image,
        price,
        weight,
        discount,
        navigation,
        ratingValue,
        item
    } = props;

    //Theme based styling and colors
    const { colors } = useTheme();
    const scheme = useColorScheme();
    const itemStyles = Styles(scheme, colors);
    const Typography = AppConfig.typography.default;

    //Internal states
    const [cartCount, setCartCount] = useState(item?.VARIENTS ? item?.VARIENTS[0]?.total_count : 0);
    const [favourite, setFavourite] = useState(props.isFavourite ? props.isFavourite : false);
    const userId = useSelector(state => {
        return state.commonStore.userInfo.userId
    })

    useEffect(() => {
        props.favouriteChange(favourite)
    }, [favourite])

    useEffect(() => {
        props.cartCountChange(cartCount)
    }, [cartCount])

    const _favouriteChange = () => {
        if (!favourite)
            Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_ADD_FAVOUITES_API, {
                "fav_id": 0,
                "user_id": props.userid,
                "prod_id": id
            })
        else
            Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_FAVOUITES_BY_USERID_AND_PRODUCTID_API, {
                data: {
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
        let quantity = behavior === "add" ? cartCount + 1 : cartCount - 1
        if (userId !== -1) {
            Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_INSERT_INTO_CART_API, {
                "cart_id": 0,
                "product_id": id,
                "varient_id": item?.VARIENTS[0]?.varient_id,
                "user_id": props.userid,
                "is_gift": props.isGift? true: false,
                "qty": quantity
            })
                .then(function (response) {
                    console.log(response);
                })
        } else {
            if (behavior === "add") {
                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCT_API + id)
                    .then(function (response) {
                        dispatch(commonActions.addToCart({
                            ...response.data,
                            "product_id": id,
                            "varient_id": item?.VARIENTS[0]?.varient_id,
                            "user_id": props.userid,
                        }))
                    })
            }
            else if (behavior === "subtract")
                dispatch(commonActions.removeFromCart({
                    "product_id": id,
                    "varient_id": item?.VARIENTS[0]?.varient_id,
                    "user_id": props.userid,
                }))
        }
        if (behavior === "add") {
            setCartCount((cartCount) => {
                return cartCount + 1
            })
            dispatch(commonActions.incrementCartCount())
        } else if (behavior === "subtract" && !(cartCount === 0)) {
            setCartCount((cartCount) => {
                return cartCount - 1
            })
            dispatch(commonActions.decrementCartCount())
        }
    };

    return (

        <View>
            <View style={itemStyles.container}>
                <View style={itemStyles.upperContainer}>
                    <View style={itemStyles.discountContainer}>
                        {(discount > 0) && <View style={itemStyles.discountBanner}>
                            <Text style={itemStyles.discountText}>- {discount}</Text>
                        </View>}
                    </View>
                    {(userId != -1) && <View style={itemStyles.favouriteContainer}>
                        <TouchableOpacity onPress={() => {
                            _favouriteChange()
                        }}>
                            <View>

                                <SvgIcon
                                    type={favourite ? IconNames.HeartFilled : IconNames.Heart} width={20} height={20}
                                    color={favourite ? colors.heartFilled : colors.heartEmpty} />

                            </View>

                        </TouchableOpacity>
                    </View>}
                </View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        let updatedProduct = item;
                        if (Array.isArray(item.VARIENTS)) {
                            updatedProduct = {
                                ...item, VARIENTS: item?.VARIENTS.map((variant, index) => {
                                    if (index == 0)
                                        return { ...variant, total_count: cartCount }
                                    else return variant
                                })
                            }
                        }
                        navigation.push(
                            Routes.PRODUCT_DETAIL, {
                            item: { ...props, ...updatedProduct, isFavourite: favourite, cartCount: cartCount, userid: props.userid },
                            userid: props.userid
                        }
                        );
                    }}>

                    <View style={[itemStyles.mainContainer]}>
                        <View style={{
                            backgroundColor: "#fff",
                            paddingTop: hp("5")
                        }}>
                            {(typeof image) == "string" ? <Image
                                source={
                                    { uri: image }}
                                style={itemStyles.foodItemImage}
                            /> :
                                <Image
                                    source={image}
                                    style={itemStyles.foodItemImage}
                                />
                            }
                        </View>
                        <View style={itemStyles.infoContainer}>
                            <View style={itemStyles.foodItemBox_rating}>
                                <SvgIcon type={IconNames.StarFull} width={15} height={15}
                                    color={"#ce890c"} />
                                <Text>{parseFloat(ratingValue).toFixed(1)}</Text>
                            </View>
                            <Text style={itemStyles.titleText}>{title}</Text>
                            {(item?.VARIENTS && item?.VARIENTS?.length !== 0) && <View style={{}}>
                                <Text style={{ ...itemStyles.weightText, fontSize: Typography.P2 }}>${item?.VARIENTS[0]?.base_price} - {item?.VARIENTS[0]?.quantity}</Text>
                                {item?.VARIENTS[0]?.Deals?.deal_price && <View style={{ flexDirection: "row", gap: wp("1%") }}>
                                    <Text style={{
                                        ...itemStyles.weightText, textDecorationLine: "line-through",
                                        textDecorationColor: colors.subHeadingColor, fontSize: Typography.P4
                                    }}>${item?.VARIENTS[0]?.base_mrp}</Text>
                                    <Text style={{ ...itemStyles.weightText, fontSize: Typography.P4, color: colors.activeColor }}>({item?.VARIENTS[0]?.Deals?.deal_price}%)</Text>
                                </View>}
                            </View>}
                        </View>

                        {(item?.VARIENTS && item?.VARIENTS.length != 0) && <View style={itemStyles.bottomContainer}>
                            {(cartCount === 0) ?

                                <TouchableOpacity
                                    onPress={() => _cartCountChange("add")}
                                    style={itemStyles.addToCartContainer}>

                                    <SvgIcon type={IconNames.BagShopping} width={20} height={20}
                                        color={colors.activeColor} style={itemStyles.addCartIcon} />

                                    <Text style={itemStyles.addCartText}>{"Add to cart"}</Text>

                                </TouchableOpacity>
                                : <View style={itemStyles.cartUpdateContainer}>
                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, { borderRightWidth: 1 }]}
                                        onPress={() => {
                                            _cartCountChange("subtract")
                                        }}>

                                        <SvgIcon type={IconNames.Minus} width={15} height={15}
                                            color={colors.activeColor} />

                                    </TouchableOpacity>

                                    <Text style={itemStyles.cartNumberText}>{cartCount}</Text>

                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, { borderLeftWidth: 1 }]}
                                        onPress={() => {
                                            _cartCountChange("add")
                                        }}>

                                        <SvgIcon type={IconNames.Plus} width={15} height={15}
                                            color={colors.activeColor} />

                                    </TouchableOpacity>

                                </View>
                            }
                        </View>}
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>

    );


}
