import React from 'react'
import './login.less'
import {Link} from 'react-router-dom'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state={
          src:'http://127.0.0.1:5757/fy/login/yanma'
        }

    }
    changsrc=()=>{
      this.setState({
        src:'http://127.0.0.1:5757/fy/login/yanma?'+Math.random()
      })
    }
    //自定义验证
    vaildatepwd=(rules,value,callback)=>{
    if(!value){
      callback('请输入密码')
    }else if(value.length<4){
      callback('密码长度不能小于4位')
    }else if(value.length>12){
      callback('密码长度必须小于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须由下划线字母数字构成')
    }else{
      callback()
    }
    }
      onFinish = async (values) => {
          console.log(values);
        const res =await  this.$axios.post('/login/login',{
            'username':values.username,
            'password':values.password,
             'yanma':values.yanma
          })
          console.log(res);
          window.sessionStorage.setItem('token',res.data.token)
          // console.log(sessionStorage.getItem('token'));
          if(sessionStorage.getItem('token')){
           window.location.reload(true)
          }
          
          
        };
      render(){
   
        return(
            <div className='login'>
             <header className='login_header '>
               <img src='https://i01picsos.sogoucdn.com/51be276ab67181fd' alt=""/>
               <h1>后台管理系统</h1>
             </header>
             <section className='login_content'>
             <h2>用户登录</h2>
             <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true,whitespace:true, message: '请输入用户名!' },
        {min: 4,message:'用户名至少4位'},
        {max:12, message:'用户名最多12位'},
        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户由下划线数字字母组成'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{validator:this.vaildatepwd }
          
         
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="yanma"
        className='yanmafrom'
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="验证码"
        />
      </Form.Item>
      <img onClick={this.changsrc} src={this.state.src} alt="" className='yanmaiconlogin'/>
      

      <Form.Item>
        <Button type="primary"  htmlType="submit" className="login-form-button">
          登录
        </Button>
     <Link to='/register' style={{float:'right'}}> 注册
      </Link>
      </Form.Item>
    </Form>
    
             </section>
            </div>
        )
        }
}
