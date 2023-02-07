import React, { useEffect, useState } from "react";
import { useWindowDimensions, View, Text, ImageBackground, ScrollView, FlatList } from "react-native";
import { createImageProgress } from 'react-native-image-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import { CATEGORIES } from "../constants/data";
import BaseView from "../components/BaseView";
import ApiService from "../services/api.service";
import FastImage from "react-native-fast-image";
import { findIndex, shuffle, startCase } from "lodash";
import TouchableScale from "../components/TouchableScale";
import { getConfigState, getFavoritesState } from "../redux/selectors";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-root-toast";
import { addFavorite, removeFavorite } from "../redux/actions";
import Banner from "../ads/Banner";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const randomColor = require('randomcolor');
const Image = createImageProgress(FastImage);

export default Home = () => {
  const dispatch = useDispatch();
  const { config } = useSelector(getConfigState);
  const favorites = useSelector(getFavoritesState);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [quote, setQuote] = useState({});
  const [randomQuotes, setRandomQuotes] = useState([]);

  useEffect(() => {
    ApiService.getQuoteOfTheDay().then((res) => {
      const body = res.quote.body || res.quote.lines.map((line) => line.body).join("\n");
      const author = res.quote.author || res.quote.lines[0].author;
      setQuote({ ...res.quote, body, author });
    });
    ApiService.getRandomQuotes().then((res) => {
      const backgroundColors = randomColor({ count: res.quotes.length, luminosity: 'dark' })
      setRandomQuotes(res.quotes.map((quote, i) => ({ ...quote, backgroundColor: backgroundColors[i] })));
    });
  }, []);

  const copy = (text) => {
    Clipboard.setString(text);
    Toast.show('Quote copied');
  }

  const toggleFavorite = (item, value) => {
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

  const isFavorite = findIndex(favorites, { 'id': quote.id }) >= 0;

  return (
    <BaseView >

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top }}>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ width: width - 40, height: (width - 40) * 0.75, ...STYLES.shadow, backgroundColor: COLORS.white, shadowRadius: 5, borderRadius: 20, shadowOpacity: 0.4 }}>
            <View style={{ width: width - 40, height: (width - 40) * 0.75, borderRadius: 20, overflow: 'hidden' }}>
              <ImageBackground
                source={require('../assets/images/quote-of-the-day.jpg')}
                style={{ width: width - 40, height: (width - 40) * 0.75, borderRadius: 20 }}
              >
                <View style={{ position: 'absolute', width: width - 40, height: (width - 40) * 0.75, backgroundColor: COLORS.background + '66' }}>
                  <Text style={{ ...STYLES.textShadow, ...FONTS.w700, color: COLORS.black, fontSize: 20, paddingHorizontal: 10 }}>
                    Quote of the day
                  </Text>
                  <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <Text style={{ ...STYLES.textShadow, ...FONTS.w600, fontSize: 18, color: COLORS.black, textAlign: 'center' }}>
                      {quote.body}
                    </Text>
                  </ScrollView>
                  <View style={{ width: '100%', alignItems: 'flex-end', padding: 10 }}>
                    <Text style={{ ...STYLES.textShadow, ...FONTS.w800, fontSize: 16, color: COLORS.black, paddingRight: 10 }}>
                      - {quote.author}
                    </Text>
                  </View>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableScale onPress={() => toggleFavorite(quote, isFavorite)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 50, borderBottomRightRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary }}>
                      <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? COLORS.red : COLORS.white} />
                    </TouchableScale>
                    <TouchableScale onPress={() => copy(quote.body)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary }}>
                      <Ionicons name='copy' size={16} color={COLORS.white} />
                    </TouchableScale>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>

        <Banner ADMOB_BANNER_ID={config.ADMOB_BANNER_HOME} />

        <Text style={{ padding: 20, paddingBottom: 0, ...FONTS.w700, color: COLORS.black, fontSize: 20 }}>
          New Updated
        </Text>
        <FlatList
          contentContainerStyle={{ paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
          data={shuffle(CATEGORIES).slice(0, 10)}
          horizontal
          renderItem={(props) => {
            return (
              <CategoryItem width={width * 0.6} height={width * 0.8} {...props} />
            )
          }}
        />

        <Text style={{ padding: 20, paddingBottom: 0, ...FONTS.w700, color: COLORS.black, fontSize: 20 }}>
          Random Quotes
        </Text>
        <FlatList
          contentContainerStyle={{ paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
          data={randomQuotes}
          horizontal
          renderItem={({ item, index }) => {
            const body = item.body || item.lines.map((line) => line.body).join("\n");
            const author = item.author || item.lines[0].author;
            const isFavorite = findIndex(favorites, { 'id': item.id }) >= 0;
            return (
              <View style={{ paddingVertical: 10 }}>
                <View style={{ ...STYLES.shadow, shadowRadius: 5, shadowOpacity: 0.4, marginLeft: 20, backgroundColor: item.backgroundColor, width: width * 0.6, height: width * 0.6, borderRadius: 20 }}>
                  <View style={{ flex: 1, width: width * 0.6, height: width * 0.6, borderRadius: 20, overflow: 'hidden' }}>
                    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Text style={{ ...FONTS.w600, fontSize: 16, color: COLORS.white, textAlign: 'center' }}>
                        {body}
                      </Text>
                    </ScrollView>
                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                      <Text style={{ ...FONTS.w800, fontSize: 14, color: COLORS.white, paddingRight: 10 }}>
                        - {author}
                      </Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <TouchableScale onPress={() => toggleFavorite(item, isFavorite)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 50, borderBottomRightRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary }}>
                        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? COLORS.red : COLORS.white} />
                      </TouchableScale>
                      <TouchableScale onPress={() => copy(body)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary }}>
                        <Ionicons name='copy' size={16} color={COLORS.white} />
                      </TouchableScale>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        />
        <View style={{ height: 20 }} />
      </ScrollView>
    </BaseView >
  );
};

const CategoryItem = (props) => {
  const navigation = useNavigation();
  const { width, height, item, index } = props;

  return (
    <TouchableScale onPress={() => navigation.push('Category', item)} style={{ flex: 1, marginLeft: 20, paddingVertical: 10 }} >
      <View style={{ ...STYLES.shadow, backgroundColor: COLORS.white, shadowRadius: 5, borderRadius: 20, shadowOpacity: 0.4, flex: 1 }}>
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
      </View>
    </TouchableScale>
  );
}
