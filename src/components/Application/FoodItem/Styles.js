import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../../branding/App_config";

const Typography = AppConfig.typography.default;
const Fonts = AppConfig.fonts.default;

export const Styles = function (scheme, colors) {

    return {
        container: {
            width: wp("44%"),
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            borderRadius: hp(0.75),
            flexDirection: "column",
            marginRight: hp("1"),
            marginBottom: hp("1"),
        },

        upperContainer: {
            flexDirection: "row",
            backgroundColor: "#fff",
            marginRight: wp("0.5"),
        },

        discountContainer: {
            width: "50%"
        },

        discountBanner: {
            backgroundColor: colors.quaternaryBackground,
            width: "60%",
            height: hp(3),
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: hp(0.75),
            borderBottomRightRadius: hp(0.75),
            borderTopLeftRadius: hp(0.75)
        },

        discountText: {
            color: colors.headingSecondaryColor,
            fontFamily: Fonts.RUBIK_MEDIUM,
            fontSize: Typography.P7
        },

        favouriteContainer: {
            width: "50%",
            paddingTop: wp(2),
            paddingEnd: wp(2),
            justifyContent: "center",
            alignItems: "flex-end"
        },

        mainContainer: {
            flex: 1,
            alignItems: "center",
        },

        foodItemImage: {
            width: hp("20"),
            height: hp("25"),
            resizeMode: "contain",
            marginBottom: hp("-2"),
            marginTop:hp(-5),
           // borderRadius:hp(3)
        },

        infoContainer: {
            alignItems: "flex-start",
            marginVertical: hp("2"),
            paddingLeft: wp("1")
        },

        priceText: {
            fontFamily: Fonts.RUBIK_MEDIUM,
            color: colors.subHeadingSecondaryColor,
            fontSize: Typography.P6
        },

        titleText: {
            fontSize: Typography.P2,
            fontFamily: Fonts.RUBIK_MEDIUM,
            color: colors.headingColor,
            marginTop: hp("0.5"),
            marginBottom: hp("3"),
            textAlign : "left",
            height: hp("11")
        },

        foodItemBox_rating:{
            display: "flex",
            flexDirection: "row",
            gap: 5
        },

        weightText: {
            fontSize: Typography.P6,
            color: colors.subHeadingColor,
            fontFamily: Fonts.RUBIK_REGULAR
        },

        bottomContainer: {
            borderTopColor: colors.borderColorLight,
            width: "100%",
            height: hp("5.5"),
            justifyContent: "center",
            borderTopWidth: 1,
        },

        addToCartContainer: {
            flexDirection: "row",
            justifyContent: "center"
        },

        addCartText: {
            color: colors.subHeadingColor,
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            lineHeight: hp('2.8'),
        },

        addCartIcon: {
            marginRight: wp(2),
        },

        cartUpdateContainer: {
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },

        cartUpdateActionContainer: {
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            borderColor: colors.borderColorLight,
            height: "100%"
        },

        cartNumberText: {
            fontFamily: Fonts.RUBIK_MEDIUM,
            color: colors.headingColor
        }

    }

}
