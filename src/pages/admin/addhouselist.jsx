import React, { Component } from 'react';
import {Card,Form,Input,Upload,message,Button,Modal} from 'antd'
import { UploadOutlined,BankTwoTone,AccountBookTwoTone,DashboardTwoTone,CalculatorTwoTone,SoundTwoTone,TrademarkCircleTwoTone,EnvironmentTwoTone,BuildTwoTone } from '@ant-design/icons';
import _ from 'lodash'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
//     abort none 中断读取
// readAsBinaryString file 将文件读取为二进制码
// readAsDataURL file 将文件读取为 DataURL
// readAsText file, [encoding] 将文件读取为文本
    reader.readAsDataURL(file);
//     onabort 中断时触发
// onerror 出错时触发
// onload 文件读取成功完成时触发
// onloadend 读取完成触发，无论成功或失败
// onloadstart 读取开始时触发
// onprogress 读取中
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class addhouselist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible:false,
      addform:{
          jpgs: '',
          local: '',
          scripts:'',
          onePrice:'',
          localRoom:'',
          localArea:'',
          localHigh:'',
          localTimes:'',
          localTwo:''
      },
      resdata:{
        result:'',
        imgurl:''
      },
      //预览的图片地址
      previewImage:''
    };
  }
//请求添加
addonFinish=async (values)=>{
  console.log(values);
  this.setState({
    addfrom:{
     
     jpgs:this.state.resdata.imgurl,
     scripts:values.scripts,
     local:values.local,
     localTwo:values.localtwo,
     localRoom:values.localroom,
     localArea:values.localarea,
     localHigh:values.localtimes,
     localTimes:values.localhigh,
     onePrice:values.oneprice

    }
  })
  console.log(this.state.addfrom);
const res =await  this.$axios.post('/tianjin/add',this.state.addfrom)
if(res){
  message.success('成功添加商品房!')
  this.props.history.push('/houseList')
}
  
  
}

//图片预览
handlePreview = async file => {
  // console.log(file);
  
  file.preview = await getBase64(file.originFileObj);
  
  // console.log(file.preview);
  
  this.setState({
    previewImage:file.response.imgurl||file.preview,
    // previewImage:file.preview,
    previewVisible: true,
  });
};
  render() {
    const props = {
      action: 'http://127.0.0.1:5757/fy/upload',
      listType: 'picture',
  
      
    };
    return (
     <div>
      <Card title='添加商品房'>
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
      layout="vertical"
      name="form_in_modal"
      onFinish={this.addonFinish}
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
      <Form.Item
        name="localroom"
        label="套型:"
        rules={[{ required: true,whitespace:true, message: '输入套型' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
       <Input
          prefix={<TrademarkCircleTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="套型"
        />
      </Form.Item>
      <Form.Item
        name="localarea"
        label="面积:"
        rules={[{ required: true,whitespace:true, message: '输入面积' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
       <Input
          prefix={<CalculatorTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="面积"
        />
      </Form.Item>
      <Form.Item
        name="localhigh"
        label="高度:"
        rules={[{ required: true,whitespace:true, message: '输入高度' },
        {min: 3,message:'至少3位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
       <Input
          prefix={<BuildTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="楼盘层数"
        />
      </Form.Item>
      <Form.Item
        name="localtimes"
        label="建造时间:"
        rules={[{ required: true,whitespace:true, message: '输入建造时间' },
        {min: 4,message:'至少4位'},
        {max:12, message:'最多12位'}
      ]}
        
      >
       <Input
          prefix={<DashboardTwoTone twoToneColor="#eb2f96" className="site-form-item-icon" />}
          type="text"
          placeholder="建造时间"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary"  htmlType="submit" >
        提交
        </Button>
      </Form.Item>
    </Form>
      </Card>
     
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

export default addhouselist;
