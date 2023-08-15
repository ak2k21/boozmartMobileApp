import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;

export const Styles = function (styles, colors) {

    return {

        foodFirstItem: {
            marginTop: hp(3)
        },

        foodLastItem: {
            marginBottom: hp(1)
        },

        sectionHeading: {
            width: styles.gridWidth,
            flexDirection: "row",
            alignItem: "center",
            justifyContent: "space-between",
            paddingVertical: hp("1"),
            marginVertical: hp("1"),
        },

        sectionHeadingText: {
            fontFamily: Fonts.RUBIK_MEDIUM,
            fontSize: Typography.P2,
            color: colors.headingColor
        },

         categoriesContainer:{
            paddingBottom: hp("5")
        },

        categoryItem: {
            borderRadius: 5,
            margin: hp("1"),
            backgroundColor: colors.primaryBackground
        },

    }
}

export default Styles;
