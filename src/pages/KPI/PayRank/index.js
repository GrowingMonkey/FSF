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
import moment from "moment";
import { PageContainer } from "@ant-design/pro-layout";
import { getHKRank } from '@/services/kpi'
import { useRequest } from 'umi'
import { tcaList } from '@/services/admin'
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const PayRank = () => {
  const { data, run: HKRun } = useRequest(getHKRank)
  const [payRankList, setPayRankList] = useState([])
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setPayRankList(data?.list || []);
    setTotal(data?.count)
  }, [data]);
  const [form] = Form.useForm();
  const { data: areaList, run, refresh } = useRequest((params) => {
    return tcaList({ ...params, level: 0, count: 100 })
  });
  const formList = [
    {
      name: "areaName",
      label: "排行区域",
      type: "select",
      span: 8,
    },
    {
      name: "dateRang",
      label: "时间范围",
      type: "dateRangPicker",
      span: 12,
    },
  ];
  const payList = [];
  const payColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "归属公司",
      dataIndex: "comName",
      key: "comName",
    },
    {
      title: "担任职务",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "团队人数",
      dataIndex: "teamNum",
      key: "teamNum",
    },



    {
      title: "回款金额",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "回款月份",
      dataIndex: "month",
      key: "month",
    },
  ];
  const handleSearch = () => {
    form.validateFields().then(values => {
      console.log(values)
      HKRun({ areaName: values.areaId, startTime: moment(values.dateRang[0]).format("YYYY/MM/DD"), endTime: moment(values.dateRang[1]).format("YYYY/MM/DD") })
    })
  }
  const handleInpputSearch = (e) => {
    run({ name: e })
  }
  const handleReset = () => {
    console.log(form);
    form.resetFields()
  }
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>回款排行</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={handleReset}>清空</Button>
              <Button type="primary" onClick={handleSearch}>搜索</Button>
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
                        <Select showSearch onSearch={handleInpputSearch}>
                          {
                            areaList && areaList?.list.map((item) => {
                              return (<Option value={item.id}>{item.name}</Option>)
                            })

                          }
                        </Select>
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
                if (col.type === 'dateRangPicker') {
                  return (<Col span={col.span} key={col.name}>
                    <Form.Item name={col.name} label={col.label}>
                      <RangePicker format={`YYYY-MM-DD`} />
                    </Form.Item>
                  </Col>)
                }
                return null;
              })}
            </Row>
          }
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table
          columns={payColumns}
          dataSource={payRankList}
          pagination={{
            total: total,
            pageSize: 10,
            onChange: e => { HKRun({ pageNo: e }) }
          }}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default PayRank;
