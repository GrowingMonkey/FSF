import {
  Form,
  Row,
  Col,
  Menu,
  Popconfirm,
  Dropdown,
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
import React, { createContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import {
  abandonInvoice,
} from '../../../services/eco';
import { selectServiceFeeList, addcp, adddz, selectSFListForInvoice, selectInvoiceList, relevancePay, addInvoiceNo } from '@/services/eco';
import { history } from 'umi';
const InvoiceList = () => {

  const [fresh, setFresh] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleNo, setIsModalVisibleNo] = useState(false);
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
  const [Num, setNum] = useState('');
  const formList = [

    {
      name: 'serviceType',
      label: '业务类型',
      type: 'select',
      span: 8,
      options: [
        { label: '猎头业务', value: 0 },
        { label: '咨询业务', value: 1 },
        { label: '其他', value: 9 },
      ],
    },
    {
      name: 'invoiceType',
      label: '发票属性',
      type: 'select',
      span: 8,
      options: [
        { label: '服务费', value: 0 },
        { label: '咨询费', value: 1 },
        { label: '其他', value: 9 },
      ],
    },
    {
      name: 'isPay',
      label: '回款状态',
      type: 'select',
      span: 8,
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },


      ],
    },
    {
      name: 'type',
      label: '发票类型',
      type: 'select',
      span: 8,
      options: [
        { label: '普通发票', value: 0 },
        { label: '专用发票', value: 1 },
        { label: '电子普通发票', value: 2 },
      ],
    },
    {
      name: 'state',
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
      name: 'talentName',
      label: '上岗人选',
      type: 'input',
      span: 8,
    },

    {
      name: 'auditorName',
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
  const configsss = {
    title: '新增编号',
    content: (
      <>
        <Input />
        ddd
        <br />
      </>
    ),
  };
  const stateChaneTypes = (record) => {
    let menuG = [
      {
        label: <Button type="link" size="small" onClick={() => history.push('/eco/invioce-detail?id=' + record.id)}>查看</Button>,
        value: 0,
      },
      {
        label: <Popconfirm placement="topLeft" title={'到账'} onConfirm={() => applyedInvoice(record)} okText="确定" cancelText="取消">
          <Button type="link" size="small">到账</Button>
        </Popconfirm>,
        value: 1,
      },
      {
        label: <Popconfirm placement="topLeft" title={'作废'} onConfirm={() => confirm(record)} okText="确定" cancelText="取消">
          <Button type="link" danger size="small">作废</Button>
        </Popconfirm>,
        value: 2,
      },
      {
        label: <Button type="link" size="small" onClick={() => { showModalNo(record); setAppUserId(record.userId) }}>新增编号</Button>,
        value: 5,
      },
    ];
    if (record.isPay == 0) {
      menuG.push({
        label: <Button type="link" size="small" onClick={() => { showModal(record); }}>关联回款</Button>
        ,
        value: 3,
      })
    }
    if (record.state < 0) {
      menuG.push({
        label: <Popconfirm placement="topLeft" title={'出票'} onConfirm={() => applyInvoice(record)} okText="确定" cancelText="取消">
          <Button type="link" size="small">出票</Button>
        </Popconfirm>,
        value: 4,
      })
    }
    return menuG
  };
  const invoiceColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,

    },
    {
      title: '发票编号',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
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
      width: 120,
      fixed: 'right',
      render: (text, record) => {
        return <>
          <Select
            value={0}
            options={stateChaneTypes(record)}
            style={{ width: "100%" }}
          // onChange={(value) => {
          //   handleStateChange(value, record.projectId);
          // }}
          ></Select>
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
  const showModalNo = (record) => {
    setInvoiceSelectItem(record);
    setIsModalVisibleNo(true);
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
  const handleOkNo = () => {
    console.log(InvoiceSelectItem.id, Num);
    addInvoiceNo({ invoiceId: InvoiceSelectItem.id, invoiceNo: Num }).then(res => {
      message.success(res.message || '添加成功')
      setIsModalVisibleNo(false);
      setInvoiceSelectItem(null)
    })
  }
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
      // if (values.cityCode) {
      //   if (values.cityCode[1]) {
      //     payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
      //   } else {
      //     payload.cityCode = `${values.cityCode[0]}`;
      //   }
      // }
      // if (values.customer) {
      //   payload.customerName = values.customer.customerName;
      //   delete payload.customer;
      // }

      setSearchValues(payload);
    });
  };

  useEffect(() => {
    selectInvoiceList({ ...searchValues, pageNo: pageNo }).then((res) => {
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
      <Modal title="请输入关联编号" visible={isModalVisibleNo} onOk={handleOkNo} onCancel={() => setIsModalVisibleNo(false)}>
        <Input onChange={(e) => setNum(e.target.value)} />
      </Modal>
    </PageContainer>
  );
};

export default InvoiceList;
