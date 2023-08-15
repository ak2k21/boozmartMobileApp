import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;


export const Styles = function (styles, colors) {

    return {
        contentContainerStyle: {
            paddingTop: 20
        },

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

        giftDescText: {
            display: "flex",
            flexDirection: "row",
            width: wp("60%"),
            marginHorizontal: hp("1"),
            marginVertical: hp("2")
        },
        giftDescTextContent: {
            width: wp("60%")
        },
        giftDescHead: {
            width: hp("100%"),
            fontWeight: "bold"
        },
        giftDescIcon: {
            marginTop: hp("1"),
            marginHorizontal: hp("2")
        },
        giftDescContent: {},
        giftInstruction: {
            backgroundColor: "#f2e9da",
            width: wp("100%"),
//            marginLeft: wp("-5"),
            fontSize: Typography.P1,
            position: "relative",
            zIndex: 1000
        },
        giftInstructionHead: {
            marginLeft: wp("10"),
            marginTop: hp("3"),
            fontWeight: "bold",
            fontSize: Typography.P1
        },
        giftInspirationContent: {
            display: "flex",
            width: wp("45"),
            marginRight: wp("2"),
            marginBottom: hp("1"),
            backgroundColor: "#c8e0f4",
            justifyContent: "center",
            textAlign: "center"
        },
        giftInspirationText: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center"
        },
        giftInspirationIcon: {
            marginVertical: hp("2"),
            marginHorizontal: wp("1"),
            marginLeft: wp("12")
        },

        horizontalDivider: {
            width: styles.gridWidth,
            height: 1,
            alignSelf: "center",
            marginBottom: hp("1"),
            backgroundColor: colors.borderColorLight
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

        backgroundVideo: {
            height: hp("30"),
            width: wp("100"),
            marginVertical: hp("2")
        },

        searchContainer: {
            height: hp("30"),
            width: wp("120"),
            marginVertical: hp("2"),
            marginLeft: wp("-5"),
            paddingVertical: 85,
        }
    }

}

export default Styles;
