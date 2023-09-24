import React, {useEffect, useRef, useState} from "react";
import {PermissionsAndroid, Platform, useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import AppButton from "../../components/Application/AppButton/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';
import Routes from "../../navigation/Routes";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import SelectDropdown from 'react-native-select-dropdown'
import Globals from "../../utils/Globals";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PERMISSIONS, RESULTS } from "react-native-permissions";

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
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [state, setState] = useState("New Jersey");
    const [showError, setShowError] = useState(false);

    const requestLocationPermission = async () => {

        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'Boozemart2 App needs access to your Location' +
                'so you can pin your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        } catch (err) {
          console.warn(err)
        }
      };

      useEffect(() => {
        (async function () {
          //const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
          if (Platform.OS !== "ios") {
            await requestLocationPermission();
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    
            if (granted) {
              console.log("location access granted")
            }
            else {
              console.log("location permission denied")
            }
          } else {
            // Call the function to request permission when needed
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.GRANTED) {
              console.log('Location permission granted');
            }
            else {
              console.log("location permission denied")
            }
          }
        })();
      }, [])

    const addaddress = async() => {
      //      if(name !== "" && email !== "" && phone !== "" && address !== "" && zipCode !== "" && city !== "" && country !== "" && society !== "" && houseno !== "" && landmark !== "" && doorno !== "" && state !== "" )
           return await Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_ADD_ADDRESS_API, {
                        "address_id": 0,
                          "type": "",
                          "user_id": props.route.params.userId,
                          "receiver_name": name,
                          "receiver_phone": "+1"+phone,
                          "city": address1,
                          "society": address2,
                          "city_id": 0,
                          "society_id": 0,
                          "house_no": "",
                          "landmark": "",
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
                        <FlashMessage floating={true} position="top" />
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            contentContainerStyle={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>

                            <View style={{}}>

                                <Text style={screenStyles.inputLabel}>Country</Text>
                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    disabled={true}
                                    leftIcon={IconNames.Map}
                                    value={"United States"}
                                />

                                <Text style={screenStyles.inputLabel}>Full Name</Text>
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
                                        if(name){
                                        setShowError(false)
                                        } else{
                                        setShowError(true)
                                        }
                                        setName(name);
                                    }}
                                />

                                <Text style={screenStyles.inputLabel}>Phone number</Text>
                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.PhoneFlip}
                                    placeholder={" "}
                                    value={phone}
                                    errorMessage={(showError && phone=="")?"Please enter Phone Number":""}
                                    errorStyle={{
                                          position: "absolute",
                                          top: hp("1"),
                                          right:0
                                    }}
                                    keyboardType={"phone-pad"}
                                    onChangeText={(phone) => {
                                        if(phone){
                                            setShowError(false)
                                            } else{
                                            setShowError(true)
                                            }
                                        if(phone.length <= 10)
                                            setPhone(phone);
                                    }}
                                />

                                <Text style={screenStyles.inputLabel}>Address</Text>
                                <View style={{
                                    zIndex: 3, // works on ios
                                    elevation: 3, // works on android,
                                    width: wp("90%"),
                                    justifyContent: "center",
                                    position: "relative",
                                    marginTop: hp("4.5%"),
                                    marginBottom: hp("2%"),
                                }}>
                                    <View style={{
                                        position: "absolute",
                                        width: hp("100%"),
                                        marginVertical: hp("1%")
                                    }}>
                                        <GooglePlacesAutocomplete
                                            styles={{
                                                textInput: {
                                                    height: hp("6%")
                                                },
                                                textInputContainer: {
                                                    height: hp("8%"),
                                                    marginVertical: hp("1%")
                                                }
                                            }}
                                            currentLocation={true}
                                            keepResultsAfterBlur={true}
                                            placeholder={address1 || 'Please enter your address'}
                                            onPress={(data, details = null) => {
                                                setAddress1(details.formatted_address)
                                                if (details.address_components.filter(item => item.types.includes('postal_code')).length) {
                                                    setZipCode(details.address_components.filter(item => item.types.includes('postal_code'))[0].short_name)
                                                }
                                            }}
                                            // 'details' is provided when fetchDetails = true
                                            fetchDetails={true}
                                            query={{
                                                key: 'AIzaSyD9S5rAJ1RNWrG3fHjDKU8m2khTUxcr5u8',
                                                language: 'en',
                                                components: 'country:us',
                                            }}
                                        />
                                    </View>
                                </View>
                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"Apt, Suite, Unit, Building (Opt)"}
                                    value={address2}
                                    onChangeText={(address) => {
                                        setAddress2(address);
                                    }}
                                />

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: wp("2%"),
                                    flexGrow: 1
                                }}>
                                    <View style={{position: "relative", width: wp("40%")}}>
                                        <Text style={screenStyles.inputLabel}>State</Text>
                                        {(showError && state=="") && 
                                        <Text style={{
                                            position: "absolute",
                                            top: hp("2")
                                        }}>Please enter State</Text>}
                                        {/* <SelectDropdown
                                            data={Globals.usStates.map(item => item.name)}
                                            onSelect={(selectedItem, index) => {
                                                setShowError(false)
                                                setState(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item;
                                            }}
                                            defaultValue={state}
                                            buttonStyle={screenStyles.dropdown1BtnStyle}
                                            buttonTextStyle={screenStyles.dropdown1BtnTxtStyle}
                                            dropdownStyle={screenStyles.dropdown1DropdownStyle}
                                            rowStyle={screenStyles.dropdown1RowStyle}
                                            rowTextStyle={screenStyles.dropdown1RowTxtStyle}
                                            search={true}
                                        /> */}
                                        <AppInput
                                            textInputRef={r => (inputRef = r)}
                                            {...globalStyles.secondaryInputStyle}
                                            disabled={true}
                                            leftIcon={IconNames.Map}
                                            value={"New Jersey"}
                                        />
                                    </View>
                                    <View style={{width: wp("40%")}}>
                                        <Text style={screenStyles.inputLabel}>Zip code</Text>
                                        {/* <AppInput
                                            textInputRef={r => (inputRef = r)}
                                            {...globalStyles.secondaryInputStyle}
                                            leftIcon={IconNames.Mailbox}
                                            placeholder={" "}
                                            value={zipCode}
                                            errorMessage={(showError && zipCode=="")?"Please enter Zip code":""}
                                            errorStyle={{
                                                position: "absolute",
                                                top: hp("1"),
                                                right:0
                                            }}
                                            keyboardType={"phone-pad"}
                                            onChangeText={(zipCode) => {
                                                if(zipCode){
                                                    setShowError(false)
                                                    } else{
                                                    setShowError(true)
                                                    }
                                                if(zipCode.length <= 5)
                                                    setZipCode(zipCode);
                                            }}
                                        /> */}
                                        <SelectDropdown
                                            data={Globals.newJerseyTrentonZipcodes.map(item => item["post code"])}
                                            onSelect={(selectedItem, index) => {
                                                setShowError(false)
                                                setZipCode(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item;
                                            }}
                                            defaultValue={zipCode}
                                            buttonStyle={screenStyles.dropdown1BtnStyle}
                                            buttonTextStyle={screenStyles.dropdown1BtnTxtStyle}
                                            dropdownStyle={screenStyles.dropdown1DropdownStyle}
                                            rowStyle={screenStyles.dropdown1RowStyle}
                                            rowTextStyle={screenStyles.dropdown1RowTxtStyle}
                                            search={true}
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

                            <View style={screenStyles.bottomButton}>
                                <AppButton
                                    title={"Add Address"}
                                    onPress={() => {
                                        console.log("address: ",name , phone , zipCode , address1 , address2 , state)
                                        if(name && phone && zipCode && address1 && state){
                                            addaddress().then((succResp) =>{
                                                showMessage({
                                                    message: "Address has been added ",
                                                    type: "danger",
                                                });
                                                setTimeout(()=> {
                                                    props.navigation.navigate(Routes.Location_Selection,{
                                                        addressid: succResp.data.raw[0].address_id,
                                                        userId: props.route.params.userId,
                                                        orderId: props.route.params.orderId,
                                                        navigatedFrom: "addaddress"
                                                    });
                                                },3000);
                                            });
                                        }
                                        else {
                                            setShowError(true);
                                        }
                                    }}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                );
            }}
        />
    );
};
