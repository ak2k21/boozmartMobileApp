import React from 'react';
import {Image, TouchableOpacity, useColorScheme, View} from "react-native";

import {Button, Text} from 'react-native-elements';
import Routes from "../../../navigation/Routes";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Counter} from "../../Global/Counter/View";
import {Styles} from "./Style"
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import Axios from 'axios';
import ApiUrls from '../../../utils/ApiUrls';

export const CartItem = (props) => {


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const itemStyles = Styles(scheme, colors);


    const renderRightActions = (progress, dragX) => {
        console.log("props",props)
        return (

            <TouchableOpacity
                onPress={() => {
                    Axios.delete(ApiUrls.SERVICE_URL+ApiUrls.DELETE_CART_API+props.cart_id, {
                        headers: {
                            userId: props.userId
                        }
                    }).then((deleteCartResp) => {
                        props.setCart(deleteCartResp.data)
                    })
                }}
                style={itemStyles.rightSwipeContainer}>

                <SvgIcon type={IconNames.TrashAlt} width={30} height={30} color={colors.white}/>

            </TouchableOpacity>

        );
    };

    return (
        <Button
            onPress={() => {
                props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                        item: props,
                    }
                );
            }}
            ViewComponent={() => {

                return (
                    <Swipeable
                        friction={2}
                        leftThreshold={80}
                        rightThreshold={40}
                        renderRightActions={renderRightActions}
                        containerStyle={itemStyles.swipeableContainer}>

                        <View style={itemStyles.foodItemContainer}>
                            <Image
                                source={{uri:props.image}}
                                style={itemStyles.foodItemImage}
                                resizeMode={"contain"}
                            />
                            <View>
                                <Text style={itemStyles.priceText}>{props.price}</Text>
                                {/* <Text style={itemStyles.itemTitle}>{props.title}</Text> */}
                                <Text style={[itemStyles.itemTitle, { height: 50, width: 200 }]}>{props.title}</Text>

                                <Text style={itemStyles.weightText}>{props.weight}</Text>
                            </View>

                            <View style={{flex: 1,marginLeft: "auto"}}>
                                <Counter
                                    product_id = {props.productid}
                                    isVertical
                                    userId={props.userId}
                                    outerBorder
                                    spacing={hp("4")}
                                    cartCount={props.cartCount}
                                    setCart={props.setCart}
                                />
                            </View>

                        </View>

                    </Swipeable>

                );

            }}
        />
    );

}
