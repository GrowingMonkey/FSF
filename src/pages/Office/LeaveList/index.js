import { Form, Row, Col, Input, Button, Select, Table, Divider, Space, DatePicker, Popconfirm } from 'antd';
import ModalLeaveApply from './components/ModalLeaveApply';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { queryLeaveList, passLeave, denyLeave } from '../../../services/office';

const LeaveList = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [searchValues, setSearchValues] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [leaveList, setLeaveList] = useState([]);
  const [leaveVisible, setLeaveVisible] = useState(false);
  const formList = [
    {
      name: 'leaveState',
      label: '请假状态',
      type: 'select',
      span: 6,
      options: [
        { label: '尚未批准', value: 0 },
        { label: '同意请假', value: 1 },
        { label: '驳回重写', value: 2 },
        { label: '此假不批', value: 3 },
      ],
    },
    {
      name: 'comId',
      label: '归属公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'employId',
      label: '请假用户ID',
      type: 'input',
      span: 6,
    },
  ];
  const leaveColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,

    },
    {
      title: '请假用户',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,

    },
    {
      title: '归属公司',
      dataIndex: 'type4',
      key: 'type4',
      ellipsis: true,

    },
    {
      title: '请假时间',
      dataIndex: 'startTime',
      key: 'startTime',
      ellipsis: true,
      width: 170
    },
    {
      title: '时长',
      dataIndex: 'type6',
      key: 'type6',
      ellipsis: true,

    },
    {
      title: '请假状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,

    },
    {
      title: '批假用户',
      dataIndex: 'leaderName',
      key: 'leaderName',
      ellipsis: true,

    },
    {
      title: '请假事由',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,

    },
    {
      title: '附件',
      dataIndex: 'file',
      key: 'file',
      ellipsis: true,
      render: (text, record) => {
        return <Image src={text} width="50"></Image>
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      fixed: 'right',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="确定审核当前用户的请求？"
              onConfirm={() => { passLeave({ id: record.id }) }}
              onCancel={() => {
                denyLeave({ id: record.id })
              }
              }
              okText="通过"
              cancelText="拒绝"
            >
              <Button type="link">审批</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleSearchClear = () => {
    form.resetFields();
    setSearchValues(null);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      // if (values.cityCode) {
      //   if (values.cityCode[1]) {
      //     payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
      //   } else {
      //     payload.cityCode = `${values.cityCode[0]}`;
      //   }
      // }
      if (values.customer) {
        payload.customerName = values.customer.customerName;
        delete payload.customer;
      }

      setSearchValues(payload);
      setCurrentPage(1);
    });
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    queryLeaveList({ pageNo: currentPage, pageSize: 20, ...searchValues }).then((res) => {
      const { data } = res;
      setLeaveList(
        data.list &&
        data.list.map((item) => {
          return Object.assign(item, { key: item.id });
        }),
      );
      setTotal(data?.count || 0);
    });
  }, [currentPage, searchValues]);

  return (
    <PageContainer>
      <ModalLeaveApply visible={leaveVisible} onSubmit={() => {
        setLeaveVisible(false)
        queryLeaveList({ pageNo: currentPage, pageSize: 20, ...searchValues }).then((res) => {
          const { data } = res;
          setLeaveList(
            data.list &&
            data.list.map((item) => {
              return Object.assign(item, { key: item.id });
            }),
          );
        })
      }} onCancel={() => setLeaveVisible(false)}></ModalLeaveApply>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>请假管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={handleSearchClear}>清空</Button>
              <Button type="primary" onClick={handleSearch}>
                搜索
              </Button>
              <Button type="primary" onClick={() => setLeaveVisible(true)}>
                申请请假
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left" onKeyDown={e => { if (e.keyCode == 13) { handleSearch() } }}>
          {
            <Row gutter={32}>
              {formList.map((col) => {
                if (col.render) {
                  return col.render();
                }
                if (col.type === 'input') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <Input></Input>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'select') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <Select options={col.options}></Select>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'datePicker') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label}>
                        <DatePicker style={{ width: '100%' }} format={"YY-MM-DD"}></DatePicker>
                      </Form.Item>
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          }
        </Form>
      </div>
      <div className={styles['list-container']}>
        <Table columns={leaveColumns} dataSource={leaveList} pagination={{
          total: total,
          pageSize: 10,
          onChange: e => setSearchValues({ pageNo: e }),
          showTotal: total => `共${total}条`

        }} size="small" bordered scroll={{ x: 900 }} />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }}></div>
    </PageContainer>
  );
};

export default LeaveList;
