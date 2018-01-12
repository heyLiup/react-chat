import axios from 'axios'
import {Toast} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import util from 'utility'
import {getRedirectPath} from '../util/handleUrl'

const REGISTSUCCESS='REGISTSUCCESS';
const LOGOUT='LOGOUT';
const ERRORMSG='ERRORMSG';
const LOAD_DATA='LOAD_DATA';

var initState={
    redirectTo:'',
    avatar:'',//头像
    user:'',
    isLogin:false,
    type:''
}
export default function LoginStore(state=initState,action){
    switch(action.type){
        case REGISTSUCCESS:
            return {...state,...action.payload,redirectTo:getRedirectPath(action.payload)};
        case LOAD_DATA:
            return {...state,...action.payload,isLogin:true};
        case LOGOUT:
            return {...initState};
        default :
            return state;
    }
}

export function Redirected(obj){
    console.log(obj);
    return {type:REGISTSUCCESS,payload:obj}
}
export function HandleLOAD_DATA(obj){
    return {type:LOAD_DATA,payload:obj}
}

export  function regist(userData){
    if(userData.user&&userData.pwd&&userData.rePwd&&userData.type){
        return  dispatch=>{
            userData.pwd=Md5Pwd(userData.pwd);
            userData.rePwd=Md5Pwd(userData.rePwd);
            axios.post('/user/regist',userData).then(function(res,err){
                if(res.data.status===301){
                    Toast.fail(res.data.msg, 1);
                }else{
                    Toast.success(res.data.msg, 1);
                    dispatch(Redirected(userData));
                }
            })
        }
       
    }else{
        return dispatch=>{
            Toast.fail('注册信息填写不全', 1);
        }
    }
}
export function logout(){
    return {type:LOGOUT}
}

export function login(userData){
    if(userData.user&&userData.pwd){
        userData.pwd=Md5Pwd(userData.pwd);
        return  dispatch=>{
             axios.post('/user/login',userData).then(function(res,err){
                if(res.data.status===301){
                    Toast.fail(res.data.msg, 1);
                }else{
                    Toast.success(res.data.msg, 1);
                    dispatch(Redirected(res.data.data))
                }
            })
        }
    }else{
        return dispatch=>{
            Toast.fail('登陆信息填写不全', 1);
        }
    }
}

export function update(upData){
    return dispatch=>{
        axios.post('/user/update',upData).then(function(res,err){
            if(res.data.status===301){
                Toast.fail(res.data.msg, 1);
            }else{
                Toast.success(res.data.msg, 1);
                dispatch(Redirected(res.data.data))
            }
        })
    }
}

export function getCurrentUser(){
    var that=this;
    return dispatch=>{
        axios.get('user/data').then(function(res){
            if(res.status===200&&res.data.status===200){
                dispatch(HandleLOAD_DATA(res.data.data));
            }else{
                if(global.location.pathname=='/login') return 
                global.location.pathname='/login';
            }
        })
    }
}

function Md5Pwd(pwd){
    const salt='!@#$#$%^$&@!#$!@#$';
    return util.md5(util.md5(pwd+salt));
}