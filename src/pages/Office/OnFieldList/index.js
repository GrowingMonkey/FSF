import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
} from "antd";
import ModalOnFieldApply from "./components/ModalOnFieldApply";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const OnFieldList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "bstripState",
      label: "外出状态",
      type: "select",
      span: 6,
      options: [
        { label: "申请中", value: 0 },
        { label: "已审批 ", value: 1 },
        { label: "未审批", value: 2 },
      ],
    },
    {
      name: "comId",
      label: "归属公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "userId",
      label: "请假用户ID",
      type: "input",
      span: 6,
    },
  ];
  const onFieldList = [];
  const onFieldColumns = [
    {
      title: "外出分类",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "外出用户",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "审批用户",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: " 归属公司",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "办事单位",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "外出地址",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "外出时间",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "返回时间",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "事由",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Space size="middle">
            <Button type="text">查看详情</Button>
            <Button type="text">编辑</Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ModalOnFieldApply visible={false}></ModalOnFieldApply>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>出差管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button>清空</Button>
              <Button type="primary">搜索</Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          {
            <Row gutter={32}>
              {formList.map((col) => {
                if (col.render) {
                  return col.render();
                }
                if (col.type === "input") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <Input></Input>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === "select") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <Select options={col.options}></Select>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === "datePicker") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label}>
                        <DatePicker style={{ width: "100%" }}></DatePicker>
                      </Form.Item>
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          }
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table
          columns={onFieldColumns}
          dataSource={onFieldList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default OnFieldList;
