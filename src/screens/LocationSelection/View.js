import React, {useState, useEffect} from 'react';
import {Animated, ScrollView, useColorScheme, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Accordion from 'react-native-collapsible/Accordion';
import BaseView from "../BaseView"
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Easing from "react-native/Libraries/Animated/Easing";
import Globals from "../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AppButton from "../../components/Application/AppButton/View";
import { PermissionsAndroid } from 'react-native';
import Routes from "../../navigation/Routes";

import FlashMessage from "react-native-flash-message";

import { showMessage, hideMessage } from "react-native-flash-message";
 

const assets = AppConfig.assets.default;

//Animation Constants
const activeAnimConfig = {
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
};

const deActiveAnimConfig = {
    toValue: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
};
export const LocationSelection = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);

     const [isMapReady, setIsMapReady] = useState(false);
     const [markers, setMarkers] = useState([]);

     const [geolocation, setGeolocation] = useState({
     latitude: 0,
     longitude: 0
     });

     const requestLocationPermission = async () => {

       try {
         await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           {
             title: 'Location Permission',
             message:
               'BoozeMart App needs access to your Location' +
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
         (async function() {
         //const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
                await requestLocationPermission();
                const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

                if(granted)
                  Geolocation.getCurrentPosition(
                     (position) => {
                     const { latitude, longitude} = position.coords;
                          setGeolocation({latitude, longitude});
                     },
                     (error) => {
                              console.log(error.code, error.message);
                     },
                     {
                      enableHighAccuracy: true,
                      timeout: 10000,
                      maximumAge: 10000
                     }
              );
         })();
     },[])

    return (

        <BaseView
            title={"Location"}
            
            navigation={props.navigation}
            showAppHeader={true}
            headerWithBack={!props.hideBack}
            applyBottomSafeArea
            childView={() => {
                return (
                  <>
                <View style={{  height:hp("50%")}}> 
                
                   <MapView
                     style={{ flex: 1 }}
                     initialRegion={{
                       latitude: geolocation.latitude,
                       longitude: geolocation.longitude,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                     }}
                     onMapReady={setIsMapReady(true)}
                     style={{
                         width: wp("90%"),
                         height: hp("90%"),
                       }}
                       loadingEnabled={true}
                       >

                        <Marker.Animated
                        draggable
                         onDragEnd={(e) =>
                         {
                         console.log(e.nativeEvent.coordinate);
                         setGeolocation(e.nativeEvent.coordinate )
                         }
                         }

                        ref={(marker: any) => {
                              marker = marker;
                         }}
                         coordinate={{
                         latitude: geolocation.latitude,
                         longitude: geolocation.longitude,
                         }}

                        />
                        
                   </MapView>
                    <View style={{
                        position: "absolute",
                        bottom: hp("8"),
                        width: wp("80%"),
                        marginHorizontal: wp("5%")
                    }}>
                  <View style={{position:'absolute',top:hp("10%")}}><FlashMessage position="top" /></View>

                       <AppButton

                           title={"Confirm Location"}
                           onPress={() => {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                            showMessage({
                              message: "Address has been updated ",
                              type: "info",
                            });

                            setTimeout(()=>{
                              Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ADDRESS_ID_API+props.route.params.addressid,{
                                "lat": geolocation.latitude,
                                "lng": geolocation.longitude
                             })

                             props.navigation.push(Routes.My_Address, {
                              userid: props.route.params.userId
                         })
                            },2000)


                              }}
                        />
                    </View>
                 </View>
                          </>
                );
            }}

        />
    );


}



