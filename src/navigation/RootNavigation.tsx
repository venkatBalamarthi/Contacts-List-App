import React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name: string, params: any) => {
    return navigationRef?.current
        ? navigationRef?.current?.navigate(name, params)
        : null;
};