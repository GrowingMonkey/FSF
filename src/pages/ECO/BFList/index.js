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
import { queryBFList } from '../../../services/eco';

const BFList = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [bfList, setBfList] = useState([]);

  const formList = [
    {
      name: 'comId',
      label: '公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'inductionState',
      label: '入职状态',
      type: 'select',
      span: 6,
      options: [
        { label: '首次上岗', value: 0 },
        { label: '替补上岗', value: 1 },
      ],
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
      name: 'userId',
      label: '推荐人',
      type: 'input',
      span: 6,
    },
  ];
  const bfColumns = [
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
      console.clear();
      setSearchValues(payload);
    });
  };

  useEffect(() => {
    queryBFList(searchValues).then((res) => {
      const { data } = res;
      setBfList(
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
            <div className={styles['page-title']}>议价服务费审核</div>
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
        <Table columns={bfColumns} dataSource={bfList} pagination={false} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default BFList;
