import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
  Cascader,
} from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { queryInvoiceList } from '../../../services/eco';

const InvoiceList = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);

  const formList = [
    {
      name: 'isBack',
      label: '回款状态',
      type: 'select',
      span: 6,
      options: [
        { label: '已到账', value: 0 },
        { label: '未到账', value: 1 },
        { label: '已支出', value: 2 },
        { label: '未支出', value: 3 },
      ],
    },
    {
      name: 'name',
      label: '发票名',
      type: 'input',
      span: 6,
    },
    {
      name: 'state',
      label: '发票状态',
      type: 'select',
      span: 6,
      options: [
        { label: '申请中', value: 0 },
        { label: '已开出', value: 1 },
        { label: '已作废', value: 2 },
      ],
    },
    {
      name: 'employName',
      label: '开票人',
      type: 'input',
      span: 6,
    },
  ];
  const invoiceColumns = [
    {
      title: '发票编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '申请人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
    },
    {
      title: '客户名称',
      dataIndex: 'type3',
      key: 'type3',
    },
    {
      title: '发票类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '发票金额',
      dataIndex: 'type5',
      key: 'type5',
    },
    {
      title: '发票状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '开票人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '回款状态',
      dataIndex: 'type8',
      key: 'type8',
    },
    {
      title: '开票时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '到账时间',
      dataIndex: 'type10',
      key: 'type10',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'type13',
      key: 'type13',
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
    queryInvoiceList(searchValues).then((res) => {
      const { data } = res;
      setInvoiceList(
        data.list &&
        data.list.map((item) => {
          return Object.assign(item, { key: item.id });
        }),
      );
    });
  }, [searchValues]);

  return (
    <PageContainer>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>发票管理</div>
          </Col>
          <Col>
            <Space size={8}>
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
        <Table columns={invoiceColumns} dataSource={invoiceList} pagination={false} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default InvoiceList;
