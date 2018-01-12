import React from 'react'
import {TabBar} from 'antd-mobile'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getMessageList,sendMessageList,reserveMsg} from '../../redux/msgStore'

@withRouter
@connect(
    state=>state.Msg,
    {getMessageList,reserveMsg}
)
class NavList extends React.Component{
    static propTypes={
        data:propTypes.array.isRequired  //对参数进行校验
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(!this.props.chatmsg.length){
            this.props.getMessageList()
            this.props.reserveMsg()
        }
    }
    render(){ 
        const NavLink=this.props.data.filter(v=>!v.hide);
        console.log(this.props)
        return (
            // <div>243</div>
                <TabBar>
                    {NavLink.map(v=>(
                        <TabBar.Item 
                            badge={v.path==="/msg"?this.props.unread:0}
                            title={v.title}
                            key={v.path}
                            icon={{uri:require(`../navimg/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`../navimg/${v.icon}-active.png`)}}
                            selected={this.props.location.pathname===v.path}
                            onPress={()=>this.props.history.push(v.path)}
                        ></TabBar.Item>
                    ))}
                </TabBar>
        )
    }
}
export default NavList