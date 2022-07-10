import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';

import theme from './theme';
import {api} from '../services';
import nfc from './nfc';
import permission from './permission';

const reducers = combineReducers({
    theme,
    nfc,
    permission,
    api: api.reducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme', 'nfc', 'permission'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(api.middleware);

        return middleware;
    },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export {store, persistor};
