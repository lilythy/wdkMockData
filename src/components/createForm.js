import React from 'react';
import { connect } from 'dva';
import {
  Form, message, Input, Button,
} from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = window.localStorage.getItem('domainToRap2') && JSON.parse(window.localStorage.getItem('domainToRap2')) || []
        let hasDomain = data.some(item => item.domain === values.domain)
        if(hasDomain){
          message.error('已经添加过该域名！');
          return;
        }
        let datasource = [...data, {...values, key: new Date().getTime()}]
        window.localStorage.setItem('domainToRap2', JSON.stringify(datasource))
        dispatch({type: 'extension/replace', payload: {domainToRap2:datasource }})
        window.chrome.storage && window.chrome.storage.sync.set({domainToRap2: datasource})
      }
    });
  }

  render() {
    const {domainToRap2, dispatch} = this.props
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };

    // Only show error after a field is touched.
    const domainError = isFieldTouched('domain') && getFieldError('domain');
    const idError = isFieldTouched('id') && getFieldError('id');
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="域名"
          validateStatus={domainError ? 'error' : ''}
          help={domainError || ''}
        >
          {getFieldDecorator('domain', {
            rules: [{ required: true, message: '域名必填！' }],
          })(
            <Input placeholder="请输入域名" />
          )}
        </Form.Item>
        <Form.Item
          label="Rap2 id"
          validateStatus={idError ? 'error' : ''}
          help={idError || ''}
        >
          {getFieldDecorator('id', {
            rules: [{ required: true, message: 'Rap2 id必填！' }],
          })(
            <Input placeholder="请输入rap2 id" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create({ name: 'create' })(CreateForm);

WrappedForm.propTypes = {
};

export default connect((state) => {
  const { domainToRap2, checked } = state.extension
  return {
    domainToRap2, checked
  }
})(WrappedForm);
