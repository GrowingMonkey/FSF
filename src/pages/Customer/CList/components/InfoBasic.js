import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Space,
  Divider,
  Descriptions,
  Table,
  Button,
  Popconfirm,
} from "antd";
import {
  selectCustomerCompany,
  selectContactList,
  deleteContact,
} from "../../../../services/customer";
import ModalCustomerContact from "./ModalCustomerContact";
import ModalCustomerSubsidiary from "./ModalCustomerSubsidiary";
import styles from "./InfoBasic.less";

const InfoBasic = ({ record }) => {
  const [contactVisible, setContactVisible] = useState(false);
  const [subsidiaryVisible, setSubsidiaryVisible] = useState(false);
  const [contactRecord, setContactRecord] = useState(null);
  const [subsidiaryRecord, setSubsidiaryRecord] = useState(null);
  const [subsidiaryList, setSubsidiaryList] = useState([]);
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
  const tagList1 = ["北京", "半导体芯片", "民营企业", "50-2000人"];
  const contactColumns = [
    {
      title: "联系人",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "微信",
      dataIndex: "wechatId",
      key: "wechatId",
    },
    {
      title: "职位",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "QQ",
      dataIndex: "qq",
      key: "qq",
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
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
  const onContactSubmit = () => {
    selectContactList({
      pageNo: 1,
      pageSize: 100,
      customerId: record.customerId,
    }).then((data) => {
      console.log(data);
      setCustomerContacts(
        data.list.map((item) => {
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
    selectCustomerCompany({
      pageNo: 1,
      pageSize: 100,
      customerId: record.customerId,
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
    selectCustomerCompany({
      pageNo: 1,
      pageSize: 100,
      customerId: record.customerId,
    }).then((res) => {
      console.log(data);
      const { data } = res;
      setSubsidiaryList(
        data.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
    });
    selectContactList({
      pageNo: 1,
      pageSize: 100,
      customerId: record.customerId,
    }).then((res) => {
      console.log(data);
      const { data } = res;
      setCustomerContacts(
        data.list.map((item) => {
          return { ...item, key: item.id };
        })
      );
    });
  }, []);
  const onContactDeleteConfirm = (record) => {
    console.clear();
    console.log(record);
    deleteContact({ customerId: record.customerId, id: record.id }).then(() => {
      selectContactList({
        pageNo: 1,
        pageSize: 100,
        customerId: record.customerId,
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
  return (
    <div className={styles["info-basic"]}>
      <ModalCustomerContact
        visible={contactVisible}
        record={contactRecord}
        onSubmit={onContactSubmit}
        onCancel={onContactCancel}
        customerId={record.customerId}
      ></ModalCustomerContact>
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
        >
          <Descriptions.Item label="归属公司">
            {record.comName}
          </Descriptions.Item>
          <Descriptions.Item label="推荐人名">
            {record.recommenderName}
          </Descriptions.Item>
          <Descriptions.Item label="客户来源">
            {sourceTypeOptions[record.sourceType].label}
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
        </Descriptions>
      </div>
      <div className={styles["contacts"]}>
        <Row justify="space-between" align="middle">
          <Col flex="auto" className={styles["contacts-title"]}>
            {record.name}
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
    </div>
  );
};

export default InfoBasic;
