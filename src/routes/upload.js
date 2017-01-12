import React from 'react';
import ReactDOM from 'react-dom';
// import { Upload, Icon, Modal } from 'antd';
// import styles from './upload.less';

import { Transfer } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  componentDidMount() {
    this.getMock();
  },

  getMock() {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `${i + 100}`,
        description: `蓝色${i + 1}`,
      
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  },
  filterOption(inputValue, option) {
    return option.description.indexOf(inputValue) > -1;
  },
  handleChange(targetKeys) {
    console.log(targetKeys);
    this.setState({ targetKeys });
  },
  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
       
        render={item => `${item.title}--${item.description}`}
      />
    );
  },
});


export default Test;