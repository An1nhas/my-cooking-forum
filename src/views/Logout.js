import React, { Component } from 'react';
import axios from 'axios';


export default class Logout extends Component{
    componentDidMount=()=>{
        axios.get('/api/logout').then(res => {
            return  window.location.href = "/";
        })
    }
    
    
    render() {
        return (
              
            <div>
                <p>Logging out...</p>
            </div>
                
        );
    }
    
}