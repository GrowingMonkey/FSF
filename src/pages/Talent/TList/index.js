import { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Card,
  Button,
  Select,
  Modal,
  Divider,
  Pagination,
  Descriptions,
  Space,
  Table,
  message,
  Cascader,
} from "antd";
import { history, Link } from 'umi'
import { selectTalentList, selectTalentById, talentJoinProject } from "../../../services/talent";
import CardTableExpand from "./components/CardTableExpand";
import TalentDetail from "./components/TalentDetail";
import styles from "./index.less";
import './myIndex.less'
import { PageContainer } from "@ant-design/pro-layout";
import { positionList } from '@/utils/Position';
import ProForm, {
  ProFormRadio,
} from '@ant-design/pro-form';
import { WomanOutlined, ManOutlined, UserOutlined, SettingOutlined, DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import CustomerSearch from "@/components/CustomerSearch";
import ProjectSearch from "@/components/ProjectSearch";

const TList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [rowIndex, setRowIndex] = useState('')
  const [listData, setListData] = useState([]);
  const [searchValues, setSearchValues] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTarent, setCurrentTarent] = useState('');
  const [form] = Form.useForm();

  const formList = [
    [
      {
        name: "keyword",
        label: "关键词",
        type: "input",

      },
      {
        name: "talentId",
        label: "简历编码",
        type: "input",

      },
      {
        name: "name",
        label: "姓名",
        type: "input",

      },
      {
        name: "phone",
        label: "电话",
        type: "input",

      },
      {
        name: "company",
        label: "公司",
        type: "input",
      },
      {
        name: "job",
        label: "职位名称",
        type: "input",
      },
      {
        name: "RJob",
        label: "期望职位",
        type: "cascader",
        options: positionList
      },

      {
        name: "location",
        label: "当前地点",
        type: "input",

      },
      {
        name: "Rcity",
        label: "期望地点",
        type: "input",

      },
      {
        name: "gender",
        label: "性别",
        type: "select",
        options: [
          { label: "不限", value: 0 },
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],

      },
      {
        name: "age",
        label: "年龄",
        type: "inputGroup",

      },


      // {
      //   name: "school",
      //   label: "毕业学校",
      //   type: "input",
      // },
      // {
      //   name: "source",
      //   label: "来源",
      //   type: "select",
      //   options: [
      //     { label: "未知来源", value: 0 },
      //     { label: "官网应聘", value: 1 },
      //     { label: "智联招聘", value: 2 },
      //     { label: "中华英才", value: 3 },
      //     { label: "前程无忧", value: 4 },
      //     { label: "猎聘网", value: 5 },
      //     { label: "陌生电话", value: 6 },
      //     { label: "人脉推荐", value: 7 },
      //     { label: "微博私信", value: 8 },
      //     { label: "论坛发帖", value: 9 },
      //     { label: "其他途径", value: 10 },
      //     { label: "LinkedIn", value: 11 },
      //     { label: "卓聘网", value: 12 },
      //     { label: "无忧精英", value: 13 },
      //     { label: "公共池", value: 14 },
      //   ],

      // },
    ],
  ];
  const listColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 80,
      render: (text, record) => {
        return <Button type="text" onClick={() => {
          history.push({
            pathname: '/talent/detail',
            search: '?talentId=' + record.talentId,
            state: { record: record },
          })
        }}>{record.gender == 2 ? (<span><WomanOutlined twoToneColor="#eb2f96" style={{ color: '#eb2f96' }} />{record.name}</span>) : record.gender == 1 ? (<span><ManOutlined style={{ color: '#1890ff' }} />{record.name}</span>) : (<span><UserOutlined />{record.name}</span>)}</Button>
      }
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
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
      title: "学历",
      dataIndex: "education",
      key: "education",
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
            str = '博士以上';
            break;
          default:
            str = text;
        }
        return str;
      },
    },
    {
      title: "工作经验",
      dataIndex: "experience",
      width: 80,
      ellipsis: true,
      key: "experience",
    },
    {
      title: "所在地",
      dataIndex: "location",
      width: 100,
      ellipsis: true,
      key: "location",
    },
    {
      title: "公司",
      dataIndex: "lastCompany",
      width: 250,
      ellipsis: true,
      key: "lastCompany",
    },
    {
      title: "职位",
      dataIndex: "job",
      width: 220,
      ellipsis: true,
      key: "job",
    },
    {
      title: "录入人",
      dataIndex: "userName",
      width: 90,
      ellipsis: true,
      key: "userName",
      render: (text, record) => {
        if (text) {
          if (record.source == 0) {
            return [text];
          } else {
            return [text + ' ', <SettingOutlined style={{ color: '#1890ff' }} />];
          }

        }
        return "系统"
      }
    },
    {
      title: "更新时间",
      width: 110,
      dataIndex: "updateTime",
      ellipsis: true,
      key: "updateTime",
    },
    {
      title: "操作",
      key: "action",
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <Space size={16}>
          {/* <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              setDetailVisible(true);
              setDetailRecord(record);
            }}
          >
            查看详情
          </Button> */}
          <Link to={{
            pathname: '/talent/detail',
            search: '?talentId=' + record.talentId,
            state: { record: record },
          }} target="_blank">查看</Link>
          <Button type="link" style={{ padding: 0 }} onClick={(e) => { e.stopPropagation(); setCurrentTarent(record.talentId); setIsModalVisible(true); }}>
            加入项目
          </Button>
        </Space>
      ),
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
      console.log(values)

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

  const zjq = (rowItem, index) => {
    setRowIndex(index)
  }
  useEffect(() => {
    const { location } = history;
    if (location.state?.keyword) {
      form.setFieldsValue({ keyWord: location.state?.keyword })
    }
    // console.log(currentPage, searchValues);
    selectTalentList({
      pageNo: currentPage,
      pageSize: 10,
      keyWord: location.state?.keyword,
      ...searchValues,
    }).then(res => {
      // console.log(data);
      const { data } = res;
      setListLength(data.count);
      setListData(
        data.list.map((item) => {
          return Object.assign(item, { key: item.talentId });
        })
      );
    });
  }, [currentPage, searchValues]);
  const onFinish = (values) => {
    console.log(values);
    // run(values);
    talentJoinProject({ projectId: values.customer.projectId, talentId: currentTarent }).then(res => {
      message.info(res?.message || '加入成功');
    })
    setIsModalVisible(false)
  }
  const wrapCol = {
    xs: 24,
    md: 12,
    lg: 6
  }
  return (
    <PageContainer>


      <>
        <div className={styles["search-container"]}>
          <Row justify="space-between" align="middle">
            <Col>
              <div className={styles["page-title"]}>人才库</div>
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
          <Form
            style={{ maxHeight: !isOpen ? '48px' : 'none', overflow: 'hidden' }}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="center"
            onKeyDown={e => { if (e.keyCode == 13) { handleSearchConfirm() } }}
          >

            {/* <Row gutter={32}>
              <Col  {...wrapCol}>
                <Form.Item name={'keyWord'} label={'关键词'}>
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row> */}
            {formList.map((row, rIndex) => {
              return (
                <Row gutter={32} key={`row-${rIndex}`}>
                  {row.map((col, cIndex) => {
                    if (col.type === "select") {
                      return (
                        <Col

                          {...wrapCol}
                          key={`row-${rIndex}-col-${cIndex}`}
                        >
                          <Form.Item name={col.name} label={col.label}>
                            <Select options={col.options}></Select>
                          </Form.Item>
                        </Col>
                      );
                    }
                    if (col.type === "input") {
                      return (
                        <Col

                          {...wrapCol}
                          key={`row-${rIndex}-col-${cIndex}`}
                        >
                          <Form.Item name={col.name} label={col.label}>
                            <Input></Input>
                          </Form.Item>
                        </Col>
                      );
                    } if (col.type === "inputGroup") {
                      return (
                        <Col

                          {...wrapCol}
                          key={`row-${rIndex}-col-${cIndex}`}
                        >
                          <Form.Item label={col.label}>
                            <Input.Group compact style={{ display: 'flex' }}>
                              <Form.Item name={'ageStart'}>
                                <Input style={{ width: '100%' }} placeholder="开始" />
                              </Form.Item>
                              <Form.Item name={'ageEnd'}>
                                <Input style={{ width: '100%' }} placeholder="结束" />
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                      );
                      if ((col.type === "cascader")) {
                        return <Col

                          {...wrapCol}
                          key={`row-${rIndex}-col-${cIndex}`}
                        >
                          <Form.Item name={col.name} label={col.label}>
                            <Cascader options={col.options} placeholder="请选择"></Cascader>
                          </Form.Item>
                        </Col>
                      }
                    }
                    return null;
                  })}
                </Row>
              );
            })}

          </Form>
          <Divider>{!isOpen ? <>展开<DownCircleOutlined onClick={() => setIsOpen(true)} /></> : <>收起<UpCircleOutlined onClick={() => setIsOpen(false)} /></>}</Divider>
        </div>
        <div className={styles["list-container"]}>
          <div className={styles["list-title"]}>
            <span>共</span>
            <span style={{ color: "#58BDFA", padding: "0 5px" }}>
              {listLength}
            </span>
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
            style={{ marginTop: "15px" }}
            columns={listColumns}
            dataSource={listData}
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: _ => {
                  console.log(index + '......')
                  zjq(record, index)
                },
              }
            }}
            rowClassName={(record, index) => {
              if (index === rowIndex) {
                return 'mySelfClassName'
              } else {
                return "className"
              }
            }}
            expandRowByClick={true}
            expandable={{
              expandIcon: ({ expanded, onExpand, record }) => null,
              // expanded ? (
              //   <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
              // ) : (
              //     <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
              //   ),
              // onExpand: (expanded, record) => {
              //   console.log(record, expanded);
              //   if (expanded) {
              //     selectTalentById({ talentId: record.talentId }).then(res => {
              //       console.log(res.data)
              //     })
              //     return <>11</>
              //   }
              // },
              expandedRowRender: (record, index, indent, expanded) => {
                console.log(index, indent)
                return (<Row>
                  <Col span={12} style={{ padding: '12px 24px', borderRight: '1px solid #ddd' }}>

                    <Descriptions column={1}>
                      {
                        record.experienceEdus ? record.experienceEdus.map(item => (
                          <Descriptions.Item label="">
                            <Space>
                              <span>{item.startTime}- {item.endTime}</span><span>|{item.name}</span><span>|{item.classes}</span><span>|{item.education}</span>
                            </Space>
                          </Descriptions.Item>)) : <h1>暂无教育经历</h1>
                      }
                    </Descriptions>
                  </Col>

                  <Col span={12} style={{ padding: '12px 24px' }}>
                    <Descriptions column={1}>
                      {
                        record.experienceCompanies ? record.experienceCompanies.map(item => (
                          <Descriptions.Item label="">
                            <Space>
                              <span style={{ display: 'inline-block', width: 130 }}>{item.startTime} - {item.isNow == 1 ? '至今' : item.endTime}</span><span>|{item.name}</span><span>|{item.job}</span>
                            </Space>
                          </Descriptions.Item>)) : <h1> 暂无公司经历</h1>
                      }
                    </Descriptions>
                  </Col>
                </Row>
                )
              },
              rowExpandable: (record) => true,
            }}
            size="small"
            scroll={{ x: 900 }}
            bordered
          />
          <Row justify="end" style={{ marginTop: "15px" }}>
            <Col>
              <Pagination
                current={currentPage}
                onChange={onPageChange}
                total={listLength}
                showSizeChanger={false}
                showTotal={listLength => `共${listLength}条`}

              ></Pagination>
            </Col>
          </Row>
        </div>
        <Modal title="加入项目" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
          <ProForm
            hideRequiredMark
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: 600,
            }}
            name="basic"
            layout="horizontal"
            initialValues={{
              public: '1',
            }}
            onFinish={onFinish}
          >
            <Form.Item name={'customer'} label={"选择职位"} >
              <ProjectSearch />
            </Form.Item>

          </ProForm>
        </Modal>

      </>

    </PageContainer>
  );
};

export default TList;
