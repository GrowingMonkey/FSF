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
import { selectPList } from "@/services/customer";
import { cityList } from "../../../../utils/CityList";
import { industryList } from "../../../../utils/Industry";
import { positionList } from "../../../../utils/Position";
import styles from "./InfoProject.less";
import { history } from 'umi'

const InfoProject = ({ record = {} }) => {
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
      ellipsis: true,
      render: (text) => {
        return stateTypes[text];
      },
    },
    {
      title: "职位名称",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
    },
    {
      title: "职位年薪",
      dataIndex: "salary",
      key: "salary",
      ellipsis: true,
    },
    {
      title: "地点",
      dataIndex: "cityCode",
      key: "cityCode",
      ellipsis: true,
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
        return <span>{info(city)?.name}</span>;
      },
    },
    {
      title: "客户",
      ellipsis: true,
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
      ellipsis: true,
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
      ellipsis: true,
      render: (text, record) => (
        <Space size={16}>
          <Button type="link" onClick={() => { history.push(`/project/p-detail/detail?projectId=${record.projectId}&customerId=${record.customerId}&id=${record.id}`) }} style={{ padding: 0 }}>
            查看详情
          </Button>
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
      name: "name",
      label: "职位名",
      type: "input",
      span: 12,
    }, {
      name: "name",
      label: "服务顾问",
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
    const { location: { query } } = history;
    selectPList({
      pageNo: currentPage,
      pageSize: 10,
      customerId: query.customerId,
      ...searchValues,
    }).then((res) => {
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
          bordered
          scroll={{ x: 500 }}
        />
        <Row justify="end" style={{ marginTop: "15px" }}>
          <Col>
            <Pagination
              current={currentPage}
              onChange={onPageChange}
              total={listLength}
              showTotal={listLength => `共${listLength}条`}

            ></Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InfoProject;
