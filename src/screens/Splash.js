import React, { useEffect, useRef } from "react";
import { View, Alert, useWindowDimensions, Image } from "react-native";
import { requestTrackingPermission } from "react-native-tracking-transparency";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ApiService from "../services/api.service";
import MobileAds, { TestIds } from "react-native-google-mobile-ads";
import RNBootSplash from "react-native-bootsplash";
import { IntertitialService } from "../ads/InterstitialService";
import { setConfig } from "../redux/actions";
import { COLORS } from "../constants/theme";

export default Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const startLoadTime = useRef((new Date()).getTime());

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 1000);
    initConfig();
  }, []);

  const navigate = () => {
    const now = (new Date()).getTime();
    const time = now - startLoadTime.current;
    if (time < 3000) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tab" }],
        });
      }, 3000 - time);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tab" }],
      });
    }
  };

  const showInterSplash = (config) => {
    const interService = new IntertitialService(
      null,
      config.ADMOB_INTER_SPLASH,
      config,
    );
    interService.loadAdmob(true, () => {
      navigate();
    }, () => {
      navigate();
    });
  }

  const initConfig = async () => {
    try {
      await requestTrackingPermission();

      let config = await ApiService.getConfig();

      if (__DEV__) {
        config = {
          OPEN_ADS: TestIds.APP_OPEN,
          ADMOB_BANNER_HOME: TestIds.BANNER,
          ADMOB_BANNER_DETAIL: TestIds.BANNER,
          ADMOB_INTER_SPLASH: TestIds.INTERSTITIAL,
          ADMOB_INTER_DETAIL: TestIds.INTERSTITIAL,
        }
      }

      dispatch(setConfig(config));
      await MobileAds().initialize();

      if (config.ADMOB_INTER_SPLASH) {
        showInterSplash(config);
      } else {
        dispatch(setConfig(config));
        navigate();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Somthing wrong", "Please check your internet connection", [
        { text: "Retry", onPress: () => initConfig() },
      ]);
      return;
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }} >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
        <Image source={require('../assets/images/splash.gif')} style={{ width: width, height: width }} />
      </View>
    </View>
  );
};
