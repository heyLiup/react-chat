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
class Geniusinfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            avator:'',
            desc:'',
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
        if(this.state.desc&&this.state.avator){
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
        console.log(this.props.redirectTo);
        return (
            <div>
                {this.props.loginStore.redirectTo?<Redirect to={this.props.loginStore.redirectTo} />:null}
                <NavBar>
                    牛人完善信息
                </NavBar>
                <List 
                    renderHeader={()=><Avator onSelect={this.handleSelect}/>}
                >
                    <InputItem
                        onChange={e=>this.handleChange('title',e)}
                    >应聘职位</InputItem>
                    <TextareaItem
                        onChange={e=>this.handleChange('desc',e)}
                        title="专业技能"
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
export default Geniusinfo;

