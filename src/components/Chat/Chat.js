import React from 'react'
import io from 'socket.io-client'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMessageList,sendMessageList,reserveMsg,MsgRead} from '../../redux/msgStore'
import QueueAnim  from 'rc-queue-anim'
const socket=io('ws://localhost:8080');
@connect(
    state=>state,
    {getMessageList,sendMessageList,reserveMsg,MsgRead}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:"",
            textList:[],
            emojiShow:false
        }
    }
    componentDidMount(){
        if(!this.props.Msg.chatmsg.length){
            this.props.getMessageList()
            this.props.reserveMsg()
        }
    }
    componentWillUnmount(){
        this.props.MsgRead(this.props.match.params.user)
    }
    handleResize(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSend(){
        const from=this.props.loginStore._id;
        const to =this.props.match.params.user
        const msg=this.state.text;
        console.log(msg);
        this.props.sendMessageList({from,to,msg})
        this.setState({
            text:"",
        })
    }
    handleChange(v){
        this.setState({text:v})
    }
    render(){
        const userid=this.props.match.params.user
        const user=this.props.Msg.userInfoList[userid]
        const emoji="😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿"
                    .split(' ')
                    .map(v=>{
                        return {text:v}
                    })
        return (
            <div id="chat-page">
            <QueueAnim>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack();
                    }}
                >{user?user.name:null}</NavBar>
                {this.props.Msg.chatmsg.map(v=>{
                    const avator=this.props.Msg.userInfoList[v.from].avator
                    const avatorPath=require(`../img/${avator.text}.png`)
                    if(v.to===userid||v.from===userid){
                        return(userid!==v.from?
                                <List key={v._id}>
                                    <List.Item className="chat-me" extra={<img src={avatorPath}/>}>{v.content}</List.Item>
                                </List>
                                :
                                <List   key={v._id}>
                                    <List.Item thumb={avatorPath}>{v.content}</List.Item>
                                </List>
                            )
                        }
                    }
                )}
                <div className="chat-me-btn">
                    <List>
                        <InputItem
                            extra={ 
                                <div>
                                    <span style={{marginRight:10,fontSize:14}} onClick={()=>{
                                        this.setState({
                                            emojiShow:!this.state.emojiShow
                                        })
                                        this.handleResize()
                                    }}>😄</span>
                                    <span onClick={()=>{this.handleSend()}}>发送</span>
                                </div>
                            }
                            onChange={(v)=>{this.handleChange(v)}}
                            value={this.state.text}
                        ></InputItem>
                        {this.state.emojiShow?
                        <Grid 
                            columnNum={8}
                            carouselMaxRow={3}
                            isCarousel={true}
                            data={emoji}
                            onClick={(e)=>{this.setState({text:this.state.text+e.text})}}
                        />:null}
                    </List>
                </div>
                </QueueAnim>
            </div>
        )
        }
}
export default Chat
