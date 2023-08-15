import React, {useRef, useState} from 'react';
import {ImageBackground, View} from "react-native";
import {Button, Text} from 'react-native-elements';
import AppConfig from '../../../../branding/App_config';
import AppInput from "../../../components/Application/AppInput/View"
import Routes from '../../../navigation/Routes';
import {Styles} from "./Style";
import {CommonActions, useTheme} from "@react-navigation/native";
import AppHeader from "../../../components/Application/AppHeader/View"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../../components/Global/CustomSwitch/View";
import AppButton from "../../../components/Application/AppButton/View";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import {AppSocialButton} from "../../../components/Application/AppSocialButton/View";


const assets = AppConfig.assets.default;
const lightColors = AppConfig.lightColors.default;

export const Variant3LoginFormScreen = (props) => {

    //Theme based styling and colors
    const {colors} = useTheme();
    const globalStyles = commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors, lightColors);

    //Internal States
    const [mobile, setMobile] = useState("")


    //References
    let inputRef = useRef();

    return (
        <ImageBackground source={assets.login_form_header3} style={screenStyles.mainContainer} resizeMode={"cover"}>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'never'}
                getTextInputRefs={() => {
                    return [inputRef];
                }}
                showsVerticalScrollIndicator={false}>
                <View style={screenStyles.container}>
                    <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>

                    <AppHeader
                        overrideTheme={"light"}
                        isTranslucent
                        navigation={props.navigation}
                        transparentHeader
                        headerWithBackground
                        headerWithBack
                        title={" "}
                    />


                    <View style={[screenStyles.bottomContainer]}>
                        <Text style={screenStyles.titleText}>{"Enter OTP!"}</Text>

                        <Text style={screenStyles.subtitleText}>{"Received on your mobile"}</Text>

                        <View style={screenStyles.contentContainerStyle}>


                            <AppInput
                                {...globalStyles.secondaryInputStyle}
                                textInputRef={r => (inputRef = r)}
                                leftIcon={IconNames.LockKeyhole}
                                placeholder={"Mobile"}
                                value={mobile}
                                onChangeText={(mobile) => {
                                    setMobile(mobile)
                                }}
                            />

                            <View style={[screenStyles.bottomContainer]}>
                                <Text style={screenStyles.titleText}>{"Resend OTP!"}</Text>

                                <Text style={screenStyles.subtitleText}>{"Login"}</Text>

                                <View style={screenStyles.contentContainerStyle}>

                            </View>



                            />




                            </View>


                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )


}

