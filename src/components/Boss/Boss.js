import React from 'react'
import { Card } from 'antd-mobile';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatStore'
import UserCard from '../userCard/userCard'

@connect(
    state=>state.chatStore,
    {getUserList}
)
class Boss extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getUserList('genuis');
    }
    render(){
        return(
            <div>
                <UserCard data={this.props.userLists}></UserCard>
            </div>
        )
    }
}
export default Boss