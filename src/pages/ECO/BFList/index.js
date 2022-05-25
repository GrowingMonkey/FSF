import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Select,
  Table,
  Modal,
  Divider,
  Space,
  DatePicker,
  Popconfirm,
  message,
  Cascader,
} from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import {
  selectServiceFeeList,
  relevancePay,
  selectInvoiceList,
  abandonInvoice,
} from '../../../services/eco';
import { history } from 'umi';
const BFList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [BFSelectItem, setBFSelectItem] = useState(null);
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [searchModalValues, setSearchModalValues] = useState(null);
  const [bfList, setBfList] = useState([]);
  const [ModelData, setModelData] = useState([]);
  const formList = [
    {
      name: 'comId',
      label: '支付方式',
      type: 'input',
      span: 8,
    },
    {
      name: 'inductionState',
      label: '业务类型',
      type: 'select',
      span: 8,
      options: [
        { label: '首次上岗', value: 0 },
        { label: '替补上岗', value: 1 },
      ],
    },
    {
      name: 'state',
      label: '关联发票',
      type: 'select',
      span: 8,
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已驳回', value: 2 },
      ],
    },
    {
      name: 'userId',
      label: '服务顾问',
      type: 'input',
      span: 8,
    },
    {
      name: 'userId',
      label: '回款时间',
      type: 'input',
      span: 8,
    },
  ];
  const bfColumns = [
    {
      title: '回款编号',
      dataIndex: 'id',
      ellipsis: true,

      key: 'id',
    },
    {
      title: '服务顾问',
      dataIndex: 'userName',
      ellipsis: true,

      key: 'userName',
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      ellipsis: true,

      key: 'comName',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      ellipsis: true,

      key: 'customerName',
    },
    {
      title: '回款金额',
      dataIndex: 'fee',
      ellipsis: true,

      key: 'fee',
    },
    {
      title: '添加人',
      dataIndex: 'auditorName',
      ellipsis: true,

      key: 'auditorName',
    },
    {
      title: '关联发票',
      dataIndex: 'invoiceSet',
      ellipsis: true,

      key: 'invoiceSet',
    },
    {
      title: '回款时间',
      dataIndex: 'createTime',
      ellipsis: true,

      key: 'createTime',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,

      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'type10',
      ellipsis: true,
      fixed: 'right',
      width: 210,
      key: 'type10',
      render: (text, record) => {
        return (
          <>
            <Button type="link" size="small" onClick={() => history.push(`/eco/bf-add?bfId=${record.id}`)}>
              编辑
            </Button>
            <Button type="link" size="small" onClick={() => showModal(record)}>
              关联回款
            </Button>
            <Button type="link" size="small" onClick={() => history.push(`/eco/bf-detail?serviceFeeId=${record.id}`)}>查看详情</Button>
            {/* <Popconfirm placement="topLeft" title={'作废'} onConfirm={() => confirm(record)} okText="确定" cancelText="取消">
            <Button type="link" danger size="small" >作废</Button>
          </Popconfirm> */}
          </>
        );
      },
    },
  ];
  const ModelColumns = [
    {
      title: '发票编号',
      dataIndex: 'id',
      key: 'id',
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
      title: '发票状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,

    },
    {
      title: '开票时间',
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,

    },
  ];
  const showModal = (record) => {
    setBFSelectItem(record);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    relevancePay({ invoiceId: selectItem.id, serviceFeeId: BFSelectItem.id }).then((res) => {
      message.success('关联成功');
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const confirm = (record) => {
    console.log(record);
    abandonInvoice({ invoiceId: record.id }).then((res) => {
      message.success('作废成功');
      setSearchValues('');
    });
  };
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
    selectServiceFeeList(searchValues).then((res) => {
      // const { data } = res;
      // setBfList(
      //   data.list &&
      //   data.list.map((item) => {
      //     return Object.assign(item, { key: item.id });
      //   }),
      // );
      setBfList(res?.data?.list || [])
    });
  }, [searchValues]);
  useEffect(() => {
    selectInvoiceList(searchValues).then((res) => {
      console.log(res);
      setModelData(res?.data?.list || []);
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
            <div className={styles['page-title']}>回款列表</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary" onClick={() => history.push(`/eco/bf-add`)}>
                新增
              </Button>
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
                        <InputNumber style={{ width: '100%' }} />
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
        <Table columns={bfColumns} dataSource={bfList} pagination={false} size="small" bordered scroll={{ x: 900 }} />
      </div>
      <Modal
        title="请选择关联的发票"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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

export default BFList;
