import { useState, useEffect } from 'react';
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
import ModalForm from './components/ModalForm';
import { queryKpiList } from '../../../services/eco';

const KpiList = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [searchValues, setSearchValues] = useState(null);
  const [kpiList, setKpiList] = useState([]);
  const [count, setCount] = useState(0);

  const formList = [
    {
      name: 'classes',
      label: '业绩分类',
      type: 'select',
      span: 6,
      options: [
        { label: '独立运作', value: 0 },
        { label: '合作分配', value: 1 },
      ],
    },
    {
      name: 'comId',
      label: '公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'rate',
      label: '所占比例',
      type: 'input',
      span: 6,
    },
    {
      name: 'type',
      label: '业绩类型',
      type: 'select',
      span: 6,
      options: [
        { label: '首付款', value: 0 },
        { label: '服务费', value: 1 },
        { label: '咨询费', value: 2 },
      ],
    },
    {
      name: 'state',
      label: '审核状态',
      type: 'select',
      span: 6,
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已驳回', value: 2 },
      ],
    },
    {
      name: 'employId',
      label: '员工',
      type: 'input',
      span: 6,
    },
  ];
  const kpiColumns = [
    {
      title: '员工姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
    },
    {
      title: '服务客户',
      dataIndex: 'type0',
      key: 'type0',
    },
    {
      title: '回款金额',
      dataIndex: 'backFee',
      key: 'backFee',
    },
    {
      title: '上岗人选',
      dataIndex: 'talentName',
      key: 'talentName',
    },
    {
      title: '所得业绩',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '所占比例',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: '业绩来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '业绩详情',
      dataIndex: 'type2',
      key: 'type2',
    },
    {
      title: '审核状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '申请用户',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: '申请日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  // 清空
  const handleSearchClear = () => {
    form.resetFields();
    setSearchValues(null);
  };

  // 搜索
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

  // 新增kpi
  const handleAddKpi = () => {
    setFormValue(null);
    setVisible(true);
  };

  const onSubmit = () => {
    setVisible(false);
    setCount(count + 1); // 改变count值触发刷新
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    queryKpiList(searchValues).then((res) => {
      const { data } = res;
      setKpiList(
        data.list &&
          data.list.map((item) => {
            return Object.assign(item, { key: item.id });
          }),
      );
    });
  }, [searchValues, count]);
  return (
    <PageContainer>
      <ModalForm
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        record={formValue}
      ></ModalForm>

      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>我的业绩</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary" onClick={handleAddKpi}>
                新增业绩
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
        <Table columns={kpiColumns} dataSource={kpiList} pagination={false} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default KpiList;
