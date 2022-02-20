import { useState, useEffect } from 'react';
import { Table, Button, Space, Row, Col, Pagination, Divider } from 'antd';
import ModalForm from './components/ModalForm';
import { roleList, permissionList } from '@/services/admin';
import styles from './index.less';

const RoleList = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [list, setList] = useState([]);
  const [functionTree, setFunctionTree] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [formValue, setFormValue] = useState(null);
  useEffect(() => {
    roleList({ pageNo: currentPage, pageSize: 10 }).then((res) => {
      setList(
        res.data.list.map((item) => {
          return Object.assign(item, {
            key: item.id,
          });
        }),
      );
      setListLength(res.count);
      permissionList({ pageNo: currentPage, pageSize: 1000 }).then((res) => {
        if (res.data.list.length) {
          let functionTree = {};
          let menuTree = {};
          let functionList = [];
          let menuList = [];
          res.data.list.forEach((item) => {
            if (item.url.startsWith('/')) {
              functionList.push(item);
            }
            if (item.url.startsWith('route')) {
              menuList.push(item);
            }
          });
          // console.log(functionList, "---", menuList);
          functionList.forEach((item) => {
            let urlList = item.url.split('/').filter((url) => {
              return url.length > 0;
            });
            // console.log(urlList);
            if (urlList.length === 1) {
              if (!functionTree[urlList[0]])
                functionTree[urlList[0]] = {
                  title: `${item.name}-${urlList[0]}`,
                  key: item.id,
                  children: [],
                };
            }
          });
          console.log(functionTree);
          functionList.forEach((item) => {
            let urlList = item.url.split('/').filter((url) => {
              return url.length > 0;
            });
            if (urlList.length === 2) {
              functionTree[urlList[0]].children.push({
                title: `${item.name}-${urlList[1]}`,
                key: item.id,
                parentKey: functionTree[urlList[0]].key,
              });
            }
          });
          let functionTreeData = Object.keys(functionTree).map((key) => {
            return functionTree[key];
          });
          setFunctionTree(functionTreeData);
          // console.clear();
          menuList.forEach((item) => {
            let urlList = item.url.split('/').filter((url) => {
              return url.length > 0;
            });
            if (urlList.length === 2) {
              menuTree[urlList[1]] = {
                title: `${item.name}-${urlList[1]}`,
                key: item.id,
                children: [],
              };
            }
          });
          menuList.forEach((item) => {
            let urlList = item.url.split('/').filter((url) => {
              return url.length > 0;
            });
            if (urlList.length === 3) {
              // console.log(item, urlList[1], menuTree[urlList[1]]);
              menuTree[urlList[1]].children.push({
                title: `${item.name}-${urlList[2]}`,
                key: item.id,
                parentKey: menuTree[urlList[1]].key,
              });
            }
          });
          // console.log(menuTree);
          let menuTreeData = Object.keys(menuTree).map((key) => {
            return menuTree[key];
          });
          setMenuTree(menuTreeData);
        }
      });
    });
  }, [currentPage]);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onSubmit = () => {
    roleList({ pageNo: currentPage, pageSize: 20 }).then((res) => {
      setList(
        res.data.list.map((item) => {
          return Object.assign(item, {
            key: item.id,
          });
        }),
      );
      setListLength(res.count);
    });
    setVisible(false);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const roleColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '角色说明',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size={16}>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              setFormValue(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>
        </Space>
      ),
      width: 100,
    },
  ];
  return (
    <div className={styles['role-list']}>
      <ModalForm
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        record={formValue}
        functionTree={functionTree}
        menuTree={menuTree}
      ></ModalForm>
      <div className={styles['list-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>角色列表</div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setFormValue(null);
                setVisible(true);
              }}
            >
              新增角色
            </Button>
          </Col>
        </Row>
        <Divider></Divider>
        <Table
          style={{ marginTop: '25px' }}
          columns={roleColumns}
          dataSource={list}
          pagination={false}
          size="small"
        />
        <Row justify="end" style={{ marginTop: '15px' }}>
          <Col>
            <Pagination
              current={currentPage}
              onChange={onPageChange}
              total={listLength}
            ></Pagination>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RoleList;
