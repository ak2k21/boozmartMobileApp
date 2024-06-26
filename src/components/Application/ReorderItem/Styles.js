import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../../branding/App_config";

const Typography = AppConfig.typography.default;
const Fonts = AppConfig.fonts.default;

let Styles = {
    categoryItemContainer: {
        width: wp("29%"),
        height: hp("25"),
        marginRight: wp("2"),
        marginBottom: wp("2"),
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: "center"
    },
    backgroundImageStyle: {
        borderRadius: wp("2")
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        alignItems: "center",

    },
    primaryTitle: {
        textTransform: "uppercase",
        fontFamily: Fonts.RUBIK_MEDIUM,
        fontSize: Typography.P4,
        height: hp("2"),
        overflow: "hidden",
        marginVertical: hp("1")
    },
    secondaryTitle: {
        textTransform: "uppercase",
        fontFamily: Fonts.RUBIK_REGULAR,
        fontSize: Typography.P4,
        color: "red",
        marginBottom: hp("1")
    },
    icon: {
        width: hp(8),
        height: hp(8),
        borderRadius: hp(4),
        justifyContent: "center",
        alignItems: "center"
    },
     foodItemBox_rating:{
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
}

export default Styles;
