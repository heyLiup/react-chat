import React from 'react'
import {Route,Link,BrowserRouter,Redirect,Switch} from 'react-router-dom'

import Login from './container/login/login.js'
import Regist from './container/regist/regist.js'
import BossInfo from './container/BossInfo/BossInfo.js'
import Geniusinfo from './container/Genius/Genius.js'
import Dashbord from './container/Dashbord/Dashbord.js'
import AuthRoute from './components/authRouter/authRoute'
import Chat from './components/Chat/Chat'

class App extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            isDirector:true
        }
    }
    componentDidCatch(err,info){
        this.setState({isDirector:false})
    }
    render(){
        return this.state.isDirector?(
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={Geniusinfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/regist' component={Regist}></Route>
                    <Route path='/chat:user' component={Chat}></Route>
                    <Route component={Dashbord}></Route>
                    {/* <Redirect to='/login'></Redirect> */}
                </Switch>
            </div>
        ):<h1>页面未找到</h1>
    }
}
export default App