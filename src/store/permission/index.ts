// permission redux

import {createSlice} from '@reduxjs/toolkit';

export type PermissionState = {
    camera: {
        isGranted: boolean;
    };
    location: {
        isGranted: boolean;
    };
    // nfc: {
    //     isGranted: boolean;
    // };
};

const initialState: PermissionState = {
    camera: {
        isGranted: false,
    },
    location: {
        isGranted: false,
    },
    // nfc: {
    //     isGranted: false,
    // },
};

const slice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setCameraPermission: (state, action) => {
            state.camera.isGranted = action.payload;
        },
        setLocationPermission: (state, action) => {
            state.location.isGranted = action.payload;
        },
        // setNfcPermission: (state, action) => {
        //     state.nfc.isGranted = action.payload;
        // },
    },
});

export const {setCameraPermission, setLocationPermission} = slice.actions;
export default slice.reducer;
