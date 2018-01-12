import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reduce'
import App from './app'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import './config'

const store=createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

ReactDOM.render(
    (<Provider store={store}> 
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

// import {createStore} from './my-redux.js'

// const initState={
//     gum:1
// }
// function reduces(state=initState,action){
//     console.log(state,action)
//     switch(action.type){
//         case "add":return {gum:state.gum+1}
//             break;
//         default:
//             return initState
//         break;
//     }
// }

// var store=createStore(reduces)

// store.subscribe(function(){
//     console.log(store.getState())
// })

// store.dispatch({type:"add"})
// store.dispatch({type:"add"})
// store.dispatch({type:"add"})


