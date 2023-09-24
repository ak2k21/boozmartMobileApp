import React from 'react';
import { View } from 'react-native';
import BaseView from "../BaseView"
import { Text } from "react-native-elements";
import Routes from "../../navigation/Routes";
import AppButton from "../../components/Application/AppButton/View";
import { CommonActions, StackActions, useTheme } from "@react-navigation/native";
import { Styles } from "./Styles"
import { SvgIcon } from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import Config from "../../../branding/Boozemart2/configuration/Config";

export const OrderCancelled = (props) => {

    const { colors } = useTheme();
    const screenStyles = Styles(colors);

    return (
        <>
            <BaseView
                navigation={props.navigation}
                title={"Order Success"}
                applyBottomSafeArea
                childView={() => {
                    return (
                        <View style={screenStyles.container}>
                            <View style={screenStyles.mainContainer}>
                                <SvgIcon type={IconNames.BagShopping} width={70} height={70} color={colors.activeColor} />
                                <Text style={screenStyles.titleText}>Your Order #{props.route.params.orderId} has been cancelled.</Text>
                                <Text style={screenStyles.subtitleText}>You'll receive the payment in 5-7 business days.</Text>
                            </View>
                            <View style={screenStyles.bottomContainer}>
                                <AppButton
                                    title={'Back To Home'}
                                    onPress={() => {
                                        props.navigation.dispatch(
                                            CommonActions.reset({
                                              index: 0,
                                              routes: [{ name: Routes.HOME_VARIANT3 }]
                                            })
                                          );
                                    }}
                                />
                            </View>
                        </View>
                    );
                }}
            />
        </>
    );
}
