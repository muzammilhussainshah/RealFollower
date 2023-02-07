import React, { } from "react";
import { useWindowDimensions, View, Text, ScrollView, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import BaseView from "../components/BaseView";
import TouchableScale from "../components/TouchableScale";
import { getFavoritesState } from "../redux/selectors";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-root-toast";
import { addFavorite, removeFavorite } from "../redux/actions";

export default Top = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const favorites = useSelector(getFavoritesState);

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

  return (
    <BaseView>
      <View style={{ flex: 1, width: '100%' }}>
        {
          favorites.length == 0
            ?
            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="heart-dislike" color={COLORS.red} size={60} />
              <Text style={{ paddingVertical: 10, ...FONTS.w400, fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
                Empty favorite quotes
              </Text>
            </View>
            :
            <FlatList
              showsVerticalScrollIndicator={false}
              data={favorites}
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
        }
      </View>

    </BaseView >
  );
};
