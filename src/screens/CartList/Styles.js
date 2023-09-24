import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;


export const Styles = function (styles, colors) {

    return {
        mainContainer: {
            flex: 1,
            backgroundColor: colors.headerBackground

        },

        flatListContainer: {
            flex: 1,
        },

        flatListFirstItemContainer: {
            marginTop: hp(2),
        },

        flatListLastItemContainer: {
            marginBottom: hp(2),
        },

        bottomContainerParent: {
            flex: 0.20,
            backgroundColor: colors.primaryBackground,

            justifyContent: "center",

            shadowColor: colors.borderColorLight,
            shadowOffset: {
                width: 0,
                height: -11,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.22,

            elevation: 8,
            borderRadius: 4,

        },

        bottomContainerParentVariant1: {
            paddingBottom: hp(1.8)
        },


        bottomContainer: {
            alignSelf: "center",
            backgroundColor: colors.primaryBackground,
//             paddingTop: hp("2"),
            width: styles.gridWidth,
            paddingBottom: hp(4),
            marginHorizontal: wp("10%")
        },
        totalContainer: {
            flexDirection: "row",
            marginVertical: hp("1.5"),
            width: wp("80%"),
        },
        subtotalLabelText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.subHeadingColor
        },
        subtotalValueText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            flex: 1,
            textAlign: "right",
            color: colors.subHeadingColor
        },
        totalLabelText: {
            
            fontSize: Typography.P1,
            flex: 0.5,
            color: colors.headingColor
        },
        totalValueText: {
            
            fontSize: Typography.P1,
            flex: 0.5,
            textAlign: "right",
            color: colors.headingColor
        },
        horizontalDivider: {
            width: styles.gridWidth,
            height: 1,
            alignSelf: "center",
            marginBottom: hp("1"),
            backgroundColor: colors.borderColorLight
        },
         BuyAgainTitle: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: 19,
            color: colors.headingColor,
            marginBottom: 5,
        },
         sectionHeading: {
            width: styles.gridWidth,
            flexDirection: "row",
            alignItem: "center",
            justifyContent: "space-between",
            paddingVertical: hp("1"),
            marginVertical: hp("1"),
        },
    }

}

export default Styles;
