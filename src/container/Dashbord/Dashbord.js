import React from 'react'
import {NavBar } from 'antd-mobile'
import {connect} from 'react-redux'
import NavList from '../NavList/NavList'
import {Switch,Route} from 'react-router-dom'
import Boss from '../../components/Boss/Boss'
import Genius from '../../components/Genius/Genius'
import Msg from '../../components/Msg/Msg'
import User from '../../components/User/User'

// 四种  牛人页面  boss页面  消息页面  个人中心
// @withRouter() 
@connect(
    state=>state 
)
class Dashbord extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {pathname}=this.props.location
        const dataList=[
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:"牛人列表",
                component:Boss,
                hide:this.props.loginStore.type==='genuis'       
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:"boss列表",
                component:Genius,
                hide:this.props.loginStore.type==='boss'       
            },
            {
                path:'/msg',
                text:'msg',
                icon:'msg',
                title:"信息列表",
                component:Msg,
            },
            {
                path:'/user',
                text:'user',
                icon:'user',
                title:"个人中心",
                component:User,
            }
        ]
        if(this.props.location.pathname==='/'){
            this.props.history.push('/login');
            return null;
        }
        return (
            <div>
                <NavBar
                    mode="dark"
                    className='fix-header'
                >
                {dataList.find(v=>v.path===pathname).title}
                </NavBar>
                <Switch>
                    {dataList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
                <NavList className='am-tab-bar' data={dataList}></NavList>
            </div>
        )
    }
}
export default Dashbord 