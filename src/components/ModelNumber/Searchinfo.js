import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import styles from './Searchinfo.less';
const FormItem = Form.Item;


const Searchinfo = ({
  styleCategory,
  styleYear,
  passdata,
  selectCategory,
  selectRegion,
  selectCity,
  selectShopststus,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
}) =>{

function handleSearch(){
	validateFields((errors) => {
          if (errors) {
            return;
          }
          const data = { ...getFieldsValue() };
          passdata(data);
        });
}


return (
        <div>

        <Plate title="查询信息">
            <Form
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
            <Col  span={6} className={styles.ant_col_center}>
            <FormItem
            label="款号"
            >
              {getFieldDecorator('styleCode', {

              })(
                <Input size="large" placeholder="请输入" />
              )}
            </FormItem>
            </Col>
            <Col  span={6} className={styles.ant_col_center}>
            <FormItem
            label="类别"
            >
            {getFieldDecorator('categoryCode', {

            })(
             <Cascader
              options={styleCategory}
              onChange={selectCategory}
              placeholder="请选择类别"
              />
            )}
            </FormItem>
           </Col>
           <Col  span={6} className={styles.ant_col_center}>

             <FormItem
            label="年份"
            >
            {getFieldDecorator('yearCode', {

            })(
            <Cascader
              options={styleYear}
              onChange={selectRegion}
              placeholder="请选择销售区域"
              />
            )}
            </FormItem>
            </Col>
             <Col  span={6} className={styles.ant_col_center}>
            <FormItem>
              <Button type="primary" onClick={handleSearch}>查询</Button>
            </FormItem>
            </Col>
            </Row>


          </Form>
        </Plate>




        </div>

  );
};

Searchinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  selectCategory: PropTypes.func,
  selectRegion: PropTypes.func,
  selectCity: PropTypes.func,
  selectShopststus: PropTypes.func,
  styleCategory:PropTypes.array,
  styleYear:PropTypes.array,

};


export default Form.create()(Searchinfo);
