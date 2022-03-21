import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Space,
  Divider,
  Descriptions,
  Table,
  Tag,
  Button,
  Input,
  Select,
  Form,
  message,
  Popconfirm,
} from "antd";
import {
  selectCustomerCompany,
  selectContactList,
  deleteContact,
  checkCustomer,
  updateCustomer
} from "../../../../services/customer";
import { industryList } from '@/utils/Industry';
import { useRequest, history } from 'umi'
import ModalCustomerContact from "./ModalCustomerContact";
import ModalCustomerSubsidiary from "./ModalCustomerSubsidiary";
import { signCustomer, selectCTeamList, delTeamPerson, addTeamPerson } from '@/services/customer'
import styles from "./InfoBasic.less";
import ModalCustomerSign from "./ModalCustomerSign";
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import ProForm from '@ant-design/pro-form';
import Modal from "antd/lib/modal/Modal";
import SearchInput from '@/components/SearchInput';

const InfoBasic = ({ record, update }) => {
  const [contactVisible, setContactVisible] = useState(false);
  const [signVisible, setSignVisible] = useState(false);
  const [subsidiaryVisible, setSubsidiaryVisible] = useState(false);
  const [contactRecord, setContactRecord] = useState(null);
  const [subsidiaryRecord, setSubsidiaryRecord] = useState(null);
  const [subsidiaryList, setSubsidiaryList] = useState([]);
  const [tags, setTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [customerContacts, setCustomerContacts] = useState([
    // {
    //   key: 0,
    //   email: "zhangzitao@163.com",
    //   fax: "",
    //   id: "",
    //   job: "招聘运营",
    //   name: "王明",
    //   phone: "15399320021",
    //   projectId: "",
    //   qq: "",
    //   telphone: "",
    //   wechatId: "",
    // },
  ]);
  const { location: { query } } = history;
  const tagList1 = ["北京", "半导体芯片", "民营企业", "50-2000人"];
  const contactColumns = [
    {
      title: "联系人",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text, record) => {
        return (
          <div>
            <div>{text}</div>
            {/* <Space className="margin-top-9px" size={1}>
              <div>{record.job}</div>
              <Button type="text" className="color-68A6CA">
                查看背景
              </Button>
            </Space> */}
          </div>
        );
      },
    },
    {
      title: "手机",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "微信",
      dataIndex: "wechatId",
      key: "wechatId",
      ellipsis: true,
    },
    {
      title: "职位",
      dataIndex: "job",
      key: "job",
      ellipsis: true,
    },
    {
      title: "QQ",
      dataIndex: "qq",
      key: "qq",
      ellipsis: true,
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      width: "10%",
      fixed: 'right',
      render: (text, record) => (
        <Space size={1}>
          <Button
            type="text"
            style={{
              color: "#68A6CA",
            }}
            onClick={() => {
              setContactRecord(record);
              setContactVisible(true);
            }}
          >
            修改
          </Button>
          <Popconfirm
            placement="top"
            title="确认删除?"
            onConfirm={() => {
              onContactDeleteConfirm(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              style={{
                color: "#68A6CA",
              }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // const subsidiaryList = [
  //   {
  //     name: "上海勃发科技有限公司",
  //   },
  //   {
  //     name: "上海勃发科技有限公司-2",
  //   },
  // ];
  const sourceTypeOptions = [
    {
      label: "公共池",
      value: 0,
    },
    {
      label: "广告呼入",
      value: 1,
    },
    {
      label: "主动BD",
      value: 2,
    },
    {
      label: "电销开发",
      value: 3,
    },
  ];
  const handleInvite = (value) => {
    run(value)
  }
  const onContactSubmit = () => {
    selectContactList({
      pageNo: 1,
      pageSize: 100,
      customerId: query.customerId,
    }).then((res) => {
      console.log(res);
      setCustomerContacts(
        res?.data?.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
      setContactVisible(false);
    });
  };
  const onContactCancel = () => {
    setContactVisible(false);
  };
  const onSubsidiarySubmit = () => {
    console.log(query);
    selectCustomerCompany({
      pageNo: 1,
      pageSize: 100,
      customerId: query.customerId,
    }).then((data) => {
      console.log(data);
      setSubsidiaryList(
        data.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
      setSubsidiaryVisible(false);
    });
  };
  const onSubsidiaryCancel = () => {
    setSubsidiaryVisible(false);
  };
  useEffect(() => {
    console.log(query);
    selectCustomerCompany({
      pageNo: 1,
      pageSize: 100,
      customerId: query.customerId,
    }).then((res) => {
      console.log(data);
      const { data } = res;
      setSubsidiaryList(
        data.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
    });
    console.log(112);
    selectContactList({
      pageNo: 1,
      pageSize: 100,
      customerId: query.customerId,
    }).then((res) => {
      console.log(data);
      const { data } = res;
      setCustomerContacts(
        data.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
    });
    getTags();
  }, []);
  const getTags = () => {
    const { location: { query } } = history;
    selectCTeamList({ customerId: query.customerId }).then(res => {
      setTags(res?.data?.list || [])
    })
  }
  const handleDeleteTag = async (removedTag) => {
    const { location: { query } } = history;
    await delTeamPerson({ appUserId: removedTag.userId, customerId: query.customerId }).then(ress => {
      message.info(ress.message || '删除成功');
    })
    getTags();
  }
  const onContactDeleteConfirm = (record) => {

    console.log(record);
    deleteContact({ customerId: query.customerId, id: record.id }).then(() => {
      selectContactList({
        pageNo: 1,
        pageSize: 100,
        customerId: query.customerId,
      }).then((data) => {
        console.log(data);
        setCustomerContacts(
          data.list.map((item) => {
            return { ...item, key: item.id };
          })
        );
      });
    });
  };
  const onFinish = (values) => {
    const { location: { query } } = history;
    addTeamPerson({ appUserId: values.project.recommenderUserId, appUserName: values.project.recommenderName, customerId: query.customerId }).then(res => {
      message.success(res.message);
      setIsModalVisible(false);
    })
  }
  const onEditBasicFinish = (values) => {
    console.log(values);
    const { location: { query } } = history;
    updateCustomer({ ...values, customerId: query.customerId }).then(res => {
      message.info(res.message);
      update();
    })
  }
  console.log(record);
  return (
    <div className={styles["info-basic"]}>
      <ModalCustomerContact
        visible={contactVisible}
        record={contactRecord}
        onSubmit={onContactSubmit}
        onCancel={onContactCancel}
        customerId={record.customerId}
      ></ModalCustomerContact>
      <ModalCustomerSign
        visible={signVisible}
        record={contactRecord}
        onSubmit={onContactSubmit}
        onCancel={() => setSignVisible(false)}
        customerId={record.customerId}></ModalCustomerSign>
      <ModalCustomerSubsidiary
        visible={subsidiaryVisible}
        record={subsidiaryRecord}
        onSubmit={onSubsidiarySubmit}
        onCancel={onSubsidiaryCancel}
        customerId={record.customerId}
      ></ModalCustomerSubsidiary>
      <div className={styles["basic"]}>
        <Space>
          <div className={styles["contacts-title"]}>{record.name}</div>
          {/* <Tag
            color="success"
            style={{ borderRadius: "8px", marginLeft: "20px" }}
          >
            已认证
          </Tag>
          <Tag
            color="error"
            style={{ borderRadius: "8px", marginLeft: "20px" }}
          >
            需求挖掘
          </Tag> */}
        </Space>
        <div></div>
        <Space
          className={styles["margin-top-15px"]}
          split={<Divider type="vertical" />}
        >
          <span style={{ color: "#4D96C1" }}>客户编号#{record.customerId}</span>
          {/* {tagList1.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })} */}
        </Space>

        <div style={{ float: 'right' }}><Button type="primary" onClick={() => history.push(`/project/p-creation`)}>新增职位</Button></div>
        {/* {tagList1.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })} */}

        {/* hide when no data is provided */}
        {/* <Row className="margin-top-15px">
          <Col span={3}>
            <div className="left-box">上岗记录</div>
          </Col>
          <Col span={4}>
            <div className="box">2021-08-24</div>
          </Col>
          <Col span={4}>
            <div className="box">人选</div>
          </Col>
          <Col span={7}>
            <div className="box">职位</div>
          </Col>
          <Col span={6}>
            <div className="box">推荐人: 陈小杰</div>
          </Col>
        </Row>
        <Row className="margin-top-10px">
          <Col span={3}>
            <div className="left-box">付款记录</div>
          </Col>
          <Col span={4}>
            <div className="box">2021-08-24</div>
          </Col>
          <Col span={4}>
            <div className="box">服务费:</div>
          </Col>
          <Col span={3}>
            <div className="box">发票:</div>
          </Col>
          <Col span={4}>
            <div className="box">职位:</div>
          </Col>
          <Col span={6}>
            <div className="box">录入人: 王杰</div>
          </Col>
        </Row> */}
        <Divider style={{ marginTop: "38px", marginBottom: "38px" }}></Divider>
        <div className={styles["contacts-title"]}>基本信息</div>
        <Descriptions
          column={2}
          style={{
            marginTop: "34px",
            marginLeft: "18px",
          }}
          extra={<Button type="primary" size="small" onClick={() => setEditModalVisible(true)}><EditOutlined /></Button>}
        >
          <Descriptions.Item label="归属公司">
            {record.comName}
          </Descriptions.Item>
          <Descriptions.Item label="推荐人名">
            {record.recommenderName}
          </Descriptions.Item>
          <Descriptions.Item label="客户来源">
            {sourceTypeOptions[record.sourceType]?.label}
          </Descriptions.Item>
          <Descriptions.Item label="录入人名">
            {record.userName}
          </Descriptions.Item>
          {/* <Descriptions.Item label="回传编号">?</Descriptions.Item> */}
          <Descriptions.Item label="公司网站">
            {record.website}
          </Descriptions.Item>
          {/* <Descriptions.Item label="回传编号">?</Descriptions.Item> */}
          <Descriptions.Item label="创建时间">
            {record.createTime}
          </Descriptions.Item>
          <Descriptions.Item label="">
            <Button type="primary" onClick={() => setSignVisible(true)}>申请签约</Button>
          </Descriptions.Item><br />
          <Descriptions.Item label="执行团队">
            {tags.map((tag, index) => {
              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag.id}
                  closable
                  color={["#f50", "#87d068", "#2db7f5", "#108ee9"][index % 4]}
                  onClose={(e) => {
                    e.preventDefault();
                    handleDeleteTag(tag)
                  }}
                >
                  {tag.userName}
                </Tag>
              );
              return tagElem
            })}
            <Tag className="site-tag-plus" onClick={() => setIsModalVisible(true)}>
              <PlusOutlined />新增成员
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles["contacts"]}>
        <Row justify="space-between" align="middle">
          <Col flex="auto" className={styles["contacts-title"]}>
            客户联系人
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setContactRecord(null);
                setContactVisible(true);
              }}
            >
              新增客户联系人
            </Button>
          </Col>
        </Row>
        <Divider></Divider>
        <Table
          columns={contactColumns}
          dataSource={customerContacts}
          size="small"
          pagination={false}
          bordered
          scroll={{ x: 500 }}
        />
      </div>
      <Row gutter={16} style={{ marginTop: "15px" }}>
        <Col flex={1}>
          <div className={styles["subsidiary"]}>
            <Row justify="space-between" align="middle">
              <Col flex="auto" className={styles["contacts-title"]}>
                子公司
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setSubsidiaryVisible(true);
                  }}
                >
                  新增
                </Button>
              </Col>
            </Row>
            <div style={{ marginTop: "25px" }}></div>
            {subsidiaryList.map((sub) => {
              if (sub.type === 0) {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: "10px" }}
                    key={sub.name}
                  >
                    <Col flex="auto">{sub.name}</Col>
                    {/* <Col className="text-align-right">
                      <Button
                        type="text"
                        style={{
                          color: "#68A6CA",
                        }}
                      >
                        删除
                      </Button>
                    </Col> */}
                  </Row>
                );
              }
              return null;
            })}
          </div>
        </Col>
        <Col span={12}>
          <div className={styles["relationship"]}>
            <Row justify="space-between" align="middle">
              <Col flex="auto" className={styles["contacts-title"]}>
                客户公司关联
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setSubsidiaryVisible(true);
                  }}
                >
                  新增
                </Button>
              </Col>
            </Row>
            <div style={{ marginTop: "25px" }}></div>
            {subsidiaryList.map((sub) => {
              if (sub.type === 1) {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: "10px" }}
                    key={sub.name}
                  >
                    <Col flex="auto">{sub.name}</Col>
                    {/* <Col style={{ textAlign: "right" }}>
                      <Button type="text" style={{ color: "#68A6CA" }}>
                        查看
                      </Button>
                    </Col> */}
                  </Row>
                );
              }
              return null;
            })}
          </div>
        </Col>
      </Row>
      <Modal title="加入团队" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
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
          <Form.Item
            label="推荐人"
            name="project"
          >
            <SearchInput></SearchInput>
          </Form.Item>
        </ProForm>
      </Modal>
      <Modal title="编辑" visible={editModalVisible} footer={null} onCancel={() => setEditModalVisible(false)}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout={'horizontal'}
          initialValues={{
            name: record.name || '',
            industryType: record.industryType || '',
            sourceType: +record.sourceType || '',
            outName: record.outName || '',
            customerSize: +record.customerSize || '',
            customerNature: +record.customerNature,
          }}
          onFinish={onEditBasicFinish}
        >
          <Form.Item
            name="name"
            label="客户名称"
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (value.length == 0) {
                    return Promise.reject(new Error('请输入客户名'));
                  }
                  let result = await checkCustomer({ customerName: value });
                  if (result.data == 1) {
                    return Promise.reject(new Error('客户名重复,请重新输入'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="请输入客户全称"></Input>
          </Form.Item>

          <Form.Item
            name="industryType"
            label="所属行业"

            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Select options={industryList} ></Select>
          </Form.Item>
          <Form.Item name="sourceType" label="客户来源" >
            <Select
              options={[
                {
                  label: '公共池',
                  value: 0,
                },
                {
                  label: '广告呼入',
                  value: 1,
                },
                {
                  label: '主动BD',
                  value: 2,
                },
                {
                  label: '电销开发',
                  value: 3,
                },
              ]}

            ></Select>
          </Form.Item>
          <Form.Item
            name="outName"
            label="对外名称"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input ></Input>
          </Form.Item>

          <Form.Item name="customerSize" label="客户规模" >
            <Select
              options={[
                {
                  label: ' 0-15人',
                  value: 0,
                },
                {
                  label: '15-50人',
                  value: 1,
                },
                {
                  label: '50-100人',
                  value: 2,
                },
                {
                  label: '100-500人',
                  value: 3,
                },
                {
                  label: '500-1000人',
                  value: 4,
                },
                {
                  label: '1000-10000人',
                  value: 5,
                },
                {
                  label: '10000人以上',
                  value: 6,
                },
              ]}

            ></Select>
          </Form.Item>
          <Form.Item name="customerNature" label="公司性质" >
            <Select
              options={[
                { label: '国企', value: 0 },
                { label: '民营企业', value: 1 },
                { label: '合资', value: 2 },
                { label: '外资（欧美）', value: 3 },
                { label: '外资（非欧美）', value: 4 },
                { label: '外企代表处', value: 5 },
                { label: '政府机关', value: 6 },
                { label: '事业单位', value: 7 },
                { label: '非营利组织', value: 8 },
              ]}
            ></Select>
          </Form.Item>
        </ProForm>
      </Modal>

    </div>
  );
};

export default InfoBasic;
