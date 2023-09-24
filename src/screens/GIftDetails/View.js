import React, { useRef, useState } from "react";
import { useColorScheme, View, TextInput } from "react-native";
import { Text } from "react-native-elements";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import AppButton from "../../components/Application/AppButton/View";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Styles } from "./Styles";
import { CommonActions, useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';
import Routes from "../../navigation/Routes";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { SvgIcon } from "../../components/Application/SvgIcon/View";
import Globals from "../../utils/Globals";

export const GiftDetails = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = useRef();

    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);

    //Internal input field states
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [showError, setShowError] = useState(false);

    return (

        <BaseView
            navigation={props.navigation}
            title={"Add Gifting Details & Place Order"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (
                    <View style={screenStyles.mainContainer}>
                        <FlashMessage floating={true} position="top" />
                        <View style={{}}>
                            <Text style={screenStyles.inputLabel}>Name</Text>
                            <AppInput
                                returnKeyType="go"
                                textInputRef={r => (inputRef = r)}
                                {...globalStyles.secondaryInputStyle}
                                leftIcon={IconNames.CircleUser}
                                placeholder={" "}
                                value={name}
                                errorMessage={(showError && name == "") ? "Please enter Name" : ""}
                                errorStyle={{
                                    position: "absolute",
                                    top: hp("1"),
                                    right: 0
                                }}
                                onChangeText={(name) => {
                                    if (name) {
                                        setShowError(false)
                                    } else {
                                        setShowError(true)
                                    }
                                    setName(name);
                                }}
                            />

                            <Text style={screenStyles.inputLabel}>Message</Text>
                            <TextInput
                                leftIcon={
                                    <SvgIcon type={IconNames.Map} width={20} height={20} color={"#DDD"}/>
                                }
                                returnKeyType="go"
                                textInputRef={r => (inputRef = r)}
                                style={{
                                    height: hp("25%"),
                                    margin: 12,
                                    padding: 10,
                                    borderRadius: hp("1%"),
                                    backgroundColor: "#FFF",
                                    shadowColor: colors.borderColorLight,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.22,
                                }}
                                placeholder={" "}
                                value={message}
                                onChangeText={(value) => {
                                    setMessage(value);
                                }}
                                multiline={true}
                                numberOfLines={6}
                            />
                        </View>
                        <View style={{
                            marginTop: hp("5%")
                        }}>
                            <AppButton
                                title={"Save Details And Place Order"}
                                onPress={() => {
                                    showMessage({
                                        message: "Your order has been placed successfully!! ",
                                        type: "danger",
                                    });
                                    //                                        props.navigation.navigate(Routes.STRIPE_CHECKOUT);
                                    setTimeout(() => {
                                        if(!name){
                                            setShowError(true)
                                        } else {
                                            Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API + props.route.params.orderId, {
                                                "is_gift": true,
                                                "gift_message": name + ";" + message,
                                                "isPlaced": true,
                                                "status": Globals.orderStatus.PLACED
                                            }).then((succResp) => {
                                                Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_ALL_FROM_CART_API + props.route.params.userId);
                                                props.navigation.dispatch(
                                                    CommonActions.reset({
                                                      index: 0,
                                                      routes: [{ 
                                                        name: Routes.ORDER_SUCCESS,
                                                        params: {
                                                            orderId: props.route.params.orderId,
                                                            userId: props.route.params.userId,
                                                          },
                                                     }]
                                                    })
                                                  );
                                            })
                                        }
                                    }, 2000);
                                }}
                            />
                        </View>
                    </View>
                );
            }}
        />
    );
};
