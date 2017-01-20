import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row,Transfer } from 'antd';
import styles from './Modalchosecolor.less';
const FormItem = Form.Item;

const Modalchosecolor = ({
  handleOk,
  handleCancel,
  chosecolorModal,
  transfordata,
  targetKeys,
  handleChange,
  filterOption,
}) => {
  // const data = [{
  //        key: '1',
  //        title: `content1`,
  //        description: `description 1`,
  //      },
  //      {
  //             key: '2',
  //             title: `content2`,
  //             description: `description 2`,
  //           },
  //           {
  //                  key: '3',
  //                  title: `content3`,
  //                  description: `description 3`,
  //                },
  //                {
  //                       key: '4',
  //                       title: `content4`,
  //                       description: `description 4`,
  //                     },
  //                     {
  //                            key: '5',
  //                            title: `content5`,
  //                            description: `description 5`,
  //                          },
  //                          {
  //                                 key: '6',
  //                                 title: `content6`,
  //                                 description: `description 6`,
  //                               },
  //                               {
  //                                      key: '7',
  //                                      title: `content7`,
  //                                      description: `description 7`,
  //                                    },
  //                                    {
  //                                           key: '8',
  //                                           title: `content8`,
  //                                           description: `description 8`,
  //                                         }];


	return(
      <Modal title={'选择颜色'}
       visible={chosecolorModal}
       onOk={handleOk}
       onCancel={handleCancel}
       maskClosable={false}
       closable={false}
      >
          <Transfer
           dataSource={transfordata}
           titles={['可选颜色', '已选颜色']}
           showSearch
           listStyle={{
                height: 250,
              }}
           filterOption={filterOption}
           targetKeys={targetKeys}
           onChange={handleChange}
           render={item => `${item.colorCode}  ${item.colorName}`}
           className={styles.center}
          />
    </Modal>
		);
}

Modalchosecolor.propTypes = {
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  chosecolorModal: PropTypes.any,
  transfordata: PropTypes.array,
  targetKeys: PropTypes.array,
  handleChange: PropTypes.func,
  filterOption: PropTypes.func
};

export default Modalchosecolor;
