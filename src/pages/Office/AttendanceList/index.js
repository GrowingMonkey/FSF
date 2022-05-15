import { Form, Row, Col, Modal, Input, Button, Select, Table, Divider, Space, DatePicker, message } from 'antd';
import styles from './index.less';
import { PageContainer, } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { queryDKList, applyKQ } from '@/services/office';
import ProForm, {
  ProFormRadio,
} from '@ant-design/pro-form';
import { useRequest } from 'umi'
const AttendanceList = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [searchValues, setSearchValues] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { run } = useRequest(applyKQ, {
    manual: true,
    onSuccess: () => {
      message.success('打卡成功');
      queryDKList(searchValues).then((res) => {
        const { data } = res;
        setAttendanceList(
          data?.list || []
        );
      });
    },
  });
  const formList = [
    {
      name: 'type',
      label: '打卡类型',
      type: 'select',
      span: 6,
      options: [
        { label: '九点前', value: 0 },
        { label: '九点后', value: 1 },
        { label: '下班18点前', value: 2 },
        { label: '18点后', value: 3 },
      ],
    },
    {
      name: 'comId',
      label: '归属公司ID',
      type: 'input',
      span: 6,
    },
    {
      name: 'time',
      label: '打卡日期',
      type: 'datePicker',
      span: 6,
    },
    {
      name: 'employId',
      label: '请假用户ID',
      type: 'input',
      span: 6,
    },
  ];
  const attendanceColumns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,

    },
    {
      title: '状态',
      dataIndex: 'checkType',
      ellipsis: true,

      key: 'checkType',
      render: (text, record) => {
        return +text == 0 ? "上班(正常)" : +text == 1 ? '迟到' : +text == 2 ? '早退' : '下班(正常)'
      }
    },
    {
      title: '打卡类型',
      dataIndex: 'type',
      ellipsis: true,

      key: 'type',
      render: (text, record) => {
        return +text == 0 ? "上班打卡" : '下班打卡'
      }
    },
    {
      title: '日期',
      dataIndex: 'createTime',
      ellipsis: true,

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

      setSearchValues(payload);
    });
  };

  useEffect(() => {
    queryDKList(searchValues).then((res) => {
      const { data } = res;
      setAttendanceList(
        data?.list || []
      );
      setTotal(data?.count || 0)
    });
  }, [searchValues]);
  const handleAdd = () => {
    setIsModalVisible(true)
  }
  const onFinish = (values) => {

    run(values);
    setIsModalVisible(false)
  }
  return (
    <PageContainer>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>考勤管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button>导出Excel</Button>
              <Button type="primary" onClick={handleAdd}>打卡</Button>
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
                if (col.type === 'select') {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label} rules={col.rules}>
                        <Select options={col.options} />
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
          columns={attendanceColumns}
          dataSource={attendanceList}
          pagination={{
            total: total,
            pageSize: 10,
            onChange: e => setSearchValues({ pageNo: e }),
            showTotal: total => `共${total}条`

          }}
          size="small"
          bordered
          scroll={{ x: 900 }}
        />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
      <Modal title="打卡" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormRadio.Group
            options={[
              {
                value: '0',
                label: '上班打卡',
              },
              {
                value: '1',
                label: '下班打卡',
              },
            ]}
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            label="打卡类型"
            help=""//备注
            name="type"

          />

        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default AttendanceList;
