import axios from 'axios'
import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCurrentUser} from '../../redux/loginStore'




@withRouter
@connect(
    state=>state,
    {getCurrentUser}
)
class AuthRoute extends React.Component{
    constructor(props){
        super(props)
        console.log(connect);
    }
    componentDidMount(){
        const locals=['/login','/regist'];
        var that=this;
        if(that.props.location.pathname==='/'){
            return that.props.history.push('/login');
        }else if(locals.indexOf(this.props.location.pathname)!==-1){
            return 
        }
        if(this.props.getCurrentUser()){
         
        }
    }
    render(){
        return null
    }
}
export default AuthRoute