import React from 'react'
import {connect} from 'react-redux'
import {getCurrentUser,logout} from '../../redux/loginStore'
import { Result, Icon, WhiteSpace, List, Button, Modal } from 'antd-mobile';
var cookies = require('browser-cookies');
const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state=>state.loginStore,
    {getCurrentUser,logout}
)

class User extends React.Component{
    constructor(props){
        super(props)
        this.logouts=this.logouts.bind(this)
    }
    componentWillMount(){
        this.props.getCurrentUser()
    }
    logouts(){
        const alert=Modal.alert;
        alert('退出', '确认退出登陆?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                cookies.erase('userid'); // Removes cookie
                window.location.href=window.location.href;
                this.props.logout();
            } },
        ])
    }
    render(){
        var that=this;
        return this.props.avator?(
            <div>
                <Result
                    img={<img  src={require(`../img/${this.props.avator.text}.png`)} />}
                    title={this.props.user}
                    message={this.props.type==="boss"?<div>{this.props.company}</div>:null}
                />
                <List renderHeader={() =>this.props.type==="boss"? "职位要求":'个人技能'}>
                    <Item>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v=>
                            <Brief key={v}>{v}</Brief>
                        )}
                        {this.props.type==="boss"?<Brief>{this.props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logouts}>退出登录</Item>
                </List>
            </div>
        ):null
    }
}
export default User