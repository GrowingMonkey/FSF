import { useState, useEffect } from "react";
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
  Pagination,
} from "antd";
import { info } from "china-region";
import { selectPList } from "../../../../services/project";
import { cityList } from "../../../../utils/CityList";
import { industryList } from "../../../../utils/Industry";
import { positionList } from "../../../../utils/Position";
import styles from "./InfoProject.less";

const InfoProject = ({ record }) => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const [listData, setListData] = useState([]);
  const [industryChildList, setIndustryChildList] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  // const stateTypes = [
  //   {
  //     color: "blue",
  //   },
  //   {
  //     color: "green",
  //   },
  //   {
  //     color: "yellow",
  //   },
  //   {
  //     color: "red",
  //   },
  // ];
  const stateTypes = ["草稿", "发布"];
  const listColumns = [
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      render: (text) => {
        return stateTypes[text];
      },
    },
    {
      title: "职位名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "职位年薪",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "地点",
      dataIndex: "cityCode",
      key: "cityCode",
      render: (text) => {
        let cityCode = text.split("/");
        // console.log(cityCode);
        let city = "";
        if (cityCode.length === 2) {
          city = cityCode[1];
        }
        if (cityCode.length === 1) {
          city = cityCode[0];
        }
        return <span>{info(city).name}</span>;
      },
    },
    {
      title: "客户",
      dataIndex: "customerName",
      key: "customerName",
    },
    // {
    //   title: "执行团队",
    //   dataIndex: "k6",
    //   key: "k6",
    // },
    // {
    //   title: "归属公司",
    //   dataIndex: "k7",
    //   key: "k7",
    // },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => {
        if (text) {
          return <span>{text.split(" ")[0]}</span>;
        }
        return null;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size={16}>
          <Button type="link" style={{ padding: 0 }}>
            查看详情
          </Button>
          {/* <Button type="link" style={{ padding: 0 }}>
            加入项目
          </Button> */}
        </Space>
      ),
      width: 100,
    },
    // {
    //   title: "活跃",
    //   dataIndex: "k9",
    //   key: "k9",
    // },
  ];
  // const listColumns = [
  //   {
  //     title: "状态",
  //     dataIndex: "state",
  //     key: "state",
  //     render: (text) => {
  //       return (
  //         <div
  //           className={styles["state-icon"]}
  //           style={{ backgroundColor: stateTypes[text].color }}
  //         ></div>
  //       );
  //     },
  //   },
  //   {
  //     title: "职位名称",
  //     dataIndex: "positionTitle",
  //     key: "positionTitle",
  //   },
  //   {
  //     title: "职位年薪",
  //     dataIndex: "salary",
  //     key: "salary",
  //   },
  //   {
  //     title: "人选",
  //     dataIndex: "count",
  //     key: "count",
  //   },
  //   {
  //     title: "地点",
  //     dataIndex: "location",
  //     key: "location",
  //   },
  //   {
  //     title: "招聘企业",
  //     dataIndex: "employee",
  //     key: "employee",
  //   },
  //   // {
  //   //   title: "执行团队",
  //   //   dataIndex: "team",
  //   //   key: "team",
  //   // },
  //   // {
  //   //   title: "归属公司",
  //   //   dataIndex: "company",
  //   //   key: "company",
  //   // },
  //   {
  //     title: "更新时间",
  //     dataIndex: "updateTime",
  //     key: "updateTime",
  //   },
  //   {
  //     title: "活跃",
  //     dataIndex: "activity",
  //     key: "activity",
  //   },
  // ];
  const formList = [
    {
      name: "cityCode",
      label: "城市",
      type: "cascader",
      options: cityList,
      span: 12,
    },
    {
      name: "industry",
      label: "行业",
      type: "select",
      span: 12,
      render: () => {
        return (
          <Col span={12} key="industry">
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
      span: 12,
      render: () => {
        return (
          <Col span={12} key="industryChild">
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
      span: 12,
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
      span: 12,
    },
    {
      name: "name",
      label: "职位名",
      type: "input",
      span: 12,
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
      span: 12,
    },
    {
      name: "requireAgeS",
      label: "年龄要求, 不小于",
      type: "input",
      span: 12,
    },
    {
      name: "requireAgeE",
      label: "年龄要求, 不大于",
      type: "input",
      span: 12,
    },
    {
      name: "requireAllTime",
      label: "是否统招",
      type: "select",
      options: [
        { label: "不是", value: 0 },
        { label: "是", value: 1 },
      ],
      span: 12,
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
      span: 12,
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
      span: 12,
    },
    {
      name: "salary",
      label: "年薪",
      type: "input",
      span: 12,
    },
  ];
  const onIndustryChange = (value, data) => {
    setIndustryChildList(data.children);
    form.setFieldsValue({ industryChild: data.children[0].value });
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
  };
  const onFormReset = () => {
    form.resetFields();
    setSearchValues(null);
    setCurrentPage(1);
  };
  const onFormSearch = () => {
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.cityCode) {
        if (values.cityCode[1]) {
          payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
        } else {
          payload.cityCode = `${values.cityCode[0]}`;
        }
      }
      // console.clear();
      // console.log(payload);
      setSearchValues(payload);
      setCurrentPage(1);
    });
  };
  useEffect(() => {
    selectPList({
      pageNo: currentPage,
      pageSize: 10,
      customerName: record.name,
      ...searchValues,
    }).then((res) => {
      console.clear();
      const { data } = res;
      setListData(
        data.list.map((item) => {
          return Object.assign(item, { key: item.id });
        })
      );
    });
    // console.clear();
    // console.log(searchValues, currentPage);
  }, [currentPage, searchValues]);
  return (
    <>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col></Col>
          <Col>
            <Space>
              <Button onClick={onFormReset}>清空</Button>
              <Button type="primary" onClick={onFormSearch}>
                搜索
              </Button>
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
          columns={listColumns}
          dataSource={listData}
          pagination={false}
          size="small"
        />
        <Row justify="end" style={{ marginTop: "15px" }}>
          <Col>
            <Pagination
              current={currentPage}
              onChange={onPageChange}
              total={listLength}
            ></Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InfoProject;
