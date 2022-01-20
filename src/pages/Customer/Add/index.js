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
  Radio,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  addCustomer,
  getCustomerId,
  addContact,
  addCustomerTeam,
} from "../../../services/customer";
import { useState } from 'react'
import RecommenderSearch from "./Components/RecommenderSearch";
import UserSearch from "./Components/UserSearch";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'
import TextArea from "antd/lib/input/TextArea";
import SearchInput from "@/components/SearchInput";
const Add = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [teamForm] = Form.useForm();
  const [outForm] = Form.useForm();
  const [id, setId] = useState('');
  const onSubmit = () => {
    form.validateFields().then((values) => {
      contactForm.validateFields().then((contactValues) => {
        teamForm.validateFields().then((teamValues) => {
          outForm.validateFields().then((outValues) => {
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
              setId(data);
              addCustomer({ ...payload, ...outValues }).then((data) => {
                let extraInfo = [];
                if (contactValues.contact && contactValues.contact.length > 0) {
                  let contactPromises = contactValues.contact.map((item) => {
                    return addContact({ ...item, customerId: id });
                  });
                  extraInfo.push(...contactPromises);
                }
                debugger
                if (Object.keys(teamValues.user).length > 1) {
                  extraInfo.push(addCustomerTeam({
                    customerId: id,
                    comId: teamValues.user.comId,
                    type: 0,
                    userId: teamValues.user.userId,
                    userName: teamValues.user.name,
                  }))
                }
                if (teamValues.userYes && teamValues.userYes.length > 0) {
                  let teamPromises = teamValues.team.map((item) => {
                    return addCustomerTeam({
                      customerId: id,
                      comId: item.user.comId,
                      type: 1,
                      userId: item.user.userId,
                      userName: item.user.name,
                    });
                  });
                  console.log(teamPromises)
                  extraInfo.push(...teamPromises);
                }
                if (teamValues.userNo && teamValues.userNo.length > 0) {
                  let teamPromises = teamValues.team.map((item) => {
                    return addCustomerTeam({
                      customerId: id,
                      comId: item.user.comId,
                      type: 1,
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
            <div className={styles["page-title"]}>基本信息</div>
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
        <ProForm
          form={form}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '422px' } }}
          submitter={{
            render: (props, dom) => {
              return null
            },

          }}
        >
          <Form.Item
            name="name"
            label="客户名称"
            rules={[
              {
                required: true,
                message: "必填",
              },
            ]}
          >
            <Input style={{ width: '422px' }} placeholder="请输入客户全称"></Input>
          </Form.Item>
          <ProForm.Group>
            <Form.Item
              name="industryType"
              label="所属行业"
              style={{ width: '245px' }}
              rules={[
                {
                  required: true,
                  message: "必填",
                },
              ]}
            >
              <Select options={industryList} style={{ width: '145px' }}></Select>
            </Form.Item>
            <Form.Item
              name="sourceType"
              label="客户来源"
              style={{ width: '242px' }}

            >
              <Select options={[
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
              ]} style={{ width: '145px' }}></Select>
            </Form.Item>

          </ProForm.Group>
          <ProForm.Group>
            <Form.Item
              name="customerSize"
              label="客户规模"
              style={{ width: '245px' }}

            >
              <Select options={[
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
              ]} style={{ width: '145px' }}></Select>
            </Form.Item>
            <Form.Item
              name="customerNature"
              label="公司性质"
              style={{ width: '242px' }}

            >
              <Select options={[
                { label: "国企", value: 0 },
                { label: "民营企业", value: 1 },
                { label: "合资", value: 2 },
                { label: "外资（欧美）", value: 3 },
                { label: "外资（非欧美）", value: 4 },
                { label: "外企代表处", value: 5 },
                { label: "政府机关", value: 6 },
                { label: "事业单位", value: 7 },
                { label: "非营利组织", value: 8 },
              ]} style={{ width: '145px' }}></Select>
            </Form.Item>

          </ProForm.Group>
          <Form.Item
            name="registeredAddress"
            label="客户地点"

          >
            <Cascader
              style={{ width: '422px' }}
              options={cityList}
              placeholder=""
            ></Cascader>
          </Form.Item>
          <Form.Item
            name="operatingStatus"
            label="客户状态"
          >
            <Radio defaultChecked>潜在客户</Radio>
          </Form.Item>
        </ProForm>
      </div>
      <div className={styles["contact-container"]}>
        <Row justify="space-between" align="middle">
          <Col >
            <div className={styles["page-title"]}>新增联系人</div>
          </Col>
        </Row>
        <ProForm
          form={contactForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '422px' } }}
          submitter={{
            render: (props, dom) => {
              return null
            },
          }}
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
                    <ProForm.Group>
                      <Form.Item
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        style={{ width: '245px' }}
                        label="姓名"
                        rules={[
                          {
                            required: true,
                            message: "必填",
                          },
                        ]}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                      <Form.Item
                        name={[name, "fax"]}
                        fieldKey={[fieldKey, "fax"]}
                        label="职务"
                        style={{ width: '245px' }}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                    </ProForm.Group>
                    <Form.Item
                      name={[name, "gender"]}
                      fieldKey={[fieldKey, "gender"]}
                      label="性别"
                    >
                      <Radio.Group
                        defaultValue={0}
                        style={{ width: '422px' }}
                        options={[
                          { label: "未知", value: 0 },
                          { label: "男", value: 1 },
                          { label: "女", value: 2 },
                        ]}
                      ></Radio.Group>
                    </Form.Item>
                    <ProForm.Group>
                      <Form.Item
                        name={[name, "phone"]}
                        fieldKey={[fieldKey, "phone"]}
                        style={{ width: '245px' }}
                        label="手机"
                        rules={[
                          {
                            required: true,
                            message: "必填",
                          },
                        ]}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                      <Form.Item
                        name={[name, "telphone"]}
                        fieldKey={[fieldKey, "telphone"]}
                        label="座机"
                        style={{ width: '245px' }}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                    </ProForm.Group>

                    <Form.Item
                      name={[name, "email"]}
                      fieldKey={[fieldKey, "email"]}
                      label="邮箱"
                    >
                      <Input style={{ width: '224px' }}></Input>
                    </Form.Item>


                    <Form.Item
                      name={[name, "remark"]}
                      fieldKey={[fieldKey, "remark"]}
                      label="备注"
                    >
                      <TextArea style={{ width: '422px' }}></TextArea>
                    </Form.Item>
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
        </ProForm>
      </div>
      <div className={styles["team-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>新增管理团队</div>
          </Col>
        </Row>
        <Divider></Divider>
        <ProForm
          form={teamForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '422px' } }}
          submitter={{
            render: (props, dom) => {
              return null
            },
          }}
        >
          <Form.Item
            name="user"
            label="职位负责人"
          >
            <UserSearch filedProps={{ allowClear: true, style: { width: '422px' } }}> </UserSearch>
          </Form.Item>

          <Form.Item
            name="userYes"
            label="有职位管理"
          >
            <UserSearch filedProps={{ mode: "multiple", allowClear: true, style: { width: '422px' } }}> </UserSearch>
          </Form.Item>

          <Form.Item
            name="userNo"
            label="无职位管理"
          >
            <UserSearch filedProps={{ mode: "multiple", allowClear: true, style: { width: '422px' } }}> </UserSearch>

          </Form.Item>


        </ProForm>
      </div>
      <div className={styles["team-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>对外展示客户信息</div>
          </Col>
        </Row>
        <Divider></Divider>
        <ProForm
          form={outForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '422px' } }}
          submitter={{
            render: (props, dom) => {
              return null
            },
          }}
        >
          <Form.Item
            name="outName"
            label="公司名称"

            rules={[
              {
                required: true,
                message: "必填",
              },
            ]}
          >
            <Input style={{ width: '422px' }}></Input>

          </Form.Item>

          <Form.Item
            name="introduce"
            label="公司简介"
          >
            <TextArea style={{ width: '422px' }}></TextArea>
          </Form.Item>


        </ProForm>
      </div>
    </PageContainer>
  );
};

export default Add;
