import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View} from "react-native";

import {Text} from 'react-native-elements';
import Routes from "../../../navigation/Routes";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";


export const SubCategory = (props) => {

    //Theme based styling and colors
    const {colors} = useTheme();
    const scheme = useColorScheme();
    const itemStyles = Styles(scheme, colors);

    const [selectedSubCategory, setSelectedSubCategory] = useState("")

    //Internal states
    const _selectedSubCategory = (selected) => {
        setSelectedSubCategory(selected)
    };

    return (

            <View style={itemStyles.subCategoryContainer}>
                <Text style={{fontWeight: "bold", textAlign: "center"}}>{props.subCategory}</Text>
            </View>

    );
}
