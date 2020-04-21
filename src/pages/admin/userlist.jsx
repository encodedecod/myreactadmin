import React, { Component } from 'react';
import {Card,Table,Button,Popconfirm,Pagination,Input, message,Form,Modal} from 'antd'
import {MailTwoTone,IdcardTwoTone,LockTwoTone} from '@ant-design/icons';
class huoselist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editvisible:false,
       //总条数
       total:'' ,
       pagedetail:{
         query:'',
         pagenum:'1',
         pagesize:'2'
       },
         //编辑用户信息
    editForm: {
      username:'',
      password:'',
      email:'',
      create_time:''
     },
     userlist:[],
     //新增用户
     addvisible:false,
     //新增列表
     addfrom:{
       username:'',
       password:'',
       email:''
     }
    };
  }
  addonFinish=async values=>{
this.setState({
  addfrom:{
    username:values.username,
    password:values.password,
    email:values.email
  }
 ,
 addvisible:false
})
const res=await this.$axios.post('/user/add',this.state.addfrom)
if(res){
  message.success('成功添加用户！')
  this.getuserlist()
}
  }
//获取列表信息
getuserlist=async ()=>{
  const res=await this.$axios.get('/user/list',{params:this.state.pagedetail}
 )
    console.log(res)
    this.setState({
      total:res.data.total,
      userlist:res.data.userlist
    })
}
 componentDidMount(){
 this.getuserlist()
    
  
}
//改变页码
changepagenum=async (page, pageSize)=>{
  await  this.setState({
      pagedetail:{
        query:this.state.pagedetail.query,
        pagenum:page,
        pagesize:pageSize
      }
    })
    await this.getuserlist()
   
}
//改变每页条数
changepagesize=async (current, size)=>{
 await this.setState({
   pagedetail:{
     query:this.state.pagedetail.query,
     pagenum:current,
     pagesize:size
   }
 })
 await this.getuserlist()

 

}
//点击查询时触发
Searchlocal=async (value)=>{
await this.setState({
  pagedetail:{
    query:value,
    pagenum:this.state.pagedetail.pagenum,
    pagesize:this.state.pagedetail.pagesize
  }
})
await this.getuserlist()
 
}
//编辑用户
onFinish=async (values)=>{
  console.log(values);
  
  this.setState({
    editForm:{
      create_time:this.state.editForm.create_time,
      username:values.username,
      password:values.password,
      email:values.email
    },
    editvisible:false
  })
  console.log(this.state.editForm);
  
  const res =await this.$axios.post('/user/edit',this.state.editForm)
  if(res){
    message.success('编辑用户成功！')
    this.getuserlist()
  }else{
    message.error('编辑用户失败!')
  }

}
  render() {
    const {Search}=Input
  const   colums=[{
      title:'序号',
      key:'id',
      width:80,
      align: 'center',
      render:(txt,record,index)=>index+1

  },
{
    title:'用户名字',
    dataIndex:'username'
},
{
    title:'用户密码',
    dataIndex:'password'
},
{
  title:'用户邮箱',
  dataIndex:'email'
},
{
    title:'操作',
    render:(txt,record,index)=>{
        return(
            <div>
                <Button type='primary' size='small' onClick={async ()=>{
                  // console.log(record.id);
                  const resdata = await this.$axios.post('/user/find',{'create_time':record.create_time})
                  if(resdata){
                  message.success('查询成功！')
                  console.log(resdata);
                  this.setState({
                    editForm:{
                      create_time:resdata.data.data[0].create_time,
                      username:resdata.data.data[0].username,
                      password:resdata.data.data[0].password,
                      email:resdata.data.data[0].email,
                      
                    }
                  })
                  console.log(this.state.editForm);
                  this.setState({
                    editvisible:true
                  })
                  // this.props.history.push('/addhouseList',this.state.eidtfrom)
                   
                     }
                     
                     
                }}> 编辑</Button>
                <Popconfirm title='确认删除？'
                onCancel={()=>console.log('用户取消删除')
                } onConfirm={async ()=>{
                  //调用api
                  const res =await  this.$axios.post('/user/delete',{'create_time':record.create_time})
                  if(res){
                    message.success('删除用户成功！');
                    this.getuserlist()
                  }else{
                    message.error('删除用户失败！');
                  }
                }

                
                } okText="确认"
                cancelText="取消">
                <Button style={{margin:'0 1rem'}} type='danger' size='small'>删除</Button>
                </Popconfirm>
            </div>
        )
    }
}]
    return (
    <div>
      <Card title="用户列表"
         extra={
             <Button type='primary' size='small' onClick={()=>{
               this.setState({
                 addvisible:true
               })
             }}>
             新增用户
             </Button>
         }>
         <Search placeholder="输入用户名字" onSearch={this.Searchlocal} enterButton style={{width:'30%',margin:'20px 0'}}/>
        <Table rowKey='create_time' columns={colums} bordered dataSource={this.state.userlist} pagination={false}/>
        <Pagination defaultCurrent={this.state.pagedetail.pagenum} defaultPageSize={this.state.pagedetail.pagesize} current={this.state.pagedetail.pagenum} pageSize={this.state.pagedetail.pagesize} total={this.state.total} pageSizeOptions={['1', '2', '5', '10']} 
        onChange={this.changepagenum} onShowSizeChange={this.changepagesize} style={{margin:'20px 0',float:'right'}}></Pagination>
      </Card>
       {/* 编辑的对话框 */}
       <Modal
          title="编辑用户信息"
          visible={this.state.editvisible}
          footer={null}
          onCancel={()=>this.setState({
            editvisible:false
          })}
        >
           <Form
      // form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={this.state.editForm}
      onFinish={this.onFinish}
    >
     <Form.Item
        name="username"
        label="用户名:"
        rules={[{ required: true,whitespace:true, message: '输入用户名' },
        {min: 3,message:'至少3位'},
        {max:20, message:'最多20位'}
       ]}
      >
         <Input prefix={<IdcardTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码:"
        rules={[{ required: true,whitespace:true, message: '输入密码' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
      <Input
          prefix={<LockTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱:"
        rules={[{ required: true,whitespace:true, message: '输入邮箱' },
        {min: 8,message:'至少8位'},
        {max:20, message:'最多20位'}
      ]}
        
      >
        <Input
          prefix={<MailTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary"  htmlType="submit" >
        提交
        </Button>
        {/* Or <a href="">注册</a> */}
      </Form.Item>
    </Form>
        </Modal>
        {/* 新增用户 */}
        <Modal
          title="新增用户信息"
          visible={this.state.addvisible}
          footer={null}
          onCancel={()=>this.setState({
           addvisible:false
          })}
        >
           <Form
      // form={form}
      layout="vertical"
      name="form_in_modal"
      onFinish={this.addonFinish}
    >
     <Form.Item
        name="username"
        label="用户名:"
        rules={[{ required: true,whitespace:true, message: '输入用户名' },
        {min: 3,message:'至少3位'},
        {max:20, message:'最多20位'}
       ]}
      >
         <Input prefix={<IdcardTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码:"
        rules={[{ required: true,whitespace:true, message: '输入密码' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
      <Input
          prefix={<LockTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱:"
        rules={[{ required: true,whitespace:true, message: '输入邮箱' },
        {min: 8,message:'至少8位'},
        {max:20, message:'最多20位'}
      ]}
        
      >
        <Input
          prefix={<MailTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary"  htmlType="submit" >
        提交
        </Button>
        {/* Or <a href="">注册</a> */}
      </Form.Item>
    </Form>
        </Modal>
    </div>
    );
  }
}

export default huoselist;