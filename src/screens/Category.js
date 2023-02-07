import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions, View, Text, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createImageProgress } from 'react-native-image-progress';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/theme";
import Carousel from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import BaseView from "../components/BaseView";
import ApiService from "../services/api.service";
import FastImage from "react-native-fast-image";
import { findIndex, startCase } from "lodash";
import TouchableScale from "../components/TouchableScale";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import { getConfigState, getFavoritesState } from "../redux/selectors";
import { addFavorite, removeFavorite } from "../redux/actions";
import Banner from "../ads/Banner";
import { IntertitialService } from "../ads/InterstitialService";

export default Category = ({ route }) => {
  const { name, permalink } = route.params
  const navigation = useNavigation();
  const { config } = useSelector(getConfigState);
  const { width } = useWindowDimensions();
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const carouselRef = useRef();

  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = width * 1.4;
  const ITEM_WIDTH = width * 0.8;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.4;

  useEffect(() => {
    navigation.setOptions({
      title: startCase(name)
    });
    getData();
  }, []);

  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
      setLoading(true);
      if (config.ADMOB_INTER_DETAIL) {
        e.preventDefault();
        const interService = new IntertitialService(
          null,
          config.ADMOB_INTER_DETAIL,
          config,
        );
        interService.loadAdmob(true, () => {
          navigation.dispatch(e.data.action);
        }, () => {
          navigation.dispatch(e.data.action);
        });
      }
    });
    return beforeRemoveListener;
  }, [navigation]);

  const getData = () => {
    ApiService.getQuoteTag(permalink, page).then((res) => {
      if (res.quotes.length > 0 && res.quotes[0].body != 'No quotes found') {
        setPage(res.page + 1);
        setLastPage(res.last_page);
        setQuotes([...quotes, ...res.quotes]);
      }
    });
  }

  return (
    <BaseView noTab={true}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Banner ADMOB_BANNER_ID={config.ADMOB_BANNER_DETAIL} />
        <Carousel
          vertical={true}
          ref={carouselRef}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 0,
          }}
          onSnapToItem={(i) => {
            if (!lastPage && i + 1 == quotes.length) {
              getData();
            }
            setIndex(i);
          }}
          data={quotes}
          renderItem={(props) => (<QuoteItem width={ITEM_WIDTH} height={ITEM_HEIGHT} {...props} />)}
        />
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableScale onPress={() => carouselRef.current.prev()} style={{ padding: 10 }}>
          <Ionicons name='arrow-back-circle-outline' size={60} color={COLORS.primary} />
        </TouchableScale>
        <TouchableScale onPress={() => carouselRef.current.next()} style={{ padding: 10 }}>
          <Ionicons name='arrow-forward-circle-outline' size={60} color={COLORS.primary} />
        </TouchableScale>
      </View>
      <View style={{ flex: 1, width: '100%', padding: 20, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Text style={{ ...FONTS.w600, fontSize: 16, color: COLORS.black }}>
          <Text style={{ ...FONTS.w800, fontSize: 16, color: COLORS.black }}>
            {index + 1}
          </Text>
          {' / ' + quotes.length}
        </Text>
      </View>
      {
        loading
        &&
        <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.black + 'aa' }}>
          <ActivityIndicator color={COLORS.primary} size='large' />
        </View>
      }
    </BaseView>
  );
};

const QuoteItem = (props) => {
  const { width, height, item, index, testID, ...animatedViewProps } = props;
  const padding = width * 0.13;
  const favorites = useSelector(getFavoritesState);
  const dispatch = useDispatch();

  const isFavorite = useCallback(() => {
    return findIndex(favorites, { 'id': item.id }) >= 0;
  }, [favorites]);

  const copy = (text) => {
    Clipboard.setString(text);
    Toast.show('Quote copied');
  }

  const toggleFavorite = (value) => {
    var message = '';
    if (value) {
      dispatch(removeFavorite(item));
      message = 'Quote removed from favorites';
    } else {
      dispatch(addFavorite(item));
      message = 'Quote added to favorites';
    }
    Toast.show(message)
  }

  const body = item.body || (item?.lines.map((line) => line.body).join("\n"));

  const author = item.author || item?.lines[0].author;

  return (
    <Animated.View testID={testID} style={{ backgroundColor: COLORS.background, flex: 1, alignItems: 'center', justifyContent: 'center' }} {...animatedViewProps}>
      <ImageBackground source={require('../assets/images/note.png')} style={{ width: width, height: height }} resizeMode='stretch'>

        <View style={{ flex: 1, padding: padding * 1.25, paddingBottom: padding * 2.75 }} >
          <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...FONTS.w500, fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
              {body}
            </Text>
          </ScrollView>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: padding, top: padding, padding: 4 }}>
          <MaterialCommunityIcons name='comment-quote-outline' size={padding * 1.5} color={COLORS.primary + '30'} />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: padding, bottom: padding * 2.25 }}>
          <Text style={{ ...FONTS.w800, fontSize: 14, color: COLORS.black, paddingRight: 10 }}>
            - {author}
          </Text>
        </View>
        <TouchableScale onPress={() => copy(body)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, bottom: padding, padding: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: COLORS.primary }}>
          <Text style={{ ...FONTS.w600, fontSize: 14, color: COLORS.white, paddingRight: 10 }}>
            Copy
          </Text>
          <Ionicons name='copy' size={16} color={COLORS.white} />
        </TouchableScale>
        <TouchableScale onPress={() => toggleFavorite(isFavorite())} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: padding, bottom: padding, padding: 4 }}>
          <Ionicons name={isFavorite() ? 'heart' : 'heart-outline'} size={24} color={isFavorite() ? COLORS.red : COLORS.primary} />
        </TouchableScale>
      </ImageBackground>
    </Animated.View >
  );
}