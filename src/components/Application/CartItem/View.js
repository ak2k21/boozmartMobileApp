import React from 'react';
import {Image, TouchableOpacity, useColorScheme, View, TouchableWithoutFeedback} from "react-native";
import {Button, Text} from 'react-native-elements';
import Routes from "../../../navigation/Routes";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Counter} from "../../Global/Counter/View";
import {Styles} from "./Style"
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import Axios from 'axios';
import ApiUrls from '../../../utils/ApiUrls';
import store from '../../../store/index';
import { commonActions } from '../../../store/commonStore'
const dispatch = store.dispatch
let commonStore = store.getState().commonStore
store.subscribe(function(){
    commonStore = store.getState().commonStore
})

export const CartItem = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const itemStyles = Styles(scheme, colors);

    const renderRightActions = (progress, dragX) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if(props.userId != -1)
                        Axios.delete(ApiUrls.SERVICE_URL+ApiUrls.DELETE_CART_API+props.cart_id, {
                            headers: {
                                userId: props.userId
                            }
                        }).then((deleteCartResp) => {
                            props.setCart(deleteCartResp.data)
                        })
                    else 
                        dispatch(commonActions.deleteFromCart({
                            product_id: props.productid
                        }))
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
                        ...props,
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

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: hp("2%")
                                }}>
                                    <Text style={itemStyles.weightText}>{props.weight}</Text>
                                    {(props.userId != -1) && <TouchableWithoutFeedback style={{}}
                                    onPress={() => {
                                        Axios.post(ApiUrls.SERVICE_URL + ApiUrls.SAVE_FOR_LATER, {
                                          "saved_id": 0,
                                          "user_id": props.userId,
                                          "prod_id": props.productid,
                                          "varient_id": props.item?.varient_details?.varient_id
                                        }).then(() => {
                                            dispatch(commonActions.decrementCartCountBy(props.cartCount))
                                            props.populateSavedForLaterItems()
                                        })
                                    }}>
                                        <Text style={{borderColor: "black",
                                            borderWidth: 1,
                                            paddingHorizontal: hp(1),
                                            paddingVertical: wp(1),
                                            borderRadius: 5,
                                            position: "relative",
                                            elevation: 1,
                                            zIndex: 1,
                                            backgroundColor: "#FFF",
                                            marginVertical: wp(-1)
                                        }}>Save for Later</Text>
                                    </TouchableWithoutFeedback>}
                                </View>
                            </View>

                            <View style={{flex: 1,marginLeft: "auto"}}>
                                <Counter
                                    product_id = {props.productid}
                                    varient_id = {props.item?.varient_details?.varient_id}
                                    isVertical
                                    isGift = {props.item.is_gift}
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
