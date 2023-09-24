import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";
import Globals from "../../utils/Globals";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;

export const Styles = function (styles, scheme, colors) {

    return {
        container: {
            flex: 1,
            backgroundColor: colors.secondaryBackground,
            paddingBottom: hp("2%")
        },

        imageContainer: {
            width: wp("100%"),
            height: hp("47%"),
            backgroundColor: colors.primaryBackground,
            paddingTop: Globals.SAFE_AREA_INSET.top
        },

        mainImage: {
            width: "70%",
            height: "100%",
            alignSelf: "center",
            resizeMode: "contain"
        },

        bottomContainerMain: {
            flex: 1,
            // alignSelf: "center",
            marginHorizontal: wp(5),
        },

        bottomContainerUpper: {
            flex: 0.65,
            position: "relative"
        },

        bottomContainerLower: {
            flex: 0.35
        },

        infoContainer: {
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 0,
            top: 0
        },

        favouriteContainer: {
            width: "100%",
            height: hp(2),
            justifyContent: "center",
            alignItems: "flex-end"
        },

        priceText: {
            color: colors.subHeadingSecondaryColor,
            fontSize: Typography.H9,
            width: "50%"
        },

        nameText: {
            fontSize: Typography.H9,
            color: colors.headingColor,
            marginBottom: hp("0.5"),
            width: wp("85%")
        },

        weightText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.subHeadingColor,
            marginBottom: hp("0.5")
        },

        ratingContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: hp("2")
        },

        ratingText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P3,
            color: colors.headingColor
        },

        reviewText: {
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.subHeadingColor
        },

        detailText: {
            fontFamily: Fonts.RUBIK_LIGHT,
            fontSize: Typography.P4,
            lineHeight: hp("3%"),
            color: colors.subHeadingColor,
        },

        seeMoreStyle: {
            
            fontSize: Typography.P2,
            color: colors.headingColor,
        },

        cartCounterContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.primaryBackground,
            marginVertical: hp("1"),
            height: hp("4%")
        },

        cartCounterText: {
            fontSize: Typography.P3,
            color: colors.subHeadingColor,
        },

        categoryItem: {
            borderRadius: 5,
            margin: hp("1"),
            backgroundColor: colors.primaryBackground
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
            
            fontSize: Typography.P2,
            color: colors.headingColor
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
    }

}
