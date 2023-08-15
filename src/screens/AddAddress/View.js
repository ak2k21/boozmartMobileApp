import React, {useRef, useState, useEffect} from "react";
import {useColorScheme, View, ScrollView} from "react-native";
import {Text} from "react-native-elements";

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import AppButton from "../../components/Application/AppButton/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';
import Routes from "../../navigation/Routes";

import FlashMessage from "react-native-flash-message";

import { showMessage, hideMessage } from "react-native-flash-message";
 
export const AddAddress = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = useRef();

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [society, setSociety] = useState("");
    const [houseno, setHouseno] = useState("");
    const [landmark, setLandmark] = useState("");
    const [doorno, setDoorno] = useState("");
    const [state, setState] = useState("");

    const addaddress = async() => {
      //      if(name !== "" && email !== "" && phone !== "" && address !== "" && zipCode !== "" && city !== "" && country !== "" && society !== "" && houseno !== "" && landmark !== "" && doorno !== "" && state !== "" )
           return await Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_ADD_ADDRESS_API, {
                        "address_id": 0,
                          "type": "",
                          "user_id": props.route.params.userId,
                          "receiver_name": name,
                          "receiver_phone": phone,
                          "city": city,
                          "society": society,
                          "city_id": 0,
                          "society_id": 0,
                          "house_no": houseno,
                          "landmark": landmark,
                          "state": state,
                          "pincode": zipCode,
                          "select_status": 0,
                          "lat": "0",
                          "lng": "0",
                          "added_at": "",
                          "updated_at": ""
                  })
    }



    return (

        <BaseView
            navigation={props.navigation}
            title={"Add Address"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (

                    <View style={screenStyles.mainContainer}>
                        <FlashMessage position="top" />
                        <ScrollView>
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            contentContainerStyle={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>


                            <View style={{}}>

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={" "}
                                    value={name}
                                    errorMessage={name==""?"Please enter Name":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    onChangeText={(name) => {
                                        setName(name);
                                    }}
                                />

                                {/*<AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Envelope}
                                    placeholder={"Email Address"}
                                    value={email}
                                    errorMessage={email==""?"Please enter Email":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    keyboardType={"email-address"}
                                    onChangeText={(email) => {
                                        setEmail(email);
                                    }}
                                />*/}

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.PhoneFlip}
                                    placeholder={" "}
                                    value={phone}
                                    errorMessage={phone==""?"Please enter Phone Number":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    keyboardType={"phone-pad"}
                                    onChangeText={(phone) => {
                                        setPhone(phone);
                                    }}
                                />

                                {/*<AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"Door No"}
                                    value={doorno}
                                    errorMessage={doorno==""?"Please enter Door No":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    onChangeText={(doorno) => {
                                        setDoorno(doorno);
                                    }}
                                />*/}

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={" "}
                                    value={city}
                                    errorMessage={city==""?"Please enter City":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    onChangeText={(city) => {
                                        setCity(city);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={" "}
                                    value={society}
                                    errorMessage={society==""?"Please enter Society":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    onChangeText={(society) => {
                                        setSociety(society);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={" "}
                                    value={houseno}
                                    errorMessage={houseno==""?"Please enter House No":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    onChangeText={(houseno) => {
                                        setHouseno(houseno);
                                    }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Map}
                                     placeholder={" "}
                                     value={landmark}
                                     errorMessage={landmark==""?"Please enter Landmark":""}
                                     errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                     }}
                                     onChangeText={(landmark) => {
                                         setLandmark(landmark);
                                     }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Map}
                                     placeholder={" "}
                                     value={state}
                                     errorMessage={state==""?"Please enter State":""}
                                      errorStyle={{
                                         position: "absolute",
                                         top: hp("1"),
                                         right:0
                                      }}
                                     onChangeText={(state) => {
                                         setState(state);
                                     }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Mailbox}
                                     placeholder={" "}
                                     value={zipCode}
                                     errorMessage={zipCode==""?"Please enter Zip code":""}
                                     errorStyle={{
                                        position: "absolute",
                                        top: hp("1"),
                                        right:0
                                     }}
                                     onChangeText={(zipCode) => {
                                         setZipCode(zipCode);
                                     }}
                                />

                                <View style={screenStyles.switchContainer}>

                                    <CustomSwitch
                                        initialValue={false}
                                        onValueChange={(value) => {

                                        }}
                                    />

                                    <Text style={screenStyles.defaultText}>{"Make Default"}</Text>
                                </View>
                            </View>


                        </KeyboardAwareScrollView>


                        <View style={screenStyles.bottomButton}>

                            <AppButton
                                title={"Add Address"}
                                onPress={() => {
                                    if(name !== "" && phone !== "" && zipCode !== "" && city !== "" &&  society !== "" && houseno !== "" && landmark !== "" && state !== "" ){
                                        addaddress().then((succResp) =>{
                                            showMessage({
                                                message: "Address has been added ",
                                                type: "info",
                                              });
                                              setTimeout(()=> {
                                                props.navigation.navigate(Routes.Location_Selection,{
                                                    addressid: succResp.data.raw[0].address_id,
                                                    userId: props.route.params.userId
                                                });
                                              },3000);
                                        });
                                    }
                                }}
                            />

                        </View>

                    </ScrollView>
                    </View>

                );

            }}

        />
    );
};
