import React, { useEffect } from "react";
import { Image, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { tabHeight } from "../navigation/Tab";

export default BaseView = ({ children, noTab = false }) => {
    const insets = useSafeAreaInsets();
    const paddingBottom = noTab ? insets.bottom : tabHeight;
    return (
        <View style={{ flex: 1, paddingBottom: paddingBottom, backgroundColor: COLORS.background }}>
            {children}
        </View>
    );
}