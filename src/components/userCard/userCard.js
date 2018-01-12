import React from 'react'
import { Card ,WhiteSpace,WingBlank, Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
    constructor(props){
        super(props)
    }
    handleChat(v){
        this.props.history.push(`/chat${v._id}`)
    }
    render(){
        return (
            <WingBlank>
                <WhiteSpace/>
                <Card
                    >
                    {this.props.data.map(v=>(
                        // require(`../img/${avator.text}.png`)

                        v.avator?
                        <div key={v._id}  > 
                            <Card.Header 
                                title={v.user} 
                                thumb={require(`../img/${v.avator.text}.png`)}
                                onClick={()=>this.handleChat(v)}
                                extra={<div>{v.title}</div>}
                                >
                            </Card.Header>
                            <Card.Body>
                                {v.type==="boss"?<div>公司名称:{v.company}</div>:null}
                                {v.desc.split('\n').map(v=>{
                                    return <div key={v}>{v}</div>
                                })}
                                {v.type==="boss"?<div>薪资:{v.money}</div>:null}
                            </Card.Body>
                        </div>:null
                    ))}
                </Card>
            </WingBlank>
                
        )
    }
}
export default UserCard