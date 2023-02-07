import React, { useEffect, useRef } from "react";
import { AppState, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";
import Tab from "./Tab";
import { useSelector } from "react-redux";
import { getConfigState } from "../redux/selectors";
import { store } from "../redux/store";
import { AdEventType, AppOpenAd } from "react-native-google-mobile-ads";
import { COLORS, FONTS } from "../constants/theme";
import Category from "../screens/Category";
import Search from "../screens/Search";

const Stack = createStackNavigator();

const theme = {
	dark: false,
	colors: COLORS
};

export default Navigation = () => {

	const { config } = useSelector(getConfigState);
	const appState = useRef(AppState.currentState);
	const adLoaded = useRef(false);
	const appOpenAd = useRef(null);
	const appOpenListener = useRef(null);

	useEffect(() => {

		const appStateListener = AppState.addEventListener("change", nextAppState => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === "active"
			) {
				const appConfig = store.getState().config.config;
				if (appConfig && appConfig.OPEN_ADS) {
					try {
						if (adLoaded.current) {
							appOpenAd.current.show();
						} else {
							appOpenAd.current.load();
						}
					} catch (error) {
						console.warn(error);
					}
				}
			}
			appState.current = nextAppState;
		});

		return () => {
			appStateListener.remove();
			if (appOpenListener && appOpenListener.current) {
				appOpenListener.current();
			}
		};
	}, []);

	useEffect(() => {
		if (config && config.OPEN_ADS) {
			appOpenAd.current = AppOpenAd.createForAdRequest(config.OPEN_ADS);
			appOpenListener.current = appOpenAd.current.addAdEventListener(AdEventType.CLOSED, () => {
				appOpenAd.current.load();
				adLoaded.current = false;
			});
			appOpenListener.current = appOpenAd.current.addAdEventListener(AdEventType.LOADED, (e) => {
				adLoaded.current = true;
			});
			appOpenAd.current.load();
			adLoaded.current = false;
		}
	}, [config]);

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer theme={theme}>
				<Stack.Navigator initialRouteName={"Splash"} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Search" component={Search} options={{
						headerShown: true,
						headerTitleStyle: {
							...FONTS.w700,
							color: COLORS.black,
							fontSize: 20
						},
						headerMode: 'screen',
						headerBackTitle: 'Search'
					}} />
					<Stack.Screen name="Splash" component={Splash} />
					<Stack.Screen name="Tab" component={Tab} />
					<Stack.Screen
						name="Category"
						component={Category}
						options={{
							headerShown: true,
							headerTitleStyle: {
								...FONTS.w700,
								color: COLORS.black,
								fontSize: 20
							},
							headerMode: 'screen',
							headerBackTitle: ' '
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}