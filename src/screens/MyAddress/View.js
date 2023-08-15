import React, {useState, useEffect} from "react";
import {ActivityIndicator, Text, FlatList, ScrollView, useColorScheme, View, Animated, TouchableOpacity} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import ApiUrls from '../../utils/ApiUrls';
import {AddressItem} from "../../components/Application/AddressItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {AddressContentItem} from "../../components/Application/AddressContentItem/View";
import Axios from 'axios';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MyAddress = (props) => {


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);

    //Internal states
    const [activeSections, setActiveSections] = useState([]);

    const renderAddressesHeader = (section, index, isActive) => {
         return <TouchableOpacity style={{height: hp("17%")}}
                    onPress={() => {
                        props.navigation.navigate(Routes.Update_Address, {
                        address: section,
                        userId: props.route.params.userid
                        });
                    }}>
                 <View>
                    <AddressItem
                        isTouchable={false}
                        isActive={isActive}
                        showAnimatedIcon
                        item={section}
                        setUserAddressList = {setUserAddressList}
                        userId= {props.route.params.userid}

                    />
                </View>
              </TouchableOpacity>

    };

    const renderAddressesContent = section => {
        return <AddressContentItem data={section}/>
    };

    const _updateSections = allActiveSections => {
        setActiveSections(allActiveSections);
    };

const [addressLoading, setAddressLoading] = useState(true);
const [userAddressList, setUserAddressList] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_BY_ADDRESS_ALL_API, {
                  headers: {
                  userId: props.route.params.userid

        }}).then((succResp) =>{
        console.log("addresslist: ",succResp.data);
        setAddressLoading(false);
            setUserAddressList(succResp.data.map((item) => {
                return {...item, spinValue : new Animated.Value(0)};
            }));
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])

    return (

        <BaseView
            navigation={props.navigation}
            title={"My Address"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.push(Routes.Add_Address, {
                    userId: props.route.params.userid
                });
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={{...screenStyles.container,paddingTop:hp("3")}}>
                    {addressLoading &&
                              <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                         {!addressLoading && !userAddressList.length && (
                                <View>
                                <Text style = {{
                                     marginTop: hp(30),
                                     textAlign:"center",
                                     fontSize:20,
                                     }}>Add your address to display here</Text>
                                </View>
                                )}
                           <FlatList
                                showsVerticalScrollIndicator={false}
                                data={userAddressList}
                                renderItem={({item, index}) => {
                                        return renderAddressesHeader(item, index)
                                }}
                               />

                       {/* <View style={screenStyles.bottomContainer}>

                            <AppButton
                                title={"Save Settings"}
                                onPress={() => {
                                    props.navigation.goBack();
                                }}
                            />

                        </View>*/}

                    </View>


                );
            }}
        />

    );
};
