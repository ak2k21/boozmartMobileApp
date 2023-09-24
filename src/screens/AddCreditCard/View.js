import React, {useEffect, useState} from "react";
import {useColorScheme, View, Modal} from "react-native";
import {Text} from "react-native-elements";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Routes from "../../navigation/Routes";
import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {Styles} from "./Styles";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
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
    const [showError, setShowError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [saveCard, setSaveCard] = useState(false);
    const [saveCardRespReceived, setSaveCardRespReceived] = useState(false);

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

    useEffect(() => {
        if(saveCardRespReceived)
            if(name && cardNumber && expiry && cvv){
                if(saveCard)
                    addcreditcards().then((resp) => {
                        showMessage({
                            message: "Credit-card has been added ",
                            type: "danger",
                        });
                        setTimeout(() =>{
                            if(props.route.params.orderid)
                                props.navigation.navigate(Routes.CART_SUMMARY, {
                                    orderId: props.route.params.orderid,
                                    "card_Number": cardNumber,
                                    "company": company,
                                    "card_holder_name": name,
                                    "cvv": cvv,
                                    "expires_on": expiry,
                                    userId: props.route.params.userId
                                });
                            else 
                                props.navigation.push(Routes.My_CREDIT_CARDS, {
                                    userid: props.route.params.userId
                                });
                        },2000);
                    })
                else{
                    props.navigation.navigate(Routes.CART_SUMMARY, {
                        orderId: props.route.params.orderid,
                        "card_Number": cardNumber,
                        "company": company,
                        "card_holder_name": name,
                        "cvv": cvv,
                        "expires_on": expiry,
                        userId: props.route.params.userId
                    });
                }
            }
            else{
                setShowError(true)
            }
    },[saveCardRespReceived])

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

                            <View style={{}}><FlashMessage floating={true} position="top" />

                                <CreditCard
                                    width={wp(90)}
                                    number={cardNumber}
                                    cvc={cvv}
                                    expiration={expiry}
                                    name={name}
                                    cardcompany={company}
                                    fontSize={20}
                                />

                                <Text style={{fontWeight: "bold", marginTop: hp(2)}}>Cardholder Name</Text>
                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={" "}
                                    value={name}
                                    errorMessage={(showError && name=="")?"Please enter Name":""}
                                    errorStyle={{
                                           position: "absolute",
                                           top: hp("1"),
                                           right:0
                                    }}
                                    onChangeText={(name) => {
                                        if(!name){
                                            setShowError(true)
                                        } else {
                                            setShowError(false)
                                        }
                                        setName(name);
                                    }}
                                />

                                <Text style={{fontWeight: "bold", marginTop: hp(1)}}>Card Number</Text>
                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CreditCard}
                                    maxLength={16}
                                    keyboardType={"number-pad"}
                                    placeholder={"xxxx xxxx xxxx xxxx"}
                                    value={cardNumber}
                                    errorMessage={(showError && cardNumber=="")?"Please enter Card Number":""}
                                    errorStyle={{
                                           position: "absolute",
                                           top: hp("1"),
                                           right:0
                                    }}
                                    onChangeText={(cardNumber) => {
                                        if(!cardNumber){
                                            setShowError(true)
                                        } else {
                                            setShowError(false)
                                        }
                                        setCardNumber(cardNumber);

                                    }}
                                />

                                <View style={screenStyles.horizontalInputsContainer}>
                                    <View style={{width: wp("40%")}}>
                                        <Text style={{fontWeight: "bold", marginTop: hp(1)}}>Expiry Date</Text>
                                        <AppInput
                                            textInputRef={r => (inputRef = r)}
                                            {...globalStyles.secondaryInputStyle}
                                            leftIcon={IconNames.Calendar}
                                            placeholder={"MM/yy"}
                                            maxLength={7}
                                            keyboardType={"number-pad"}
                                            containerStyle={screenStyles.horizontalInput}
                                            value={expiry}
                                            errorMessage={(showError && expiry=="")?"Please enter Expiry Date":""}
                                            errorStyle={{
                                                position: "absolute",
                                                top: hp("1"),
                                                right:0
                                            }}
                                            onChangeText={(expiry) => {
                                                if(!expiry){
                                                    setShowError(true)
                                                } else {
                                                    setShowError(false)
                                                }
                                                setExpiry(creditcardutils.formatCardExpiry(expiry));
                                            }}
                                        />
                                    </View>

                                    <View style={{width: wp("40%")}}>
                                        <Text style={{fontWeight: "bold", marginTop: hp(1)}}>CVV</Text>
                                        <AppInput
                                            textInputRef={r => (inputRef = r)}
                                            {...globalStyles.secondaryInputStyle}
                                            leftIcon={IconNames.LockKeyhole}
                                            placeholder={"xxx"}
                                            maxLength={3}
                                            keyboardType={"number-pad"}
                                            containerStyle={screenStyles.horizontalInput}
                                            value={cvv}
                                            errorMessage={(showError && cvv=="")?"Please enter CVV":""}
                                            errorStyle={{
                                                position: "absolute",
                                                top: hp("1"),
                                                right:0
                                            }}
                                            onChangeText={(cvv) => {
                                                if(!cvv){
                                                    setShowError(true)
                                                } else {
                                                    setShowError(false)
                                                }
                                                setCVV(cvv);
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* <View style={screenStyles.switchContainer}>
                                    <CustomSwitch
                                        initialValue={false}
                                        onValueChange={(value) => {
                                        }}
                                    />
                                    <Text style={screenStyles.defaultText}>{"Make Default"}</Text>
                                </View> */}
                            </View>

                        </KeyboardAwareScrollView>

                        <View style={screenStyles.bottomButton}>
                            <View style={screenStyles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                        setSaveCardRespReceived(true);
                                    }}>
                                        <View style={screenStyles.centeredView}>
                                            <View style={screenStyles.modalView}>
                                                <Text style={screenStyles.modalText}>Do you want to save this card?</Text>
                                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%")}}>
                                                    <AppButton
                                                        style={{
                                                            marginHorizontal: 10
                                                        }}
                                                        buttonWidth={ wp("35%")}
                                                        title={"No"}
                                                        onPress={() => {
                                                            setModalVisible(!modalVisible)
                                                            setSaveCardRespReceived(true)
                                                        }}
                                                    ></AppButton>
                                                    <AppButton
                                                        style={{
                                                            marginHorizontal: 10
                                                        }}
                                                        buttonWidth={ wp("35%")}
                                                        title={"Save"}
                                                        onPress={() => {
                                                            setModalVisible(!modalVisible)
                                                            setSaveCard(true)
                                                            setSaveCardRespReceived(true);
                                                        }}
                                                    ></AppButton>
                                                </View>
                                            </View>
                                        </View>
                                </Modal>
                            </View>
                            <AppButton
                                title={"Add Credit Card"}
                                onPress={() => {
                                    if(props.route.params.orderid){
                                        setSaveCardRespReceived(false)
                                        setModalVisible(!modalVisible)
                                    } else {
                                        setSaveCardRespReceived(true)
                                        setSaveCard(true)
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
