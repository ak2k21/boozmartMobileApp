import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppConfig from "../../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;


export const Styles = function (styles, scheme, colors) {

    return {

        mainContainer: {
            flex: 1,
            backgroundColor: scheme === "dark" ? colors.primaryBackground : colors.secondaryBackground
        },

        upperContainer: {
            width: "100%",
            height: hp("17"),
            backgroundColor: colors.secondaryBackground,
            alignItems: "flex-start",
            paddingTop: hp(5),
            paddingLeft: wp(5),
            flexDirection: "row"
        },

        container: {
            width: wp("100%"),
            // height: hp("80"),
            backgroundColor: scheme === "dark" ? colors.primaryBackground : colors.secondaryBackground,
        },

        profileImageContainer: {},

        profileImage: {
            width: hp("10"),
            height: hp("10"),
            borderRadius: hp("7"),
            borderWidth: 5,
            borderColor: colors.primaryDarkGreenColor,
            resizeMode: "cover"
        },

        profileImageAccessoryViewContainer: {
            width: hp("5"),
            height: hp("5"),
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            borderRadius: hp("2.5"),
            shadowColor: colors.inactiveColor,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: hp(6.5),
            left: hp(6.5),
        },

        profileImageAccessoryViewImage: {
            width: hp("2.5"),
            height: hp("2.5"),
            resizeMode: "contain",
            tintColor: colors.activeColor,
        },

        infoContainer: {
            marginTop: hp("1"),
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            height: hp("8"),
            marginLeft: wp(4)
        },

        nameText: {
            
            fontSize: Typography.P1,
            color: colors.black,
        },

        emailText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P5,
            color: colors.black
        },

        overlayContainer: {
            width: "90%",
            height: hp(15),
            marginTop: hp("1"),
            padding: "2%",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: hp(0.5),
            shadowOffset: { width: -2, height: 2 },
              shadowColor: 'black',
              shadowOpacity: 1,
              elevation: 3,
              // background color must be set
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
        },

        ordersText: {
            
            fontSize: Typography.P3,
            color: colors.headingColor,
            marginLeft: hp(1)
        },

        overlayNestedContainer: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: hp(1),
        },

        nestedContainer: {
            width: "32%",
            height: "100%",
            // height: hp(10),
            backgroundColor: scheme === "dark" ? colors.primaryBackground : colors.secondaryBackground,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: hp(0.5),
        },

        nestedContainerText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P6,
            color: colors.subHeadingColor,
            marginTop: hp(1.5)
        },

        cardListContainer: {
            width: "100%",
            marginTop: hp(2)
        },

        cardListingItemContainer: {
            width: wp(27),
            height: hp("14"),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            borderRadius: hp(1),
            margin: hp(1),
        },

        cardListingItemIconContainer: {
            width: hp("6"),
            height: hp("6"),
            backgroundColor: colors.tertiaryBackground,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: hp("3")
        },

        cardListingItemIcon: {
            width: hp(2),
            height: hp(2),
            tintColor: colors.activeColor,
            resizeMode: "contain"
        },

        cardListingItemText: {
            marginTop: hp("2"),
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P5,
            color: colors.subHeadingColor
        },

        listingContainer: {
            width: wp("100%"),
            paddingHorizontal: wp(5),
            marginVertical: hp(2)
        },

        profileListingItemContainer: {
            flexDirection: "row",
            paddingVertical: hp(1.35),
            paddingLeft: wp("5"),
            width: wp("40%"),
            marginVertical: hp("0.5"),
            borderRadius: 5,
            shadowOffset: { width: -2, height: 2 },
              shadowColor: 'black',
              shadowOpacity: 1,
              elevation: 3,
              // background color must be set
            backgroundColor: "#fff",
        },

        profileListingItemLeftImage: {
            marginRight: wp(5),
        },

        profileListingItemText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P3,
            color: colors.subHeadingColor
        },

        profileListingItemRightContainer: {
            flex: 1,
            alignItems: "flex-end"
        }

    }

}

