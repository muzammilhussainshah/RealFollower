/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Dimensions } from "react-native";
// import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const { width, height } = Dimensions.get("window");

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ADMOB_BANNER_ID: props.ADMOB_BANNER_ID,
    };
    this.onAdmobBannerError = this.onAdmobBannerError.bind(this);
  }

  onAdmobBannerError(e) {
    console.warn("admob interstitial failed", e);
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          marginTop: 2,
          marginBottom: 2,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: 'red',
        }}
      >
        {this.props.ADMOB_BANNER_ID && (
          <BannerAd
            size={BannerAdSize.BANNER}
            unitId={this.props.ADMOB_BANNER_ID}
            onAdFailedToLoad={this.onAdmobBannerError}
          />
        )}
      </View>
    );
  }
}

export default Banner;
