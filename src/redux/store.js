import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './Auth/auth.reducers'

const rootReducers=combineReducers({
auth:authReducer
})
export const store= legacy_createStore(rootReducers,applyMiddleware(thunk))