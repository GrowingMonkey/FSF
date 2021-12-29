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

const KpiList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "classes",
      label: "业绩分类",
      type: "select",
      span: 6,
      options: [
        { label: "独立运作", value: 0 },
        { label: "组内合作", value: 1 },
        { label: "同城合作", value: 2 },
        { label: "跨区合作", value: 3 },
      ],
    },
    {
      name: "comId",
      label: "公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "rate",
      label: "所占比例",
      type: "input",
      span: 6,
    },
    {
      name: "source",
      label: "业绩来源",
      type: "select",
      span: 6,
      options: [
        { label: "首付款", value: 0 },
        { label: "服务费", value: 1 },
      ],
    },
    {
      name: "state",
      label: "审核状态",
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
      label: "员工",
      type: "input",
      span: 6,
    },
  ];
  const kpiList = [];
  const kpiColumns = [
    {
      title: "员工姓名",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "归属公司",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "服务客户",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "回款金额",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "上岗人选",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "所得业绩",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "所占比例",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "业绩来源",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "业绩详情",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "审核状态",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "申请用户",
      dataIndex: "type10",
      key: "type10",
    },
    {
      title: "申请日期",
      dataIndex: "type11",
      key: "type11",
    },
  ];
  return (
    <PageContainer>

      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>我的业绩</div>
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
          columns={kpiColumns}
          dataSource={kpiList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>

    </PageContainer>
  );
};

export default KpiList;
