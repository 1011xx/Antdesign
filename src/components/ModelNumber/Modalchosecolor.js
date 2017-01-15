import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row,Transfer } from 'antd';
import styles from './Modalchosecolor.less';
const FormItem = Form.Item;

const Modalchosecolor = ({
  handleOk,
  handleCancel,


}) => {
  const data = [{
         key: '1',
         title: `content1`,
         description: `description 1`,
       },
       {
              key: '2',
              title: `content2`,
              description: `description 2`,
            },
            {
                   key: '3',
                   title: `content3`,
                   description: `description 3`,
                 },
                 {
                        key: '4',
                        title: `content4`,
                        description: `description 4`,
                      },
                      {
                             key: '5',
                             title: `content5`,
                             description: `description 5`,
                           },
                           {
                                  key: '6',
                                  title: `content6`,
                                  description: `description 6`,
                                },
                                {
                                       key: '7',
                                       title: `content7`,
                                       description: `description 7`,
                                     },
                                     {
                                            key: '8',
                                            title: `content8`,
                                            description: `description 8`,
                                          }];
var targetKeys=['5'];
function handleChange(targetKey) {
    console.log(targetKeys);
    targetKeys=targetKey

  }
  function filterOption(inputValue, option) {
     console.log(inputValue);
     return option.data.indexOf(inputValue) > -1;
   }

	return(
    <Modal title={'选择颜色'}
     visible={true}
     onOk={handleOk}
     onCancel={handleCancel}
     closable={false}
   >
    <Transfer
     dataSource={data}
     titles={['可选颜色', '已选颜色']}
     showSearch
     listStyle={{
          height: 250,
        }}
     filterOption={filterOption}
     targetKeys={targetKeys}
     onChange={handleChange}
     render={item => item.title}
     className={styles.center}
    />
  </Modal>
		);
}

Modalchosecolor.propTypes = {
  title: PropTypes.any,
	visible: PropTypes.any,
	form: PropTypes.object,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Modalchosecolor;
