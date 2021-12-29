import {
  Col,
  Row,
  Tag,
  Space,
  Divider,
  Descriptions,
  Table,
  Button,
} from "antd";
import styles from "./InfoBasic.module.scss";

const InfoBasic = () => {
  const tagList1 = ["北京", "半导体芯片", "民营企业", "50-2000人"];
  const contactData = [
    {
      key: 0,
      email: "zhangzitao@163.com",
      fax: "",
      id: "",
      job: "招聘运营",
      name: "王明",
      phone: "+86 15399320021",
      projectId: "",
      qq: "",
      remake: "表格上附有的一栏为附加注解说明时使用",
      telphone: "",
      updateTime: "",
      wechatId: "",
    },
  ];
  const contactColumns = [
    {
      title: "联系人",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div>
            <div>{text}</div>
            <Space className="margin-top-9px" size={1}>
              <div>{record.job}</div>
              <Button type="text" className="color-68A6CA">
                查看背景
              </Button>
            </Space>
          </div>
        );
      },
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "备注",
      dataIndex: "remake",
      key: "remake",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size={1}>
          <Button type="text" className="color-68A6CA">
            修改
          </Button>
          <Button type="text" className="color-68A6CA">
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const subsidiaryList = [
    {
      name: "上海勃发科技有限公司",
    },
    {
      name: "上海勃发科技有限公司-2",
    },
  ];
  return (
    <div className={styles["info-basic"]}>
      <div className={styles["basic"]}>
        <Space>
          <div className={styles["contacts-title"]}>
            新海港（南京）科技有限公司
          </div>
          <Tag
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
          </Tag>
        </Space>
        <div></div>
        <Space
          className={styles["margin-top-15px"]}
          split={<Divider type="vertical" />}
        >
          <span style={{ color: "#4D96C1" }}>客户编号#242212</span>
          {tagList1.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
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
          <Descriptions.Item label="归属公司">成都一分</Descriptions.Item>
          <Descriptions.Item label="推荐人名">无</Descriptions.Item>
          <Descriptions.Item label="客户来源">人脉推荐</Descriptions.Item>
          <Descriptions.Item label="录入人名">陈静云</Descriptions.Item>
          <Descriptions.Item label="回传编号">
            东方网络科技有限公司
          </Descriptions.Item>
          <Descriptions.Item label="公司网站">保密</Descriptions.Item>
          <Descriptions.Item label="回传编号">
            北京朝阳区望京路科技园A401
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            2019.04.21 16:22:42
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles["contacts"]}>
        <Row justify="space-between" align="middle">
          <Col flex="auto" className={styles["contacts-title"]}>
            新海港（南京）科技有限公司
          </Col>
          <Col>
            <Button type="primary">新增客户联系人</Button>
          </Col>
        </Row>
        <Table
          style={{
            marginTop: "25px",
          }}
          columns={contactColumns}
          dataSource={contactData}
          size="small"
        />
      </div>
      <Row gutter={32} style={{ marginTop: "24px" }}>
        <Col flex={1}>
          <div className={styles["subsidiary"]}>
            <Row justify="space-between" align="middle">
              <Col flex="auto" className={styles["contacts-title"]}>
                子公司
              </Col>
              <Col>
                <Button type="primary">新增</Button>
              </Col>
            </Row>
            <div style={{ marginTop: "25px" }}></div>
            {subsidiaryList.map((sub) => {
              return (
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginTop: "10px" }}
                  key={sub.name}
                >
                  <Col flex="auto">{sub.name}</Col>
                  <Col className="text-align-right">
                    <Button
                      type="text"
                      style={{
                        color: "#68A6CA",
                      }}
                    >
                      删除
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Col>
        <Col span={12}>
          <div className={styles["relationship"]}>
            <div className={styles["contacts-title"]}>客户公司关联</div>
            <div style={{ marginTop: "25px" }}></div>
            {subsidiaryList.map((sub) => {
              return (
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginTop: "10px" }}
                  key={sub.name}
                >
                  <Col flex="auto">{sub.name}</Col>
                  <Col style={{ textAlign: "right" }}>
                    <Button type="text" style={{ color: "#68A6CA" }}>
                      查看
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoBasic;
