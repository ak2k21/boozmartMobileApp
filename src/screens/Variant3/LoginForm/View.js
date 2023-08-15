import React, {useRef, useState} from 'react';
import {ImageBackground, View, TouchableOpacity} from "react-native";
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
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Axios from "axios";
import ApiUrls from "../../../utils/ApiUrls";
import {CountryPicker, CountryList} from "react-native-country-codes-picker";

const assets = AppConfig.assets.default;
const lightColors = AppConfig.lightColors.default;

export const Variant3LoginFormScreen = (props) => {

    //Theme based styling and colors
    const {colors} = useTheme();
    const globalStyles = commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors, lightColors);

    //Internal States
    const [mobile, setMobile] = useState("")
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');

    //References
    let inputRef = useRef();

    return (
        <ImageBackground source={require("../../../screens/Variant3/LoginForm/Assets/login-wallpaper-2.jpg")} style={screenStyles.mainContainer} resizeMode={"cover"}>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'never'}
                getTextInputRefs={() => {
                    return [inputRef];
                }}
                showsVerticalScrollIndicator={false}>
                <View style={{...screenStyles.container, paddingTop: hp("7%")}}>
                    <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>

                {/*
                <AppHeader
                        overrideTheme={"light"}
                        isTranslucent
                        navigation={props.navigation}
                        transparentHeader
                        headerWithBackground
                        headerWithBack
                        title={" "}
                    />

                */}

                    <View style={[screenStyles.bottomContainer]}>
                        <View style={{
                            backgroundColor: "white",
                            opacity: 0.1,
//                            opacity: 0.6, //version 2
                            position: "absolute",
                            height: hp("50%"),
                            width: wp("90%"),
                            bottom: 0,
                            left: 0,
                            top: hp("-5"),
                            borderRadius: hp("3%")
                        }}/>


                        <Text style={screenStyles.titleText}>{"Welcome To Boozemart!"}</Text>

                        <Text style={screenStyles.subtitleText}>{"Sign in to your account"}</Text>
                        <View style={screenStyles.contentContainerStyle}>

                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: hp("2%")
                                    }}>
                                   {/* <TouchableOpacity onPress={() => {
                                        setShow(true)
                                    }}>
                                        <Text style={{
                                            width: wp("15%"),
                                            height: hp("6%"),
                                            borderRadius: hp("0.5%"),
                                            backgroundColor: "#fff",
                                            lineHeight: hp("6%"),
                                            paddingLeft: wp("3")
                                        }}>{countryCode}</Text>
                                    </TouchableOpacity>*/}
                                    <View style={{
                                        width: wp("84%"),
                                    }}>
                                        <AppInput
                                            {...globalStyles.secondaryInputStyle}
                                            textInputRef={r => (inputRef = r)}
                                            leftIcon={IconNames.Mobile}
                                            placeholder={"Mobile"}
                                            value={mobile}
                                            onChangeText={(mobile) => {
                                                setMobile(mobile)
                                            }}
                                        />
                                    </View>
                                    </View>

                                    <CountryPicker
                                          lang={'en'}
                                          show={show}
                                          pickerButtonOnPress={(item) => {
                                              setCountryCode(item.dial_code);
                                              setShow(false)
                                          }}
                                       />

                            {/*<View style={screenStyles.forgotPasswordContainer}>

                                <View style={screenStyles.switchContainer}>
                                    <CustomSwitch
                                        initialValue={false}
                                        onValueChange={(value) => {
                                        }}
                                    />
                                </View>

                                <Text
                                    style={screenStyles.accountText}>{"Remember me"}</Text>

                                <View style={screenStyles.bottomButtonContainer}>
                                    <Button
                                        title={"Forgot Password"}
                                        type={"clear"}
                                        containerStyle={{}}
                                        titleStyle={screenStyles.forgotPasswordButton}
                                        onPress={() =>
                                            props.navigation.navigate(Routes.FORGOT_PASSWORD_FORM_SCREEN3)
                                        }
                                    />
                                </View>

                            </View>*/}

                            <AppButton
                                buttonStyle = {globalStyles.primaryButtonStyle}
                                title={"Get Verification Code"}
                                onPress={() => {
                                    Axios.post(ApiUrls.SERVICE_URL+ ApiUrls.POST_GENERATED_OTP_BY_USER_API, {
                                        user_phone: countryCode+mobile
                                    })
                                   props.navigation.navigate(Routes.VERIFY_NUMBER_OTP_SCREEN, {
                                        mobile: countryCode+mobile
                                   })
                                }}
                            />

                            <AppSocialButton onPress={() => {

                                    GoogleSignin.configure({
                                         webClientId: '62455514535-pe322e7os1ok65ftturlepcim8mageu1.apps.googleusercontent.com',
                                         offlineAccess: true,
                                       });
                                    GoogleSignin.hasPlayServices().then(() => {
                                       GoogleSignin.signIn().then((userInfo) => {
                                        Axios.get(ApiUrls.SERVICE_URL+ ApiUrls.GET_USER_SERACH_BY_KEYWORD + userInfo.user.email).then((succResp) =>{
                                           if(succResp.data.length == 0)
                                           {
                                           Axios.post(ApiUrls.SERVICE_URL+ApiUrls.POST_USER_SIGNUP_API, {
                                           "name": userInfo.user.name,
                                           "email": userInfo.user.email,
                                           "user_phone": null,
                                           "facebook_id": null
                                           }).then(succ =>{
                                              props.navigation.navigate(Routes.HOME_VARIANT3,{
                                                       userId: succ.data.id
                                                  });
                                           })
                                           }
                                           else{
                                           props.navigation.navigate(Routes.HOME_VARIANT3,{
                                                          userId: succResp.data[0].id
                                                     });
                                           }


                                       },(errorresp) =>{
                                           console.log(JSON.stringify(errorresp));
                                       })
                                       }, (err) => {
                                            console.log("err", err)
                                       });
                                    });
                                }}
                                 containerStyle={screenStyles.googleLoginButtonContainer}
                                 buttonStyle={screenStyles.googleLoginButton}
                                 titleStyle={screenStyles.googleLoginButtonTitle}
                                 iconStyle={screenStyles.googleLoginIcon}
                                 title={"Connect using Google"}
                                 icon={IconNames.Google}
                                 iconColor={'red'}
                                 primaryShadowStart={"transparent"}
                                 primaryShadowFinal={"transparent"}
                            />

                            {/*<View style={screenStyles.accountBottomContainer}>
                                <Text style={screenStyles.accountText}>{"Don't have an account?"}</Text>
                                <Button
                                    title={"Signup"}
                                    type={"clear"}
                                    titleStyle={screenStyles.signupButton}
                                    onPress={() =>
                                        props.navigation.navigate(Routes.SIGNUP_FORM_SCREEN3)
                                    }
                                />
                            </View>*/}


                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )


}
