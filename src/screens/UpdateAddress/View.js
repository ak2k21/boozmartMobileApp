import React, {useRef, useState, useEffect} from "react";
import {useColorScheme, View, ScrollView, PermissionsAndroid, Platform} from "react-native";
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
import {showMessage, hideMessage} from "react-native-flash-message";
import SelectDropdown from 'react-native-select-dropdown'
import Globals from "../../utils/Globals";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PERMISSIONS, RESULTS } from "react-native-permissions";

export const UpdateAddress = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = useRef();

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [name, setName] = useState(props.route.params.address.receiver_name);
    const [phone, setPhone] = useState(props.route.params.address.receiver_phone);
    const [address1, setAddress1] = useState(props.route.params.address.city);
    const [address2, setAddress2] = useState(props.route.params.address.society);
    const [zipCode, setZipCode] = useState(props.route.params.address.pincode);
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

    const updateAddress = async () => {
           return await Axios.put(ApiUrls.SERVICE_URL + ApiUrls.POST_ADD_ADDRESS_API + "/"+props.route.params.address.address_id, {
                        "address_id": props.route.params.address.address_id,
                          "type": props.route.params.address.type,
                          "user_id": props.route.params.address.user_id,
                          "receiver_name": name,
                          "receiver_phone": phone,
                          "city": address1,
                          "society": address2,
                          "city_id": props.route.params.address.city_id,
                          "society_id": props.route.params.address.society_id,
                          "house_no": props.route.params.address.house_no,
                          "landmark": props.route.params.address.landmark,
                          "state": "New Jersey",
                          "pincode": zipCode,
                          "select_status": props.route.params.address.select_status,
                          "lat": props.route.params.address.lat,
                          "lng": props.route.params.address.lng,
                          "added_at": props.route.params.address.added_at,
                          "updated_at": new Date()
                  })
    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Update Address"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (
                    <><FlashMessage floating={true} position="top" />
                    <View style={screenStyles.mainContainer}>
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
                                        if(zipCode.length <= 10)
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


                        </KeyboardAwareScrollView>


                        <View style={screenStyles.bottomButton}>

                            <AppButton
                                title={"Update Address"}
                                onPress={() => {
                                    if(name && phone && zipCode && address1 &&  state){
                                        updateAddress().then((succResp) =>{
                                            showMessage({
                                                message: "Address has been updated ",
                                                type: "danger",
                                              });
                                              setTimeout(()=>{
                                                props.navigation.navigate(Routes.Location_Selection,{
                                                    addressid: props.route?.params?.address?.address_id,
                                                    userId: props.route?.params?.userId,
                                                    navigatedFrom: "updateaddress"
                                                });
                                              },2000);
                                        });
                                    }
                                }}
                            />

                        </View>

                    </View>

                    </>
                );

            }}

        />

    );
};
