import { Form, Row, Col, Input, Button, Select, Table, Divider, Popconfirm, Space, DatePicker } from 'antd';
import ModalOnFieldApply from './components/ModalOnFieldApply';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { useRequest } from 'umi'
import { queryBtripList, passBtrip, denyBtrip } from '../../../services/office';

const OnFieldList = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [searchValues, setSearchValues] = useState(null);
  const [onFieldList, setOnFieldList] = useState([]);
  const [fieldVisible, setFieldVisible] = useState(false);
  const formList = [
    {
      name: 'bstripState',
      label: '外出状态',
      type: 'select',
      span: 6,
      options: [
        { label: '申请中', value: 0 },
        { label: '已审批 ', value: 1 },
        { label: '未审批', value: 2 },
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
  const onFieldColumns = [
    {
      title: '外出分类',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,

    },
    {
      title: '外出用户',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '审批用户',
      dataIndex: 'leaderName',
      key: 'leaderName',
      ellipsis: true,

    },
    {
      title: ' 归属公司',
      dataIndex: 'type3',
      ellipsis: true,

      key: 'type3',
    },
    {
      title: '办事单位',
      dataIndex: 'type4',
      ellipsis: true,

      key: 'type4',
    },
    {
      title: '外出地址',
      dataIndex: 'type5',
      ellipsis: true,

      key: 'type5',
    },
    {
      title: '外出时间',
      dataIndex: 'startTime',
      key: 'startTime',
      ellipsis: true,

    },
    {
      title: '返回时间',
      dataIndex: 'endTime',
      ellipsis: true,

      key: 'endTime',
    },
    {
      title: '事由',
      dataIndex: 'reason',
      ellipsis: true,

      key: 'reason',
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
              onConfirm={() => { passBtrip({ id: record.id }) }}
              onCancel={() => {
                denyBtrip({ id: record.id })
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
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.cityCode) {
        if (values.cityCode[1]) {
          payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
        } else {
          payload.cityCode = `${values.cityCode[0]}`;
        }
      }
      if (values.customer) {
        payload.customerName = values.customer.customerName;
        delete payload.customer;
      }

      setSearchValues(payload);
    });
  };

  useEffect(() => {
    queryBtripList(searchValues).then((res) => {
      const { data } = res;
      setOnFieldList(
        data?.list || []
      );
      setTotal(data?.count || 0)
    });
  }, [searchValues]);

  return (
    <PageContainer>
      <ModalOnFieldApply visible={fieldVisible} onSubmit={() => {
        setFieldVisible(false);
        queryBtripList(searchValues).then((res) => {
          const { data } = res;
          setOnFieldList(
            data.list &&
            data.list.map((item) => {
              return Object.assign(item, { key: item.id });
            }),
          );
        })
      }} onCancel={() => setFieldVisible(false)}></ModalOnFieldApply>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>出差管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={handleSearchClear}>清空</Button>
              <Button onClick={() => setFieldVisible(true)}>申请出差</Button>
              <Button type="primary" onClick={handleSearch}>
                搜索
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
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
                        <DatePicker style={{ width: '100%' }}></DatePicker>
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
        <Table columns={onFieldColumns} dataSource={onFieldList} pagination={{
          total: total,
          pageSize: 10,
          onChange: e => setSearchValues({ pageNo: e })
        }} size="small" bordered scroll={{ x: 900 }} />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }}></div>
    </PageContainer >
  );
};

export default OnFieldList;
