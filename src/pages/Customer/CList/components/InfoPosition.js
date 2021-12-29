import { Form, Row, Col, Input, Button, Select, Table } from "antd";
import styles from "./InfoPosition.less";

const InfoPosition = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const areas = [
    { label: "Beijing", value: "Beijing" },
    { label: "Shanghai", value: "Shanghai" },
  ];
  const stateTypes = [
    {
      color: "blue",
    },
    {
      color: "green",
    },
    {
      color: "yellow",
    },
    {
      color: "red",
    },
  ];
  const positionColumns = [
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      render: (text) => {
        return (
          <div
            className={styles["state-icon"]}
            style={{ backgroundColor: stateTypes[text].color }}
          ></div>
        );
      },
    },
    {
      title: "职位名称",
      dataIndex: "positionTitle",
      key: "positionTitle",
    },
    {
      title: "职位年薪",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "人选",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "地点",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "招聘企业",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "执行团队",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "归属公司",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "活跃",
      dataIndex: "activity",
      key: "activity",
    },
  ];
  const positionData = [];
  for (let i = 0; i < 10; i += 1) {
    positionData.push({
      key: i,
      state: Math.floor(Math.random() * 4),
      positionTitle: "工程运营副总经理",
      salary: "70-150万",
      location: "浙江",
      employee: "公司",
      team: "小明",
      company: "北京",
      count: Math.floor(Math.random() * i),
      updateTime: "2020-7-10",
      activity: Math.floor(Math.random() * 3),
    });
  }
  return (
    <div className={styles["info-position"]}>
      <div className={styles["search-container"]}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
        >
          <Row gutter={32} justify="space-between">
            <Col span={19}>
              <Form.Item name={"search-input"}>
                <Input placeholder="请输入搜索内容" />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Col>
            <Col>
              <Button
                htmlType="submit"
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="area" label="职位行业">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="sourceType" label="归属公司">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="工作地点">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="职位状态">
                <Select options={areas} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="compannType" label="联系时间">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="显示状态">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="创建时间">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="state" label="职位年薪">
                <Select options={areas} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="compannType" label="职位归属">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="负责顾问">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="合作成员">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="state" label="保用期限">
                <Select options={areas} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="compannType" label="官网发布">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="紧急程度">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="悬赏状态">
                <Select options={areas} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table
          columns={positionColumns}
          dataSource={positionData}
          size="small"
        />
      </div>
    </div>
  );
};

export default InfoPosition;
