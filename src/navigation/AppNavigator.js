import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Create from "../screens/Create";
import Insights from "../screens/Insights";
import Category from "../screens/Category";
import { AntDesign } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size, focused}) =>(<AntDesign name="home" color={color} size={24} />)}}/>
            <Tab.Screen name="Create" component={Create} options={{tabBarIcon: ({color, size, focused}) =>(<AntDesign name="plus-circle" color={color} size={24} />)}}/>
            <Tab.Screen name="Insights" component={Insights} options={{tabBarIcon: ({color, size, focused}) =>(<AntDesign name="pie-chart" color={color} size={24} />)}}/>
        </Tab.Navigator>    
    )
}

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >   
            <Stack.Screen name="BottomTabs" component={MyTabs}/>
            <Stack.Screen name="Category" component={Category} options={{ presentation: 'modal', headerShown: false }} />
        </Stack.Navigator>
    )
}