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

const Salarylist = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "time",
      label: "工资发放月份",
      type: "datePicker",
      span: 6,
    },
    {
      name: "userId",
      label: "员工",
      type: "input",
      span: 6,
    },
  ];
  const salaryList = [];
  const salaryColumns = [
    {
      title: "姓名",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "归属公司",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "基本工资",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "绩效工资",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "考勤天数",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "提成金额",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "本月扣款",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "交通补助",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "餐补",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "其他补助",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "实发工资",
      dataIndex: "type10",
      key: "type10",
    },
    {
      title: "发放时间",
      dataIndex: "type11",
      key: "type11",
    },
    {
      title: "备注",
      dataIndex: "type13",
      key: "type13",
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>工资管理</div>
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
                        <InputNumber></InputNumber>
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
          columns={salaryColumns}
          dataSource={salaryList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default Salarylist;
