import React, {useState} from 'react';

import {Text} from 'react-native-elements';
import {TouchableOpacity, View} from "react-native";
import {Styles} from "./Styles";

import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import AppConfig from "../../../../branding/App_config";
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../../Application/SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";
const PropTypes = require('prop-types');
const assets = AppConfig.assets.default;
import store from '../../../store/index';
import { commonActions } from '../../../store/commonStore'
import { useSelector } from 'react-redux';
const dispatch = store.dispatch
let commonStore = store.getState().commonStore
store.subscribe(function(){
    commonStore = store.getState().commonStore
})

export const Counter = (props) => {


    //Theme based styling and colors
    const {colors} = useTheme();
    const itemStyles = Styles(colors);

    //Default Props
    const spacing = props.spacing || wp("12");
    const borderWidth = props.borderWidth || 1;
    const outerBorder = props.outerBorder || false;
    const isVertical = props.isVertical || false;

    //Constants
    const borderColor = colors.borderColorLight;

    //Internal states
    const [cartCount, setCartCount] = useState(props.cartCount);
    const userId = useSelector(state => {
        return state.commonStore.userInfo.userId
    })

    const _cartCountChange = (behavior) => {
    if(cartCount == 0 && behavior == "subtract"){
    }
    else{
        let quantity = behavior === "add" ? cartCount+1 : cartCount-1
        if(userId !== -1){
            Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_INSERT_INTO_CART_API, {
                    "cart_id": 0,
                    "product_id": props.product_id,
                    "varient_id": props.varient_id,
                    "user_id": props.userId,
                    "is_gift": props.isGift? true: false,
                    "qty": quantity
            })
            .then(function (response) {
                if(props.setCart) props.setCart(response.data)
            }, error => console.log("save cart error",error))
        } else {
            if(behavior === "add"){
                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCT_API + props.product_id)
                .then(function (response) {
                    dispatch(commonActions.addToCart({
                        ...response.data,
                        "product_id": props.product_id,
                        "varient_id": props.varient_id,
                        "user_id": props.userId,
                    }))
                })
            } else if(behavior === "subtract")
                dispatch(commonActions.removeFromCart({
                    "product_id": props.product_id,
                    "varient_id": props.varient_id,
                    "user_id": props.userId,
            }))
        }
        if (behavior === "add") {
            setCartCount((cartCount) => {
                props.action && props.action("Product added to Cart")
                return cartCount + 1
            })
            dispatch(commonActions.incrementCartCount())
        } else if (behavior === "subtract" && !(cartCount === 0)) {
            setCartCount((cartCount) => {
                props.action && props.action("Product deleted from Cart")
                return cartCount - 1
            })
            dispatch(commonActions.decrementCartCount())
        }
        }
    };

    const getHorizontalCounter = () => {

        return (
            <View style={[itemStyles.horizontalContainer, {
                borderWidth: outerBorder ? borderWidth : 0, borderColor
            }]}>

                <TouchableOpacity style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                        height: spacing,
                        borderRightColor: borderColor,
                        borderRightWidth: borderWidth,
                    }]} onPress={() => {
                    _cartCountChange("subtract")
                }}>

                    <SvgIcon type={IconNames.Minus} width={18} height={18} color={colors.subHeadingSecondaryColor}/>

                </TouchableOpacity>
                <View style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                    }]}>
                    <Text style={itemStyles.counterText}>{cartCount}</Text>
                </View>

                <TouchableOpacity style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                        height: spacing,
                        borderLeftColor: borderColor, borderLeftWidth: borderWidth,
                    }]} onPress={() => {
                    _cartCountChange("add")
                }}>

                    <SvgIcon type={IconNames.Plus} width={18} height={18} color={colors.subHeadingSecondaryColor}/>

                </TouchableOpacity>
            </View>
        );

    }

    const getVerticalCounter = () => {

        return (
            <View style={itemStyles.verticalContainer}>

                <TouchableOpacity style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                        height: spacing,
                        borderBottomColor: borderColor,
                        borderBottomWidth: borderWidth,
                        borderLeftColor: borderColor,
                        borderLeftWidth: borderWidth,
                    }]} onPress={() => {
                    _cartCountChange("add")
                }}>

                    <SvgIcon type={IconNames.Plus} width={18} height={18} color={colors.subHeadingSecondaryColor}/>

                </TouchableOpacity>
                <View style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                        height: spacing,
                        borderLeftColor: borderColor,
                        borderLeftWidth: borderWidth
                    }]}>
                    <Text style={itemStyles.counterText}>{cartCount}</Text>
                </View>

                <TouchableOpacity style={[
                    itemStyles.actionContainer, {
                        width: spacing,
                        height: spacing,
                        borderTopColor: borderColor,
                        borderTopWidth: borderWidth,
                        borderLeftColor: borderColor,
                        borderLeftWidth: borderWidth,
                    }]} onPress={() => {
                    _cartCountChange("subtract")
                }}>

                    <SvgIcon type={IconNames.Minus} width={18} height={18} color={colors.subHeadingSecondaryColor}/>

                </TouchableOpacity>
            </View>
        );

    }


    return (

        <View>
            {
                isVertical ? (
                        getVerticalCounter()
                    )
                    : (
                        getHorizontalCounter()
                    )
            }

        </View>


    )
}

// Counter.propTypes = {

//     spacing: PropTypes.number,
//     borderWidth: PropTypes.number,
//     outerBorder: PropTypes.bool,
//     isVertical: PropTypes.bool

// };

