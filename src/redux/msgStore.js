
import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://localhost:8080');

const MSG_READ="MSG_READ"
const MSG_LIST="MSG_LIST"
const MSG_RECV="MSG_RECV"

const initState={
    chatmsg:[],
    unread:0,
    userInfoList:{}
}

export default function Msg(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload.data,userInfoList:action.payload.users,unread:action.payload.data.filter(v=>!v.Read&&v.to==action.userid).length }
        case MSG_RECV:
            const n=action.userid==action.payload.to?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,userid,num}=action.payload;
            return {...state,chatmsg:state.chatmsg.map(v=>{return( 
                        v.from===from&&v.to===userid?
                        {...v,Read:true}
                        :v)
                    }),unread:state.unread-num}
        default:
            return state
    }
}

function msgList(msgs,userid){
    return {userid,type:MSG_LIST,payload:msgs}
}
function saveResvMsg(msg,userid){
    return {type:MSG_RECV,payload:msg,userid}
}
function saveMSG_READ({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}

export function getMessageList(){
    return (dispatch,getState)=>{
        axios.get('/user/getMsgList').then(function(res){
            const userid=getState().loginStore._id
            
            if(res.status===200&&res.data.status===200){
                dispatch(msgList(res.data,userid))
            }
        })
    }
}
export function MsgRead(from){
    return (dispatch,getState)=>{
        const userid=getState().loginStore._id;
        axios.post('/user/msgRead',{from}).then(function(res){
            if(res.status===200&&res.data.status===200){
                console.log(345);
                dispatch(saveMSG_READ({from,userid,num:res.data.num}))
            }
        })
    }
}
export function sendMessageList({from,to,msg}){
    return dispatch=>{
        socket.emit('sendMessage',{from,to,msg})
    }
}

export function reserveMsg(){
    return (dispatch,getState)=>{
        socket.on('resvMsg',function(data){
            const userid=getState().loginStore._id
            dispatch(saveResvMsg(data,userid))
        })
    }
}

