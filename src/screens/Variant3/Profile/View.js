import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View,} from "react-native";
import {Styles} from "./Styles";
import AppConfig from "../../../../branding/App_config";
import Utilities from "../../../utils/UtilityMethods";
import Globals from "../../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/Boozemart2/styles/light/Style";
import {SvgIcon} from "../../../components/Application/SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import Routes from "../../../navigation/Routes";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseView from "../../BaseView"
import { useSelector } from 'react-redux';

const assets = AppConfig.assets.default;

export const Variant3Profile = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    const userSettingInfo = useSelector(state => {
        return state.commonStore.userInfo.userGoogleData;
    })
    const userid = useSelector(state => {
        return state.commonStore.userInfo.userId
    })

    //Internal States
    const [profileImage, setProfileImage] = useState("");

    const renderProfileListItem = (item, index) => {
        var margin = {}
        if(!(index%2)) margin = {marginRight: wp("1.5")}
        return (
            <TouchableOpacity
                key={index}
                onPress={() => item.onPress()}
                style={{...screenStyles.profileListingItemContainer,
                        ...{height: 65, flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
                        ...margin}}>

                <SvgIcon type={item.icon} width={20} height={20} color={"green"}
                         style={screenStyles.profileListingItemLeftImage}/>
                <Text style={screenStyles.profileListingItemText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <BaseView
            showAppHeader={true}
            title={"My Account"}
            headerWithBack={false}
            applyBottomSafeArea={true}
            navigation={props.navigation}
            childContainerStyle={{
                ...globalStyles.baseViewStyles.childContainerStyle,
                width: wp("100%"),
            }}
            childView={() => {

                return (
                <View style={screenStyles.mainContainer}>
                    <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

                    {(userid != -1) && <View style={screenStyles.upperContainer}>

                        <View
                            style={screenStyles.profileImageContainer}>
                            <Image
                                source={userSettingInfo.photo ? {uri: userSettingInfo.photo} : assets.profile_image}
                                style={screenStyles.profileImage}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    Utilities.selectImage((response) => {
                                        setProfileImage(response);
                                    })
                                }}
                                activeOpacity={0.8} style={
                                [
                                    globalStyles.buttonShadow,
                                    screenStyles.profileImageAccessoryViewContainer
                                ]
                            }>

                                <SvgIcon type={IconNames.Camera} width={20} height={20} color={colors.activeColor}/>

                            </TouchableOpacity>
                        </View>

                        <View style={screenStyles.infoContainer}>
                            <Text style={screenStyles.nameText}>{userSettingInfo.name}</Text>
                            <Text style={screenStyles.emailText}>{userSettingInfo.email}</Text>
                        </View>
                    </View>}

                    {(userid != -1) && <View style={[screenStyles.overlayContainer]}>

                        <Text style={screenStyles.ordersText}>{"Orders"}</Text>

                        <View style={screenStyles.overlayNestedContainer}>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.push(Routes.MY_ORDERS,{
                                        orderType: Globals.orderStatus.CANCELLED,
                                        title: Globals.orderStatus.CANCELLED,
                                        userid: userid
                                    })
                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.WalletFull} width={25} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{Globals.orderStatus.CANCELLED}</Text>
                                </View>
                            </TouchableHighlight>

                            {/* <TouchableHighlight
                                onPress={() => {
                                    props.navigation.push(Routes.MY_ORDERS,{
                                          orderType: Globals.orderStatus.PENDING,
                                          title: Globals.orderStatus.PENDING,
                                          userid: userid
                                      })
                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.PendingFull} width={25} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{Globals.orderStatus.PENDING}</Text>
                                </View>
                            </TouchableHighlight> */}

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.push(Routes.MY_ORDERS,{
                                          orderType: Globals.orderStatus.SHIPPED,
                                          title: Globals.orderStatus.SHIPPED,
                                          userid: userid
                                      })
                                }}

                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.ShippedFull} width={28} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{Globals.orderStatus.SHIPPED}</Text>

                                </View>

                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.push(Routes.MY_ORDERS,{
                                          orderType: Globals.orderStatus.DELIVERED,
                                          title: Globals.orderStatus.DELIVERED,
                                          userid: userid
                                      })
                                }}

                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.ShippedFull} width={28} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{Globals.orderStatus.DELIVERED}</Text>

                                </View>

                            </TouchableHighlight>

                        </View>

                    </View>}

                    <View style={screenStyles.container}>

                        {(userid == -1) && <View>
                            <Text style = {{
                                marginVertical: hp("10%"),
                                textAlign:"center",
                                fontSize:20,
                                }}>Please Sign in to View/Update your account details</Text>
                        </View>}
                        
                        <FlatList
                            style={screenStyles.listingContainer}
                            data={Globals.profileList(props.navigation,userid)}
                            renderItem={({item, index}) => {
                                if(userid == -1){
                                    if(item.title == "Sign in" || 
                                    item.title == "Notifications"){
                                        return renderProfileListItem(item, index)
                                    } else {
                                        // do nothing
                                    }
                                } else {
                                    if(item.title == "Sign in"){
                                        // do nothing
                                    } else return renderProfileListItem(item, index)
                                }
                            }}
                            numColumns={2}
                            />

                    </View>
                </View>
             );
        }}/>
    );
}

