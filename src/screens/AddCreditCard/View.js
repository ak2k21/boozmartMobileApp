import React, {useState} from "react";
import {useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Routes from "../../navigation/Routes";
import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {Styles} from "./Styles";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {CreditCard} from "../../components/Application/CreditCard/View";
import creditcardutils from "creditcardutils";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';

import FlashMessage from "react-native-flash-message";

import { showMessage, hideMessage } from "react-native-flash-message";
 

export const AddCreditCard = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = React.createRef();


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [company, setCompany] = useState("Mastercard");
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCVV] = useState("");

    const addcreditcards = async () => {
   // if(company !== "" && name !== "" && cardNumber !== "" && expiry !== "" && cvv !== "")
               return Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_ADD_CREDIT_CARD_DETAILS_API, {
                              "id": 0,
                              "card_Number": cardNumber,
                              "user_Id": props.route.params.userId,
                              "company": company,
                              "card_holder_name": name,
                              "cvv": cvv,
                              "expires_on": expiry
                      })
        }



    return (

        <BaseView
            navigation={props.navigation}
            title={"Add Credit Card"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (

                    <View style={screenStyles.mainContainer}>

                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            style={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>

                            <View style={{}}><FlashMessage position="top" />

                                <CreditCard
                                    width={wp(90)}
                                    number={cardNumber}
                                    cvc={cvv}
                                    expiration={expiry}
                                    name={name}
                                    cardcompany={company}
                                    fontSize={20}
                                />

                               {/* <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.CircleUser}
                                     placeholder={" "}
                                     containerStyle={screenStyles.cardCompanyInputContainer}
                                     value={company}
                                     errorMessage={company==""?"Please enter Company Name":""}
                                     errorStyle={{
                                           position: "absolute",
                                           top: hp("1"),
                                           right:0
                                     }}
                                     onChangeText={(company) => {
                                          setCompany(company);
                                     }}
                                />*/}

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={" "}
                                    containerStyle={screenStyles.cardHolderInputContainer}
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

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CreditCard}
                                    maxLength={16}
                                    keyboardType={"number-pad"}
                                    placeholder={" "}
                                    value={cardNumber}
                                    errorMessage={cardNumber==""?"Please enter Card Number":""}
                                    errorStyle={{
                                           position: "absolute",
                                           top: hp("1"),
                                           right:0
                                    }}
                                    onChangeText={(cardNumber) => {

                                        setCardNumber(cardNumber);

                                    }}
                                />

                                <View style={screenStyles.horizontalInputsContainer}>

                                    <AppInput
                                        textInputRef={r => (inputRef = r)}
                                        {...globalStyles.secondaryInputStyle}
                                        leftIcon={IconNames.Calendar}
                                        placeholder={" "}
                                        maxLength={7}
                                        keyboardType={"number-pad"}
                                        containerStyle={screenStyles.horizontalInput}
                                        value={expiry}
                                        errorMessage={expiry==""?"Please enter Expiry Date":""}
                                        errorStyle={{
                                               position: "absolute",
                                               top: hp("1"),
                                               right:0
                                        }}
                                        onChangeText={(expiry) => {
                                            setExpiry(creditcardutils.formatCardExpiry(expiry));
                                        }}
                                    />


                                    <AppInput
                                        textInputRef={r => (inputRef = r)}
                                        {...globalStyles.secondaryInputStyle}
                                        leftIcon={IconNames.LockKeyhole}
                                        placeholder={" "}
                                        maxLength={3}
                                        keyboardType={"number-pad"}
                                        containerStyle={screenStyles.horizontalInput}
                                        value={cvv}
                                        errorMessage={cvv==""?"Please enter CVV":""}
                                        errorStyle={{
                                               position: "absolute",
                                               top: hp("1"),
                                               right:0
                                        }}
                                        onChangeText={(cvv) => {
                                            setCVV(cvv);
                                        }}
                                    />

                                </View>

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
                                title={"Add Credit Card"}

                                onPress={() => {
                                    if(company !== "" && name !== "" && cardNumber !== "" && expiry !== "" && cvv !== ""){
                                            addcreditcards().then((resp) => {
                                                showMessage({
                                                    message: "Credit-card has been added ",
                                                    type: "info",
                                                  });
                                                  setTimeout(() =>{
                                                          props.navigation.push(Routes.My_CREDIT_CARDS, {
                                                              userid: props.route.params.userId
                                                          });
                                                      },2000);
                                            })
                                        }
                                }}
                            />

                        </View>


                    </View>

                );

            }}

        />

    );

};
