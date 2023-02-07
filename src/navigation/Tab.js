import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "../screens/Home";
import { COLORS, FONTS, STYLES } from "../constants/theme";
import { Dimensions, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../screens/Categories";
import Top from "../screens/Top";
import Favorites from "../screens/Favorites";
import Search from "../screens/Search";

const BottomTab = createBottomTabNavigator();

export default Tab = () => {
	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: true,
				headerTitleStyle: {
					...FONTS.w700,
					color: COLORS.black,
					fontSize: 20
				}
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<BottomTab.Screen
				name="Categories"
				component={Categories}
			/>
			<BottomTab.Screen
				name="Search"
				component={Search}
			/>
			<BottomTab.Screen
				name="Top"
				component={Top}
			/>
			<BottomTab.Screen
				name="Favorites"
				component={Favorites}
				options={{ tabBarIcon: ({ focused, color, size }) => (<AntDesign name='appstore-o' color={color} size={size} />) }}
			/>
		</BottomTab.Navigator>
	);
}

export const tabHeight = Dimensions.get('window').height * 0.09;

const TabBar = ({ state, descriptors, navigation }) => {
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	return (
		<View style={{ ...STYLES.shadow, shadowOpacity: 0.2, backgroundColor: COLORS.background, flex: 1, width: '100%', height: tabHeight, position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '4%' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({ name: route.name, merge: true });
					}
				};

				var icon = null;

				switch (route.name) {
					case 'Home':
						icon = (<AntDesign name='appstore-o' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;
					case 'Categories':
						icon = (<Entypo name='compass' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;
					case 'Search':
						icon = (<Ionicons name='search' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;
					case 'Top':
						icon = (<Entypo name='trophy' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;
					case 'Favorites':
						icon = (<Ionicons name='heart' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;

					default:
						icon = (<AntDesign name='appstore-o' color={isFocused ? COLORS.white : COLORS.secondary} size={24} />);
						break;
				}

				return (
					<TouchableOpacity
						key={route.name}
						activeOpacity={1}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
					>
						{
							isFocused
								?
								<View style={{ position: 'absolute', top: -16, paddingTop: 32, height: tabHeight + 16, paddingHorizontal: width / 30, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: insets.bottom, backgroundColor: COLORS.primary }}>
									{icon}
								</View>
								:
								<View style={{ paddingTop: 16, paddingBottom: insets.bottom }}>
									{icon}
								</View>
						}
					</TouchableOpacity>
				);
			})}
		</View>
	)
}