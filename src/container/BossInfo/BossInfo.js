import React from 'react'
import {connect} from 'react-redux'
import {Button ,Toast,List,TextareaItem,InputItem,WhiteSpace,NavBar} from 'antd-mobile'
import Avator from '../../components/avator/avator.js'
import {Redirect} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import {update} from '../../redux/loginStore'
@connect(
    state=>state,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            avator:'',
            title:'',
            money:'',
            desc:'',
            company:'',
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        
    }
    componentDidMount(){
    }
    handleChange(type,v){
        this.setState({
            [type]:v
        })
    }
    handleClick(){
        if(this.state.title&&this.state.money&&this.state.desc&&this.state.company&&this.state.avator){
            this.props.update(this.state);
        }else{
            Toast.fail('请将信息填写完整', 1);
        }
    }
    handleSelect(e){
        this.setState({
            avator:e
        })
    }
    render(){
        return (
            <div>
                {this.props.loginStore.redirectTo&&this.props.loginStore.redirectTo!==this.props.location.pathname?<Redirect to={this.props.loginStore.redirectTo} />:null}
                <NavBar>
                    Boss完善信息
                </NavBar>
                <List 
                    renderHeader={()=><Avator onSelect={this.handleSelect}/>}
                >
                    <InputItem
                        onChange={e=>this.handleChange('title',e)}
                    >招聘职位</InputItem>
                    <InputItem
                        onChange={e=>this.handleChange('money',e)}
                    >职位薪资</InputItem>
                    <InputItem
                        onChange={e=>this.handleChange('company',e)}
                    >公司名称</InputItem>
                    <TextareaItem
                        onChange={e=>this.handleChange('desc',e)}
                        title="招聘要求"
                        autoHeight
                        rows={3}
                    ></TextareaItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>{this.handleClick()}}>提交</Button>
                    </List>
                {/* <Avator/> */}
               
            </div>
        )
    }
}
export default BossInfo;

