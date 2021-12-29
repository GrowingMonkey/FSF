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

const SignRank = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "areaId",
      label: "排行区域",
      type: "input",
      span: 6,
    },
    {
      name: "startTime",
      label: "时间范围开始",
      type: "datePicker",
      span: 6,
    },
    {
      name: "endTime",
      label: "时间范围结束",
      type: "datePicker",
      span: 6,
    },
  ];
  const signList = [];
  const signColumns = [
    {
      title: "名次",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "姓名",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "归属公司",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "担任职务",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "团队人数",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "汇报对象",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "签约客户数",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "平均比例",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "首付金额",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "时间范围",
      dataIndex: "type9",
      key: "type9",
    },
  ];
  return (
    <PageContainer>

      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>签约排行</div>
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
          columns={signColumns}
          dataSource={signList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default SignRank;
