import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Form, Switch, Input, Button, Icon, Table } from 'antd';
import CreateForm from '../components/createForm'

class IndexPage extends React.Component {
  componentDidMount(){
    const {dispatch} = this.props
    let data = window.localStorage.getItem('domainToRap2') && JSON.parse(window.localStorage.getItem('domainToRap2')) || []
    window.chrome.storage && window.chrome.storage.sync.get({domainToRap2: []}, (result) => {
    })
  }

  switchChange = (checked) => {
    const {dispatch} = this.props
    window.chrome.storage && window.chrome.storage.sync.set({domainSwitch: checked})
    window.localStorage.setItem('domainSwitch', checked)
    dispatch({type: 'extension/setSwitch', payload: { checked }})
  }

  render(){
    const {checked, domainToRap2, dispatch} = this.props
    const columns = [{
      title: '域名',
      dataIndex: 'domain',
      key: 'domain'
    }, {
      title: 'Rap2 id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '操作',
      key: 'domain',
      render: (value, record, index) => <span><a href="javascript:;" onClick={() => {
        let data = window.localStorage.getItem('domainToRap2') && JSON.parse(window.localStorage.getItem('domainToRap2')) || []
        let datasource = data.filter(item => item.id !== record.id)
        dispatch({type: 'extension/replace', payload: {domainToRap2:datasource }})
        window.localStorage.setItem('domainToRap2', JSON.stringify(datasource))
        window.chrome.storage && window.chrome.storage.sync.set({domainToRap2: datasource})
        this.forceUpdate();
      }}>删除</a>
      {/* <a>修改</a> */}
      </span>
    }]
    return (
      <div className={styles.normal}>
        <div className={styles.margin10}><label>是否代理至Rap2：</label><Switch checked={checked} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} onChange={this.switchChange} /></div>
        <CreateForm />
        <Table rowKey='key' dataSource={domainToRap2} columns={columns} />
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect((state) => {
  const { domainToRap2, checked } = state.extension
  return {
    domainToRap2, checked
  }
})(IndexPage);
