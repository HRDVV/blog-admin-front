import { createStore } from 'redux'
import reducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
}

export const store = createStore(persistReducer(persistConfig, reducer))
export const persistor = persistStore(store)

