import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
} from "antd";
import ModalMyInfo from "./component/ModalMyInfo";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { useEffect, useState } from "react";
import { selectEmployList } from '@/services/employ'
import { useRequest, history } from 'umi'

const ColleagueList = () => {

  const [form] = Form.useForm();
  const [colleagueList, setColleagueList] = useState([]);
  const { data, run } = useRequest(selectEmployList);
  const [total, setTotal] = useState(0);
  console.log(data);
  useEffect(() => {
    setColleagueList(data?.list || []);
    setTotal(data?.count)
  }, [data])
  const formList = [
    {
      name: "name",
      label: "姓名",
      type: "input",
      span: 6,
    },
  ];
  const colleagueColumns = [
    {
      title: "头像",
      dataIndex: "headUrl",
      key: "headUrl",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "职务",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "在职状态",
      dataIndex: "workState",
      key: "workState",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "座机",
      dataIndex: "telphone",
      key: "telphone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
  ];
  const handleSearch = () => {
    form.validateFields().then(values => {

      run(values)
    })
  }
  return (
    <PageContainer>
      {/* <div className={styles["colleague-list"]}> */}
      <ModalMyInfo visible={false}></ModalMyInfo>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>我的同事</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={() => form.resetFields()}>清空</Button>
              <Button type="primary" onClick={handleSearch}>搜索</Button>
              <Button type="primary" onClick={() => { history.push(`/welcome`) }}>我的信息</Button>
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
          columns={colleagueColumns}
          dataSource={colleagueList}
          pagination={{
            total: total,
            pageSize: 10,
            onChange: e => { run({ pageNo: e }) }
          }}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
      {/* </div> */}
    </PageContainer>
  );
};
export default ColleagueList;
