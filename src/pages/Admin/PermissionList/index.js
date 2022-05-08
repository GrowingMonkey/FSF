import { useState, useEffect } from "react";
import { Table, Button, Space, Row, Col, Pagination, Divider } from "antd";
import ModalForm from "./components/ModalForm";
import { permissionList } from "../../../services/admin";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const PermissionList = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [list, setList] = useState([]);
  const [formValue, setFormValue] = useState(null);
  useEffect(() => {
    permissionList({ pageNo: currentPage, pageSize: 10 }).then((res) => {
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
  const permissionColumns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: "80%",
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      fixed: 'right',
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
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onSubmit = () => {
    setVisible(false);
    permissionList({ pageNo: currentPage, pageSize: 10 }).then((res) => {
      setList(
        res.list.map((item) => {
          return Object.assign(item, {
            key: item.id,
          });
        })
      );
      setListLength(res.count);
    });
  };
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <PageContainer>
      <ModalForm
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        record={formValue}
      ></ModalForm>
      <div className={styles["list-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>权限列表</div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setFormValue(null);
                setVisible(true);
              }}
            >
              新增权限
            </Button>
          </Col>
        </Row>
        <Divider></Divider>
        <Table
          style={{ marginTop: "25px" }}
          columns={permissionColumns}
          dataSource={list}
          pagination={false}
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
              showTotal={listLength => `共${listLength}条`}
            ></Pagination>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default PermissionList;
