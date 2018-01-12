import React from 'react'
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMessageList,MsgRead} from '../../redux/msgStore'

@connect(
    state=>state,
    {getMessageList,MsgRead}
)
class Msg extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(){
        if(this.props.Msg.chatmsg.length===0) return null;
        const msgGroup={};
        this.props.Msg.chatmsg.map(v=>{
            msgGroup[v.chatId]=msgGroup[v.chatId]||[];
            msgGroup[v.chatId].push(v)
        })
        const chatList=Object.values(msgGroup).sort((a,b)=>{
            const lastA=a[a.length-1].create_time;
            const lastB=b[b.length-1].create_time;
            return lastB-lastA
        })
        return (
            <div>
                {chatList.map(v=>{
                    const chatmanId=v[0].from==this.props.loginStore._id?v[0].to:v[0].from
                    const current_user=this.props.Msg.userInfoList[chatmanId];
                    const msgNumber=v.filter(v=>!v.Read&&v.from!==this.props.loginStore._id).length;
                    const avatorPath=require(`../img/${current_user.avator.text}.png`)
                    console.log(msgNumber)
                    return(
                        <List key={v[0].chatId}>
                            <List.Item 
                                arrow="horizontal"
                                thumb={<img src={avatorPath}/>}
                                extra={<Badge text={msgNumber}></Badge>}
                                onClick={()=>{this.props.history.push(`/chat${chatmanId}`)}}
                            >
                                {current_user.name}
                                <List.Item.Brief>
                                    {v[v.length-1].content}
                                </List.Item.Brief>
                            </List.Item>
                        </List>
                    )
                }
                )}
            </div>
        )
    }
}
export default Msg