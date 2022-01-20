import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Radio,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Cascader,
  Divider,
  Space,
} from "antd";
import CustomerSearch from "../../../components/CustomerSearch";
import { addProject, getProjectId } from "../../../services/project";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import { positionList } from "../../../utils/Position";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'
const { TextArea } = Input;
const PCreation = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [jobForm] = Form.useForm();
  const [industryChildList, setIndustryChildList] = useState([]);
  const onIndustryChange = (value, data) => {
    // console.log(value, data);
    setIndustryChildList(data.children);
    form.setFieldsValue({ industryChild: data.children[0].value });
  };
  const onSubmit = (params) => {

    form.validateFields().then((values) => {
      console.clear();
      let payload = Object.assign({}, values);
      if (values.job) {
        payload.job = `${values.job[0]}/${values.job[1]}/${values.job[2]}`;
      }
      if (values.startTime) {
        payload.startTime = values.startTime.format("YYYY-MM-DD");
      }
      if (values.endTime) {
        payload.endTime = values.endTime.format("YYYY-MM-DD");
      }
      if (values.cityCode) {
        if (values.cityCode[1]) {
          payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
        } else {
          payload.cityCode = `${values.cityCode[0]}`;
        }
      }
      delete payload.customer;
      payload.customerId = values.customer.customerId;
      payload.customerName = values.customer.customerName;
      console.log(payload);
      getProjectId().then((res) => {
        const { data } = res
        jobForm.validateFields().then((values) => {
          addProject({ projectId: data, ...payload, ...values, ...params }).then((data) => {
            // console.log(data);
            history.push("/project/p-list");
          })
        })
          ;
      });
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const wrapCol = {
    xs: 24,
    sm: 12,
    lg: 8,
    xl: 6
  }
  const wrapTimeCol = {
    xs: 24,
    sm: 24,
    lg: 16,
    xl: 12
  }
  return (
    <PageContainer>

      <div className={styles["info-container"]}>
        <Row justify="space-between" align="middle">
          <Row>
            <div className={styles["page-title"]}>职位基本信息</div>
          </Row>
          <Col>
            <Space>
              <Button onClick={onReset}>清空</Button>
              <Button type="primary" onClick={() => onSubmit({ state: 1 })}>
                发布
              </Button>
              <Button type="primary" onClick={() => onSubmit({ state: 0 })}>
                保存草稿
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <div>
          <ProForm
            form={form}
            layout={'horizontal'}
            labelCol={{ style: { width: '95.33px' } }}
            wrapperCol={{ style: { width: '328px' } }}
            submitter={{
              render: (props, dom) => {
                return null
              },

            }}
            labelAlign="right">

            <Form.Item
              name="customer"
              rules={[
                {
                  required: true,
                  message: "必填",
                },
              ]}
              label="客户选择"
            >
              <CustomerSearch CustomerStyle={{ width: '328px' }}></CustomerSearch>
            </Form.Item>
            <Form.Item
              name="name"
              label="职位名称"
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
              name="job"
              label="职务类别"
              colon={false}
              rules={[
                {
                  required: true,
                  message: "必填",
                },
              ]}
            >
              <Cascader
                style={{ width: '328px' }}
                options={positionList}
                placeholder=""
              ></Cascader>
            </Form.Item>
            <Form.Item
              name="cityCode"
              label="工作地点"
              rules={[
                {
                  required: true,
                  message: "必填",
                },
              ]}
            >
              <Cascader
                style={{ width: '328px' }}
                options={cityList}
                placeholder=""
              ></Cascader>
            </Form.Item>
            {/* <Form.Item
              name="RJob"
              label="职位年薪"

            >
              <Input style={{ width: '328px' }}></Input>
            </Form.Item> */}
            <ProForm.Group>
              <Form.Item
                name="salaryStart"
                label="职位年薪"
                style={{ width: '222px' }}
              >
                <Input style={{ width: '122px' }} suffix="万"></Input>
              </Form.Item>
                至
              <Form.Item
                name="salaryEnd"
              >
                <Input style={{ width: '122px' }} suffix="万"></Input>
              </Form.Item>
            </ProForm.Group>
            <Form.Item
              name="department"
              label="所属部门"

            >
              <Input style={{ width: '328px' }}></Input>
            </Form.Item>
            <Form.Item
              name="RJob"
              label="招聘人数"
              help="备注：0为若干"
            >
              <Input style={{ width: '130px' }}></Input>
            </Form.Item>
            <ProForm.Group>
              <Form.Item
                name="reportName"
                label="汇报对象"
                style={{ width: '230px' }}
              >
                <Input style={{ width: '130px' }}></Input>
              </Form.Item>
              <Form.Item
                name="reportTel"
                label="tel"
                labelCol={{ width: '50px' }}
                style={{ width: '212px', justifyContent: 'start' }}
              >
                <Input style={{ width: '131px' }}></Input>
              </Form.Item>
            </ProForm.Group>
          </ProForm>

        </div>
        <div className={styles["page-title"]}>职位要求</div>
        <Divider></Divider>
        <ProForm
          form={jobForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '328px' } }}
          submitter={{
            render: (props, dom) => {
              return null
            },

          }}
          labelAlign="right">

          <Form.Item
            name="requireEdu"

            label="学历要求"
          >
            <Select
              style={{ width: '328px' }}
              options={[
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
              ]}
            ></Select>
          </Form.Item>
          <ProForm.Group>
            <Form.Item label="年龄要求" name="requireAgeS" style={{ width: '200px' }}>
              <Input style={{ width: '100px' }}></Input>
            </Form.Item>-
            <Form.Item name="requireAgeE" style={{ width: '100px' }}>
              <Input></Input>
            </Form.Item>
            <Form.Item style={{ width: '68px' }}>
              <Radio>不限</Radio>
            </Form.Item>
          </ProForm.Group>

          <Form.Item
            name="experience"
            label="工作年限"

          >
            <Select style={{ width: '328px' }} options={[
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
            ]}></Select>
          </Form.Item>
          <Form.Item
            name="requireGender"
            label="性别要求"

          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
              <Radio value={2}>不限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="requireAllTime"
            label="是否统招"

          >
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>不限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="details"
            label="职位描述"

          >
            <TextArea style={{ width: '328px' }}></TextArea>
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default PCreation;
