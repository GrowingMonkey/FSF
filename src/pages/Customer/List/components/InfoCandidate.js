import { Button, Table, Space, Badge, Col, Row, Select } from "antd";
import styles from "./InfoCandidate.module.scss";

const InfoCandidate = () => {
  const candidateStateTypes = [
    {
      label: "面试",
      value: "面试",
    },
    {
      label: "Offer",
      value: "Offer",
    },
    {
      label: "入职",
      value: "入职",
    },
  ];
  const candidateColumn = [
    {
      title: "项目名称",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "推荐人",
      dataIndex: "recommender",
      key: "recommender",
      render: (text) => <Badge text={text} color="red"></Badge>,
    },
    {
      title: "人选姓名",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "当前公司",
      dataIndex: "currentCompany",
      key: "currentCompany",
    },
    {
      title: "当前职位",
      dataIndex: "currentPosition",
      key: "currentPosition",
    },
    {
      title: "联系方式",
      dataIndex: "contact",
      key: "phone",
    },
    {
      title: "推荐状态",
      dataIndex: "recommandState",
      key: "recommandState",
    },
    {
      title: "推荐时间",
      dataIndex: "recommandTime",
      key: "recommandTime",
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      key: "updatedTime",
    },
    {
      title: "沟通记录",
      dataIndex: "contactRecord",
      key: "contactRecord",
      render: (text) => (
        <Row justify="space-around">
          <Col>
            <Button type="primary" shape="circle" size="small">
              {text}
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="text" className="color-68A6CA">
            查看
          </Button>
        </Space>
      ),
    },
  ];
  const candidateData = [
    {
      key: 0,
      projectName: "项目A",
      recommender: "员工A",
      candidateName: "被推荐人A",
      currentCompany: "公司A",
      currentPosition: "产品经理",
      contact: "+86 15399320021",
      recommandState: "确认Offer",
      recommandTime: "2021-8-10",
      updatedTime: "2021-7-27",
      contactRecord: 6,
    },
    {
      key: 1,
      projectName: "项目A",
      recommender: "员工A",
      candidateName: "被推荐人A",
      currentCompany: "公司A",
      currentPosition: "产品经理",
      contact: "+86 15399320021",
      recommandState: "确认Offer",
      recommandTime: "2021-8-10",
      updatedTime: "2021-7-27",
      contactRecord: 6,
    },
    {
      key: 2,
      projectName: "项目A",
      recommender: "员工A",
      candidateName: "被推荐人A",
      currentCompany: "公司A",
      currentPosition: "产品经理",
      contact: "+86 15399320021",
      recommandState: "未确认Offer",
      recommandTime: "2021-8-10",
      updatedTime: "2021-7-27",
      contactRecord: 6,
    },
    {
      key: 3,
      projectName: "项目A",
      recommender: "员工A",
      candidateName: "被推荐人A",
      currentCompany: "公司A",
      currentPosition: "产品经理",
      contact: "+86 15399320021",
      recommandState: "确认Offer",
      recommandTime: "2021-8-10",
      updatedTime: "2021-7-27",
      contactRecord: 6,
    },
    {
      key: 4,
      projectName: "项目A",
      recommender: "员工A",
      candidateName: "被推荐人A",
      currentCompany: "公司A",
      currentPosition: "产品经理",
      contact: "+86 15399320021",
      recommandState: "确认Offer",
      recommandTime: "2021-8-10",
      updatedTime: "2021-7-27",
      contactRecord: 6,
    },
  ];
  return (
    <div className={styles["info-candidate"]}>
      <Row justify="end">
        <Col>
          <Select
            options={candidateStateTypes}
            defaultValue="Offer"
            style={{ width: 200 }}
          ></Select>
        </Col>
      </Row>
      <Table
        style={{ marginTop: "25px" }}
        columns={candidateColumn}
        dataSource={candidateData}
        size="small"
      />
    </div>
  );
};

export default InfoCandidate;
