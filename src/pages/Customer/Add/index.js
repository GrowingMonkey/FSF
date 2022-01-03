import { useHistory } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker,
  Cascader,
  Divider,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  addCustomer,
  getCustomerId,
  addContact,
  addCustomerTeam,
} from "../../../services/customer";
import RecommenderSearch from "./Components/RecommenderSearch";
import UserSearch from "./Components/UserSearch";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const Add = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [teamForm] = Form.useForm();

  const formList = [
    {
      name: "name",
      label: "客户名字",
      type: "input",
      options: null,
      span: 12,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "phone",
      label: "当前联系电话",
      type: "input",
      options: null,
      span: 12,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "customerContactsName",
      label: "联系人",
      type: "input",
      options: null,
      span: 12,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "sourceType",
      label: "客户来源",
      type: "select",
      options: [
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
      ],
      span: 12,
    },
    {
      name: "divider1",
      label: "",
      type: "",
      options: null,
      span: 24,
      render: () => {
        return (
          <Col span={24} key="divider1">
            <Divider></Divider>
          </Col>
        );
      },
    },
    {
      name: "address",
      label: "详细地址",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "businessScope",
      label: "经营范围",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "certification",
      label: "是否认证",
      type: "select",
      options: [
        { label: "否", value: 0 },
        { label: "是", value: 1 },
      ],
      span: 12,
    },
    {
      name: "cityCode",
      label: "城市",
      type: "cascader",
      options: cityList,
      span: 12,
    },
    {
      name: "companyType",
      label: "公司类型",
      type: "select",
      options: [
        { label: "政府部门", value: "政府部门" },
        { label: "院校", value: "院校" },
        { label: "科研所", value: "科研所" },
        { label: "国有企业", value: "国有企业" },
        { label: "集体企业", value: "集体企业" },
        { label: "股份合作企业", value: "股份合作企业" },
        { label: "联营企业", value: "联营企业" },
        { label: "有限责任公司", value: "有限责任公司" },
        { label: "股份有限公司", value: "股份有限公司" },
        { label: "私营企业", value: "私营企业" },
        { label: "港澳台商投资企业", value: "港澳台商投资企业" },
        { label: "外商投资企业等", value: "外商投资企业等" },
      ],
      span: 12,
    },
    {
      name: "creditCode",
      label: "信用代码",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "customerNature",
      label: "公司性质",
      type: "select",
      options: [
        { label: "国企", value: 0 },
        { label: "民营企业", value: 1 },
        { label: "合资", value: 2 },
        { label: "外资（欧美）", value: 3 },
        { label: "外资（非欧美）", value: 4 },
        { label: "外企代表处", value: 5 },
        { label: "政府机关", value: 6 },
        { label: "事业单位", value: 7 },
        { label: "非营利组织", value: 8 },
      ],
      span: 12,
    },
    {
      name: "customerSize",
      label: "公司规模",
      type: "select",
      options: [
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
      ],
      span: 12,
    },
    {
      name: "establishmentTime",
      label: "创建时间",
      type: "datePicker",
      options: null,
      span: 12,
    },
    {
      name: "industryType",
      label: "行业",
      type: "select",
      options: industryList,
      span: 12,
    },
    {
      name: "juridicalPerson",
      label: "法人",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "operatingStatus",
      label: "经营状态",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "recommenderName", //recommenderUserId TODO
      label: "推荐人姓名",
      type: "input",
      options: null,
      span: 12,
      render: () => {
        return (
          <Col {...wrapCol} key="recommender">
            <Form.Item name="recommender" label="推荐人姓名">
              <RecommenderSearch></RecommenderSearch>
            </Form.Item>
          </Col>
        );
      },
    },
    {
      name: "registeredAddress",
      label: "注册地址",
      type: "input",
      options: null,
      span: 12,
    },
    {
      name: "registeredCapital",
      label: "注册资本",
      type: "input",
      options: null,
      span: 12,
    },
  ];
  const contactFormList = [
    {
      name: "name",
      label: "联系人",
      type: "input",
      span: 12,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "phone",
      label: "当前联系电话",
      type: "input",
      span: 12,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      span: 12,
    },
    {
      name: "fax",
      label: "传真",
      type: "input",
      span: 12,
    },
    {
      name: "gender",
      label: "性别",
      type: "input",
      span: 12,
    },
    {
      name: "qq",
      label: "QQ",
      type: "input",
      span: 12,
    },
    {
      name: "telphone",
      label: "座机",
      type: "input",
      span: 12,
    },
    {
      name: "wechatId",
      label: "微信",
      type: "input",
      span: 12,
    },
  ];
  const teamFormList = [];
  const onSubmit = () => {
    form.validateFields().then((values) => {
      contactForm.validateFields().then((contactValues) => {
        teamForm.validateFields().then((teamValues) => {
          let payload = Object.assign({}, values);
          if (values.cityCode) {
            if (values.cityCode[1]) {
              payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
            } else {
              payload.cityCode = `${values.cityCode[0]}/`;
            }
          }
          if (values.recommender) {
            payload.recommenderName = values.recommender.recommenderName;
            payload.recommenderUserId = values.recommender.recommenderUserId;
          }
          // console.log(payload);
          // console.log(contactValues.contact);
          console.log(teamValues.team);
          getCustomerId().then((res) => {
            const { data } = res;
            payload.customerId = data;
            addCustomer(payload).then((data) => {
              let extraInfo = [];
              if (contactValues.contact && contactValues.contact.length > 0) {
                let contactPromises = contactValues.contact.map((item) => {
                  return addContact({ ...item, customerId: id });
                });
                extraInfo.push(...contactPromises);
              }
              if (teamValues.team && teamValues.team.length > 0) {
                let teamPromises = teamValues.team.map((item) => {
                  return addCustomerTeam({
                    customerId: id,
                    comId: item.user.comId,
                    remark: item.remark,
                    type: item.type,
                    userId: item.user.userId,
                    userName: item.user.name,
                  });
                });
                extraInfo.push(...teamPromises);
              }
              Promise.all(extraInfo).then((results) => {
                console.log(results);
                form.resetFields();
                history.push("/customer/list");
              });
            });
          });
        });
      });
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  // useEffect(() => {
  //   if (!window.sessionStorage.getItem("customerId")) {
  //     getCustomerId().then((data) => {
  //       console.log(data);
  //       window.sessionStorage.setItem((""))
  //     });
  //   }
  // }, []);
  const initialValues = {
    sourceType: 2,
    companyType: "私营企业",
    customerNature: 1,
    customerSize: 2,
  };
  const wrapCol = {
    xs: 24,
    sm: 12,
    lg: 8
  }
  return (
    <PageContainer>
      <div className={styles["info-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>新增客户</div>
          </Col>
          <Col>
            <Space>
              <Button onClick={onReset}>清空</Button>
              <Button type="primary" onClick={onSubmit}>
                提交
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
          initialValues={initialValues}
        >
          <Row gutter={32}>
            {formList.map((item) => {
              if (item.render) {
                return item.render();
              }
              if (item.type === "select") {
                return (
                  <Col span={item.span} {...wrapCol} key={item.name}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                      rules={item.rules}
                    >
                      <Select options={item.options}></Select>
                    </Form.Item>
                  </Col>
                );
              }
              if (item.type === "cascader") {
                return (
                  <Col span={item.span} {...wrapCol} key={item.name}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                      rules={item.rules}
                    >
                      <Cascader
                        options={item.options}
                        placeholder=""
                      ></Cascader>
                    </Form.Item>
                  </Col>
                );
              }
              if (item.type === "input") {
                return (
                  <Col span={item.span} {...wrapCol} key={item.name}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                      rules={item.rules}
                    >
                      <Input></Input>
                    </Form.Item>
                  </Col>
                );
              }
              if (item.type === "datePicker") {
                return (
                  <Col span={item.span} {...wrapCol} key={item.name}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                      rules={item.rules}
                    >
                      <DatePicker style={{ width: "100%" }}></DatePicker>
                    </Form.Item>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        </Form>
      </div>
      <div className={styles["contact-container"]}>
        <Row justify="space-between" align="middle">
          <Col >
            <div className={styles["page-title"]}>新增联系人</div>
          </Col>
        </Row>
        <Form
          form={contactForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Form.List name="contact">
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? <Divider></Divider> : null}
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Divider orientation="right">
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Divider>
                    <Row gutter={32}>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "name"]}
                          fieldKey={[fieldKey, "name"]}
                          label="联系人"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "phone"]}
                          fieldKey={[fieldKey, "phone"]}
                          label="当前联系电话"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}></Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "email"]}
                          fieldKey={[fieldKey, "email"]}
                          label="邮箱"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "fax"]}
                          fieldKey={[fieldKey, "fax"]}
                          label="传真"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "gender"]}
                          fieldKey={[fieldKey, "gender"]}
                          label="性别"
                        >
                          <Select
                            options={[
                              { label: "未知", value: 0 },
                              { label: "男", value: 1 },
                              { label: "女", value: 2 },
                            ]}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "job"]}
                          fieldKey={[fieldKey, "job"]}
                          label="联系人职位"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "qq"]}
                          fieldKey={[fieldKey, "qq"]}
                          label="qq"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "telphone"]}
                          fieldKey={[fieldKey, "telphone"]}
                          label="座机"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "wechatId"]}
                          fieldKey={[fieldKey, "wechatId"]}
                          label="微信"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加联系人
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </div>
      <div className={styles["team-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>新增管理团队</div>
          </Col>
        </Row>
        <Form
          form={teamForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Form.List name="team">
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? <Divider></Divider> : null}
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Divider orientation="right">
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Divider>
                    <Row gutter={32}>
                      <Col span={8}>
                        {/* <Form.Item
                          name={[name, "userName"]}
                          fieldKey={[fieldKey, "userName"]}
                          label="姓名"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input></Input>
                        </Form.Item> */}
                        <Form.Item
                          name={[name, "user"]}
                          fieldKey={[fieldKey, "user"]}
                          label="姓名"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <UserSearch></UserSearch>
                        </Form.Item>
                      </Col>
                      <Col span={16}></Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "remark"]}
                          fieldKey={[fieldKey, "remark"]}
                          label="备注"
                        >
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[name, "type"]}
                          fieldKey={[fieldKey, "type"]}
                          label="类型"
                        >
                          <Select
                            options={[
                              { label: "团队管理员", value: 0 },
                              { label: "项目管理员", value: 1 },
                              { label: "信息维护者", value: 2 },
                            ]}
                          ></Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加管理团队
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </PageContainer>
  );
};

export default Add;
