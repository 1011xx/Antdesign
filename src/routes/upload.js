import React from 'react';
import ReactDOM from 'react-dom';
// import { Upload, Icon, Modal } from 'antd';
// import styles from './upload.less';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const Test = React.createClass({


 onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
},
  render() {
    return (
      <div>
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time"
      onChange={this.onChange}
    />
    <br />
    <RangePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder={['Start Time', 'End Time']}
      onChange={this.onChange}
    />
  </div>
    );
  },
});


export default Test;