import React, {useEffect, useState} from "react";
import {Keyboard, useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";
import {Styles} from "./Style";
import AppHeader from "../../components/Application/AppHeader/View";
import {StackActions, useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import OtpInputs from "react-native-otp-inputs";
import {FocusAwareStatusBar} from "../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import Routes from '../../navigation/Routes';
import Axios from "axios";
import ApiUrls from "../../utils/ApiUrls";
import * as Keychain from 'react-native-keychain';

export const VerifyPhoneOTP = (props) => {
const [val, setVal] = useState("");

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [otpValue, setOtpValue] = useState("");


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardHeight(0);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <View style={screenStyles.container}>
            <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>

            <AppHeader
                navigation={props.navigation}
                transparentHeader
                isTranslucent
                darkIcons
                headerWithBack
                title={"Verify Number"}
            />

            <View style={screenStyles.mainContainer}>
                <Text style={screenStyles.titleText}>{"Verify your Number"}</Text>

                <Text style={screenStyles.subtitleText}>{"Enter your OTP code below."}</Text>

                <View style={screenStyles.otpInputMainContainer}>
                    <OtpInputs
                        autoFocus
                        clearTextOnFocus
                        blurOnSubmit={false}

//                        inputValue={otpValue}
//                         handleChange={(code) => {
//                         let code1 = code.split("")
//                             if (code.length === 6 ) {
//                                props.navigation.navigate(Routes.HOME_VARIANT3)
                        handleChange={(code) => {
                            if (code.length === 6) {
                                Axios.post(ApiUrls.SERVICE_URL+ ApiUrls.POST_VERIFY_OTP_BY_USER_API, {
                                    user_phone: props.route.params.mobile,
                                    otp: code
                                }).then((resp) => {
                                    if(resp.data.status == 200){
                                        Keychain.setGenericPassword(resp.data.userId+"", resp.data.token).then((resp) => {
                                            props.navigation.navigate(Routes.HOME_VARIANT3)
                                        });
                                    } else if(resp.data.status == 500){
                                        //failure message
                                    }
                                },(err) => {console.log(err)})
                            }
                        }}
                        numberOfInputs={6}
//                        inputStyles={screenStyles.otpInput}
                    />
                </View>

                {/*<ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "flex-end", bottom: keyboardHeight}}>*/}
                <View style={screenStyles.didntReceivedContainer}>
                    <Text style={screenStyles.didntReceivedText}>{"Didn\'t receive the code?"}</Text>
                    <Text style={screenStyles.resendText}>{"Resend a new Code."}</Text>
                </View>
                {/*</ScrollView>*/}

            </View>
        </View>

    );

};
