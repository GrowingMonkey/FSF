import { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Upload,
  Input,
  InputNumber,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
  message,
  Cascader,
} from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { querySalaryList, upSalary } from '../../../services/eco';

const Salarylist = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryList, setSalaryList] = useState([]);

  const formList = [
    {
      name: 'time',
      label: '工资发放月份',
      type: 'datePicker',
      span: 6,
    },
    {
      name: 'name',
      label: '员工',
      type: 'input',
      span: 6,
    },
  ];
  const salaryColumns = [
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
      title: '基本工资',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
    },
    {
      title: '绩效工资',
      dataIndex: 'kpiFee',
      key: 'kpiFee',
    },
    {
      title: '考勤天数',
      dataIndex: 'workDays',
      key: 'workDays',
    },
    {
      title: '提成金额',
      dataIndex: 'commision',
      key: 'commision',
    },
    {
      title: '本月扣款',
      dataIndex: 'reduceFee',
      key: 'reduceFee',
    },
    {
      title: '交通补助',
      dataIndex: 'traffic',
      key: 'traffic',
    },
    {
      title: '餐补',
      dataIndex: 'food',
      key: 'food',
    },
    {
      title: '其他补助',
      dataIndex: 'other',
      key: 'other',
    },
    {
      title: '实发工资',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: '发放时间',
      dataIndex: 'payDay',
      key: 'payDay',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const handleSearchClear = () => {
    form.resetFields();
    setSearchValues(null);
    setCurrentPage(1);
  };

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

      setSearchValues(payload);
      setCurrentPage(1);
    });
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    querySalaryList({ pageNo: currentPage, pageSize: 10, ...searchValues }).then((res) => {
      setSalaryList(
        res?.data?.list || []
      );
    });
  }, [currentPage, searchValues]);

  return (
    <PageContainer>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>工资管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Upload
                name="file"
                showUploadList={false}
                onChange={() => { }}
                customRequest={async (options) => {
                  console.log(options)
                  let fd = new FormData();
                  fd.append('file', options.file);
                  let xhr = new XMLHttpRequest();

                  xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                      options.onSuccess();
                    }
                  }
                  xhr.open("POST", 'http://admin.fsfhr.com/api/fsfa/eco/uploadSalary', true);
                  xhr.setRequestHeader('token', window.localStorage.getItem('token'))
                  xhr.send(fd);
                  // let result = await upSalary(options.file);
                  // console.log(result.res);
                  // if (result.res.status == 200) {

                  // }
                  // setImageUrl(
                  //   result.res.requestUrls[0].split('?')[0] +
                  //   '?x-oss-process=image/resize,w_100,h_100/quality,q_50',
                  // );
                  // options.onSuccess();
                }}>
                <Button type="primary">上传</Button>
              </Upload>
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
        <Table columns={salaryColumns} dataSource={salaryList} pagination={false} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer >
  );
};

export default Salarylist;
