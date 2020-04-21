import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Button,Modal} from 'antd';
import { UserOutlined, HomeOutlined,MonitorOutlined,PoweroffOutlined } from '@ant-design/icons';
import  Adress from '../utils/amap'
import './frame.less'
class frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adressvisible:false
    };
  }
  enterIconLoading=()=>{
    sessionStorage.removeItem('token')
    if(!sessionStorage.getItem('token')){
      window.location.reload(true)
    }
    
  }
  showadress=()=>{
   this.setState({
     adressvisible:true
   })
  }
  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (
      <div>
        <Layout>
        <Header className="header" style={{position:'relative',backgroundColor:'#eb2f96'}}>
          <div className="logo" style={{width:'40px'}}>
            <img src="https://i01picsos.sogoucdn.com/51be276ab67181fd" style={{height:'40px',width:'40px',borderRadius:'50%',margin:'0 20px'}} alt=""/>
          </div>
          <div style={{position:'absolute',top:'0px',left:'150px',fontSize:'30px',color:'#fff'}}>
            后台管理系统
          </div>
          <Button type='primary' onClick={this.showadress} style={{position:'absolute',right:'160px',top:'20px',borderRight:'2px solid #fff'}}>
          点击获取当前位置
          </Button>
          <Button
          type="primary"
          icon={<PoweroffOutlined />}

          onClick={this.enterIconLoading}
          style={{position:'absolute',right:'20px',top:'20px'}}
        >
          退出登录
        </Button>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background" >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                        <HomeOutlined />
                  
                   商品房管理
                  </span>
                }
              >
                <Menu.Item key="1" onClick={()=>this.props.history.push('/admin')}>主页</Menu.Item>
                <Menu.Item key="2" onClick={()=>this.props.history.push('/houseList')}>商品房列表</Menu.Item>
                <Menu.Item key="3" onClick={()=>this.props.history.push('/addhouseList')}>添加商品房</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <UserOutlined />
                   用户管理
                  </span>
                }
              >
                <Menu.Item key="5" onClick={()=>this.props.history.push('/userlist')}>用户列表</Menu.Item>
                <Menu.Item key="6" onClick={()=>this.props.history.push('/userpower')}>限权管理</Menu.Item>
               
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <MonitorOutlined />
                   商品房分析
                  </span>
                }
              >
                <Menu.Item key="9" onClick={()=>this.props.history.push('/houseimg')}>房价走势</Menu.Item>
                <Menu.Item key="10" onClick={()=>this.props.history.push('/houseanalyse')}>未来预测</Menu.Item>
               
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
             {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Modal
          title="获取当前位置"
          visible={this.state.adressvisible}
          footer={null}
          onCancel={()=>this.setState({
            adressvisible:false
          })}
        >
       <Adress>

       </Adress>
        </Modal>
      </div>
    );
  }
}

export default withRouter(frame);
