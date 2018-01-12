import axios from 'axios'

const USERLIST="USERLIST"
const initState={
    userLists:[]
}

export default function chatUser(state=initState,action){
    switch(action.type){
        case USERLIST:return {...state,userLists:action.payload} 
            break;
        default:
            return state
    }
}

function saveUserList(data){
    return {type:USERLIST,payload:data}
}

export function getUserList(type){
    return dispatch=>{
        axios.get(`/user/list?type=${type}`).then(function(res,err){
            if(err){
                return console.log(err);
            }
            if(res.data.status===200){
                dispatch(saveUserList(res.data.data))
            }else{
                console.log('错误')
            }
        })
    }
    
}   