import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View, Text, ScrollView, FlatList, TextInput, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import BaseView from "../components/BaseView";
import ApiService from "../services/api.service";
import TouchableScale from "../components/TouchableScale";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-root-toast";
import { addFavorite, removeFavorite } from "../redux/actions";

const randomColor = require('randomcolor');

export default Search = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const searchRef = useRef();

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

  useEffect(() => {
    setTimeout(() => {
      searchRef.current.focus();
    }, 100);
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      ApiService.search(search).then((res) => {
        if (res.quotes.length > 0 && res.quotes[0].body != 'No quotes found') {
          const backgroundColors = randomColor({ count: res.quotes.length, luminosity: 'dark' })
          setResults(res.quotes.map((quote, i) => ({ ...quote, backgroundColor: backgroundColors[i] })));
        }
        setLoading(false);
      });
    }
  }, [search]);

  return (
    <BaseView>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary + '40', padding: 10, borderRadius: 50 }}>
            <Ionicons name='search' color={COLORS.secondary} size={20} />
            <TextInput
              ref={searchRef}
              style={{ flex: 1, paddingHorizontal: 10, ...FONTS.w500, fontSize: 14, color: COLORS.black }}
              value={search}
              onChangeText={setSearch}
              placeholder='Search quotes (min. 3 words)...'
              placeholderTextColor={COLORS.secondary}
            />
          </View>
        </View>
        {
          loading
            ?
            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.black + '80' }}>
              <ActivityIndicator color={COLORS.primary} size='large' />
            </View>
            :
            (
              results.length == 0 && search.length > 2
                ?
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name="search-off" color={COLORS.red} size={60} />
                  <Text style={{ paddingVertical: 10, ...FONTS.w400, fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
                    No quotes found.
                  </Text>
                </View>
                :
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={results}
                  renderItem={({ item, index }) => {

                    const body = item.body || item.lines.map((line) => line.body).join("\n");
                    const author = item.author || item.lines[0].author;
                    const itemWidth = width - 40;
                    const itemHeight = itemWidth * 3 / 4;
                    return (
                      <View style={{ paddingVertical: 10 }}>
                        <View style={{ ...STYLES.shadow, shadowRadius: 5, shadowOpacity: 0.4, marginLeft: 20, backgroundColor: item.backgroundColor, width: itemWidth, height: itemHeight, borderRadius: 20 }}>
                          <View style={{ flex: 1, width: itemWidth, height: itemHeight, borderRadius: 20, overflow: 'hidden' }}>
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
                              <TouchableScale onPress={() => toggleFavorite(item, true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 50, borderBottomRightRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary }}>
                                <Ionicons name={'heart'} size={18} color={COLORS.red} />
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
            )
        }
      </View>

    </BaseView >
  );
};
