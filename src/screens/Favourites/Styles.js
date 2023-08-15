import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Typography = AppConfig.typography.default;
const fonts = AppConfig.fonts.default;

export const Styles = function (styles, scheme, colors) {

    return {

        container: {
            flex: 1,
            marginBottom: hp(1),
        },

        containerSpacing: {
            marginBottom: hp("1")
        },

        contentContainerParent: {
            borderBottomLeftRadius: hp(0.75),
            borderBottomRightRadius: hp(0.75),
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground
        },

        favouriteFirstItemContainer: {
            marginTop: hp(3),
        },

        favouriteLastItemContainer: {
            marginBottom: hp(2),
        },

        contentItemContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: hp(1),
            borderBottomWidth: 1,
            borderBottomColor: colors.borderColorLight
        },

        contentItemLeftIconContainer: {
            width: hp("8"),
            height: hp("8"),
            justifyContent: "center",
            // alignItems: "center",
            borderRadius: hp("4"),
            marginLeft: wp("5"),
            // marginRight: wp("3"),
        },

        contentItemLeftIcon: {
            width: hp(6),
            height: hp(6),
            resizeMode: "contain"
        },

        weightPriceContainer: {
            flexDirection: "row",
            marginTop: hp(0.5),
        },

        weightContainer: {
            borderRightWidth: 1,
            borderRightColor: colors.borderColorLight,
        },

        contentContainerButton: {
            width: "100%",
            padding: hp(3),
            alignSelf: "center"
        },

        titleText: {
            fontSize: Typography.P3,
            fontFamily: fonts.RUBIK_MEDIUM,
            color: colors.headingColor
        },

        weightText: {
            fontSize: Typography.P7,
            fontFamily: fonts.RUBIK_REGULAR,
            color: colors.subHeadingColor,
            marginRight: wp(2),
        },

        priceText: {
            fontSize: Typography.P7,
            fontFamily: fonts.RUBIK_REGULAR,
            color: colors.activeColor,
            paddingLeft: wp(2),
        },

        categoriesTitle: {
            fontFamily: fonts.RUBIK_REGULAR,
            fontSize: 20,
            color: colors.headingColor,
            fontWeight: "bold",
            marginVertical: 5
        },

        categoriesContainer:{
            borderBottomColor: "#a5a6aa",
            borderBottomWidth: hp("0.5"),
            paddingVertical: hp("5")
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
            fontFamily: fonts.RUBIK_MEDIUM,
            fontSize: Typography.P2,
            color: colors.headingColor
        },

        imageContainer: {
        position: "relative",
        width: wp("50%"),
        transformStyle: "preserve-3d",
        transform: [{perspective:'100px'}, {rotateY: "0deg"}],
         transition: "all 1s ease-in-out"
        },

        imageContainerSpan: {
        position: "absolute",
        top: 0,
        left: 0,
        width: wp("45%")
        },

        imageContainerSpanImg: {
        position: "absolute",
        left: 0,
        top: 0,
        width: wp("40%"),
        height: hp("20%")
        },

        carouselButtons: {
        position: "relative",
        width: wp("20%")
        },

        btnCarousel: {
        position: "absolute",
        backgroundColor: "green",
        paddingHorizontal: wp("2%"),
        paddingVertical: hp("3%"),
//        fontSize: "15px",
//        bottom: "8%",
        color: "white",
//        fontWeight: 600,
        borderRadius: wp("3"),
//        letterSpacing: "2px",
//        textTransform: "uppercase",
        },
//        .btn:hover { filter: brightness(1.5); }
//        .btn:active { transform: scale(0.95);
//        }

        prevBtnCarousel: {
            left: wp("20%")
        },

        nextBtnCarousel: {
            right: wp("20%")
        }

    }

}

