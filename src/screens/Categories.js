import React, { useEffect } from "react";
import { useWindowDimensions, View, Text } from "react-native";
import { createImageProgress } from 'react-native-image-progress';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import Carousel from "react-native-reanimated-carousel";
import { CATEGORIES } from "../constants/data";
import Animated from "react-native-reanimated";
import BaseView from "../components/BaseView";
import FastImage from "react-native-fast-image";
import { shuffle, startCase } from "lodash";
import TouchableScale from "../components/TouchableScale";
import { getConfigState } from "../redux/selectors";
import Banner from "../ads/Banner";

const Image = createImageProgress(FastImage);

export default Categories = () => {
  const { config } = useSelector(getConfigState);
  const { width, height } = useWindowDimensions();

  const PAGE_HEIGHT = height * 0.7;

  useEffect(() => {

  }, []);

  return (
    <BaseView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Banner ADMOB_BANNER_ID={config.ADMOB_BANNER_HOME} />
        <Carousel
          width={width}
          height={PAGE_HEIGHT}
          loop
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 90,
          }}
          data={shuffle(CATEGORIES)}
          renderItem={(props) => (<CategoryItem width={width} height={PAGE_HEIGHT} {...props} />)}
        />
      </View>
    </BaseView>
  );
};

const CategoryItem = (props) => {
  const navigation = useNavigation();
  const { width, height, item, index, testID, ...animatedViewProps } = props;

  return (
    <TouchableScale onPress={() => navigation.push('Category', item)} style={{ flex: 1 }} >
      <Animated.View testID={testID} style={{ ...STYLES.shadow, backgroundColor: COLORS.white, shadowRadius: 10, borderRadius: 20, shadowOpacity: 0.5, flex: 1 }} {...animatedViewProps}>
        <View style={{ flex: 1, overflow: 'hidden', borderRadius: 20 }}>
          <Image source={{ uri: item.image }} style={{ width: width, height: height, borderRadius: 20 }} />
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
      </Animated.View>
    </TouchableScale>
  );
}
