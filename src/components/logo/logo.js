import React from 'react'
import './logo.css'
import img from './logo.jpg'
class Logo extends  React.Component{
    render(){
        return (
            <div className='logo'>
                <img src={img}/>
            </div>
        )
    }
}
export default Logo