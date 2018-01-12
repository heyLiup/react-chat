
import {combineReducers} from 'redux'
import loginStore from './redux/loginStore'
import chatStore from './redux/chatStore'
import Msg from './redux/msgStore'

export default combineReducers({loginStore,chatStore,Msg});