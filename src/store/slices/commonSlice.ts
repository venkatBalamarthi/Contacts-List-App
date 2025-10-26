import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAppCommonState {
    isLoading: boolean | null;
}

const initialState: IAppCommonState = {
    isLoading: false
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
         setLoader(state, action: PayloadAction<boolean | null>) {
            state.isLoading = action.payload;
        },
    },
});

export const {setLoader} = commonSlice.actions;

export default commonSlice.reducer;
