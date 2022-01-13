import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Radio,
  Button,
  Select,
  Divider,
  Cascader,
  InputNumber,
  DatePicker,
  Card,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import { positionList } from "../../../utils/Position";
import {
  getTalentId,
  addTalent,
  addEP,
  addEdu,
  addEC,
} from "../../../services/talent";
import styles from "./index.less";
import ProForm, {
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormCheckbox,
  ProFormRate,
  ProFormSelect,
  ProFormDigit,
  ProFormSlider,
  ProFormGroup,
  ProFormDigitRange,
  ProFormTextArea,
  ProFormDateRangePicker,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import TextArea from "antd/lib/input/TextArea";
const { RangePicker } = DatePicker;
const TCreation = () => {
  const history = useHistory();
  const [industryChildList, setIndustryChildList] = useState([]);
  const [pIndustryChildList, setPIndustryChildList] = useState([]);
  const [eIndustryChildList, setEIndustryChildList] = useState([]);
  const [basicForm] = Form.useForm();
  const [educationForm] = Form.useForm();
  const [projectForm] = Form.useForm();
  const [experienceForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const basicFormList = [
    {
      name: "name",
      label: "姓名",
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
      label: "手机号",
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
      name: "RCity",
      label: "求职意向：期望地点",
      type: "cascader",
      options: cityList,
      span: 12,
    },
    {
      name: "RIndustry",
      label: "求职意向：期望行业",
      type: "input",
      span: 12,
      render: () => {
        return (
          <Col span={12} key="RIndustry">
            <Form.Item name="RIndustry" label="求职意向：期望行业">
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
      name: "RIndustryChild",
      label: "求职意向：期望行业子级",
      type: "input",
      span: 12,
      render: () => {
        return (
          <Col span={12} key="RIndustryChild">
            <Form.Item name="RIndustryChild" label="求职意向：期望行业子级">
              <Select options={industryChildList}></Select>
            </Form.Item>
          </Col>
        );
      },
    },
    {
      name: "RJob",
      label: "求职意向：期望岗位",
      type: "cascader",
      span: 12,
      options: positionList,
    },
    {
      name: "RSalary",
      label: "求职意向：期望薪资",
      type: "inputNumber",
      span: 12,
    },
    {
      name: "birthday",
      label: "生日",
      type: "datePicker",
      span: 12,
    },

    {
      name: "domicile",
      label: "户籍地址",
      type: "input",
      span: 12,
    },
    {
      name: "education",
      label: "学历",
      type: "select",
      span: 12,
    },

    {
      name: "email",
      label: "Email",
      type: "input",
      span: 12,
    },
    {
      name: "experience",
      label: "工作经验",
      type: "select",
      span: 12,
      options: [
        {
          label: "3年以下",
          value: "3年以下",
        },
        {
          label: "3-5年",
          value: "3-5年",
        },
        {
          label: "5-10年",
          value: "5-10年",
        },
        {
          label: "10年以上",
          value: "10年以上",
        },
      ],
    },

    {
      name: "gender",
      label: "性别",
      type: "select",
      span: 12,
      options: [
        { label: "不限", value: 0 },
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
    },
    {
      name: "introduce",
      label: "自我介绍",
      type: "input",
      span: 12,
    },

    {
      name: "job",
      label: "当前岗位",
      type: "input",
      span: 12,
    },
    {
      name: "language",
      label: "语言等级",
      type: "input",
      span: 12,
    },

    {
      name: "lastCompany",
      label: "上家公司/当前公司",
      type: "input",
      span: 12,
    },
    {
      name: "location",
      label: "现居地",
      type: "cascader",
      span: 12,
      options: cityList,
    },

    {
      name: "qq",
      label: "qq",
      type: "input",
      span: 12,
    },
    {
      name: "salary",
      label: "当前年薪",
      type: "inputNumber",
      span: 12,
    },

    {
      name: "school",
      label: "毕业院校",
      type: "input",
      span: 12,
    },
    {
      name: "source",
      label: "来源",
      type: "select",
      options: [
        { label: "未知来源", value: 0 },
        { label: "官网应聘", value: 1 },
        { label: "智联招聘", value: 2 },
        { label: "中华英才", value: 3 },
        { label: "前程无忧", value: 4 },
        { label: "猎聘网", value: 5 },
        { label: "陌生电话", value: 6 },
        { label: "人脉推荐", value: 7 },
        { label: "微博私信", value: 8 },
        { label: "论坛发帖", value: 9 },
        { label: "其他途径", value: 10 },
        { label: "LinkedIn", value: 11 },
        { label: "卓聘网", value: 12 },
        { label: "无忧精英", value: 13 },
        { label: "公共池", value: 14 },
      ],
      span: 12,
    },

    {
      name: "wechat",
      label: "wechat",
      type: "input",
      span: 12,
    },
    {
      name: "workState",
      label: "工作状态",
      type: "select",
      options: [
        { label: "当前在职", value: 0 },
        { label: "已离职", value: 1 },
        { label: "失业", value: 2 },
      ],
      span: 12,
    },
  ];
  const handleSubmit = () => {
    basicForm.validateFields().then((basicValues) => {
      getTalentId().then((res) => {
        const { data } = res;
        let payload = Object.assign({}, basicValues);
        if (basicValues.RCity) {
          if (basicValues.RCity[1]) {
            payload.RCity = `${basicValues.RCity[0]}/${basicValues.RCity[1]}`;
          } else {
            payload.RCity = `${basicValues.RCity[0]}/`;
          }
        }
        if (basicValues.birthday) {
          payload.birthday = basicValues.birthday.format("YYYY-MM-DD");
        }

        addTalent({ talentId: data, ...payload }).then((data) => {
          Promise.all([
            educationForm.validateFields(),
            projectForm.validateFields(),
            experienceForm.validateFields(),
          ]).then((values) => {
            // console.log(values);
            let extraInfo = [];
            values.forEach((item) => {
              if (Object.keys(item)[0] === "education") {
                // console.log(item["education"], 1, item["education"].length);
                if (item["education"]) {
                  item["education"].forEach((education) => {
                    // console.log(education.startTime.format("YYYY-MM-DD"));
                    let payload = Object.assign({}, education);
                    if (education.startTime) {
                      payload.startTime =
                        education.startTime.format("YYYY-MM-DD");
                    }
                    if (education.endTime) {
                      payload.endTime = education.endTime.format("YYYY-MM-DD");
                    }
                    extraInfo.push(addEdu({ talentId: id, ...payload }));
                  });
                }
              }
              if (Object.keys(item)[0] === "project") {
                // console.log(item["project"], 2, item["project"].length);
                if (item["project"]) {
                  item["project"].forEach((project) => {
                    let payload = Object.assign({}, project);
                    if (project.startTime) {
                      payload.startTime =
                        project.startTime.format("YYYY-MM-DD");
                    }
                    if (project.endTime) {
                      payload.endTime = project.endTime.format("YYYY-MM-DD");
                    }
                    extraInfo.push(addEP({ talentId: id, ...payload }));
                  });
                }
              }
              if (Object.keys(item)[0] === "experience") {
                // console.log(item["experience"], 3, item["experience"].length);
                if (item["experience"]) {
                  item["experience"].forEach((experience) => {
                    let payload = Object.assign({}, experience);
                    if (experience.startTime) {
                      payload.startTime =
                        experience.startTime.format("YYYY-MM-DD");
                    }
                    if (experience.endTime) {
                      payload.endTime = experience.endTime.format("YYYY-MM-DD");
                    }
                    extraInfo.push(addEC({ talentId: id, ...payload }));
                  });
                }
              }
            });
            Promise.all(extraInfo).then((datas) => {
              history.push("/talent/t-list");
            });
          });
        });
      });
    });
  };
  const onIndustryChange = (value, data) => {
    setIndustryChildList(data.children);
    basicForm.setFieldsValue({ RIndustryChild: data.children[0].value });
  };
  const onPIndustryChange = (value, data, key) => {
    const fields = projectForm.getFieldsValue();
    const { project } = fields;
    setPIndustryChildList(data.children);
    Object.assign(project[key], { industryChild: data.children[0].value });
    projectForm.setFieldsValue({ project });
  };
  const onEIndustryChange = (value, data, key) => {
    const fields = experienceForm.getFieldsValue();
    const { experience } = fields;
    setEIndustryChildList(data.children);
    Object.assign(experience[key], { industryChild: data.children[0].value });
    experienceForm.setFieldsValue({ experience });
  };
  const formItemLayout = {
    labelCol: {//label占比 当屏幕为xs最小像素时 当屏幕为sm大于小像素时
      span: 4
    },
    wrapperCol: {//input框占比
      xs: 24,
      sm: 4
    }
  }
  return (
    <PageContainer>

      <Row gutter={16}>
        <Col span={24}>
          <div className={styles["basic-container"]}>
            <Row justify="space-between">
              <Col>
                <div className={styles["title"]}>联系方式</div>
              </Col>
              <Col>
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
              </Col>
            </Row>
            <Divider></Divider>
            <ProForm labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout={'horizontal'} form={contactForm} submitter={{
              render: (props, dom) => {
                return null
              },
            }}>
              <ProForm.Group>
                <ProFormText width="sm" name="name" label="手机号码" />
                <ProFormText width="sm" name="name1" label="邮箱地址" />
              </ProForm.Group>

            </ProForm>
          </div>
          <div className={styles["education-container"]}>
            <Row justify="space-between">
              <Col>
                <div className={styles["title"]}>基本信息</div>
              </Col>
            </Row>
            <Divider></Divider>
            <ProForm form={contactForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout={'horizontal'} submitter={{
              render: (props, dom) => {
                return null
              },
            }}>
              <ProForm.Group>
                <ProFormText fieldProps={{
                  ...formItemLayout
                }} width="sm" name="name" label="人选姓名" />
                <ProFormSelect width="sm" name="name" label="最高学历" options={[
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
                ]} />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect width="sm" name="name" label="工作经验" options={[
                  {
                    label: "3年以下",
                    value: "3年以下",
                  },
                  {
                    label: "3-5年",
                    value: "3-5年",
                  },
                  {
                    label: "5-10年",
                    value: "5-10年",
                  },
                  {
                    label: "10年以上",
                    value: "10年以上",
                  },
                ]} />
                <ProFormRadio.Group
                  label="人选性别"
                  name="gender"
                  labelCol={{
                    style: { width: '95.33px' }
                  }}
                  options={[
                    {
                      value: '1',
                      label: '男',
                    },
                    {
                      value: '2',
                      label: '女',
                    },
                  ]}
                />
                {/* <ProFormSelect width="sm" name="name" label="人选性别" options={[
                  {
                    label: "男",
                    value: "3年以下",
                  },
                  {
                    label: "女",
                    value: "3-5年",
                  },
                ]} /> */}


              </ProForm.Group>
              <ProForm.Group>
                <ProFormDatePicker
                  label="出生日期"
                  width="sm"
                  help=""//备注
                  name="state" />
                <ProFormText label="目前薪资"
                  help=""//备注
                  fieldProps={{
                    prefix: "￥",
                    suffix: "万元"
                  }}
                  width="sm"
                  name="state" />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  label="户籍地址"
                  help=""//备注
                  width="sm"
                  name="state" />
                <ProFormText
                  label="现居地址"
                  help=""//备注
                  width="sm"
                  name="state" />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect width="sm" name="name" label="工作状态" options={[
                  {
                    label: "3年以下",
                    value: "3年以下",
                  },
                  {
                    label: "3-5年",
                    value: "3-5年",
                  },
                  {
                    label: "5-10年",
                    value: "5-10年",
                  },
                  {
                    label: "10年以上",
                    value: "10年以上",
                  },
                ]} />
                <ProFormSelect width="sm" name="name" label="推荐来源" options={[
                  {
                    label: "3年以下",
                    value: "3年以下",
                  },
                  {
                    label: "3-5年",
                    value: "3-5年",
                  },
                  {
                    label: "5-10年",
                    value: "5-10年",
                  },
                  {
                    label: "10年以上",
                    value: "10年以上",
                  },
                ]} />
              </ProForm.Group>
            </ProForm>
          </div>
          <div className={styles["education-container"]}>
            <div className={styles["title"]}>个人经历</div>
            <Divider></Divider>
            <ProForm form={contactForm} layout={'horizontal'} submitter={{
              render: (props, dom) => {
                return null
              },
            }}>
              <ProFormTextArea width="xl" name="name" label="" />
            </ProForm>
          </div>
          <div className={styles["education-container"]}>
            <div className={styles["title"]}>求职意向</div>
            <Divider></Divider>
            <ProForm form={contactForm} layout={'horizontal'} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} submitter={{
              render: (props, dom) => {
                return null
              },

            }}>
              <ProForm.Group>
                {/* <Form.Item name="RIndustry" label="期望行业">
                  <Select
                    options={industryList}
                    onChange={onIndustryChange}
                  ></Select>
                </Form.Item> */}
                <ProFormSelect width="sm" name="name" label="期望行业" options={industryList} onChange={onIndustryChange} />
                <ProFormCheckbox width="sm" label="不限" name="aa" />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect width="sm" name="name" label="期望岗位" options={industryList} onChange={onIndustryChange} />
                <ProFormCheckbox width="sm" label="不限" name="aa" />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect width="sm" name="name" label="期望薪资" options={industryList} onChange={onIndustryChange} />
                <ProFormCheckbox width="sm" label="不限" name="aa" />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect width="sm" name="name" label="期望地点" options={industryList} onChange={onIndustryChange} />
                <ProFormCheckbox width="sm" label="不限" name="aa" />
              </ProForm.Group>
            </ProForm>
          </div>
          <div className={styles["education-container"]}>
            <div className={styles["title"]}>教育经历</div>
            <ProForm
              form={educationForm}
              labelCol={{ style: { width: '95.33px' } }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              labelAlign="right"
              submitter={{
                render: (props, dom) => {
                  return null
                }
              }}
            >
              <Form.List name="education">
                {(fields, { add, remove }) => (
                  <>
                    {fields.length === 0 ? <Divider></Divider> : null}
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key}>
                        <Divider orientation="right">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Divider>

                        <Form.Item
                          name={[name, "name"]}
                          fieldKey={[fieldKey, "name"]}
                          label="学校名"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>


                        <Form.Item
                          name={[name, "classes"]}
                          fieldKey={[fieldKey, "classes"]}
                          label="专业"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>


                        <Form.Item
                          name={[name, "isAllTime"]}
                          fieldKey={[fieldKey, "isAllTime"]}
                          label="是否统招"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          {/* <Select
                            options={[
                              { label: "是", value: 0 },
                              { label: "否", value: 1 },
                            ]}
                          ></Select> */}
                          <Radio.Group >
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <ProFormDateRangePicker width="md" label="学习时间" />
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加教育经历
                    </Button>
                  </>
                )}
              </Form.List>
            </ProForm>
          </div>
          <div className={styles["experience-container"]}>
            <div className={styles["title"]}>工作经历</div>
            <Form
              form={experienceForm}
              labelCol={{ style: { width: '95.33px' } }}
              wrapperCol={{ style: { width: '328px' } }}
              labelAlign="right"
            >
              <Form.List name="experience">
                {(fields, { add, remove }) => (
                  <>
                    {fields.length === 0 ? <Divider></Divider> : null}
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key}>
                        <Divider orientation="right">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Divider>
                        <Form.Item
                          name={[name, "name"]}
                          fieldKey={[fieldKey, "name"]}
                          label="公司名称"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>
                        <Form.Item
                          name={[name, "duty"]}
                          fieldKey={[fieldKey, "duty"]}
                          label="职责"
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>
                        <Form.Item
                          name={[name, "startTime"]}
                          fieldKey={[fieldKey, "startTime"]}
                          label="开始日期"
                        >
                          <RangePicker style={{ width: "328px" }}></RangePicker>
                        </Form.Item>
                        {/* <Form.Item
                          name={[name, "endTime"]}
                          fieldKey={[fieldKey, "endTime"]}
                          label="结束日期"
                        >
                          <DatePicker style={{ width: "100%" }}></DatePicker>
                        </Form.Item> */}
                        <ProForm.Group>
                          <Form.Item
                            name={[name, "industry"]}
                            fieldKey={[fieldKey, "industry"]}
                            label="行业"
                            style={{ width: '242px' }}
                          >
                            <Select
                              options={industryList}
                              onChange={(value, data) => {
                                onEIndustryChange(value, data, fieldKey);
                              }}
                              style={{ width: "146px" }}
                            ></Select>
                          </Form.Item>
                          <Form.Item
                            name={[name, "industryChild"]}
                            fieldKey={[fieldKey, "industryChild"]}
                            label=""
                          >
                            <Select options={eIndustryChildList} style={{ width: "150px" }}></Select>
                          </Form.Item>
                        </ProForm.Group>

                        <Form.Item
                          name={[name, "details"]}
                          fieldKey={[fieldKey, "details"]}
                          label="工作职责"
                        >
                          <TextArea style={{ width: "328px" }}></TextArea>
                        </Form.Item>

                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加项目经历
                    </Button>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          <div className={styles["project-container"]}>
            <div className={styles["title"]}>项目经历</div>
            <Form
              form={projectForm}
              labelCol={{ style: { width: '95.33px' } }}
              wrapperCol={{ style: { width: '328px' } }}
              labelAlign="right"
            >
              <Form.List name="project">
                {(fields, { add, remove }) => (
                  <>
                    {fields.length === 0 ? <Divider></Divider> : null}
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key}>
                        <Divider orientation="right">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Divider>

                        <Form.Item
                          name={[name, "name"]}
                          fieldKey={[fieldKey, "name"]}
                          label="项目名称"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>


                        <Form.Item
                          name={[name, "job"]}
                          fieldKey={[fieldKey, "job"]}
                          label="当前岗位"
                          rules={[
                            {
                              required: true,
                              message: "必填",
                            },
                          ]}
                        >
                          <Input style={{ width: '328px' }}></Input>
                        </Form.Item>


                        <Form.Item
                          name={[name, "startTime"]}
                          fieldKey={[fieldKey, "startTime"]}
                          label="开始日期"
                        >
                          <RangePicker
                            style={{ width: '328px' }}
                          ></RangePicker>
                        </Form.Item>
                        <Form.Item
                          name={[name, "duty"]}
                          fieldKey={[fieldKey, "duty"]}
                          label="项目职责"
                        >
                          <TextArea style={{ width: '328px' }} />
                        </Form.Item>


                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加项目经历
                    </Button>
                  </>
                )}
              </Form.List>
            </Form>
          </div>

          <div className={styles["attachment-container"]}>
            <div className={styles["title"]}>附件</div>
            <Divider></Divider>
          </div>

        </Col>
      </Row>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default TCreation;
