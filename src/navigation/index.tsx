import React, {useState} from 'react'
import AppLoader from '../components/Modals/AppLoaders';
import AppRouter from './AppRouter';
import {SCREEN_NAMES} from '../constants/screenNames';

const Router = () => {
    const [initialRouteName, setInitialRouteName] = useState<string>(SCREEN_NAMES.CONTACTS_LIST);

    return (
        <>
            <AppLoader />
            <AppRouter initialRouteName={initialRouteName} />
        </>
    )

}
export default Router;