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
import { queryCommisionList } from '../../../services/eco';

const CommissionList = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [commissionList, setCommissionList] = useState([]);

  const formList = [
    {
      name: 'comId',
      label: '公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'customerId',
      label: '客户ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'rate',
      label: '提成比例',
      type: 'inputNumber',
      span: 6,
    },
    {
      name: 'state',
      label: '费用审核状态',
      type: 'select',
      span: 6,
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已驳回', value: 2 },
      ],
    },
    {
      name: 'type',
      label: '提成分类',
      type: 'select',
      span: 6,
      options: [
        { label: '首付提成', value: 0 },
        { label: '首付尾款提成', value: 1 },
        { label: '全额尾款提成', value: 2 },
        { label: '全额付款提成', value: 3 },
        { label: '分期付款提成', value: 4 },
        { label: '尾款提成', value: 5 },
        { label: '定额提成', value: 6 },
        { label: '其他款提成', value: 7 },
        { label: '保用期离职', value: 8 },
        { label: '替补人选', value: 9 },
        { label: '差额平帐', value: 10 },
        { label: '首付款退款', value: 11 },
        { label: '校招项目款提成', value: 12 },
        { label: '校招首付款提成', value: 13 },
        { label: '校招首付尾款提成', value: 14 },
        { label: '校招服务费提成', value: 15 },
        { label: '产能全额回款', value: 16 },
        { label: '产能首款回款', value: 17 },
        { label: '产能尾款回款', value: 18 },
      ],
    },
    {
      name: 'userId',
      label: '服务顾问',
      type: 'input',
      span: 6,
    },
  ];
  const commissionColumns = [
    {
      title: '提成金额',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '提成用户',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
    },
    {
      title: '打款企业',
      dataIndex: 'type3',
      key: 'type3',
    },
    {
      title: '上岗人选',
      dataIndex: 'talentName',
      key: 'talentName',
    },
    {
      title: '服务费',
      dataIndex: 'type5',
      key: 'type5',
    },
    {
      title: '提成',
      dataIndex: 'type6',
      key: 'type6',
    },
    {
      title: '所得',
      dataIndex: 'type7',
      key: 'type7',
    },
    {
      title: '提成分类',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '申请用户',
      dataIndex: 'type9',
      key: 'type9',
    },
    {
      title: '审批状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '提成分配',
      dataIndex: 'type11',
      key: 'type11',
    },
    {
      title: '申请日期',
      dataIndex: 'createTime',
      key: 'createTime',
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
      console.clear();
      setSearchValues(payload);
    });
  };

  useEffect(() => {
    queryCommisionList(searchValues).then((res) => {
      const { data } = res;
      setCommissionList(
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
            <div className={styles['page-title']}>我的提成</div>
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
        <Table
          columns={commissionColumns}
          dataSource={commissionList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default CommissionList;
