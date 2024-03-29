import { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Select, Divider, Pagination, Space, Table } from 'antd';
import { history, Link } from 'umi';
import { selectTalentList, myTalentUpdateList, selectTalentById } from '../../../services/talent';
import CardTableExpand from './components/CardTableExpand';
import TalentDetail from './components/TalentDetail';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { WomanOutlined, ManOutlined, UserOutlined } from '@ant-design/icons';
const TList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [listData, setListData] = useState([]);
  const [searchValues, setSearchValues] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);
  const [form] = Form.useForm();
  const formList = [
    [
      {
        name: 'education',
        label: '学历',
        type: 'select',
        options: [
          {
            label: '不限',
            value: 0,
          },
          // {
          //     label: "初中及以上",
          //     value: 1,
          // },
          {
            label: '中专及以上',
            value: 2,
          },
          // {
          //     label: "高中及以上",
          //     value: 3,
          // },
          {
            label: '大专及以上',
            value: 4,
          },
          {
            label: '本科及以上',
            value: 5,
          },
          {
            label: '硕士及以上',
            value: 6,
          },
          {
            label: '博士及以上',
            value: 7,
          },
        ],
      },
      {
        name: 'gender',
        label: '性别',
        type: 'select',
        options: [
          { label: '不限', value: 0 },
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      {
        name: 'name',
        label: '名字',
        type: 'input',
      },
      {
        name: 'phone',
        label: '电话',
        type: 'input',
      },
      {
        name: 'school',
        label: '毕业学校',
        type: 'input',
      },
      {
        name: 'source',
        label: '来源',
        type: 'select',
        options: [
          { label: '未知来源', value: 0 },
          { label: '官网应聘', value: 1 },
          { label: '智联招聘', value: 2 },
          { label: '中华英才', value: 3 },
          { label: '前程无忧', value: 4 },
          { label: '猎聘网', value: 5 },
          { label: '陌生电话', value: 6 },
          { label: '人脉推荐', value: 7 },
          { label: '微博私信', value: 8 },
          { label: '论坛发帖', value: 9 },
          { label: '其他途径', value: 10 },
          { label: 'LinkedIn', value: 11 },
          { label: '卓聘网', value: 12 },
          { label: '无忧精英', value: 13 },
          { label: '公共池', value: 14 },
        ],
      },
    ],
  ];
  const listColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 80,
      ellipsis: true,
      render: (text, record) => {
        return (
          <Button
            type="text"
            onClick={() => {
              history.push({
                pathname: '/talent/detail',
                search: '?talentId=' + record.talentId,
                state: { record: record },
              });
            }}
          >
            {record.gender == 2 ? (
              <span>
                <WomanOutlined twoToneColor="#eb2f96" style={{ color: '#eb2f96' }} />
                {record.name}
              </span>
            ) : record.gender == 1 ? (
              <span>
                <ManOutlined style={{ color: '#1890ff' }} />
                {record.name}
              </span>
            ) : (
                  <span>
                    <UserOutlined />
                    {record.name}
                  </span>
                )}
          </Button>
        );
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 60,
      ellipsis: true,
      render: (text) => {
        if (text) {
          return <div>{text}岁</div>;
        }
        return <div>未知</div>;
      },
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 80,
      ellipsis: true,
      render: (text) => {
        let str = '';
        switch (+text) {
          case 0:
            str = '不限';
            break;
          case 1:
            str = '初中以上';
            break;
          case 2:
            str = '中专以上';
            break;
          case 3:
            str = '高中以上';
            break;
          case 4:
            str = '大专以上';
            break;
          case 5:
            str = '本科以上';
            break;
          case 6:
            str = '硕士以上';
            break;
          case 7:
            str = '博士及以上';
            break;
          default:
            str = text;
        }
        return str;
      },
    },
    {
      title: '工作经验',
      dataIndex: 'experience',
      width: 80,

      ellipsis: true,
      key: 'experience',
    },
    {
      title: '所在地',
      width: 100,
      dataIndex: 'location',
      ellipsis: true,
      key: 'location',
    },
    {
      title: '公司',
      dataIndex: 'lastCompany',
      width: 250,

      ellipsis: true,
      key: 'lastCompany',
    },
    {
      title: '职位',
      dataIndex: 'job',
      width: 220,
      ellipsis: true,
      key: 'job',
    },
    {
      title: '录入人',
      dataIndex: 'userName',
      width: 60,
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
      title: '更新时间',
      dataIndex: 'updateTime',
      ellipsis: true,
      width: 110,

      key: 'updateTime',
    },
    {
      title: '操作',
      fixed: 'right',
      key: 'action',
      render: (text, record) => (
        <Space size={16}>
          <Link
            to={{
              pathname: '/talent/detail',
              search: '?talentId=' + record.talentId,
              state: { record: record },
            }}
          >
            查看
          </Link>
        </Space>
      ),
      width: 100,
    },
  ];
  const talentExpandContainer = (record) => {
    selectTalentById({ talentId: record.talentId }).then((data) => {
      console.log(data);
    });
    return <div>{record.name}</div>;
  };
  const handleSearchConfirm = () => {
    form.validateFields().then((values) => {
      setSearchValues(values);
      setCurrentPage(1);
    });
  };
  const handleSearchClear = () => {
    form.resetFields();
    setSearchValues(null);
    setCurrentPage(1);
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    console.log(history);
    const { location } = history;
    if (location.state?.keyword) {
      form.setFieldsValue({ keyWord: location.state?.keyword });
    }
    console.log(searchValues);

    // console.log(currentPage, searchValues);
    myTalentUpdateList({
      pageNo: currentPage,
      pageSize: 10,
      keyWord: location.state?.keyword,
      ...searchValues,
    }).then((res) => {
      // console.log(data);
      const { data } = res;
      setListLength(data.count);
      setListData(
        data?.list?.map((item) => {
          return Object.assign(item, { key: item.talentId });
        }),
      );
    });
  }, [currentPage, searchValues]);
  const wrapCol = {
    xs: 24,
    md: 12,
    lg: 8,
  };
  return (
    <PageContainer>
      {detailVisible ? (
        <TalentDetail setDetailVisible={setDetailVisible} record={detailRecord}></TalentDetail>
      ) : (
          <>
            <div className={styles['search-container']}>
              <Row justify="space-between" align="middle">
                <Col>
                  <div className={styles['page-title']}>人才库</div>
                </Col>
                <Col>
                  <Space>
                    <Button onClick={handleSearchClear}>清空</Button>
                    <Button type="primary" onClick={handleSearchConfirm}>
                      搜索
                  </Button>
                  </Space>
                </Col>
              </Row>
              <Divider></Divider>
              <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left" onKeyDown={e => { if (e.keyCode == 13) { handleSearchConfirm() } }}>
                <Row>
                  <Col span={24}>
                    <Form.Item labelCol={{ span: 4 }} name={'keyWord'} label={'关键词'}>
                      <Input></Input>
                    </Form.Item>
                  </Col>
                </Row>
                {formList.map((row, rIndex) => {
                  return (
                    <Row gutter={32} key={`row-${rIndex}`}>
                      {row.map((col, cIndex) => {
                        if (col.type === 'select') {
                          return (
                            <Col {...wrapCol} key={`row-${rIndex}-col-${cIndex}`}>
                              <Form.Item name={col.name} label={col.label}>
                                <Select options={col.options}></Select>
                              </Form.Item>
                            </Col>
                          );
                        }
                        if (col.type === 'input') {
                          return (
                            <Col {...wrapCol} key={`row-${rIndex}-col-${cIndex}`}>
                              <Form.Item name={col.name} label={col.label}>
                                <Input></Input>
                              </Form.Item>
                            </Col>
                          );
                        }
                        return null;
                      })}
                    </Row>
                  );
                })}
              </Form>
            </div>
            <div className={styles['list-container']}>
              <div className={styles['list-title']}>
                <span>共</span>
                <span style={{ color: '#58BDFA', padding: '0 5px' }}>{listLength}</span>
                <span>简历</span>
              </div>
              {/* <Row gutter={32}>
          {listData.map((record) => {
            return (
              <Col
                span={12}
                style={{ marginTop: "15px" }}
                key={record.talentId}
              >
                <CardTalent record={record}></CardTalent>
              </Col>
            );
          })}
        </Row> */}
              <Table
                style={{ marginTop: '15px' }}
                columns={listColumns}
                dataSource={listData}
                pagination={false}
                expandRowByClick={true}
                expandable={{
                  expandIcon: ({ expanded, onExpand, record }) => null,
                  // expanded ? (
                  //   <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                  // ) : (
                  //     <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                  //   ),
                  expandedRowRender: (record, index, indent, expanded) => (
                    <CardTableExpand
                      record={record}
                      index={index}
                      indent={indent}
                      expanded={expanded}
                    ></CardTableExpand>
                  ),
                  rowExpandable: (record) => true,
                }}
                size="small"
                bordered
                scroll={{ x: 900 }}
              />
              <Row justify="end" style={{ marginTop: '15px' }}>
                <Col>
                  <Pagination
                    current={currentPage}
                    onChange={onPageChange}
                    total={listLength}
                    showSizeChanger={false}
                    showTotal={(listLength) => `共${listLength}条`}
                  ></Pagination>
                </Col>
              </Row>
            </div>
            <div style={{ width: '100%', minHeight: '15px' }}></div>
          </>
        )}
    </PageContainer>
  );
};

export default TList;
