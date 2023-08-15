import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppConfig from "../../../../branding/App_config";
const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;

export const Styles = function (styles, scheme, colors) {


    return {
        container: {
            flexDirection: 'row',
            backgroundColor: colors.primaryBackground,
        },

        bottomTabContainer: {
            flex: 1,
            height: hp(7.5),
            backgroundColor: colors.primaryBackground,
            justifyContent: "center",
            alignItems: "center",

        },

        bottomTabItemContainer: {
            borderRadius: hp(2.5),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primaryBackground,
        },

        bottomTabText: {
            fontSize: Typography.P4,
            fontWeight: "bold"
        },

    }


}
