import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Card,
  Tag,
  Modal,
  Input,
  Radio,
  InputNumber,
  Cascader,
  Button,
  Select,
  DatePicker,
  message,
  Divider,
  Space,
} from 'antd';
import CustomerSearch from '../../../components/CustomerSearch';
import { addProject, getProjectId } from '../../../services/project';
import { cityList } from '../../../utils/CityList';
import { industryList } from '../../../utils/Industry';
import { positionList } from '../../../utils/Position';
import CascaderMul from '@/components/CascaderMul';
import { ulfq } from "@/services/customer";

import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
const { TextArea } = Input;
import DebounceSelect from '@/pages/Admin/TCAList/components/UserSearch'
import SearchInput from '@/components/SearchInput';

const PCreation = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [teamForm] = Form.useForm();

  const [jobForm] = Form.useForm();
  const [industryChildList, setIndustryChildList] = useState([]);
  const onIndustryChange = (value, data) => {
    // console.log(value, data);
    setIndustryChildList(data.children);
    form.setFieldsValue({ industryChild: data.children[0].value });
  };

  const onSubmit = (params) => {
    setBtnLoading(true);
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.job) {
        payload.job = `${values.job[0]}` + `${values.job[1] ? `/${values.job[1]}` : ''}` + `${values.job[2] ? `/${values.job[2]}` : ''}`;
      }
      if (values.startTime) {
        payload.startTime = values.startTime.format('YYYY-MM-DD');
      }
      if (values.endTime) {
        payload.endTime = values.endTime.format('YYYY-MM-DD');
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
        const { data } = res;
        jobForm.validateFields().then((values) => {
          teamForm.validateFields().then(val => {
            console.log(val)
            addProject({
              projectId: data, ...payload, ...values, ...params, teams: val.ids ? val.ids.map(ite => {
                return {
                  appUserId: ite.value,
                  appUserName: ite.label
                }
              }) : ''
            }).then((data) => {
              console.log(data);

              message.success(res.message);
              setBtnLoading(false)
              history.push('/project/pm-list');
            });
          })
        }).catch(err => {
          setBtnLoading(false);
        });
      });
    }).catch(err => {
      setBtnLoading(false);
      console.log(err);
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const wrapCol = {
    xs: 24,
    sm: 12,
    lg: 8,
    xl: 6,
  };
  const wrapTimeCol = {
    xs: 24,
    sm: 24,
    lg: 16,
    xl: 12,
  };
  const onFinish = (values) => {
    console.log(values);
    let arr = tags;
    arr.push({ appUserId: values.project.recommenderUserId, appUserName: values.project.recommenderName });
    setTags(arr);
    console.log(tags);
    setIsModalVisible(false);
    teamForm.resetFields();
  }
  const handleDeleteTag = async (removedTag) => {
    console.log(removedTag);
    // getTages();
    let arr = tags.filter(item => item.appUserId !== removedTag.appUserId);
    setTags(arr);

  }
  return (
    <PageContainer>
      <div className={styles['info-container']}>
        <Row justify="space-between" align="middle">
          <Row>
            <div className={styles['page-title']}>职位基本信息</div>
          </Row>
          <Col>
            <Space>
              <Button onClick={onReset}>清空</Button>
              <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 1 })}>
                发布
              </Button>
              <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 0 })}>
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
                return null;
              },
            }}
            labelAlign="right"
          >
            <Form.Item
              name="customer"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
              label="客户选择"
            >
              <CustomerSearch url={1} CustomerStyle={{ width: '328px' }}></CustomerSearch>
            </Form.Item>
            <Form.Item
              name="name"
              label="职位名称"
              rules={[
                {
                  required: true,
                  message: '必填',
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
                  message: '必填',
                },
              ]}
            >
              <Cascader style={{ width: '328px' }} options={positionList} placeholder=""></Cascader>
            </Form.Item>
            <Form.Item
              name="cityCode"
              label="工作地点"
            >
              <CascaderMul style={{ width: '328px' }} onChange={(e) => {
                console.log(e)
                form.setFieldsValue({
                  cityCode: e.value
                })
              }} options={cityList} />
            </Form.Item>
            {/* <Form.Item
              name="RJob"
              label="职位年薪"

            >
              <Input style={{ width: '328px' }}></Input>
            </Form.Item> */}
            <ProForm.Group>
              <Form.Item name="salaryStart" label="职位年薪" style={{ width: '222px' }}>
                <Input style={{ width: '122px' }} suffix="万"></Input>
              </Form.Item>
              至
              <Form.Item name="salaryEnd">
                <Input style={{ width: '122px' }} suffix="万"></Input>
              </Form.Item>
            </ProForm.Group>
            <Form.Item name="department" label="所属部门">
              <Input style={{ width: '328px' }}></Input>
            </Form.Item>
            <Form.Item name="recruitNum" label="招聘人数" help="备注：0为若干">
              <Input style={{ width: '130px' }}></Input>
            </Form.Item>
            {/* <ProForm.Group> */}
            <Form.Item name="reportName" label="汇报对象">
              <Input style={{ width: '328px' }}></Input>
            </Form.Item>
            {/* <Form.Item
                name="reportTel"
                label="tel"
                labelCol={{ width: '50px' }}
                style={{ width: '212px', justifyContent: 'start' }}
              >
                <Input style={{ width: '131px' }}></Input>
              </Form.Item> */}
            {/* </ProForm.Group> */}
          </ProForm>
        </div>
        <div className={styles['page-title']}>职位要求</div>
        <Divider></Divider>
        <ProForm
          form={jobForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '328px' } }}
          submitter={{
            render: (props, dom) => {
              return null;
            },
          }}
          labelAlign="right"
        >
          <Form.Item name="requireEdu" label="学历要求" rules={[
            {
              required: true,
              message: '必填',
            },
          ]}>
            <Select

              style={{ width: '328px' }}
              options={[
                {
                  label: '不限',
                  value: 0,
                },
                // {
                //   label: '初中及以上',
                //   value: 1,
                // },
                {
                  label: '中专及以上',
                  value: 2,
                },
                // {
                //   label: '高中及以上',
                //   value: 3,
                // },
                {
                  label: '大专及以上',
                  value: 4,
                },
                {
                  label: '本科及以上',
                  value: 5,
                },
                {
                  label: '硕士及以上',
                  value: 6,
                },
                {
                  label: '博士及以上',
                  value: 7,
                },
              ]}
            ></Select>
          </Form.Item>
          <ProForm.Group>
            <Form.Item label="年龄要求" name="requireAgeS" style={{ width: '200px' }}>
              <Input style={{ width: '100px' }}></Input>
            </Form.Item>
            -
            <Form.Item name="requireAgeE" style={{ width: '100px' }}>
              <Input></Input>
            </Form.Item>
            <Form.Item style={{ width: '68px' }}>
              <Radio>不限</Radio>
            </Form.Item>
          </ProForm.Group>

          <Form.Item name="experience" label="工作年限">
            <Select

              style={{ width: '328px' }}
              options={[
                {
                  label: '不限',
                  value: '不限',
                },
                {
                  label: '3年以下',
                  value: '3年以下',
                },
                {
                  label: '3-5年',
                  value: '3-5年',
                },
                {
                  label: '5-10年',
                  value: '5-10年',
                },
                {
                  label: '10年以上',
                  value: '10年以上',
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item name="requireGender" label="性别要求" rules={[
            {
              required: true,
              message: '必填',
            },
          ]}>
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
              <Radio value={2}>不限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="requireAllTime" label="是否统招" rules={[
            {
              required: true,
              message: '必填',
            },
          ]}>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>不限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="details" label="职位描述" rules={[
            {
              required: true,
              message: '必填',
            },
          ]}>
            <TextArea style={{ width: '328px' }}></TextArea>
          </Form.Item>
          {/* <Form.Item name="details" label="职位描述" rules={[
            {
              required: true,
              message: '必填',
            },
          ]}>
            <Select
              mode="multiple"
              showArrow
              tagRender={(props) => {
                const { label, value, closable, onClose } = props;
                const onPreventMouseDown = event => {
                  event.preventDefault();
                  event.stopPropagation();
                };
                return (
                  <Tag
                    color={value}
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{ marginRight: 3 }}
                  >
                    {label}
                  </Tag>
                );
              }}
              defaultValue={['gold', 'cyan']}
              style={{ width: '100%' }}
              options={options}
            />
          </Form.Item>
        */}
        </ProForm>
        {/* <Card title="执行团队" extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>新增成员</Button>}> */}
        <Card title="执行团队">
          {/* {tags && tags.map((tag, index) => {
            const tagElem = (
              <Tag
                className="edit-tag"
                key={tag.id}
                closable
                color={["#f50", "#87d068", "#2db7f5", "#108ee9"][index % 4]}
                onClose={(e) => {
                  e.preventDefault();
                  handleDeleteTag(tag)
                }}
              >
                {tag.appUserName}
              </Tag>
            );
            return tagElem
          })} */}
          <Form
            form={teamForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <Form.Item name="ids" label={null}>
              <DebounceSelect
                mode="multiple"
                value={form.getFieldValue('ids')}
                placeholder="Select users"

                fetchOptions={async (e) => {
                  let a = await ulfq({ name: e });
                  console.log(a)
                  console.log(e);

                  return a.data.list.map(item => {
                    return {
                      label: `${item.name} `,
                      value: item.userId,
                    }
                  });
                }}
                onChange={(newValue) => {
                  // setValue(newValue);
                }}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

          </Form> </Card>
        {/* <Modal title="加入团队" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
          <ProForm
            hideRequiredMark
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: 600,
            }}
            name="basic"
            form={teamForm}
            layout="vertical"
            initialValues={{
              public: '1',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="推荐人"
              name="project"
            >
              <SearchInput></SearchInput>
            </Form.Item>
          </ProForm>
        </Modal> */}

        <Space>
          <Button
            style={{ marginLeft: '95px' }}
            type="primary"
            loading={btnLoading}
            onClick={() => onSubmit({ state: 1 })}
          >
            发布
          </Button>
          <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 0 })}>
            保存草稿
          </Button>
        </Space>

      </div>
    </PageContainer>
  );
};

export default PCreation;
