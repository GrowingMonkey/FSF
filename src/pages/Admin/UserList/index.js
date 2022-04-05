import { useState, useEffect } from "react";
import { Table, Radio, Button, Space, Row, Col, Pagination, Divider, message, Modal } from "antd";
import ModalForm from "./components/ModalForm";
import { userList, tcaList, roleList } from "../../../services/admin";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { updateUser } from '@/services/admin';
import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRemarkModalVisible, setIsRemarkModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [listLength, setListLength] = useState(0);
  const [list, setList] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [areaTypes, setAreaTypes] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [workState, setWorkState] = useState(0);
  useEffect(() => {
    userList({ pageNo: currentPage, pageSize: 10, workState: workState }).then((res) => {
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
  }, [currentPage, workState]);
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
  const showModal = (userId = '') => {
    setIsRemarkModalVisible(true)
    setCurrentUserId(userId);
  }
  const onCancel = () => {
    setVisible(false);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onFinishRemark = (values) => {
    debugger
    updateUser({ userId: currentUserId, workState: 1, leaveDate: values.date }).then(res => {
      message.info(res.message);
      setCurrentUserId('');
      setIsRemarkModalVisible(false);
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
    })
  }
  const userColumns = [
    {
      title: "账户名",
      dataIndex: "account",
      key: "account",
      ellipsis: true,

    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,

    },
    {
      title: "电话",
      dataIndex: "phone",
      ellipsis: true,
      key: "phone",

    },
    {
      title: "城市",
      dataIndex: "cityCode",
      key: "cityCode",
      ellipsis: true,

    },
    {
      title: "在岗状态",
      dataIndex: "workState",
      ellipsis: true,
      key: "workState",

      render: (text) => {
        let str = text == 0 ? '在职' : text == 1 ? '离职' : '其他'
        return str;
      }
    },
    {
      title: "入职时间",
      dataIndex: "hireDate",
      ellipsis: true,
      key: "hireDate",
    },
    {
      title: "离职时间",
      dataIndex: "leaveDate",
      ellipsis: true,
      key: "leaveDate",
    },
    {
      title: "角色",
      dataIndex: "roleId",
      ellipsis: true,
      key: "roleId",

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
      ellipsis: true,
      key: "comName",

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
              console.log(record);
              setFormValue(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>{
            workState != 1 && <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => showModal(record.userId)}
            >
              离职
          </Button>
          }

          {
            record.accountState == 0 ? <Button
              type="link"
              danger
              style={{ padding: 0 }}
              onClick={() => updateUser({ userId: record.userId, accountState: 1 }).then(res => {
                message.info(res.message);
                setCurrentPage('')
              })}
            >
              停用
          </Button> : record.accountState == 1 ? <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => updateUser({ userId: record.userId, accountState: 0 }).then(res => {

                  message.info(res.message);
                  setCurrentPage('')
                })}
              >
                启用
          </Button> : null
          }

        </Space>
      ),
      width: 140,
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
        <Radio.Group defaultValue={workState} onChange={(e) => { setCurrentPage(1); setWorkState(e.target.value); }}>
          <Radio.Button value={0}>在职</Radio.Button>
          <Radio.Button value={1}>离职</Radio.Button>
          <Radio.Button value={''}>不限</Radio.Button>
        </Radio.Group>
        <Table
          style={{ marginTop: "25px" }}
          columns={userColumns}
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
            ></Pagination>
          </Col>
        </Row>
      </div>
      <Modal title="离职" visible={isRemarkModalVisible} footer={null} onCancel={() => setIsRemarkModalVisible(false)}>
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
          onFinish={onFinishRemark}
        >
          <ProFormDatePicker name='date' label="离职时间" />
        </ProForm>
      </Modal>

    </PageContainer>
  );
};

export default UserList;
