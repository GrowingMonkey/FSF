import { Space, Select, Button } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang, history } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';
import { useState } from 'react'
const GlobalHeaderRight = () => {
  const [type, setType] = useState('/talent/t-list')
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Select onChange={val => setType(val)} size="small" defaultValue={'/talent/t-list'} options={[{ label: '人选搜索', value: '/talent/t-list' }, { label: '客户搜索', value: '/customer/list' }, { label: '职位搜索', value: '/project/p-list' }]}></Select>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="关键词查询"
        defaultValue=""
        options={null}
        onSearch={(value) => {
          console.log('input', value);
          history.replace({ pathname: type, state: { keyword: value } })
        }}
        onClickIcon={(value) => {
          console.log('input', value);
          history.replace({ pathname: type, state: { keyword: value } })
        }}
      />
      <PlusOutlined onClick={() => history.push('/talent/t-add')} />
      {/* <Button type="dashed" onClick={() => history.push('/talent/t-add')}>简历解析</Button> */}
      {/* <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
        <QuestionCircleOutlined />
      </span> */}
      <NoticeIconView />
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
