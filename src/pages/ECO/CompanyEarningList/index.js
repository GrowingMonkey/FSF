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
import { queryComIncomeList } from '../../../services/eco';

const CompanyEarningList = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [companyEarningList, setCompanyEarningList] = useState([]);

  const formList = [
    {
      name: 'comId',
      label: '公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'payWay',
      label: '支付方式',
      type: 'select',
      span: 6,
      options: [
        { label: '现金支付', value: 0 },
        { label: '支票转账', value: 1 },
        { label: '网银转账', value: 2 },
        { label: '其他方式', value: 3 },
        { label: '个人电汇', value: 4 },
      ],
    },
    {
      name: 'realMoney',
      label: '实收金额',
      type: 'select',
      span: 6,
      options: [
        { label: '1万元内', value: 0 },
        { label: '1-3万', value: 1 },
        { label: '3-5万', value: 2 },
        { label: '5-10万', value: 3 },
        { label: '10万以上', value: 4 },
      ],
    },
    {
      name: 'type',
      label: '业务类型',
      type: 'select',
      span: 6,
      options: [
        { label: '猎头业务', value: 0 },
        { label: 'RPO业务', value: 1 },
        { label: '咨询业务', value: 2 },
        { label: '测评业务', value: 3 },
        { label: '校园招聘', value: 4 },
        { label: '求真背调', value: 5 },
        { label: '锐仕微聘', value: 6 },
        { label: '内部合作', value: 7 },
        { label: '其他', value: 8 },
      ],
    },
    {
      name: 'employId',
      label: '录入人',
      type: 'input',
      span: 6,
    },
  ];
  const companyEarningColumns = [
    {
      title: '收入类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '收入金额',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '支付方式',
      dataIndex: 'type2',
      key: 'type2',
    },
    {
      title: '转账单位',
      dataIndex: 'type3',
      key: 'type3',
    },
    {
      title: '到账时间',
      dataIndex: 'type4',
      key: 'type4',
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
    },
    {
      title: '录入用户',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: '录入人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '发票',
      dataIndex: 'type8',
      key: 'type8',
    },
    {
      title: '收入备注',
      dataIndex: 'remark',
      key: 'remark',
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
    queryComIncomeList(searchValues).then((res) => {
      const { data } = res;
      setCompanyEarningList(
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
            <div className={styles['page-title']}>收入管理</div>
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
        <Table
          columns={companyEarningColumns}
          dataSource={companyEarningList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default CompanyEarningList;
