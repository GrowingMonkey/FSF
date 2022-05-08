import { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, Select, Space, Table, Divider } from 'antd';
import { selectMyRecommend } from '../../../services/talent';
import ModalEdit from './components/ModalEdit';
import CustomerSearch from '../../../components/CustomerSearch';
import TalentSearch from '../../../components/TalentSearch';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'umi';

const TPList = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [listData, setListData] = useState([]);
  const [searchValues, setSearchValues] = useState(null);
  const stateTypes = [
    { label: '加入项目', value: 0 },
    { label: '推给客户', value: 1 },
    { label: '否决人选', value: 2 },
    { label: '推给顾问', value: 3 },
    { label: '人选放弃', value: 4 },
    { label: '预约面试', value: 5 },
    { label: '客户面试', value: 6 },
    { label: '客户否决', value: 7 },
    { label: '确认Offer', value: 8 },
    { label: '成功入职', value: 9 },
    { label: '人选离职', value: 10 },
    { label: '客户确认', value: 11 },
  ];
  const alternateTypes = [
    { label: '否', value: 0 },
    { label: '是', value: 1 },
  ];
  const listColumns = [
    {
      title: '人选',
      dataIndex: 'talentName',
      key: 'talentName',
      ellipsis: true,
    },
    {
      title: '归属公司',
      dataIndex: 'comName',
      key: 'comName',
      ellipsis: true,
    },
    {
      title: '客户',
      dataIndex: 'customerName',
      key: 'customerName',
      ellipsis: true,
    },
    {
      title: '项目',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
    },
    {
      title: '人选状态',
      dataIndex: 'state',
      key: 'state',
      ellipsis: true,
      render: (text) => {
        return <div>{stateTypes[text].label}</div>;
      },
    },
    {
      title: '替补人姓名',
      dataIndex: 'alternateTalentName',
      key: 'alternateTalentName',
      ellipsis: true,
    },
    {
      title: '是否替补',
      dataIndex: 'isNeedAlternate',
      ellipsis: true,
      key: 'isNeedAlternate',
      render: (text) => {
        return <div>{alternateTypes[text].label}</div>;
      },
    },
    {
      title: '录入人',
      dataIndex: 'userName',
      ellipsis: true,
      key: 'userName',
      render: (text, record) => {
        if (text) {
          return text;
        }
        return '系统';
      },
    },
    {
      title: '推荐时间',
      dataIndex: 'createTime',
      ellipsis: true,
      key: 'createTime',
    },
    // {
    //   title: "职位",
    //   dataIndex: "k8",
    //   key: "k8",
    // },
    // {
    //   title: "行业",
    //   dataIndex: "k9",
    //   key: "k9",
    // },
    // {
    //   title: "更新时间",
    //   dataIndex: "k10",
    //   key: "k10",
    // },
    // {
    //   title: "推荐",
    //   dataIndex: "k11",
    //   key: "k11",
    // },
    // {
    //   title: "沟通记录",
    //   dataIndex: "k12",
    //   key: "k12",
    // },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <Space size={8}>
            <Link
              type="link"
              to={{
                pathname: '/talent/detail',
                search: '?talentId=' + record.talentId,
                state: { record: record },
              }}
            >
              查看详情
            </Link>
          </Space>
        );
      },
    },
  ];
  const formList = [];
  const onSubmit = () => { };
  const onCancel = () => { };
  const handleSearchConfirm = () => {
    form.validateFields().then((values) => {
      console.log(values);
      selectMyRecommend({
        pageNo: currentPage,
        pageSize: 10,
        ...values.talent,
      }).then((res) => {
        const { data } = res;
        setListData(data?.list || []);
        console.log(data);
      });
    });
  };
  const handleSearchClear = () => {
    form.resetFields();
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    selectMyRecommend({
      pageNo: currentPage,
      pageSize: 10,
      ...searchValues,
    }).then((res) => {
      const { data } = res;
      setListData(data?.list || []);
      setListLength(data?.count);
      console.log(data);
    });
  }, [currentPage]);
  return (
    <PageContainer>
      <ModalEdit visible={false}></ModalEdit>
      <div className={styles['search-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>我的推荐</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={handleSearchClear}>清空</Button>
              <Button type="primary" onClick={handleSearchConfirm}>
                搜索
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
          <Row gutter={32}>
            {/* <Col span={8}>
              <Form.Item name="state" label="当前人选状态">
                <Select options={stateTypes}></Select>
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item name="talent" label="人选名">
                <TalentSearch></TalentSearch>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="customer" label="客户名">
                <CustomerSearch></CustomerSearch>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles['list-container']}>
        <Table
          columns={listColumns}
          dataSource={listData}
          pagination={{
            total: listLength,
            pageSize: 10,
            onChange: onPageChange,
            showTotal: listLength => `共${listLength}条`

          }}
          size="small"
          bordered
          scroll={{ x: 900 }}
        />
      </div>
      <div style={{ width: '100%', minHeight: '15px' }}></div>
    </PageContainer>
  );
};

export default TPList;
