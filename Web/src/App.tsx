import React from 'react';
import { Button, Divider, Input, InputNumber, Modal, Select, Spin, Table } from '../node_modules/antd/lib/index';
const Option = Select.Option;
 
 
 
export default class UserTable extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      result: [],
      changeLine: [],
      temp: [],
      modal:false,
      spin:'none',
      p:'block'
    }
  }
  componentDidMount() {
    // const _this = this;
    // axios.get('')
    // .then(function(response){
    //     _this.setState({
    //         data1:response.data,
    //         isLoaded:true
    //     });
    // })
    // .catch(function(error){
    //     window.console.log(error);
    //     _this.setState({
    //         isLoaded:false,
    //         error:error                                          
    //     });
    // })
    const data = [{
        key: '0',
        name: 'John Brown',
        protocol: 'http',
        domin: 'New York No. 1 Lake Park',
        port: '8000',
      },
      {
        key: '1',
        name: 'Jim Green',
        protocol: 'https',
        domin: 'London No. 1 Lake Park',
        port: '8080',
      },
      {
        key: '2',
        name: 'Joe Black',
        protocol: 'http',
        domin: 'Sidney No. 1 Lake Park',
        port: '3322',
      }];
 
    this.setState({
      result: data,
      changeLine: new Array(data.length).fill(false),
      temp: data
    })
 
  }
  send(){
      const { result } = this.state      
      window.console.log(result)
        // axios.post('',result)
        // .then(function(response){
        //     window.console.log('response:',response);
        // })
        // .catch(function(error){
        //     window.console.log(error);
        // })
  }
  restart(){
      this.setState({
          modal:true
      })
  }
  handleOk(){
      this.setState({
          spin:'block',
          p:'none'
      })
      setTimeout(function(){         
          window.location.reload()
    },5000)
  }
  handleCancel(){
      this.setState({
          modal:false
      })
  }
  
  modify(index:any, type:any, value:any) {
    console.log(index, type, value);
      let _temp = JSON.parse(JSON.stringify(this.state.temp));          
      _temp[index][type] = value;
      window.console.log(_temp[index])         
      this.setState({
          temp: _temp,
          result:_temp,
      })
    }
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name', 
    },
    {
      title: 'Protocol',
      dataIndex: 'protocol',
      key: 'protocol',
      render: (text:any,line:any) => {
        return (<Select defaultValue={text} onChange={(value:any)=>{this.modify(line.key,'protocol',value)}}>
                    <Option value="http">http</Option>
                    <Option value="https">https</Option>
                </Select>)     
       }
    }, 
    {
        title: 'Domin',
        dataIndex: 'domin',
        key: 'domin',
        render: (text:any,line:any) => {
            return (<Input type='text' defaultValue={text} onBlur={(e:any)=>{this.modify(line.key,'domin',e.target.value)}}/>)
        }},
    {
        title: 'Port',
        dataIndex: 'port',
        key: 'port',
        render: (text:any,line:any) => {
            return (<Input type='number' defaultValue={text} onBlur={(e:any)=>{this.modify(line.key,'port',e.target.value)}}/>)
    }}];
    return (
      <div>
          <div style={{marginTop:'50px'}}>
                <div style={{float:'right',marginRight:'150px'}}>
                    <Button type='primary' onClick={this.send.bind(this)}>保存提交</Button>
                    <Modal title='重启' visible={this.state.modal} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText='确认' cancelText='取消'>
                        <p style={{display:this.state.p}}>是否确认重启？</p>
                        <p style={{display:this.state.p}}>确认后将在5秒后重启</p>
                        <Spin style={{display:this.state.spin}} tip="Loading..."></Spin>
                    </Modal>                    
                    <Button type='primary' style={{marginLeft:'10px'}} onClick={this.restart.bind(this)}>重启</Button>
                </div>
                <div style={{display:'flex',justifyContent:'center',clear:'both'}}>                
                    <Table columns={columns} dataSource={this.state.result} pagination={{ pageSize: 10 }} bordered style={{width:'1200px',marginTop:'50px'}}></Table>               
                </div>                
            </div>         
      </div>
 
    )
  }
}