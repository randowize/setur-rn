/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs'
import { typography, color } from '@theme'
import { HomeScreen, SettingsScreen } from '../features'
import { translate } from '@modules/i18n'

const Tab = createMaterialTopTabNavigator()

const CustomTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: color.palette.white,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel ?? options.title ?? route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const inputRange = state.routes.map((_, i) => i)
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        })

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: isFocused ? 1 : 1,
              borderBottomColor: color.palette.redDim,
              backgroundColor: isFocused ? color.palette.red : undefined,
              borderTopRightRadius: index === 0 && isFocused ? 5 : 0,
              borderTopLeftRadius: index === 1 && isFocused ? 5 : 0,
            }}
          >
            <Animated.Text
              style={{
                opacity,
                textTransform: 'uppercase',
                fontFamily: typography.primary,
                fontWeight: isFocused ? 'bold' : 'normal',
                color: isFocused ? color.palette.white : color.palette.black,
                paddingVertical: 10,
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: translate('tabs.home') }} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: translate('tabs.settings') }}
      />
    </Tab.Navigator>
  )
}
