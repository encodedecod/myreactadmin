import React,{Component} from 'react'
import {Map,Marker} from 'react-amap'
import './amap.less'
const mapKey = '7fddecb990a30738c4858b6c66ccd7d7' //需要自己去高德官网上去申请
class Address extends Component {
	constructor (props) {
        super (props)
        this.state = {  
        myadress:''
        }

    }
    componentDidMount(){
      fetch('https://restapi.amap.com/v3/ip?key=7fddecb990a30738c4858b6c66ccd7d7').then(res=>{
        return res.json()
          }).then(data=>{
        console.log(data);
        this.setState({
          myadress:data.city
        })
    })

   
   
     
    }
	render(){
		return (
			<div style={{width: '100%', height: '400px'}}>
                <h1>{this.state.myadress}</h1>
				<Map amapkey={mapKey} 
				     zoom={15} ></Map>
			</div>
		)
	}
}

export default Address
