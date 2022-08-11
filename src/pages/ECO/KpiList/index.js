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
import { queryKpiList, confirmKpi, refuseKpi, selectKpiFeeById } from '@/services/eco';
const { RangePicker } = DatePicker;
import momemt from 'moment'
import ModalDetail from './Detail/index.jsx'

const KpiList = () => {
  const [form] = Form.useForm();
  const [fresh, setFresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [searchValues, setSearchValues] = useState(null);
  const [kpiList, setKpiList] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [kpiId, setKpiId] = useState(null);
  const [sourceId, setSourceId] = useState(null);

  const formList = [
    {
      name: 'appUserName',
      label: '服务顾问',
      type: 'input',
      span: 6,
    },
    // {
    //   name: 'rate',
    //   label: '所占比例',
    //   type: 'inputRange',
    //   span: 6,
    // },
    // {
    //   name: 'kpiFee',
    //   label: '业绩',
    //   type: 'inputRange',
    //   span: 6,
    // },
    {
      name: 'customerName',
      label: '服务客户',
      type: 'input',
      span: 6,
    },
    {
      name: 'payType',
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
      name: "sqsj",
      label: "申请时间",
      type: "dateRangPicker",
      span: 6,
    },
    {
      name: "shsj",
      label: "审核时间",
      type: "dateRangPicker",
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
                message.info(res.message);
                setFresh(fresh ? false : true)
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
                setFresh(fresh ? false : true)

              })
            }}
            okText="Yes"
            cancelText="No">
            <Button style={{ marginRight: 10 }} type="primary" size="small">拒绝</Button></Popconfirm>,
          <Button type="primary" size="small" onClick={() => { setVisibleDetail(true); setKpiId(record.kpiId); setSourceId(record.sourceId) }}>查看详情</Button>]
        } else {
          return <Button type="primary" size="small" onClick={() => { setVisibleDetail(true); setKpiId(record.kpiId); setSourceId(record.sourceId) }}>查看详情</Button>
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
      // if (values.cityCode) {
      //   if (values.cityCode[1]) {
      //     payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
      //   } else {
      //     payload.cityCode = `${values.cityCode[0]}`;
      //   }
      // }
      if (values.customer) {
        payload.customerName = values.customer.customerName;
        delete payload.customer;
      }
      if (values.sqsj) {
        payload.sqsj1 = momemt(values.sqsj[0]).format('YYYY-MM-DD')
        payload.sqsj2 = moment(values.sqsj[1]).format('YYYY-MM-DD')
        delete payload.sqsj;
      }
      if (values.shsj) {
        payload.shsj1 = momemt(values.shsj[0]).format('YYYY-MM-DD')
        payload.shsj2 = momemt(values.shsj[1]).format('YYYY-MM-DD')
        delete payload.shsj;
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
    queryKpiList({ ...searchValues, pageNo: pageNo, pageSize: 10 }).then((res) => {
      const { data } = res;
      setKpiList(
        data.list &&
        data.list.map((item) => {
          return Object.assign(item, { key: item.id });
        }),
      );
      setCount(data.count)
    });
  }, [searchValues, count, pageNo, fresh]);
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
                        <Input.Group compact>
                          <Input style={{ width: '47%' }}></Input>- <Input style={{ width: '47%' }}></Input>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === 'dateRangPicker') {
                  return (<Col span={col.span} key={col.name}>
                    <Form.Item name={col.name} label={col.label}>
                      <RangePicker format={`YYYY-MM-DD`} />
                    </Form.Item>
                  </Col>)
                }
                return null;
              })}
            </Row>
          }
        </Form>
      </div>
      <div className={styles['list-container']}>
        <Table columns={kpiColumns} dataSource={kpiList} pagination={{
          total: count,
          pageSize: 10,
          onChange: e => { setPageNo(e) },
          showTotal: count => `共${count}条`

        }} size="small"
          bordered
          scroll={{ x: 1200 }} />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
      <ModalDetail sourceId={sourceId} visibledetail={visibleDetail} kpiId={kpiId} handleClose={() => setVisibleDetail(false)} />
    </PageContainer>
  );
};

export default KpiList;
