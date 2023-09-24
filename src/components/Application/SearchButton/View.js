import React from "react";

import {Text, TouchableOpacity, useColorScheme} from "react-native";

import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/Boozemart2/styles/light/Style";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";

export const SearchButton = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    return (

        <TouchableOpacity onPress={props.onPress} style={screenStyles.buttonContainer}>
            <SvgIcon type={IconNames.Search} width={20} height={20} color={colors.inputColor}
                     style={screenStyles.leftIcon}/>

            <Text style={screenStyles.Text}>{props.placeholder? props.placeholder : "Thirsty? Your Partner's Awaiting..."}</Text>

            {/* <SvgIcon type={IconNames.SlidersH} width={20} height={20} color={colors.inputColor}
                     style={screenStyles.rightIcon}/> */}

        </TouchableOpacity>

    );

};
