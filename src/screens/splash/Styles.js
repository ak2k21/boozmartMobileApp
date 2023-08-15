import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;


export const Styles = function (styles, colors) {

    return {

        splashVideo: {
            height: hp("100"),
            width: wp("100")
        }
    }
}