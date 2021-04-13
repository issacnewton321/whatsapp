import { Button } from '@material-ui/core'
import './Login.css'
import {auth,provider} from '../firebase'
import { PinDropSharp } from '@material-ui/icons'
import React from 'react'
function Login(props){
    const getLogin = (user)=>{
        props.getLogin(user)
    }
    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>
            getLogin(result.user) 
        )
        .catch(error=> alert(error.message))
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://www.flaticon.com/svg/vstatic/svg/2702/2702602.svg?token=exp=1614329194~hmac=95efcb14d792fdebc71f88bdfc5374e3'/>
                <div className='login__text'>
                    <h1>Sign In To Chat App</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login