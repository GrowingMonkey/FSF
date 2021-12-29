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

const CompanyEarningList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "comId",
      label: "公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "payWay",
      label: "支付方式",
      type: "select",
      span: 6,
      options: [
        { label: "现金支付", value: 0 },
        { label: "支票转账", value: 1 },
        { label: "网银转账", value: 2 },
        { label: "其他方式", value: 3 },
        { label: "个人电汇", value: 4 },
      ],
    },
    {
      name: "realMoney",
      label: "实收金额",
      type: "select",
      span: 6,
      options: [
        { label: "1万元内", value: 0 },
        { label: "1-3万", value: 1 },
        { label: "3-5万", value: 2 },
        { label: "5-10万", value: 3 },
        { label: "10万以上", value: 4 },
      ],
    },
    {
      name: "type",
      label: "业务类型",
      type: "select",
      span: 6,
      options: [
        { label: "猎头业务", value: 0 },
        { label: "RPO业务", value: 1 },
        { label: "咨询业务", value: 2 },
        { label: "测评业务", value: 3 },
        { label: "校园招聘", value: 4 },
        { label: "求真背调", value: 5 },
        { label: "锐仕微聘", value: 6 },
        { label: "内部合作", value: 7 },
        { label: "其他", value: 8 },
      ],
    },
    {
      name: "userId",
      label: "服务顾问",
      type: "input",
      span: 6,
    },
  ];
  const companyEarningList = [];
  const companyEarningColumns = [
    {
      title: "收入类型",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "收入金额",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "支付方式",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "转账单位",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "到账时间",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "归属公司",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "录入用户",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "服务顾问",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "发票",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "收入备注",
      dataIndex: "type9",
      key: "type9",
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>收入管理</div>
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
          columns={companyEarningColumns}
          dataSource={companyEarningList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default CompanyEarningList;
