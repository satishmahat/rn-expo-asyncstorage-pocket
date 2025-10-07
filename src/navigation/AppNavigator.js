import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Create from "../screens/Create";
import Insights from "../screens/Insights";
import Category from "../screens/Category";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Create" component={Create} />
            <Tab.Screen name="Insights" component={Insights} />
        </Tab.Navigator>
    )
}

export default function AppNavigator() {
    return (
        <Stack.Navigator>   
            <Stack.Screen name="BottomTabs" component={MyTabs} />
            <Stack.Screen name="Category" component={Category} options={{ presentation: 'modal', headerShown: false }} />
        </Stack.Navigator>
    )
}