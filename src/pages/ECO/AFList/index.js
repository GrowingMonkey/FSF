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

const AFList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "comId",
      label: "公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "fee",
      label: "金额",
      type: "input",
      span: 6,
    },
    {
      name: "state",
      label: "费用审核状态",
      type: "select",
      span: 6,
      options: [
        { label: "全部", value: 0 },
        { label: "驳回", value: 1 },
        { label: "通过", value: 2 },
        { label: "审核中", value: 3 },
      ],
    },
    {
      name: "type",
      label: "费用类型",
      type: "select",
      span: 6,
      options: [
        { label: "奖金提成", value: 0 },
        { label: "房租物业", value: 1 },
        { label: "员工工资", value: 2 },
        { label: "营销广告", value: 3 },
        { label: "办公费用", value: 4 },
        { label: "电话网络", value: 5 },
        { label: "水电保洁", value: 6 },
        { label: "差旅招待", value: 7 },
        { label: "团队福利", value: 8 },
        { label: "员工社保", value: 9 },
        { label: "工商税务", value: 10 },
        { label: "快递运输", value: 11 },
        { label: "外包服务", value: 12 },
        { label: "其他支出", value: 13 },
        { label: "股东分红", value: 14 },
        { label: "公司往来", value: 15 },
        { label: "销售费用", value: 16 },
        { label: "交通费用", value: 17 },
      ],
    },
    {
      name: "userId",
      label: "申请人",
      type: "input",
      span: 6,
    },
  ];
  const af1List = [];
  const af1Columns = [
    {
      title: "状态",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "所属公司",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "申请人",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "申请时间",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "申请金额(元)",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "承担费用(元)",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "类型",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "费用类型",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "提交人",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "申请事由",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "操作",
      dataIndex: "type10",
      key: "type10",
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>财务申请</div>
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
          columns={af1Columns}
          dataSource={af1List}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default AFList;
