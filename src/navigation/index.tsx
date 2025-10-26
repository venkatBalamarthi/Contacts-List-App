import React, {useState} from 'react'
import AppLoader from '../components/modals/AppLoaders';
import AppRouter from './AppRouter';
import {SCREEN_NAMES} from '../constants';

const Router = () => {
    const [initialRouteName] = useState<string>(SCREEN_NAMES.CONTACTS_LIST);

    return (
        <>
            <AppLoader />
            <AppRouter initialRouteName={initialRouteName} />
        </>
    )

}
export default Router;