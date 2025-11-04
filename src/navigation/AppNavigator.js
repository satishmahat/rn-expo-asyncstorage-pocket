import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from "react-native";
import tw from "../utils/tw";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screens/Home";
import Create from "../screens/Create";
import Insights from "../screens/Insights";
import Category from "../screens/Category";
import Transactions from "../screens/Transactions";
import Welcome from "../onboarding/Welcome";
import NameInput from "../onboarding/NameInput";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useExpense } from "../context/ExpenseContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient 
        colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgb(255, 255, 255, 0.9)']} // Transparent → White
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 10) + 0 }]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Logs': iconName = 'book'; break;
            case 'Create': iconName = 'plus-circle'; break;
            case 'Stats': iconName = 'pie-chart'; break;
            default: iconName = 'home';
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={styles.tabButton}
            >
              <Animated.View style={[styles.iconWrapper, isFocused && styles.activeTabPill]}>
                <AntDesign 
                  name={iconName} 
                  size={isFocused ? 22 : 24} 
                  color={isFocused ? "black" : "#cccccc"} 
                />
                {isFocused && <Text style={[styles.activeLabel, tw`font-syne`]}>{label}</Text>}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator 
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Logs" component={Transactions} options={{ tabBarLabel: 'Logs' }} />
      <Tab.Screen name="Create" component={Create} options={{ tabBarLabel: 'Create' }} />
      <Tab.Screen name="Stats" component={Insights} options={{ tabBarLabel: 'Stats' }} />
    </Tab.Navigator>
  );
}

function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="NameInput" component={NameInput} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { hasCompletedOnboarding, isLoading } = useExpense();

  // Show loading screen while checking onboarding status
  if (isLoading || hasCompletedOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c1b7' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingNavigator />;
  }

  // Show main app if onboarding is completed
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={MyTabs} />
      <Stack.Screen name="Category" component={Category} options={{ presentation: 'modal', headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    // backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeTabPill: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    gap: 6,
  },
  activeLabel: {
    color: '#1F2937',
    fontSize: 12,
    fontWeight: '400',
  },
});
