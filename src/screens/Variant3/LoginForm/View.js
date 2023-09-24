import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { Button, Text } from 'react-native-elements';
import AppConfig from '../../../../branding/App_config';
import AppInput from "../../../components/Application/AppInput/View"
import Routes from '../../../navigation/Routes';
import { Styles } from "./Style";
import { StackActions } from "@react-navigation/native";
import { CommonActions, useTheme } from "@react-navigation/native";
import AppHeader from "../../../components/Application/AppHeader/View"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { CustomSwitch } from "../../../components/Global/CustomSwitch/View";
import AppButton from "../../../components/Application/AppButton/View";
import { commonLightStyles } from "../../../../branding/Boozemart2/styles/light/Style";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import { FocusAwareStatusBar } from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import { AppSocialButton } from "../../../components/Application/AppSocialButton/View";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import Axios from "axios";
import ApiUrls from "../../../utils/ApiUrls";
import { CountryPicker, CountryList } from "react-native-country-codes-picker";
import Video from 'react-native-video';
import * as Keychain from 'react-native-keychain';
import store from '../../../store/index';
import { commonActions } from '../../../store/commonStore'
import { SvgIcon } from '../../../components/Application/SvgIcon/View';
import { Platform } from 'react-native';
const dispatch = store.dispatch

const assets = AppConfig.assets.default;
const lightColors = AppConfig.lightColors.default;

