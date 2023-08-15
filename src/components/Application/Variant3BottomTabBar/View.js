import React from "react";
import {TouchableOpacity, useColorScheme, View, Text} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {Styles} from "./Style";
import Globals from "../../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";

export function Variant3BottomTabBar({state, descriptors, navigation, style}) {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    let screenStyles = Styles(globalStyles, scheme, colors);

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
                switch (index) {

                    case 0:
                        icon = (isFocused ? IconNames.HomeFull : IconNames.HomeAlt);
                        title = "Home";
                        break;

                    case 1:
                        icon = (isFocused ? IconNames.HeartFull : IconNames.Heart);
                        title = "Favourites";
                        break;

                    case 2:
                        icon = (isFocused ? IconNames.Gift : IconNames.GiftSimple);
                        title = "Gift";
                        break;

                    case 3:
                        icon = (isFocused ? IconNames.SimpleUserFull : IconNames.SimpleUser);
                        title = "You";
                        break;

                    case 4:
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
                        }, screenStyles.bottomTabItemContainer
                        ]}>

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
