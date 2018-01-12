import React from 'react'
import loginStore from '../../redux/loginStore'
import {connect} from 'react-redux'
import {Button ,List,TextareaItem,InputItem,WhiteSpace} from 'antd-mobile'
import {login} from '../../redux/loginStore'
import 'antd-mobile/dist/antd-mobile.css'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import {LiuForm} from '../../util/LiuForm'

@connect(
    state=>state,
    {login}
)
@LiuForm
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
        }
        this.handleLogin=this.handleLogin.bind(this)
    }
    componentDidMount(){

    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.loginStore.redirectTo?<Redirect to={this.props.loginStore.redirectTo} />:null}
                <Logo/>
                <WhiteSpace/>
                <InputItem 
                    placeholder="请输入手机或者邮箱号"
                    onChange={v=>{this.props.handleChange('user',v)}}
                >用户名</InputItem>
                <WhiteSpace/>
                <InputItem 
                    placeholder="请输入密码"
                    type="password"
                    onChange={v=>{this.props.handleChange('pwd',v)}}
                >密码</InputItem>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleLogin}>登陆</Button>
                <WhiteSpace/>
                <Button type='primary'  onClick={()=>this.props.history.push('/regist')}>还没有账号？去注册</Button>
            </div>
        )
    }
}
export default Login;

