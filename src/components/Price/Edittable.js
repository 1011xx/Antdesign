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
  console.log('will');

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
    console.log('wewewe');
    this.setState({ value:this.props.value });
    console.log('this.props.setFieldsValue',this.props.value);
    console.log('this.state.value',this.state.value);
  }
  shouldComponentUpdate(){
    console.log('update');
  console.log('this.props.setFieldsValue',this.props.value);
  return true;
  }

}
export default EditableCell;
