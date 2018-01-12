import React from 'react'
import {Grid } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

class Avator extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:''
        }
    }
    componentDidMount(){

    }
    handleSelect(e){
        this.setState({selected:e});
        this.props.onSelect(e)
    }

    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',')
        .map(v=>{
            return {
                text:v,
                icon:require(`./img/${v}.png`)
            }
        })
        return (
            <div>
               <span style={{padding:'10px',display:'inline-block'}}>头像选择</span>{this.state.selected?<img style={{width:'20px'}} src={this.state.selected.icon}/>:null}
                <Grid 
                    onClick={e=>{this.handleSelect(e)}}
                    data={avatarList} columnNum='5'
                />
            </div>
        )
    }
}
export default Avator;

