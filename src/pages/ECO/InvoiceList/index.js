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
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { selectServiceFeeList, selectInvoiceList, relevancePay } from '@/services/eco';
import { history } from 'umi';
const InvoiceList = () => {
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

  const formList = [

    {
      name: 'isBack',
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
      name: 'isBack',
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
      name: 'isBack',
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
      name: 'name',
      label: '上岗人选',
      type: 'input',
      span: 8,
    },

    {
      name: 'employName',
      label: '开票人',
      type: 'input',
      span: 8,
    },
    {
      name: 'employName',
      label: '开票时间',
      type: 'input',
      span: 8,
    },
    {
      name: 'employName',
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
      dataIndex: 'type3',
      key: 'type3',
      ellipsis: true,

    },
    {
      title: '发票类型',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,

    },
    {
      title: '发票金额',
      dataIndex: 'type5',
      key: 'type5',
      ellipsis: true,

    },
    {
      title: '发票状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,

    },
    {
      title: '开票人',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '回款状态',
      dataIndex: 'type8',
      key: 'type8',
      ellipsis: true,

    },
    {
      title: '开票时间',
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,

    },
    {
      title: '到账时间',
      dataIndex: 'type10',
      key: 'type10',
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
      fixed: 'right',
      render: (text, record) => {
        return <>
          <Button type="link" size="small" onClick={() => showModal(record)}>关联回款</Button>
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
      dataIndex: 'type0',
      key: 'type0',
    },
    {
      title: '职位',
      dataIndex: 'job',
      key: 'job',
    },
    {
      title: '推荐人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '上岗人选',
      dataIndex: 'talentName',
      key: 'talentName',
    },
    {
      title: '年薪',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: '入职状态',
      dataIndex: 'inductionState',
      key: 'inductionState',
    },
    {
      title: '入职时间',
      dataIndex: 'inductionTime',
      key: 'inductionTime',
    },
    {
      title: '应收服务',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '议价服务',
      dataIndex: 'balanceFee',
      key: 'balanceFee',
    },
    {
      title: '差额',
      dataIndex: 'marginFee',
      key: 'marginFee',
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
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };




  const confirm = (record) => {
    console.log(record);
    abandonInvoice({ invoiceId: record.id }).then(res => {
      message.success('作废成功');
      setSearchValues('');
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
  }, [searchValues, pageNo]);
  useEffect(() => {
    selectServiceFeeList(searchValues).then((res) => {
      console.log(res);
      setModelData(
        res?.data?.list || []
      );
    });
  }, [searchModalValues]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectItem(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
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
          columns={ModelColumns}
          dataSource={ModelData}
          size="small"
          bordered
          scroll={{ x: 900 }}
        />
      </Modal>
    </PageContainer>
  );
};

export default InvoiceList;
