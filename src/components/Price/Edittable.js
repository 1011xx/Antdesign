import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Edittable.less';
import { Input, Icon, Button } from 'antd';
// const FormItem = Form.Item;

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });

    // console.log("EditableCell:",e.target.value);
  }
  blur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  }
componentWillMount(){
  

}
  render() {
    const { value } = this.state;
    console.log('did',value);

    return (
      <div>
      <Input
      size="small"
        value={value}
        onChange={this.handleChange}
        onBlur={this.blur}
      />
      </div>

    );
  }
  componentWillReceiveProps(){
    
    this.setState({ value:this.props.value });
   
  }
  shouldComponentUpdate(){
   
  
  return true;
  }

}
export default EditableCell;
