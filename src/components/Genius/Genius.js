import React from 'react'
import { Card } from 'antd-mobile';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatStore'
import UserCard from '../userCard/userCard'
@connect(
    state=>state.chatStore,
    {getUserList}
)
class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            genuisList:[]
        }
    }
    componentWillMount(){
        this.props.getUserList('boss');
    }
    render(){
        return(
            <div>
                <UserCard data={this.props.userLists}></UserCard>
            </div>
        )
    }
}
export default Genius