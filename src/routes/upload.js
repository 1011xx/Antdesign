import React from 'react';
import ReactDOM from 'react-dom';
// import { Upload, Icon, Modal } from 'antd';
import  './upload.less';
import { Switch, Button } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      disabled: true,
    };
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },
  clickfunc(){
    console.log(11);
this.setState({
      disabled: !this.state.disabled,
    });
  },
  render() {
    return (
      <div>
      <div onClick={this.clickfunc}>
        <Switch checked={this.state.disabled} />
      </div>
        
        <br />
        <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
      </div>
    );
  },
});

export default Test;