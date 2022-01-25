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
import { queryAFList } from '../../../services/eco';

const AFList = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [af1List, setAf1List] = useState([]);

  const formList = [
    {
      name: 'comId',
      label: '公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'fee',
      label: '金额',
      type: 'input',
      span: 6,
    },
    {
      name: 'state',
      label: '费用审核状态',
      type: 'select',
      span: 6,
      options: [
        { label: '全部', value: 0 },
        { label: '驳回', value: 1 },
        { label: '通过', value: 2 },
        { label: '审核中', value: 3 },
      ],
    },
    {
      name: 'type',
      label: '费用类型',
      type: 'select',
      span: 6,
      options: [
        { label: '奖金提成', value: 0 },
        { label: '房租物业', value: 1 },
        { label: '员工工资', value: 2 },
        { label: '营销广告', value: 3 },
        { label: '办公费用', value: 4 },
        { label: '电话网络', value: 5 },
        { label: '水电保洁', value: 6 },
        { label: '差旅招待', value: 7 },
        { label: '团队福利', value: 8 },
        { label: '员工社保', value: 9 },
        { label: '工商税务', value: 10 },
        { label: '快递运输', value: 11 },
        { label: '外包服务', value: 12 },
        { label: '其他支出', value: 13 },
        { label: '股东分红', value: 14 },
        { label: '公司往来', value: 15 },
        { label: '销售费用', value: 16 },
        { label: '交通费用', value: 17 },
      ],
    },
    {
      name: 'employId',
      label: '申请人',
      type: 'input',
      span: 6,
    },
  ];
  const af1Columns = [
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '所属公司',
      dataIndex: 'comName',
      key: 'comName',
    },
    {
      title: '申请人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '申请金额(元)',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '承担费用(元)',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '费用类型',
      dataIndex: 'feeType',
      key: 'feeType',
    },
    {
      title: '提交人',
      dataIndex: 'type8',
      key: 'type8',
    },
    {
      title: '申请事由',
      dataIndex: 'type9',
      key: 'type9',
    },
    {
      title: '操作',
      dataIndex: 'type10',
      key: 'type10',
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
    queryAFList(searchValues).then((res) => {
      const { data } = res;
      setAf1List(
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
            <div className={styles['page-title']}>财务申请</div>
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
        <Table columns={af1Columns} dataSource={af1List} pagination={false} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default AFList;
