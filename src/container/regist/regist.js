import React from 'react'
import loginStore from '../../redux/loginStore'
import {connect} from 'react-redux'
import {Button ,List,TextareaItem,InputItem,WhiteSpace,Radio} from 'antd-mobile'
import {regist} from '../../redux/loginStore'
import { Redirect } from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.css'
import Logo from '../../components/logo/logo'
import './regist.css'
import {LiuForm} from '../../util/LiuForm'

const RadioItem = Radio.RadioItem;
@connect(
    state=>state,
    {regist}
)
@LiuForm
class Regist extends React.Component{
    constructor(props){
        super(props)
        this.handleRegist=this.handleRegist.bind(this)
    }
    handleRegist(){
        this.props.regist(this.props.state) 
    }
    componentDidMount(){
        this.props.handleChange('type','boss')
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
                    onChange={v=>{this.props.handleChange('pwd',v)}}
                    type="password"
                >密码</InputItem>
                <InputItem 
                    placeholder="请再次输入密码"
                    onChange={v=>{this.props.handleChange('rePwd',v)}}
                    type="password"
                >确认密码</InputItem>
                <WhiteSpace/>
                <RadioItem  
                    checked={this.props.state.type==='boss'}
                    onClick={v=>{this.props.handleChange('type','boss')}}
                >boss</RadioItem>
                <RadioItem  
                    checked={this.props.state.type==='genuis'}
                    onClick={v=>{this.props.handleChange('type','genuis')}}
                >牛人</RadioItem>
                <Button type='primary' onClick={this.handleRegist}>注册</Button>
                <WhiteSpace/>
                <Button type='primary' onClick={()=>this.props.history.push('/login')}>已有账号？去登陆</Button>
            </div>
        )
    }
}
export default Regist;

