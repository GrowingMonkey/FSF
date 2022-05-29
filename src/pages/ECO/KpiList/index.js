import { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Popconfirm,
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
  message,
} from 'antd';
import { history } from 'umi';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import ModalForm from './components/ModalForm';
import { queryKpiList, confirmKpi, refuseKpi } from '@/services/eco';

const KpiList = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [searchValues, setSearchValues] = useState(null);
  const [kpiList, setKpiList] = useState([]);
  const [count, setCount] = useState(0);

  const formList = [
    {
      name: "kpiFee",
      label: "年龄",
      type: "inputRange",
      span: 6,
    },
    {
      name: 'employId',
      label: '服务顾问',
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
      name: 'comId',
      label: '服务客户',
      type: 'input',
      span: 6,
    },
    {
      name: 'type',
      label: '业绩来源',
      type: 'select',
      span: 6,
      options: [
        { label: '首付款', value: 0 },
        { label: '服务费', value: 1 },
        { label: '咨询费', value: 2 },
      ],
    },
    {
      name: 'applydate',
      label: '申请日期',
      type: 'datePicker',
      span: 6,
    },
    {
      name: 'applydate',
      label: '审核日期',
      type: 'datePicker',
      span: 6,
    },
  ];
  const kpiColumns = [
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
      ellipsis: true,
    },
    {
      title: '服务顾问',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
    },
    {
      title: '服务客户',
      dataIndex: 'customerName',
      key: 'customerName',
      ellipsis: true,
    },
    {
      title: '回款金额',
      dataIndex: 'serviceFee',
      key: 'serviceFee',
      ellipsis: true,
    },
    {
      title: '上岗人选',
      dataIndex: 'talentName',
      key: 'talentName',
      ellipsis: true,
    },
    {
      title: '业绩金额',
      dataIndex: 'kpiFee',
      key: 'kpiFee',
      ellipsis: true,
    },
    {
      title: '所占比例',
      dataIndex: 'rate',
      key: 'rate',
      ellipsis: true,
    },
    {
      title: '审核状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,
      render: (text, record) => {
        return text == 0 ? '待审核' : text == 1 ? '已通过' : text == 2 ? '已驳回' : ''
      }
    },
    {
      title: '申请用户',
      dataIndex: 'ownerName',
      key: 'ownerName',
      ellipsis: true,
    },

    {
      title: '申请日期',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      ellipsis: true,
      width: 210,
      fixed: 'right',
      render: (text, record) => {
        if (record.state == 0) {
          return [<Popconfirm
            title="task?"
            onConfirm={() => {
              confirmKpi({ kpiId: record.kpiId }).then(res => {
                message.info(res.message)
              })
            }}
            okText="Yes"
            cancelText="No">
            <Button type="primary" style={{ marginRight: 10 }} size="small" size="small">同意</Button>
          </Popconfirm>,
          <Popconfirm
            title="task?"
            onConfirm={() => {
              refuseKpi({ kpiId: record.sourceId }).then(res => {
                message.info(res.message)
              })
            }}
            okText="Yes"
            cancelText="No">
            <Button style={{ marginRight: 10 }} type="primary" size="small">拒绝</Button></Popconfirm>,
          <Button type="primary" size="small" onClick={() => history.push(`/eco/kpi-detail?kpiId=${record.kpiId}&sourceId=${record.sourceId}`)}>查看详情</Button>]
        } else {
          return <Button type="primary" size="small" onClick={() => history.push(`/eco/kpi-detail?kpiId=${record.kpiId}&sourceId=${record.sourceId}`)}>查看详情</Button>
        }
      }
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
              <Button type="primary" onClick={() => history.push('/eco/kpi-add')}>
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
                if (col.type === "inputRange") {
                  return (
                    <Col span={col.span} key={col.name} >
                      <Form.Item name={col.name} label={col.label}>
                        <Input style={{ width: '47%' }}></Input>-<Input style={{ width: '47%' }}></Input>
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
        <Table columns={kpiColumns} dataSource={kpiList} pagination={false} size="small"
          bordered
          scroll={{ x: 1200 }} />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer>
  );
};

export default KpiList;
