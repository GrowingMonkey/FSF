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
import { history } from 'umi';
const InfoCandidate = ({ record = {} }) => {
  const [candidateList, setCandidateList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const candidateStateTypes = [
    {
      label: "加入项目",
      value: 0,
    },
    {
      label: "推给客户",
      value: 1,
    },
    {
      label: "否决人选",
      value: 2,
    },
    {
      label: "预约面试",
      value: 5,
    },
    {
      label: "客户否决",
      value: 7,
    },
    {
      label: "人选放弃",
      value: 4,
    },
    {
      label: "确认Offer",
      value: 8,
    },
    {
      label: "确认入职",
      value: 9,
    },
    {
      label: "人选离职",
      value: 10,
    },
  ];
  const candidateColumn = [
    {
      title: "项目名称",
      dataIndex: "projectName",
      key: "projectName",
      ellipsis: true,
    },
    {
      title: "推荐人",
      dataIndex: "recommender",
      key: "recommender",
      ellipsis: true,
      render: (text) => <Badge text={text} color="red"></Badge>,
    },
    {
      title: "人选姓名",
      dataIndex: "candidateName",
      key: "candidateName",
      ellipsis: true,
    },
    {
      title: "当前公司",
      dataIndex: "currentCompany",
      key: "currentCompany",
      ellipsis: true,
    },
    {
      title: "当前职位",
      dataIndex: "currentPosition",
      key: "currentPosition",
      ellipsis: true,
    },
    {
      title: "联系方式",
      dataIndex: "contact",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "推荐状态",
      dataIndex: "recommandState",
      key: "recommandState",
      ellipsis: true,
    },
    {
      title: "推荐时间",
      dataIndex: "recommandTime",
      key: "recommandTime",
      ellipsis: true,
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      key: "updatedTime",
      ellipsis: true,
    },
    {
      title: "沟通记录",
      dataIndex: "contactRecord",
      key: "contactRecord",
      ellipsis: true,
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
      ellipsis: true,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => history.push(`/talent/detail?talentId=${record.talentId}`)} className="color-68A6CA">
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
        bordered
        scroll={{ x: 900 }}
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
