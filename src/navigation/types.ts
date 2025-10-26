import {ParamListBase, RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export interface NavigationScreenProp extends NativeStackNavigationProp<Record<string, any | undefined>> {}

export type NavigationRouteProp = RouteProp<ParamListBase & Record<string, any>, string>;