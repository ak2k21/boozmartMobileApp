import React from 'react';
import {Button} from "react-native-elements";
import {useColorScheme, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/Boozemart2/styles/light/Style";
import {Shadow} from "react-native-shadow-2";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";

const PropTypes = require('prop-types');

const AppButton = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Props
    const buttonStyle = {...globalStyles.primaryButtonStyle, ...props.buttonStyle};
    const primaryShadowStart = props.primaryShadowStart || colors.primaryShadowStart;
    const primaryShadowFinal = props.primaryShadowFinal || colors.primaryShadowFinal;
    const titleStyle = props.titleStyle || globalStyles.primaryButtonTextStyle;
    const title = props.title || "Text"
    const onPress = props.onPress || (() => {
    })


    return (
        <View style={props.style}>
            <Shadow
                viewStyle={{alignSelf: "stretch"}}
                startColor={primaryShadowStart}
                finalColor={primaryShadowFinal}
                radius={hp(0.75)}
                distance={2}
                offset={[0, 3]}
            >
                <Button
                    buttonStyle={{...buttonStyle, width: props.buttonWidth || wp("85%")}}
                    title={title}
                    disabled = {props.disabled}
                    titleStyle={titleStyle}
                    onPress={() => {
                        onPress()
                    }}/>

            </Shadow>
        </View>

    )
}

// AppButton.propTypes = {

//     title: PropTypes.string,

//     onPress: PropTypes.func.isRequired,

//     buttonStyle: PropTypes.any,

//     titleStyle: PropTypes.any,
// };

export default AppButton;

