import { useState, useEffect } from "react";
import { Table, Button, Space, Row, Col, Pagination, Divider } from "antd";
import ModalForm from "./components/ModalForm";
import { userList, tcaList, roleList } from "../../../services/admin";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [list, setList] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [areaTypes, setAreaTypes] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [formValue, setFormValue] = useState(null);
  useEffect(() => {
    userList({ pageNo: currentPage, pageSize: 10 }).then((res) => {
      const { data } = res;
      setList(
        data.list.map((item) => {
          return Object.assign(item, {
            key: item.id,
          });
        })
      );
      setListLength(data.count);
    });
  }, [currentPage]);
  useEffect(() => {
    tcaList({ pageNo: 1, pageSize: 1000 }).then((res) => {
      let areaList = [];
      let companyList = [];
      const { data } = res;
      data.list.forEach((item) => {
        if (item.level === 1) {
          companyList.push(item);
        }
        if (item.level === 0) {
          areaList.push(item);
        }
      });
      setAreaTypes(
        areaList.map((area) => {
          return {
            label: area.name,
            value: area.id,
          };
        })
      );
      setCompanyTypes(
        companyList.map((company) => {
          return {
            label: company.name,
            value: company.id,
          };
        })
      );
    });
    roleList({ pageNo: 1, pageSize: 1000 }).then((res) => {
      const { data } = res;
      setRoleTypes(
        data.list.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    });
  }, []);
  const onSubmit = () => {
    setVisible(false);
    userList({ pageNo: currentPage, pageSize: 10 }).then((res) => {
      const { data } = res;
      setList(
        data.list.map((item) => {
          return Object.assign(item, {
            key: item.id,
          });
        })
      );
      setListLength(data.count);
    });
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const userColumns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "城市",
      dataIndex: "cityCode",
      key: "cityCode",
      width: "10%",
    },
    {
      title: "角色",
      dataIndex: "roleId",
      key: "roleId",
      width: "10%",
      render: (text) => {
        let list = roleTypes.filter((item) => {
          return item.value === text;
        });
        if (list.length === 1) {
          return <div>{list[0].label}</div>;
        }
        return <div>{text}</div>;
      },
    },
    {
      title: "归属公司",
      dataIndex: "comName",
      key: "comName",
      width: "40%",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size={16}>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              setFormValue(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>
        </Space>
      ),
      width: "10%",
    },
  ];
  return (
    <PageContainer>

      <ModalForm
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        record={formValue}
        areaTypes={areaTypes}
        companyTypes={companyTypes}
        roleTypes={roleTypes}
      ></ModalForm>
      <div className={styles["list-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>用户列表</div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setFormValue(null);
                setVisible(true);
              }}
            >
              新增用户
            </Button>
          </Col>
        </Row>
        <Divider></Divider>
        <Table
          style={{ marginTop: "25px" }}
          columns={userColumns}
          dataSource={list}
          pagination={false}
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

    </PageContainer>
  );
};

export default UserList;
