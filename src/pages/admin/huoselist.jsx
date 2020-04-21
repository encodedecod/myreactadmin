import React, { Component} from 'react';
import {Card,Table,Button,Popconfirm,Pagination,Input,message,Form,Upload,Modal} from 'antd'
import { UploadOutlined,SoundTwoTone,EnvironmentTwoTone,BankTwoTone,AccountBookTwoTone } from '@ant-design/icons';
import _ from 'lodash'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class huoselist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //图片预览
      previewVisible:false,
      //默认关闭对话框
      editvisible:false,
      //房子列表
       houselist:[],
       //总条数
       total:'' ,
       pagedetail:{
         query:'',
         pagenum:'1',
         pagesize:'10'
       },
       eidtfrom:{
         id:"",
         jpgs:"",
         scripts:"",
         local:"",
         localtwo:"",
         oneprice:""
       },
       resdata:{
         result:'',
         imgurl:''
       },
       previewImage:''
      
    };
  }
  //获取列表信息
gethouselist=async ()=>{
  const res=await this.$axios.get('/tianjin/index',{params:this.state.pagedetail}
 )
    console.log(res)
    this.setState({
      total:res.data.total,
      houselist:res.data.tianjin
    })
}
 componentDidMount(){
 this.gethouselist()
    
  
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
     await this.gethouselist()
    
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
  await this.gethouselist()

  
 
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
await this.gethouselist()
  
}

//请求编辑
onFinish=async (values)=>{
  console.log(values);
  this.setState({
    eidtfrom:{
      id:this.state.eidtfrom.id,
      jpgs:this.state.resdata.imgurl,
     scripts:values.scripts,
     local:values.local,
     localtwo:values.localtwo,
     oneprice:values.oneprice

    },
    editvisible:false
  })
  console.log(this.state.eidtfrom);
const res =await  this.$axios.post('/put/goods',this.state.eidtfrom)
if(res){
  message.success('成功编辑!')
  this.gethouselist()
}
  
  
}
//图片预览
handlePreview = async file => {
  
  file.preview = await getBase64(file.originFileObj);
  

  this.setState({
    previewImage:file.response.imgurl||file.preview,
    previewVisible: true,
  });
};

 
//添加房源信息
addhouseMessage=()=>{
  this.props.history.push('/addhouseList')
}
  render() {
    const {Search}=Input
    //表格列表
  const   colums=[{
      title:'序号',
      key:'id',
      width:80,
      align: 'center',
      render:(txt,record,index)=>index+1

  },
{
    title:'房子图片',
    dataIndex:'jpgs',
    render:(txt,record,index)=>{
      return(
        <div>
          <img src={txt} alt="" style={{width:'200px',height:'150px'}}/>
        </div>
      )
    }
},
{
    title:'房子描述',
    dataIndex:'scripts'
},
{
  title:'小区名字',
  dataIndex:'local'
},
{
  title:'房子地址',
  dataIndex:'localtwo'
},
{
  title:'单价',
  dataIndex:'oneprice'
},
{
  title:'建造时间',
  dataIndex:'localhigh'
},
{
    title:'操作',
    width:150,
    alignItems: 'center',
    align:'center',
    render:(txt,record,index)=>{
        return(
            <div>
                <Button type='primary' size='small' onClick={async ()=>{
                  // console.log(record.id);
                  const resdata = await this.$axios.post('/findid/goods',{'id':record.id})
                  if(resdata){
                  message.success('查询成功！')
                  console.log(resdata);
                  this.setState({
                    eidtfrom:{
                      id:resdata.data.data[0].id,
                      jpgs:resdata.data.data[0].jpgs,
                      scripts:resdata.data.data[0].scripts,
                      local:resdata.data.data[0].local,
                      localtwo:resdata.data.data[0].localtwo,
                      oneprice:resdata.data.data[0].oneprice
                    }
                  })
                  console.log(this.state.eidtfrom);
                  this.setState({
                    editvisible:true
                  })
                  // this.props.history.push('/addhouseList',this.state.eidtfrom)
                   
                     }
                     
                     
                }}> 编辑</Button>
                <Popconfirm title='确认删除？'
                onCancel={()=> message.error('用户取消了删除！')
                } onConfirm={async ()=>{
                  //调用api 
                const res =await  this.$axios.post('/delete/goods',{'id':record.id})
                if(res){
                  message.success('删除房源成功！');
                  this.gethouselist()
                }else{
                  message.error('删除房源失败！');
                }
              }
                }  okText="确认"
                cancelText="取消">
                <Button style={{margin:'0 5px'}} type='danger' size='small'>删除</Button>
                </Popconfirm>
            </div>
        )
    }
}]
const props = {
  action: 'http://127.0.0.1:5757/fy/upload',
  listType: 'picture',
  // defaultFileList: [this.state.eidtfrom.jpgs],
  
};


    return (
    <div>
      <Card title="商品房列表" style={{position:'relative'}}
         extra={
             <Button type='primary' size='small' onClick={this.addhouseMessage}>
             新增房屋
             </Button>
         } >
           <Search placeholder="输入小区名字" onSearch={this.Searchlocal} enterButton style={{width:'30%',margin:'20px 0'}}/>
        <Table rowKey='id' columns={colums} bordered dataSource={this.state.houselist} pagination={false}/>
        <Pagination defaultCurrent={this.state.pagedetail.pagenum} defaultPageSize={this.state.pagedetail.pagesize} current={this.state.pagedetail.pagenum} pageSize={this.state.pagedetail.pagesize} total={this.state.total} pageSizeOptions={['10', '20', '50', '100']} 
        onChange={this.changepagenum} onShowSizeChange={this.changepagesize} style={{margin:'20px 0',float:'right'}}></Pagination>
      </Card>
      {/* 编辑的对话框 */}
      <Modal
          title="编辑房产信息"
          visible={this.state.editvisible}
          footer={null}
          onCancel={()=>this.setState({
            editvisible:false
          })}
        >
    <Upload {...props} onChange={(res)=>{
     const cloneres=_.cloneDeep(res)
      console.log(cloneres.file.response);
      this.setState({
        resdata:cloneres.file.response
      })
  }} onPreview={this.handlePreview}
  headers={ {Authorization: window.sessionStorage.getItem('token')}}>
      <Button>
        <UploadOutlined /> 点击上传图片
      </Button>
    </Upload>
           <Form
      // form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={this.state.eidtfrom}
      onFinish={this.onFinish}
    >
     <Form.Item
        name="scripts"
        label="描述:"
        rules={[{ required: true,whitespace:true, message: '输入描述内容' },
        {min: 8,message:'描述至少8位'},
        {max:20, message:'描述最多20位'}
       ]}
      >
         <Input prefix={<SoundTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />} placeholder="描述" />
      </Form.Item>
      <Form.Item
        name="local"
        label="小区名字:"
        rules={[{ required: true,whitespace:true, message: '输入小区名字' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
      <Input
          prefix={<BankTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="小区名字"
        />
      </Form.Item>
      <Form.Item
        name="localtwo"
        label="小区位置:"
        rules={[{ required: true,whitespace:true, message: '输入小区位置' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
        <Input
          prefix={<EnvironmentTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="小区位置"
        />
      </Form.Item>
      <Form.Item
        name="oneprice"
        label="单价:"
        rules={[{ required: true,whitespace:true, message: '输入单价' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
       <Input
          prefix={<AccountBookTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="单价"
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
        {/* 图片预览 */}
        <Modal visible={this.state.previewVisible} footer={null} onCancel={()=>this.setState({
            previewVisible:false
          })}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
    </div>
    );
  }
}

export default huoselist;
