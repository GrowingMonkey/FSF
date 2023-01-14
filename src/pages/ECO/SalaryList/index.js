import { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Popconfirm,
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
import { querySalaryList, upSalary, delSalary } from '../../../services/eco';
import { history } from "umi"

const Salarylist = () => {
  const [form] = Form.useForm();
  const [searchValues, setSearchValues] = useState(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryList, setSalaryList] = useState([]);
  const [isFresh, setIsFresh] = useState(false);
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
  const deleteConfirm = (record) => {
    delSalary({ id: record.id }).then(res => {
      message.success('作废成功');
      setIsFresh(isFresh ? false : true)
    })
  };
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
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return [<Button type="link" size="small" onClick={() => {
          history.push({
            pathname: '/eco/salary-detail',
            state: record
          })
        }}>查看</Button>,
        <Button type="link" size="small" link onClick={() => {
          history.push({
            pathname: '/eco/salary-update',
            state: record
          })
        }}>修改</Button>,
        <Popconfirm
          title="确定删除此条工资信息"
          onConfirm={() => deleteConfirm(record)}

          okText="确定"
          cancelText="取消"
        >
          <Button size="small" type="text" danger>删除</Button>
        </Popconfirm>
        ]
      }
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
  const updatePage = () => {
    isFresh ? setIsFresh(false) : setIsFresh(true)
  }
  useEffect(() => {
    querySalaryList({ pageNo: currentPage, pageSize: 10, ...searchValues }).then((res) => {
      setSalaryList(
        res?.data?.list || []
      );
      setCount(res?.data?.count || 0)
    });
  }, [currentPage, searchValues, isFresh]);

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
                      updatePage()
                    }
                  }
                  xhr.open("POST", 'http://admin.fsfhr.com/api/fsfa/eco/uploadSalary', true);
                  // xhr.open("POST", 'http://192.168.31.170:9090/fsfa/eco/uploadSalary', true);

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
        <Table columns={salaryColumns} dataSource={salaryList} pagination={{
          total: count,
          pageSize: 10,
          onChange: e => { setCurrentPage(e) },
          showTotal: count => `共${count}条`

        }} size="small" />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }} />
    </PageContainer >
  );
};

export default Salarylist;
