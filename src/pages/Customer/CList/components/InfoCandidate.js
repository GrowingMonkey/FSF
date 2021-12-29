import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Badge,
  Col,
  Row,
  Select,
  Divider,
  Pagination,
} from "antd";
import { twffq } from "../../../../services/customer";
import styles from "./InfoCandidate.less";

const InfoCandidate = ({ record }) => {
  const [candidateList, setCandidateList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const candidateStateTypes = [
    {
      label: "推荐",
      value: 0,
    },
    {
      label: "面试",
      value: 1,
    },
    {
      label: "发放offer",
      value: 2,
    },
    {
      label: "确认入职",
      value: 3,
    },
    {
      label: "其他",
      value: 9,
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
  const handleTypeChange = (value) => {
    twffq({
      pageNo: currentPage,
      pageSize: 10,
      customerId: record.customerId,
      state: value,
    }).then((data) => {
      console.log(data);
      setCandidateList(data.list);
      setListLength(data.count);
    });
    console.log(value);
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    console.log(record.customerId);
    twffq({
      pageNo: currentPage,
      pageSize: 10,
      customerId: record.customerId,
      state: 0,
    }).then((data) => {
      console.log(data);
      setCandidateList(data.list);
      setListLength(data.count);
    });
  }, [currentPage]);
  // const candidateData = [
  //   {
  //     key: 0,
  //     projectName: "项目A",
  //     recommender: "员工A",
  //     candidateName: "被推荐人A",
  //     currentCompany: "公司A",
  //     currentPosition: "产品经理",
  //     contact: "+86 15399320021",
  //     recommandState: "确认Offer",
  //     recommandTime: "2021-8-10",
  //     updatedTime: "2021-7-27",
  //     contactRecord: 6,
  //   },
  //   {
  //     key: 1,
  //     projectName: "项目A",
  //     recommender: "员工A",
  //     candidateName: "被推荐人A",
  //     currentCompany: "公司A",
  //     currentPosition: "产品经理",
  //     contact: "+86 15399320021",
  //     recommandState: "确认Offer",
  //     recommandTime: "2021-8-10",
  //     updatedTime: "2021-7-27",
  //     contactRecord: 6,
  //   },
  //   {
  //     key: 2,
  //     projectName: "项目A",
  //     recommender: "员工A",
  //     candidateName: "被推荐人A",
  //     currentCompany: "公司A",
  //     currentPosition: "产品经理",
  //     contact: "+86 15399320021",
  //     recommandState: "未确认Offer",
  //     recommandTime: "2021-8-10",
  //     updatedTime: "2021-7-27",
  //     contactRecord: 6,
  //   },
  //   {
  //     key: 3,
  //     projectName: "项目A",
  //     recommender: "员工A",
  //     candidateName: "被推荐人A",
  //     currentCompany: "公司A",
  //     currentPosition: "产品经理",
  //     contact: "+86 15399320021",
  //     recommandState: "确认Offer",
  //     recommandTime: "2021-8-10",
  //     updatedTime: "2021-7-27",
  //     contactRecord: 6,
  //   },
  //   {
  //     key: 4,
  //     projectName: "项目A",
  //     recommender: "员工A",
  //     candidateName: "被推荐人A",
  //     currentCompany: "公司A",
  //     currentPosition: "产品经理",
  //     contact: "+86 15399320021",
  //     recommandState: "确认Offer",
  //     recommandTime: "2021-8-10",
  //     updatedTime: "2021-7-27",
  //     contactRecord: 6,
  //   },
  // ];
  return (
    <div className={styles["info-candidate"]}>
      <Row justify="end">
        <Col>
          <Select
            defaultValue={[0]}
            onChange={handleTypeChange}
            options={candidateStateTypes}
            style={{ width: 200 }}
          ></Select>
        </Col>
      </Row>
      <Divider></Divider>
      <Table
        style={{ marginTop: "25px" }}
        columns={candidateColumn}
        dataSource={candidateList}
        size="small"
      />
      <Row justify="end" style={{ marginTop: "15px" }}>
        <Col>
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            total={listLength}
          ></Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default InfoCandidate;