export const Variant3LoginFormScreen = (props) => {

    //Theme based styling and colors
    const { colors } = useTheme();

    const Typography = AppConfig.typography.default;
    const globalStyles = commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors, lightColors);

    //Internal States
    const [mobile, setMobile] = useState("")
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [showLogin, setShowLogin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [allowLogin, setAllowLogin] = useState(false);
    const [nextFunctionality, setNextFunctionality] = useState("");
    //References
    let inputRef = useRef();

    const navigateToHome = () => {
        if(props.route && props.route.params && props.route.params.action == 'goToCartList'){
            props.navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [{ name: Routes.CART}]
                })
            );
        } else {
            props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: Routes.HOME_VARIANT3 }]
                })
              );
        }
    };

    const login = (userInfo) => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_USER_SERACH_BY_KEYWORD + userInfo.user.email).then(async (succResp) => {
            if (succResp.data.length == 0) {
                Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_USER_SIGNUP_API, {
                    "name": userInfo.user.name,
                    "email": userInfo.user.email,
                    "user_phone": null,
                    "facebook_id": null
                }).then(async succ => {
                    await dispatch(commonActions.setUserGoogleData(userInfo.user));
                    await dispatch(commonActions.setUserId(succ.data.id));
                    await dispatch(commonActions.setPhone(succResp.data.user_phone))
                    navigateToHome()
                })
            }
            else {
                await dispatch(commonActions.setUserGoogleData(userInfo.user));
                await dispatch(commonActions.setUserId(succResp.data[0].id));
                await dispatch(commonActions.setPhone(succResp.data[0].user_phone));
                navigateToHome()
            }
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }

    const keyChainLogin = () => {
        try {
            Keychain.getGenericPassword().then(credentials => {
                if (credentials) {
                    Axios.post(ApiUrls.SERVICE_URL + ApiUrls.VERIFY_JWT, null, {
                        headers: {
                            userId: credentials.username,
                            token: "Bearer " + credentials.password
                        }
                    }).then(async jwtAuthResp => {
                        if (jwtAuthResp.data.status == 200) {
                            console.log("keystore creds found")
                            await dispatch(commonActions.setUserTokenCredentials(credentials));
                            await dispatch(commonActions.setUserId(credentials.username));
                            Axios.get(ApiUrls.SERVICE_URL+ ApiUrls.GET_ADDRESS_USER_ID_API + credentials.username).then(async (succResp) => {
                                await dispatch(commonActions.setUserGoogleData({
                                    name: succResp.data.name,
                                    photo: succResp.data.user_image,
                                    email: succResp.data.email
                                }))
                                await dispatch(commonActions.setPhone(succResp.data.user_phone))
                                navigateToHome()
                            })
                        } else {
                            setShowLogin(true);
                        }
                    })
                } else {
                    console.log('No credentials stored');
                    setShowLogin(true);
                }
            });
        } catch {
            console.log('No credentials stored');
            setShowLogin(true);
        }
    };

    useEffect(() => {
        if(props.route?.params?.action == 'goToCartList'){
            setShowLogin(true);
        } else {
            setTimeout(() => {
                GoogleSignin.hasPlayServices().then(async () => {
                    try {
                        if(Platform.OS == "ios")
                            await GoogleSignin.signInSilently();
                        GoogleSignin.isSignedIn().then(isSignedIn => {
                            if (isSignedIn) {
                                console.log("signed In")
                                GoogleSignin.getCurrentUser().then(async user => {
                                    await dispatch(commonActions.setUserGoogleData(user.user));
                                    Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_USER_SERACH_BY_KEYWORD + user.user.email).then(async (succResp) => {
                                        await dispatch(commonActions.setUserId(succResp.data[0].id));
                                        await dispatch(commonActions.setPhone(succResp.data[0].user_phone))
                                        navigateToHome()
                                    })
                                });
                            }
                            else {
                                keyChainLogin()
                            }
                        });
                    } catch (error) {
                        keyChainLogin()
                    }
                });
            }, 3000);
        }
    }, []);

    const otpScreenFunctionality = () => {
        Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_GENERATED_OTP_BY_USER_API, {
            user_phone: countryCode + mobile
        })
        props.navigation.navigate(Routes.VERIFY_NUMBER_OTP_SCREEN, {
            mobile: countryCode + mobile,
            action: props.route?.params?.action
        })
    }

    const googleLoginFunctionality = () => {
        GoogleSignin.hasPlayServices().then(() => {
            GoogleSignin.signIn().then((userInfo) => {
                login(userInfo);
            }, (err) => {
                console.log("err", err)
            });
        });
    }

    return (
        <>
            {!showLogin && (<View style={{ flex: 1, flexGrow: 1 }}>
                <Video source={require("./Assets/Splash.mp4")}   // Can be a URL or a localfile.
                    resizeMode={"cover"}
                    autoplay={true}
                    paused={false}
                    style={screenStyles.splashVideo} />
            </View>)}
            {showLogin && (<ImageBackground source={require("../../../screens/Variant3/LoginForm/Assets/login-wallpaper-2.jpg")} style={screenStyles.mainContainer} resizeMode={"cover"}>

                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'never'}
                    getTextInputRefs={() => {
                        return [inputRef];
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ ...screenStyles.container, paddingTop: hp("7%") }}>
                        <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

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
                            }} />

                            {(props.route?.params?.action != 'goToCartList') && 
                            <View style={{
                                display: "flex",
                                textAlign: "right",
                                contentAlign: "right",
                                position: "relative",
                                top: hp("-5%")
                            }}>
                                <Button
                                    title={"Continue as a Guest"}
                                    type={"clear"}
                                    titleStyle={{
                                        color: "#a09da7",
                                        fontSize: Typography.P4,
                                        textAlign: "right",
                                        width: wp("80%")
                                    }}
                                    onPress={() =>
                                        props.navigation.navigate(Routes.HOME_VARIANT3)
                                    }
                                />
                            </View>}

                            <Text style={screenStyles.titleText}>{"Welcome To Boozemart"}</Text>

                            <View style={screenStyles.contentContainerStyle}>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
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
                                        position: 'relative'
                                    }}>
                                        <AppInput
                                            {...globalStyles.secondaryInputStyle}
                                            textInputRef={r => (inputRef = r)}
                                            leftIcon={IconNames.Mobile}
                                            placeholder={"Mobile"}
                                            value={mobile}
                                            onChangeText={(mobile) => {
                                                if(mobile.length <= 10)
                                                    setMobile(mobile)
                                            }}
                                            keyboardType={"phone-pad"}
                                            returnKeyType={"go"}
                                        />
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                if(mobile.length == 10){
                                                    setModalVisible(true)
                                                    setNextFunctionality("otpScreen")
                                                }
                                            }}>
                                                <View style={{
                                                    position: 'absolute',
                                                    top: hp("2.5%"),
                                                    right: wp("4%")
                                                }}>
                                                    <SvgIcon type={IconNames.ArrowRight} width={20} height={20} iconColor={colors.inputColor}/>
                                                </View>
                                        </TouchableWithoutFeedback>
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

                                {/* <AppButton
                                    buttonStyle={globalStyles.primaryButtonStyle}
                                    title={"Get Verification Code"}
                                    onPress={() => {
                                        setModalVisible(true)
                                        setNextFunctionality("otpScreen")
                                    }}
                                /> */}

                                <AppSocialButton onPress={() => {
                                    setModalVisible(true)
                                    setNextFunctionality("googleLogin")
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

                                {(props.route?.params?.action != 'goToCartList') &&<View style={screenStyles.accountBottomContainer}>
                                    <Text style={screenStyles.accountText}>{"Enter your"}</Text>
                                    <Button
                                        title={"Address"}
                                        type={"clear"}
                                        titleStyle={{
                                            color: colors.activeColor,
                                            fontSize: Typography.P4
                                        }}
                                        onPress={() =>
                                            props.navigation.navigate(Routes.ADDRESS_CHECK)
                                        }
                                    />
                                    <Text style={{...screenStyles.accountText, marginLeft: 0}}>{"to shop and signup later"}</Text>
                                </View>}

                            </View>

                            <View style={screenStyles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <View style={screenStyles.centeredView}>
                                        <View style={screenStyles.modalView}>
                                            <Text style={screenStyles.modalText}>Welcome to Boozemart. To Login into the app please confirm that you are 21 years or older.</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: wp("2%") }}>
                                                <AppButton
                                                    style={{
                                                        marginHorizontal: 10
                                                    }}
                                                    buttonWidth={wp("35%")}
                                                    title={"No, I'm not"}
                                                    onPress={() => {
                                                        setModalVisible(!modalVisible)
                                                    }}
                                                ></AppButton>
                                                <AppButton
                                                    style={{
                                                        marginHorizontal: 10
                                                    }}
                                                    buttonWidth={wp("35%")}
                                                    title={"Yes, I am"}
                                                    onPress={() => {
                                                        setModalVisible(!modalVisible)
                                                        if (nextFunctionality === "otpScreen") {
                                                            otpScreenFunctionality()
                                                        } else {
                                                            googleLoginFunctionality()
                                                        }
                                                    }}
                                                ></AppButton>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>)}
        </>
    )


}
