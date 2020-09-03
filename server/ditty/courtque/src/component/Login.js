import React, {Fragment, Component, useEffect, useState} from 'react'

class Login extends Component {
    render(){
        return( //i am doing the parentheses bc i like putting the stuff on another line
            <header className="App-header">
                <h1>CQ</h1>
                <h2>Login</h2>
                <div>
                    <input type="text" name="Username" id=""/>
                    <input type="text" name="Password" id=""/>
                </div>
            </header>
        )
        
        
    }
}

export default Login