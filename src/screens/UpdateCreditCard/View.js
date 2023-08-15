import React, {useState, useEffect} from "react";
import {useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
import Routes from "../../navigation/Routes";

import FlashMessage from "react-native-flash-message";

import {showMessage, hideMessage} from "react-native-flash-message";
 


export const UpdateCreditCard = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = React.createRef();


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [company, setCompany] = useState(props.route.params.creditcards.company);
    const [name, setName] = useState(props.route.params.creditcards.card_holder_name);
    const [cardNumber, setCardNumber] = useState(props.route.params.creditcards.card_Number);
    const [expiry, setExpiry] = useState(props.route.params.creditcards.expires_on);
    const [cvv, setCVV] = useState(props.route.params.creditcards.cvv);

    const updateCreditCards = async () => {
               return Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_CREDIT_CARD+cardNumber, {
                              "id": props.route.params.creditcards.id,
                              "card_Number": cardNumber,
                              "user_Id": props.route.params.user_id,
                              "company": company,
                              "card_holder_name": name,
                              "cvv": cvv,
                              "expires_on": expiry
                      })
        }



    return (

        <BaseView
            navigation={props.navigation}
            title={"Update Credit Card"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (
                        <><FlashMessage position="top" />
                    <View style={screenStyles.mainContainer}>

                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            style={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>

                            <View style={{}}>

                                <CreditCard
                                    width={wp(90)}
                                    number={cardNumber}
                                    cvc={cvv}
                                    expiration={expiry}
                                    name={name}
                                    cardcompany={company}
                                    fontSize={20}
                                />

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
                                             top: hp("3.5"),
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
                                             top: hp("3.5"),
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
                                title={"Update Credit Card"}
                                onPress={() => {
                                    if(company !== "" && name !== "" && cardNumber !== "" && expiry !== "" && cvv !== ""){
                                        updateCreditCards().then((resp) => {
                                            showMessage({
                                                message: "Credit-card details has been updated",
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


                    </View></>

                );

            }}

        />

    );

};
