import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import rootSaga from "../Sagas/index";
import rootReducer from "../Redux/index";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    timeout: 20000,
    storage: AsyncStorage,
    whitelist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = applyMiddleware(sagaMiddleware, logger)

const store = createStore(
    persistedReducer,
    middleware
);

const configureStore = () => {
    let persistor = persistStore(store)
    return {
        store,
        persistor
    }
}
sagaMiddleware.run(rootSaga);

export default configureStore