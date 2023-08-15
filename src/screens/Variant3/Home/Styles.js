import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppConfig from "../../../../branding/App_config";

const fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;

export const Styles = function (styles, scheme, colors) {

    return {
        mainWrapper: {
            flex: 1,
            alignItems: "center",
            backgroundColor: scheme === "dark" ? colors.primaryBackground : colors.secondaryBackground
        },

        mainContainer: {
            flex: 1,
            width: styles.gridWidth,
            alignSelf: "center",
            marginTop: hp(3)
        },

        categoryContainer: {
            width: styles.gridWidth,
            alignSelf: "center",
            marginTop: hp(4),
            marginBottom: hp(2)
        },

        categoriesContainer:{
            marginTop: hp(-2),
            marginBottom: hp(-1)
        },

        container: {
            width: styles.gridWidth,
            alignSelf: "center",
            height: hp("50%")
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

        sectionHeadingIcon: {
            alignSelf: "center"
        },

        categorySliderActiveText: {
            fontFamily: fonts.RUBIK_MEDIUM,
            fontSize: Typography.P2,
            color: colors.headingColor,
            marginHorizontal: 15
        },

        categorySliderInActiveText: {
            fontFamily: fonts.RUBIK_REGULAR,
            fontSize: Typography.P3,
            color: colors.headingColor,
            marginHorizontal: 15
        },

        box: {
            height: hp("20%"),
            width: wp('30%'),
            marginRight: hp('2%'),
            backgroundColor: "white",
            boxShadow: "10px 1px 10px black",
            border: "1px solid black"
        },

        categoriesImg:{
            height: "80%",
            width: "100%"
        },

        categoriesImages:{
            height: "80%",
            width: "100%"
        },

        categoryText:{
            fontFamily: fonts.RUBIK_REGULAR,
            fontSize: Typography.P3,
            color: colors.headingColor,
            marginHorizontal: 15,
            textAlign: "center",
        },

        categoriesTitle: {
            fontFamily: fonts.RUBIK_REGULAR,
            fontSize: 20,
            color: colors.headingColor,
            fontWeight: "bold",
            marginVertical: 5
        },
        categoryItem: {
            borderRadius: 5,
            margin: hp("1"),
            backgroundColor: colors.primaryBackground
        },
        BuyAgainTitle: {
            fontFamily: fonts.RUBIK_REGULAR,
            fontSize: 19,
            color: colors.headingColor,
            fontWeight: "bold",
            marginBottom: 5
        },

        sectionContainer: {
            marginBottom: hp(1)
        },

        categoryFoodItemParent: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: hp(1)
        },

        categoryFoodItem: {
            width: "49%",
        },

        secondaryBannerContainer: {
            width: "48.5%",
            height: hp(30),
            resizeMode: "cover"
        },

        tertiaryBannerContainer: {
            width: "100%",
            height: hp(30),
            borderRadius: hp(0.75),
            marginBottom: hp("2"),
            // marginTop: -wp(2),
            resizeMode: "cover",
        },

        promotionSliderContainer: {
            height: hp("25%"),
            borderRadius: hp(0.75),
            alignSelf: "center",
            backgroundColor: "black",
        },
        imgMargin: {
            marginVertical: "5%",
        },

        promotionSliderActiveDot: {
            width: hp(2),
            height: hp(0.8),
            marginRight: -hp(1)
        },

        promotionSliderInActiveDot: {
            width: hp(0.8),
            height: hp(0.8),
        },

        promotionPaginationContainer: {
            position: "static",
            bottom: 0,
            zIndex: 1
        }
    }


}
