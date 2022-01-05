import { useEffect, useState } from "react";
import { Table, Row, Col } from "antd";
import { selectTalentById } from "../../../../services/talent";
const CardTableExpand = ({ record, index, indent, expanded }) => {
  const [detail, setDetail] = useState();
  const [listEduData, setListEdu] = useState([]);
  const [listCompanyData, setListCompanyData] = useState([]);
  const [listProjectData, setListProjectData] = useState([]);
  const listEduColumns = [
    {
      title: "学校名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "专业",
      dataIndex: "classes",
      key: "classes",
    },
    {
      title: "开始日期",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    {
      title: "结束日期",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    // {
    //   title: "担任职务",
    //   dataIndex: "duty",
    //   key: "duty",
    // },
    // {
    //   title: "是否统招",
    //   dataIndex: "isAllTime",
    //   key: "isAllTime",
    //   render: (text) => {
    //     if (text === 0) {
    //       return <span>是</span>;
    //     }
    //     return <span>否</span>;
    //   },
    // },
  ];
  const listCompanyColumns = [
    {
      title: "公司名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "当前岗位",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      render: (text, record) => {
        return <span>{`${record.industry} (${record.industryChild})`}</span>;
      },
    },
    {
      title: "开始日期",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    {
      title: "结束日期",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    {
      title: "职责",
      dataIndex: "duty",
      key: "duty",
    },
    // {
    //   title: "工作内容",
    //   dataIndex: "details",
    //   key: "details",
    // },
  ];
  const listProjectColumns = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "当前岗位",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      render: (text, record) => {
        return <span>{`${record.industry} (${record.industryChild})`}</span>;
      },
    },
    {
      title: "开始日期",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    {
      title: "结束日期",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => {
        if (text) {
          return text.split(" ")[0];
        }
        return null;
      },
    },
    {
      title: "项目职责",
      dataIndex: "duty",
      key: "duty",
    },
    {
      title: "项目业绩",
      dataIndex: "details",
      key: "details",
    },
  ];
  useEffect(() => {
    if (expanded) {
      if (!detail) {
        selectTalentById({ talentId: record.talentId }).then((res) => {
          console.log(index, data);
          const { data } = res;
          setDetail(data);
          setListEdu(
            data.experienceEdus.map((item, index) => {
              return Object.assign(item, { key: index });
            })
          );
          setListCompanyData(
            data.experienceCompanies.map((item, index) => {
              return Object.assign(item, { key: index });
            })
          );
          setListProjectData(
            data.experienceProjects.map((item, index) => {
              return Object.assign(item, { key: index });
            })
          );
        });
      }
    }
  }, [expanded]);
  return (
    <>


      {listEduData.length > 0 && (
        <Table
          title={() => <div style={{ fontSize: 24, fontWeight: 600 }}>教育经历</div>}
          style={{ marginTop: "15px" }}
          columns={listEduColumns}
          dataSource={listEduData}
          pagination={false}
          showHeader={false}
          size="small"
        />
      )}


      {listCompanyData.length > 0 && (
        <Table
          title={() => <div style={{ fontSize: 24, fontWeight: 600 }}>公司经历</div>}
          style={{ marginTop: "15px" }}
          columns={listCompanyColumns}
          dataSource={listCompanyData}
          pagination={false}
          showHeader={false}
          size="small"
        />
      )}


      {listProjectData.length > 0 && (
        <Table
          title={() => <div style={{ fontSize: 24, fontWeight: 600 }}>项目经验</div>}
          style={{ marginTop: "15px" }}
          columns={listProjectColumns}
          dataSource={listProjectData}
          pagination={false}
          showHeader={false}
          size="small"
        />
      )}


    </>
  );
  // <>

  // </>
};

export default CardTableExpand;
