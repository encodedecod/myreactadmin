import React from'react'
import { Redirect } from 'react-router-dom'
export default class RouterGuard extends React.Component{
    state={
        isLogin:false
    }
    render(){
        const {component:Component,...otherProps}=this.props
        return(
           <Route {...otherProps} render={props=>(
               this.state.isLogin?<Component {...props}></Component>:
               (<Redirect to={
                  {pathname:'/login',state:{from:props.localtion.pathname} }}></Redirect>) 
           )}></Route>
        )
    }
}