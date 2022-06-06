import {
  Form,
  Row,
  Col,
  Popconfirm,
  Input,
  InputNumber,
  Button,
  Select,
  Table,
  Modal,
  Divider,
  Space,
  DatePicker,
  Cascader,
  message,
} from 'antd';
import styles from './index.less';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { selectServiceFeeList, addcp, adddz, selectSFListForInvoice, selectInvoiceList, relevancePay } from '@/services/eco';
import { history } from 'umi';
const InvoiceList = () => {
  const [fresh, setFresh] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [InvoiceSelectItem, setInvoiceSelectItem] = useState(null);
  const [form] = Form.useForm();
  const [searchModalValues, setSearchModalValues] = useState(null);
  const [searchValues, setSearchValues] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);
  const [ModelData, setModelData] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(1)
  const [appUserId, setAppUserId] = useState('');
  const formList = [

    {
      name: 'state',
      label: '业务类型',
      type: 'select',
      span: 8,
      options: [
        { label: '已到账', value: 0 },
        { label: '未到账', value: 1 },
        { label: '已支出', value: 2 },
        { label: '未支出', value: 3 },
      ],
    },
    {
      name: 'type12',
      label: '发票属性',
      type: 'select',
      span: 8,
      options: [
        { label: '已到账', value: 0 },
        { label: '未到账', value: 1 },
        { label: '已支出', value: 2 },
        { label: '未支出', value: 3 },
      ],
    },
    {
      name: 'isBack',
      label: '回款状态',
      type: 'select',
      span: 8,
      options: [
        { label: '已到账', value: 0 },
        { label: '未到账', value: 1 },
        { label: '已支出', value: 2 },
        { label: '未支出', value: 3 },
      ],
    },
    {
      name: 'type1',
      label: '发票类型',
      type: 'select',
      span: 8,
      options: [
        { label: '已到账', value: 0 },
        { label: '未到账', value: 1 },
        { label: '已支出', value: 2 },
        { label: '未支出', value: 3 },
      ],
    },
    {
      name: 'state1',
      label: '发票状态',
      type: 'select',
      span: 8,
      options: [
        { label: '申请中', value: 0 },
        { label: '已开出', value: 1 },
        { label: '已作废', value: 2 },
      ],
    },
    {
      name: 'name',
      label: '上岗人选',
      type: 'input',
      span: 8,
    },

    {
      name: 'userName',
      label: '开票人',
      type: 'input',
      span: 8,
    },
    {
      name: 'invoiceTime',
      label: '开票时间',
      type: 'input',
      span: 8,
    },
    {
      name: 'updateTime',
      label: '到账时间',
      type: 'input',
      span: 8,
    },
  ];
  const invoiceColumns = [
    {
      title: '发票编号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,

    },
    {
      title: '申请人',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
      ellipsis: true,

    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      ellipsis: true,

    },
    {
      title: '发票类型',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
      render: (text, record) => {
        return +text == 0 ? '普通发票' : +text == 1 ? '专用发票' : '电子普通发票'
      }
    },
    {
      title: '发票金额',
      dataIndex: 'fee',
      key: 'fee',
      ellipsis: true,
    },
    {
      title: '发票状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,
      render: (text, record) => {
        return +text == 0 ? '申请中' : +text == 1 ? '已开出' : '已作废'
      }
    },
    {
      title: '开票人',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '是否回款',
      dataIndex: 'isPay',
      key: 'isPay',
      ellipsis: true,
      render: (text) => {
        return +text == 0 ? '否' : '是'
      }
    },
    {
      title: '开票时间',
      dataIndex: 'invoiceTime',
      key: 'invoiceTime',
      ellipsis: true,

    },
    {
      title: '到账时间',
      dataIndex: 'payTime',
      key: 'payTime',
      ellipsis: true,

    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,

    },
    {
      title: '操作',
      dataIndex: 'type13',
      key: 'type13',
      ellipsis: true,
      width: 240,
      fixed: 'right',
      render: (text, record) => {
        return <>
          {record.isPay == 0 && <Button type="link" size="small" onClick={() => { showModal(record); setAppUserId(record.userId) }}>关联回款</Button>}
          {record.state < 1 && <Popconfirm placement="topLeft" title={'出票'} onConfirm={() => applyInvoice(record)} okText="确定" cancelText="取消">
            <Button type="link" size="small">出票</Button>
          </Popconfirm>}
          <Popconfirm placement="topLeft" title={'到账'} onConfirm={() => applyedInvoice(record)} okText="确定" cancelText="取消">
            <Button type="link" size="small">到账</Button>
          </Popconfirm>
          <Popconfirm placement="topLeft" title={'作废'} onConfirm={() => confirm(record)} okText="确定" cancelText="取消">
            <Button type="link" danger size="small">作废</Button>
          </Popconfirm>
        </>
      }
    },
  ];
  const ModelColumns = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '服务顾问',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: '回款金额',
      dataIndex: 'fee',
      key: 'fee',
    },

    {
      title: '回款时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
  ];
  const showModal = (record) => {
    setInvoiceSelectItem(record);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    relevancePay({ invoiceId: InvoiceSelectItem.id, serviceFeeId: selectItem.id }).then(res => {
      message.success('关联成功')
      setIsModalVisible(false);
      setInvoiceSelectItem(null)
      if (searchValues == '') {
        setSearchValues(null)
      } else if (searchValues == null) {
        setSearchValues('')
      }
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };




  const confirm = (record) => {
    console.log(record);
    abandonInvoice({ invoiceId: record.id }).then(res => {
      message.success('作废成功');
      setFresh(fresh ? false : true)
    })
  }
  const applyInvoice = (record) => {
    console.log(record);
    addcp({ invoiceId: record.id, time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss') }).then(res => {
      message.success('出票成功');
      setFresh(fresh ? false : true)
    })
  }
  const applyedInvoice = (record) => {
    console.log(record);
    adddz({ invoiceId: record.id, time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss') }).then(res => {
      message.success('到账成功');
      setFresh(fresh ? false : true)
    })
  }

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
    selectInvoiceList(searchValues).then((res) => {
      console.log(res);
      setInvoiceList(
        res?.data?.list || []
      );
      setCount(res.data.count)
    });
  }, [searchValues, pageNo, fresh]);
  useEffect(() => {
    selectSFListForInvoice({ appUserId: appUserId }).then((res) => {
      console.log(res);
      setModelData(
        res?.data?.list || []
      );
    });
  }, [searchModalValues, appUserId]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectItem(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      id: record.id,
    }),
    // rowKey: (record) => {
    //   console.log(`record`, record)
    //   return record.id
    // }
  };
  return (
    <PageContainer>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>发票管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="link" onClick={() => history.push(`/eco/invioce-add`)}>新增</Button>
              <Button onClick={handleSearchClear}>清空</Button>
              <Button type="primary" onClick={handleSearch}>
                搜索
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
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
                        <Input />
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'inputNumber') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'select') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <Select options={col.options} />
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'cascader') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <Cascader options={col.options} />
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'datePicker') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label}>
                        <DatePicker style={{ width: '100%' }} />
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
        <Table columns={invoiceColumns} dataSource={invoiceList} pagination={{
          total: count,
          pageSize: 10,
          onChange: e => { setPageNo(e) },
          showTotal: count => `共${count}条`

        }} size="small" bordered scroll={{ x: 900 }} />
      </div>
      <Modal title="请选择关联的发票" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          rowKey="id"
          columns={ModelColumns}
          dataSource={ModelData}
          size="small"
          bordered
          scroll={{ x: 600 }}
        />
      </Modal>
    </PageContainer>
  );
};

export default InvoiceList;
