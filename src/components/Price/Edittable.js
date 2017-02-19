// import React from 'react';
// import ReactDOM from 'react-dom';
// // import { Upload, Icon, Modal } from 'antd';
// import styles from './Edittable.less';
// import { Input, Icon, Button } from 'antd';
// //表单中的修改组件
// class EditableCell extends React.Component {
//   state = {
//     value: this.props.value,
//     editable: false,
//   }
//   handleChange = (e) => {
//     const value = e.target.value;
//     this.setState({ value });
//   }
//   check = () => {
//     this.setState({ editable: false });
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }
//   edit = () => {
//     this.setState({ editable: true });
//   }
//   render() {
//     const { value, editable } = this.state;
//     return (<div className={styles.editable_cell}>
//       {
//         editable ?
//         <div className={styles.editable_cell_input_wrapper}>
//           <Input
//             value={value}
//             width="100px"
//             onChange={this.handleChange}
//             onPressEnter={this.check}
//           />
//           <Icon
//             type="check"
//             className={styles.editable_cell_icon_check}
//             onClick={this.check}
//           />
//         </div>
//         :
//         <div className={styles.editable_cell_text_wrapper}>
//           {value || ' '}
//           <Icon
//             type="edit"
//             className={styles.editable_cell_icon}
//             onClick={this.edit}
//           />
//         </div>
//       }
//     </div>);
//   }
// }
// export default EditableCell;

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Edittable.less';
import { Input, Icon, Button } from 'antd';
//表单中的修改组件
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
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
    return (
      <div className={styles.editable_cell}>
      {
        editable ?
        <div className={styles.editable_cell_input_wrapper}>
          <Input
            value={value}
            width="100px"
            onChange={this.handleChange}
            onPressEnter={this.check}
          />
          <Icon
            type="check"
            className={styles.editable_cell_icon_check}
            onClick={this.check}
          />
        </div>
        :
        <div className={styles.editable_cell_text_wrapper}>
          {value || ' '}
          <Icon
            type="edit"
            className={styles.editable_cell_icon}
            onClick={this.edit}
          />
        </div>
      }
      </div>
    );
  }
}
export default EditableCell;
