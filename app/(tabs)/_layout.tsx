import { AntDesign } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { Tabs } from 'expo-router'
import React from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SafeScreen from '../../components/SafeScreen'

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.95)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
        paddingHorizontal: 42,
        // paddingHorizontal: 16,
        paddingBottom: Math.max(insets.bottom, 10),
      }}
    >
      <View
        className="flex-row bg-black rounded-[30px] py-[10px] px-3 items-center justify-around w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 10,
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

          let iconName: keyof typeof AntDesign.glyphMap = 'home'
          switch (route.name) {
            case 'index':
              iconName = 'home'
              break
            case 'transactions':
              iconName = 'book'
              break
            case 'create':
              iconName = 'plus-circle'
              break
            default:
              iconName = 'home'
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center"
            >
              <Animated.View
                className={`items-center justify-center flex-row ${
                  isFocused
                    ? 'bg-white rounded-[20px] px-4 py-2 gap-1.5'
                    : 'px-3 py-2'
                }`}
                style={
                  isFocused
                    ? {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5,
                      }
                    : undefined
                }
              >
                <AntDesign
                  name={iconName}
                  size={isFocused ? 22 : 24}
                  color={isFocused ? '#1F2937' : '#cccccc'}
                />
                {isFocused && (
                  <Text className="text-[#1F2937] text-xs font-normal">
                    {typeof label === 'string' ? label : route.name}
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          )
        })}
      </View>
    </LinearGradient>
  )
}

export default function TabsLayout() {
  return (
    <SafeScreen>
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false}}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: 'Create',
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarLabel: 'Logs',
          title: 'Logs',
        }}
      />  
    </Tabs>
    </SafeScreen>
  )
}
