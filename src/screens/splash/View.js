import React, {useEffect} from 'react';
import {View,Text, useColorScheme} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Video from 'react-native-video';
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import Config from "../../../branding/Boozemart2/configuration/Config";
import Routes from '../../navigation/Routes';

export const SplashScreen = (props) => {

    const {colors} = useTheme();
    const scheme = useColorScheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    useEffect(() => {
        setTimeout(() => {
            props.navigation.dispatch(
                StackActions.replace(Routes.INTRO_SCREEN3)
            );
        }, 4000)
    }, [])

    return (
        <View style={{flex: 1,flexGrow: 1}}>
            <Video source={require("./Assets/Splash.mp4")}   // Can be a URL or a localfile.
                //                                       ref={(ref) => {
                //                                         this.player = ref
                //                                       }}                                      // Store reference
                //                                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
//               onEnd={()=> {
//                    props.navigation.dispatch(
//                        StackActions.replace(Config.SELECTED_VARIANT)
//                    );
//               }}// Callback when playback finishes
                //                                       onError={this.videoError}               // Callback when video cannot be loaded
                    resizeMode={"cover"}
                    autoplay={true}
                    paused={false}
                    style={screenStyles.splashVideo}/>
        </View>
    )



}
