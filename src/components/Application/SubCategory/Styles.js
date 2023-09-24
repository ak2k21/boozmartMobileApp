import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../../branding/App_config";

const Typography = AppConfig.typography.default;
const Fonts = AppConfig.fonts.default;

export const Styles = function (scheme, colors) {

    return {
        subCategoryContainer: {
            borderRadius: hp(5),
            marginHorizontal: hp("1"),
            marginVertical: hp("1"),
            height: hp("5"),
//            width: wp("15"),
            paddingVertical: hp("1"),
            paddingHorizontal: hp("4"),
            shadowOffset: { width: -2, height: 2 },
              shadowColor: 'black',
              shadowOpacity: 1,
              elevation: 3,
            backgroundColor: colors.primaryBackground,
        }
    }
}
