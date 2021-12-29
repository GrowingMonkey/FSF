import { useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Cascader,
  Divider,
  Space,
} from "antd";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import { positionList } from "../../../utils/Position";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const PMList = () => {
  const [form] = Form.useForm();
  const [industryChildList, setIndustryChildList] = useState([]);
  const areas = [
    { label: "Beijing", value: "Beijing" },
    { label: "Shanghai", value: "Shanghai" },
  ];
  const pmList = [];
  const pmColumns = [
    {
      title: "状态",
      dataIndex: "k1",
      key: "k1",
    },
    {
      title: "职位名称",
      dataIndex: "k2",
      key: "k2",
    },
    {
      title: "职位年薪",
      dataIndex: "k3",
      key: "k3",
    },
    {
      title: "地点",
      dataIndex: "k4",
      key: "k4",
    },
    {
      title: "招聘企业",
      dataIndex: "k5",
      key: "k5",
    },
    {
      title: "执行团队",
      dataIndex: "k6",
      key: "k6",
    },
    {
      title: "归属公司",
      dataIndex: "k7",
      key: "k7",
    },
    {
      title: "更新时间",
      dataIndex: "k8",
      key: "k8",
    },
    {
      title: "活跃",
      dataIndex: "k9",
      key: "k9",
    },
  ];
  const formList = [
    {
      name: "cityCode",
      label: "城市",
      type: "cascader",
      options: cityList,
      span: 6,
    },
    {
      name: "customerName",
      label: "客户名",
      type: "input",
      span: 6,
    },
    {
      name: "industry",
      label: "行业",
      type: "select",
      span: 6,
      render: () => {
        return (
          <Col span={6} key="industry">
            <Form.Item name="industry" label="行业">
              <Select
                options={industryList}
                onChange={onIndustryChange}
              ></Select>
            </Form.Item>
          </Col>
        );
      },
    },
    {
      name: "industryChild",
      label: "子行业",
      type: "select",
      span: 6,
      render: () => {
        return (
          <Col span={6} key="industryChild">
            <Form.Item name="industryChild" label="子行业">
              <Select options={industryChildList}></Select>
            </Form.Item>
          </Col>
        );
      },
    },
    {
      name: "job",
      label: "岗位",
      type: "cascader",
      span: 6,
      options: positionList,
    },
    {
      name: "level",
      label: "紧急程度",
      type: "select",
      options: [
        { label: "一般", value: 0 },
        { label: "紧急", value: 1 },
        { label: "特急", value: 2 },
      ],
      span: 6,
    },
    {
      name: "name",
      label: "职位名",
      type: "input",
      span: 6,
    },
    {
      name: "quotTime",
      label: "所保用期限",
      type: "select",
      options: [
        { label: "无期限", value: 0 },
        { label: "一个月", value: 1 },
        { label: "二个月", value: 2 },
        { label: "三个月", value: 3 },
        { label: "四个月", value: 4 },
        { label: "五个月", value: 5 },
        { label: "六个月", value: 6 },
        { label: "七个月", value: 7 },
        { label: "八个月", value: 8 },
        { label: "九个月", value: 9 },
        { label: "十个月", value: 10 },
        { label: "十一个月", value: 11 },
        { label: "十二个月", value: 12 },
      ],
      span: 6,
    },
    {
      name: "requireAgeS",
      label: "年龄要求, 不小于",
      type: "input",
      span: 6,
    },
    {
      name: "requireAgeE",
      label: "年龄要求, 不大于",
      type: "input",
      span: 6,
    },
    {
      name: "requireAllTime",
      label: "是否统招",
      type: "select",
      options: [
        { label: "不是", value: 0 },
        { label: "是", value: 1 },
      ],
      span: 6,
    },
    {
      name: "requireEdu",
      label: "学历要求",
      type: "select",
      options: [
        {
          label: "不限",
          value: 0,
        },
        {
          label: "初中以上",
          value: 1,
        },
        {
          label: "中专以上",
          value: 2,
        },
        {
          label: "高中以上",
          value: 3,
        },
        {
          label: "大专以上",
          value: 4,
        },
        {
          label: "本科以上",
          value: 5,
        },
        {
          label: "硕士以上",
          value: 6,
        },
        {
          label: "博士以上",
          value: 7,
        },
      ],
      span: 6,
    },
    {
      name: "requireGender",
      label: "性别要求",
      type: "select",
      options: [
        { label: "不限", value: 0 },
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
      span: 6,
    },
    {
      name: "salary",
      label: "年薪",
      type: "input",
      span: 6,
    },
  ];
  const onIndustryChange = (value, data) => {
    setIndustryChildList(data.children);
    form.setFieldsValue({ industryChild: data.children[0].value });
  };
  const onFormReset = () => {
    form.resetFields();
  };
  return (
    <PageContainer>

      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>职位列表</div>
          </Col>
          <Col>
            <Space>
              <Button onClick={onFormReset}>清空</Button>
              <Button type="primary">搜索</Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form
          form={form}
          style={{ marginTop: "15px" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Row gutter={32}>
            {formList.map((item) => {
              if (item.render) {
                return item.render();
              }
              if (item.type === "select") {
                return (
                  <Col span={item.span} key={item.name}>
                    <Form.Item name={item.name} label={item.label}>
                      <Select options={item.options}></Select>
                    </Form.Item>
                  </Col>
                );
              }
              if (item.type === "cascader") {
                return (
                  <Col span={item.span} key={item.name}>
                    <Form.Item name={item.name} label={item.label}>
                      <Cascader options={item.options}></Cascader>
                    </Form.Item>
                  </Col>
                );
              }
              if (item.type === "input") {
                return (
                  <Col span={item.span} key={item.name}>
                    <Form.Item name={item.name} label={item.label}>
                      <Input></Input>
                    </Form.Item>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table
          columns={pmColumns}
          dataSource={pmList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default PMList;
