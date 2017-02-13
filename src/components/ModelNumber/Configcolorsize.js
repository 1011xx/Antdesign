import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import PicturesWall from './upload';
import styles from './Configcolorsize.less';
const FormItem = Form.Item;
const Option = Select.Option;

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (value) => {
    console.log(value);
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (<Select
        multiple
        style={{ width: 300,height:70 }}
        className={styles.select}
        placeholder="点击输入框选择尺寸"
        onChange={this.handleChange}
        onSelect={this.check}

      >
     <Option  value={'010'}>010</Option>
     <Option  value={'020'}>020</Option>

     </Select>);
  }
}












const Configcolorsize=({
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue
    },
    handleSubmit,
    chooseColor,
    dataSource,
    handleChange,
    getIndex,
    config,
    onUpload,
    onEditDetail,
    sizeoption,
    listarry,
    backurl,
    configlist,

  })=> {



    // 使用map函数生成option选项
  const selectopt=sizeoption.map((item, key) => {

    return(
      <Option key={key} value={item.value}>{item.label}</Option>
      );
  });


    const columns = [{
      title: '颜色',
      dataIndex: 'colorCode',
      key: 'color',
    }, {
      title: '颜色名称',
      dataIndex: 'colorName',
      key: 'colorName',
    }, {
      title: '尺寸',
      dataIndex: 'size',
      key: 'size',
      render:(text, record, index) => (
        <EditableCell
          value={text}
          onChange={handleChange(index, 'name')}
        />
      ),
    }, {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render:(text,record)=>(
        <div className={styles.picturewall} onClick={() => onUpload(record)}>
        <PicturesWall />
        </div>
      ),
    }, {
      title: '操作',
      key: 'operation',
      render:(text,record)=>(
        <a onClick={() => onEditDetail(text,record)}>删除</a>
      ),
    }];
    const data=[{
      color:'101',
      colorName:'黑色'

    },
    {
      color:'102',
      colorName:'绿色'

    }];


  return (
    <div>
    <Plate title="款号信息">
     <div className={styles.inline}>款&nbsp;&nbsp;&nbsp;&nbsp;号：{config.code}</div>
     <div className={styles.margindis}>品&nbsp;&nbsp;&nbsp;&nbsp;名：{config.name}</div>
    </Plate>

    <TablePlate title="配置颜色尺寸图片">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => chooseColor()}><Icon type="check-square-o" />&nbsp;选择颜色</a>
      </div>
        <Table size="small"
            className={styles.table}
            columns={columns}
            loading={false}
            dataSource={configlist}
            pagination={false}
            bordered
          />

    </TablePlate>
    <div className={styles.btn_wrap}>
      <FormItem>
        <Button type="primary" htmlType="submit" size="large">保存</Button>
        <Button type="ghost" size="large" className={styles.marginbtn} onClick={backurl}>取消</Button>
      </FormItem>
    </div>
    <div style={{height:1}}/>
    </div>
  );
}
Configcolorsize.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  backurl:PropTypes.func,
  onUpload: PropTypes.func,
  onEditDetail: PropTypes.func,
  handleChange: PropTypes.func,
};
export default Form.create()(Configcolorsize);
