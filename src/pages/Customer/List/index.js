import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Space,
  Table,
  Switch,
  Tag,
} from "antd";
import CustomerDetail from "./components/CustomerDetail";
import LV0 from "../../../assets/images/LV0.png";
import LV1 from "../../../assets/images/LV1.png";
import LV2 from "../../../assets/images/LV2.png";
import LV3 from "../../../assets/images/LV3.png";
import LV4 from "../../../assets/images/LV4.png";
import LV5 from "../../../assets/images/LV5.png";
import VIP0 from "../../../assets/images/VIP0.png";
import VIP1 from "../../../assets/images/VIP1.png";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const List = () => {
  const [form] = Form.useForm();
  const areas = [
    { label: "Beijing", value: "Beijing" },
    { label: "Shanghai", value: "Shanghai" },
  ];
  const companyType = [
    {
      label: "政府部门",
      value: "政府部门",
    },
  ];
  const belongOptions = [
    {
      label: "所有",
      value: 0,
    },
    {
      label: "我的",
      value: 1,
    },
    {
      label: "我的团队的",
      value: 2,
    },
  ];
  const customerSizeOptions = [
    {
      label: " 0-15人",
      value: 0,
    },
    {
      label: "15-50人",
      value: 1,
    },
    {
      label: "50-100人",
      value: 2,
    },
    {
      label: "100-500人",
      value: 3,
    },
    {
      label: "500-1000人",
      value: 4,
    },
    {
      label: "1000-10000人",
      value: 5,
    },
    {
      label: "10000人以上",
      value: 6,
    },
  ];
  const levelOptions = [
    {
      label: "普通",
      value: "普通",
    },
    {
      label: "VIP1",
      value: "VIP1",
    },
    {
      label: "VIP2",
      value: "VIP2",
    },
    {
      label: "VIP3",
      value: "VIP3",
    },
    {
      label: "VIP4",
      value: "VIP4",
    },
    {
      label: "VIP5",
      value: "VIP5",
    },
  ];
  const levelIcons = [LV0, LV1, LV2, LV3, LV4, LV5];
  const sourceTypeOptions = [
    {
      label: "公共池",
      value: 0,
    },
    {
      label: "广告呼入",
      value: 1,
    },
    {
      label: "主动BD",
      value: 2,
    },
    {
      label: "电销开发",
      value: 3,
    },
  ];
  const stateOptions = [
    {
      label: "潜在客户",
      value: 0,
    },
    {
      label: "签约运作",
      value: 1,
    },
    {
      label: "签约暂停",
      value: 2,
    },
    {
      label: "签约终止",
      value: 3,
    },
  ];
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const listData = [
    {
      key: 0,
      customerId: "103200",
      sourceType: 2,
      level: 3,
      name: "上海驼易科技有限公司",
      certification: 0,
      vip: 0,
      jobBeansNum: 30,
      comId: "技术部",
      comName: "往南科技西南总部",
      updateTime: "2021.1.07 22:22",
      state: 2,
      customerCommunicateBeansNum: 10,
    },
    {
      key: 1,
      customerId: "103200",
      sourceType: 0,
      level: 3,
      name: "上海驼易科技有限公司",
      vip: 0,
      certification: 1,
      jobBeansNum: 30,
      comId: "技术部",
      comName: "往南科技西南总部",
      updateTime: "2021.1.07 22:22",
      state: 2,
      customerCommunicateBeansNum: 10,
    },
    {
      key: 2,
      customerId: "103200",
      sourceType: 1,
      level: 3,
      name: "上海驼易科技有限公司",
      vip: 0,
      certification: 1,
      jobBeansNum: 30,
      comId: "技术部",
      comName: "往南科技西南总部",
      updateTime: "2021.1.07 22:22",
      state: 2,
      customerCommunicateBeansNum: 10,
    },
    {
      key: 3,
      customerId: "103200",
      sourceType: 2,
      level: 3,
      name: "上海驼易科技有限公司",
      vip: 1,
      certification: 1,
      jobBeansNum: 30,
      comId: "技术部",
      comName: "往南科技西南总部",
      updateTime: "2021.1.07 22:22",
      state: 1,
      customerCommunicateBeansNum: 10,
    },
    {
      key: 4,
      customerId: "103200",
      sourceType: 0,
      level: 3,
      name: "上海驼易科技有限公司",
      vip: 1,
      certification: 1,
      jobBeansNum: 30,
      comId: "技术部",
      comName: "往南科技西南总部",
      updateTime: "2021.1.07 22:22",
      state: 3,
      customerCommunicateBeansNum: 10,
    },
  ];
  const listColumn = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => {
        return <span>{text + 1}</span>;
      },
    },
    {
      title: "来源",
      dataIndex: "sourceType",
      key: "sourceType",
      render: (text) => {
        return <span>{sourceTypeOptions[text].label}</span>;
      },
    },
    {
      title: "客户名称",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <Space align="center">
            {record.vip ? (
              <img src={VIP1} width="12" height="12" alt="VIP1"></img>
            ) : (
                <img src={VIP0} width="12" height="12" alt="VIP0"></img>
              )}
            <img
              src={levelIcons[record.level]}
              alt="LV0"
              width="33"
              height="17"
            ></img>
            <div
              style={{
                paddingTop: "2px",
              }}
            >
              {text}
            </div>
          </Space>
        );
      },
    },
    {
      title: "认证",
      dataIndex: "certification",
      key: "certification",
      render: (text) => {
        return text ? (
          <Tag color="green">已认证</Tag>
        ) : (
            <Tag color="red">未认证</Tag>
          );
      },
    },
    {
      title: "招聘人数",
      dataIndex: "jobBeansNum",
      key: "jobBeansNum",
    },
    {
      title: "执行团队",
      dataIndex: "comId",
      key: "comId",
    },
    {
      title: "归属公司",
      dataIndex: "comName",
      key: "comName",
    },
    {
      title: "客户状态",
      dataIndex: "state",
      key: "state",
      render: (text) => {
        return <span>{stateOptions[text].label}</span>;
      },
    },
    {
      title: "最后沟通",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "记录",
      dataIndex: "customerCommunicateBeansNum",
      key: "customerCommunicateBeansNum",
      render: (text) => {
        return (
          <div
            style={{
              width: "28px",
              height: "28px",
              lineHeight: "28px",
              borderRadius: "50%",
              textAlign: "center",
              backgroundColor: "#1BBC9B",
              color: "#ffffff",
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <span className="color-68A6CA">查看</span>
          <span className="color-68A6CA">转移</span>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>

      {/* <CustomerDetail></CustomerDetail> */}
      <div className={styles["search-container"]}>
        <div className={styles["title"]}>条件筛选</div>
        <Form form={form} name="advanced_search" onFinish={onFinish}>
          <Row gutter={32} justify="space-between">
            <Col span={15}>
              <Form.Item name={"search-input"} label={"客户搜索"}>
                <Input placeholder="客户名" />
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
            <Col>
              <Button type="dashed">导入新客户</Button>
            </Col>
            <Col>
              <Button type="dashed">数据分析</Button>
            </Col>
            <Col>
              <Button type="dashed">认证管理</Button>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="belong" label="客户归属">
                <Select options={belongOptions} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="area" label="归属公司">
                <Select options={areas} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="customerSize" label="公司规模">
                <Select options={customerSizeOptions} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="state" label="客户状态">
                <Select options={stateOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item name="industryType" label="所属行业">
                <Select options={companyType} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="level" label="客户等级">
                <Select options={levelOptions} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="sourceType" label="客户来源">
                <Select options={sourceTypeOptions} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Form.Item
                  name="certification"
                  label="是否认证"
                  valuePropName="checked"
                >
                  <Switch></Switch>
                </Form.Item>
                <Form.Item name="vip" label="大客户" valuePropName="checked">
                  <Switch></Switch>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table columns={listColumn} dataSource={listData} size="small" />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default List;
