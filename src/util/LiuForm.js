import React from 'react'
export function LiuForm(Comp){
    return class LiuForm extends React.Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange=this.handleChange.bind(this)
        }
        handleChange(type,v){
            this.setState({
                [type]:v
            })
        }
        render(){
            return (
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
            )
        }
    }
}
