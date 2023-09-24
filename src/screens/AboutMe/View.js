import React, {useRef, useState, useEffect} from "react";
import {useColorScheme, View} from "react-native";

import BaseView from "../BaseView";
import {Text} from "react-native-elements";
import {Styles} from "./Styles";
import AppInput from "../../components/Application/AppInput/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import ApiUrls from "../../utils/ApiUrls";
import Axios from 'axios';
import store from '../../store/index';
import { commonActions } from '../../store/commonStore'
import FlashMessage, { showMessage } from "react-native-flash-message";
const dispatch = store.dispatch

export const AboutMe = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = useRef();

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(colors);


    //Internal input field states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
//    const [currentPassword, setCurrentPassword] = useState("");
//    const [newPassword, setNewPassword] = useState("");
//    const [confirmPassword, setConfirmPassword] = useState("");
  const [addressupdate, setAddressupdate] = useState(false);

  useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ADDRESS_USER_ID_API + props.route.params.userid).then((succResp) =>{
            setName(succResp.data.name);
            setEmail(succResp.data.email);
            setPhone(succResp.data.user_phone);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    return (

        <BaseView
            navigation={props.navigation}
            title={"About Me"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.mainContainer}><FlashMessage floating={true} position="top" />


                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            style={screenStyles.upperContainer}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            showsVerticalScrollIndicator={false}>

                            <View style={screenStyles.upperContainer}>

                                <Text style={screenStyles.typeHeader}>{"Personal Details"}</Text>

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={"Name"}
                                    value={name}
                                    onChangeText={(name) => {
                                    setAddressupdate(true);
                                        setName(name);
                                    }}
                                />

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.Envelope}
                                    placeholder={"Email Address"}
                                    value={email}
                                    onChangeText={(email) => {
                                    setAddressupdate(true);
                                        setEmail(email);
                                    }}
                                    keyboardType={"email-address"}
                                />

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.PhoneFlip}
                                    placeholder={"Phone"}
                                    value={phone}
                                    onChangeText={(phone) => {
                                    setAddressupdate(true);
                                        setPhone(phone);
                                    }}
                                    keyboardType={"phone-pad"}
                                />


{/*
                                <Text style={screenStyles.typeHeader}>{"Change Password"}</Text>

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.LockKeyhole}
                                    placeholder={"Current Password"}
                                    isPasswordField
                                    value={currentPassword}
                                    onChangeText={(currentPassword) => {
                                        setCurrentPassword(currentPassword);
                                    }}
                                />

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.LockKeyhole}
                                    placeholder={"Password"}
                                    isPasswordField
                                    value={newPassword}
                                    onChangeText={(newPassword) => {
                                        setNewPassword(newPassword);
                                    }}
                                />

                                <AppInput
                                    {...globalStyles.secondaryInputStyle}
                                    textInputRef={r => (inputRef = r)}
                                    leftIcon={IconNames.LockKeyhole}
                                    placeholder={"Confirm Password"}
                                    isPasswordField
                                    value={confirmPassword}
                                    onChangeText={(confirmPassword) => {
                                        setConfirmPassword(confirmPassword);
                                    }}
                                />

*/}
                            </View>

                        </KeyboardAwareScrollView>

                        <View style={screenStyles.bottomButton}>

                            <AppButton
                                disabled = {!addressupdate}
                                title={"Save Changes"}
                                onPress={() => {
                                    showMessage({
                                        message: "Your details has been updated ",
                                        type: "danger",
                                      });

                                    setTimeout(()=>{

                                        Axios.put(ApiUrls.SERVICE_URL+ApiUrls.POST_USER_DETAILS_API, {
                                            "id": props.route.params.userid,
                                            "name": name,
                                            "email": email,
                                            "user_phone": phone
                                            },{
                                                headers: {
                                                    userId: props.route.params.userid
                                                }
                                            }).then((Aboutme) => {
                                              console.log("Aboutme", Aboutme.data)
                                              dispatch(commonActions.setPhone(phone))
                                              })

                                    },2000);
                               
                                }}
                            />

                        </View>


                    </View>


                );
            }}
        />

    );

};
