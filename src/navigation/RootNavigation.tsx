import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigate = (name: string, params?: any) => {
    return navigationRef?.current
        ? navigationRef?.current?.navigate(name, params)
        : null;
};
