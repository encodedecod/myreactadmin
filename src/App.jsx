import React from 'react';
import {HashRouter as Router,Route,Switch, Redirect} from 'react-router-dom'
import Login from './pages/login/login'
import Register from './pages/register/register'
import houseList from './pages/admin/huoselist'
import Admin from './pages/admin/admin'
import addHouseList from './pages/admin/addhouselist';
import UserList from './pages/admin/userlist'
import UserPower from './pages/admin/userpower'
import houseImg from './pages/admin/houseimg'
import houseAnalyse from './pages/admin/houseanalyse'
import Frame from './components/frame'
class App extends React.Component{
  // constructor(){
  //   super()
  //   this.state={
  //     islogin:false
  //   }
  // }
  //  componentWillUpdate(){
  //   if(sessionStorage.getItem('token')){
  //     this.setState({
  //       islogin:true
  //     })
  //   }
  // }
//   tip=()=>{
// message.success('成功点击')
//   }
  render(){ 
    return sessionStorage.getItem('token') ? (
      <Router>
         
         <Frame>
           <Switch>
          <Route path='/admin' exact component={Admin}></Route>
          <Route path='/houseList' exact component={houseList}></Route>
          <Route path='/addhouseList' exact component={addHouseList}></Route>
          <Route path='/userlist' exact component={UserList}></Route>
          <Route path='/userpower' exact component={UserPower}></Route>
          <Route path='/houseimg' exact component={houseImg}></Route>
          <Route path='/houseanalyse' exact component={houseAnalyse}></Route>
          </Switch>
          </Frame>
         
      </Router>
    ):(
      <Router>
        <Switch>
         <Route path='/register' exact component={Register}></Route>
         <Route path='/login' exact component={Login}></Route>
         <Redirect to='/login' />
        </Switch>
      </Router>
      
    )
  }
}

export default App;
