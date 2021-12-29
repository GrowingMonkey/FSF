import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
  Cascader,
} from "antd";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const ARList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "comId",
      label: "公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "inductionState",
      label: "入职状态",
      type: "select",
      span: 6,
      options: [
        { label: "首次上岗", value: 0 },
        { label: "替补上岗", value: 1 },
      ],
    },
    {
      name: "leaveState",
      label: "离职状态",
      type: "select",
      span: 6,
      options: [
        { label: "保外离职", value: 0 },
        { label: "保内离职", value: 1 },
      ],
    },
    {
      name: "state",
      label: "费用审核状态",
      type: "select",
      span: 6,
      options: [
        { label: "待审核", value: 0 },
        { label: "已通过", value: 1 },
        { label: "已驳回", value: 2 },
      ],
    },
    {
      name: "userId",
      label: "推荐人",
      type: "input",
      span: 6,
    },
  ];
  const arList = [];
  const arColumns = [
    {
      title: "收入编码",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "归属公司",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "客户名称",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "推荐人",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "上岗人选",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "职位",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "入职状态",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "入职时间",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "议价服务费",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "离职状态",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "离职时间",
      dataIndex: "type10",
      key: "type10",
    },
    {
      title: "冲抵服务费",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "费用审核状态",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "操作",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "数据导出",
      dataIndex: "type9",
      key: "type9",
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>应收管理</div>
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
                if (col.type === "inputNumber") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <InputNumber style={{ width: "100%" }}></InputNumber>
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
                if (col.type === "cascader") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <Cascader options={col.options}></Cascader>
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
          columns={arColumns}
          dataSource={arList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default ARList;
