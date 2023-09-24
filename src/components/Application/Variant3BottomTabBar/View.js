import React from "react";
import {TouchableOpacity, useColorScheme, View, Text} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Styles} from "./Style";
import Globals from "../../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/Boozemart2/styles/light/Style";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import { useSelector } from "react-redux";
import Routes from "../../../navigation/Routes";

export function Variant3BottomTabBar(props) {

    const {state, descriptors, navigation, style} = props;

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    let screenStyles = Styles(globalStyles, scheme, colors);
    const cartCount = useSelector(state => {
        return state.commonStore.cartCount
    })

    return (

        <View style={style.display === "none" ? {...screenStyles.container, ...{height: 0}} : screenStyles.container}>
            {state.routes.map((route, index) => {   
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let icon = IconNames.HomeAlt;
                let title = "Home";
                switch (route.name) {
                    case Routes.HOME_STACK:
                        icon = (isFocused ? IconNames.HomeFull : IconNames.HomeAlt);
                        title = "Home";
                        break;
                    case Routes.FAVOURITES_STACK:
                        icon = (isFocused ? IconNames.HeartFull : IconNames.Heart);
                        title = "Favourites";
                        break;
                    case Routes.GIFT_STACK:
                        icon = (isFocused ? IconNames.Gift : IconNames.GiftSimple);
                        title = "Gift";
                        break;
                    case Routes.PROFILE_STACK:
                        icon = (isFocused ? IconNames.SimpleUserFull : IconNames.SimpleUser);
                        title = "Account";
                        break;
                    case Routes.CART_STACK:
                        icon = (isFocused ? IconNames.CartFull : IconNames.Cart);
                        title = "Cart";
                        break;
                }

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={onPress}
                        style={[screenStyles.bottomTabContainer, {marginBottom: Globals.SAFE_AREA_INSET.bottom / 2}]}>
                        {/*isFocused is selected*/}
                        <View style={[{
                            width: hp(5),//isFocused ? hp(5) : 0,
                            height: hp(5)//isFocused ? hp(5) : 0,
                        }, screenStyles.bottomTabItemContainer, {position: "relative"}
                        ]}>
                            {icon == IconNames.Cart && (
                                <View style={{position: "absolute", top: hp("-0.3%"), right: wp("-0.1%")}}>
                                    <Text style={{color:"#000"}}>{cartCount}</Text>
                                </View>
                            )}
                            <SvgIcon type={icon} width={25} height={25}
                                     color={isFocused ? colors.activeColor : "#52555b"}/>
                        </View>
                        <Text style={screenStyles.bottomTabText}>{title}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
