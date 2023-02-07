import React from "react";
import { useWindowDimensions, View, Text, FlatList } from "react-native";
import { createImageProgress } from 'react-native-image-progress';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import { CATEGORIES } from "../constants/data";
import BaseView from "../components/BaseView";
import FastImage from "react-native-fast-image";
import { startCase } from "lodash";
import TouchableScale from "../components/TouchableScale";
import { getConfigState } from "../redux/selectors";
import Banner from "../ads/Banner";

const Image = createImageProgress(FastImage);

export default Top = () => {
  const { config } = useSelector(getConfigState);
  const { width } = useWindowDimensions();

  return (
    <BaseView>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <Banner ADMOB_BANNER_ID={config.ADMOB_BANNER_DETAIL} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CATEGORIES.slice(0, 10)}
          renderItem={(props) => {
            return (
              <CategoryItem width={width * 0.9} height={width * 1.2} {...props} />
            )
          }}
        />
      </View>

    </BaseView >
  );
};

const CategoryItem = (props) => {
  const navigation = useNavigation();
  const { width, height, item, index } = props;
  return (
    <TouchableScale onPress={() => navigation.push('Category', item)} style={{ flex: 1, padding: 10 }} >
      <View style={{ ...STYLES.shadow, backgroundColor: COLORS.white, shadowRadius: 5, borderRadius: 20, shadowOpacity: 0.4, flex: 1 }}>
        <View style={{ flex: 1, overflow: 'hidden', borderRadius: 20 }}>
          <Image source={{ uri: item.image }} style={{ width: width, height: height, borderRadius: 20 }} />
          <View style={{ position: 'absolute', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 50 }}>
            <Text style={{ ...FONTS.w800, fontSize: 20, color: COLORS.white }}>
              {index + 1}
            </Text>
          </View>
          <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: COLORS.background }}>
            <Text style={{ ...FONTS.w700, fontSize: 18, color: COLORS.black }}>
              {startCase(item.name)}
            </Text>
            <View style={{ height: 10 }} />
            <Text style={{ ...FONTS.w500, fontSize: 18, color: COLORS.primary }}>
              ★ {item.count} quotes ★
            </Text>
          </View>
        </View>
      </View>
    </TouchableScale>
  );
}
