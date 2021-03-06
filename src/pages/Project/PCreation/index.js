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
          addProject({ projectId: data, ...payload, ...values, ...params, teams: tags }).then((data) => {
            // console.log(data);

            message.success(res.message);
            setBtnLoading(false)
            history.push('/project/pm-list');
          });
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
            <div className={styles['page-title']}>??????????????????</div>
          </Row>
          <Col>
            <Space>
              <Button onClick={onReset}>??????</Button>
              <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 1 })}>
                ??????
              </Button>
              <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 0 })}>
                ????????????
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
                  message: '??????',
                },
              ]}
              label="????????????"
            >
              <CustomerSearch url={1} CustomerStyle={{ width: '328px' }}></CustomerSearch>
            </Form.Item>
            <Form.Item
              name="name"
              label="????????????"
              rules={[
                {
                  required: true,
                  message: '??????',
                },
              ]}
            >
              <Input style={{ width: '328px' }}></Input>
            </Form.Item>
            <Form.Item
              name="job"
              label="????????????"
              colon={false}
              rules={[
                {
                  required: true,
                  message: '??????',
                },
              ]}
            >
              <Cascader style={{ width: '328px' }} options={positionList} placeholder=""></Cascader>
            </Form.Item>
            <Form.Item
              name="cityCode"
              label="????????????"
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
              label="????????????"

            >
              <Input style={{ width: '328px' }}></Input>
            </Form.Item> */}
            <ProForm.Group>
              <Form.Item name="salaryStart" label="????????????" style={{ width: '222px' }}>
                <Input style={{ width: '122px' }} suffix="???"></Input>
              </Form.Item>
              ???
              <Form.Item name="salaryEnd">
                <Input style={{ width: '122px' }} suffix="???"></Input>
              </Form.Item>
            </ProForm.Group>
            <Form.Item name="department" label="????????????">
              <Input style={{ width: '328px' }}></Input>
            </Form.Item>
            <Form.Item name="recruitNum" label="????????????" help="?????????0?????????">
              <Input style={{ width: '130px' }}></Input>
            </Form.Item>
            {/* <ProForm.Group> */}
            <Form.Item name="reportName" label="????????????">
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
        <div className={styles['page-title']}>????????????</div>
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
          <Form.Item name="requireEdu" label="????????????" rules={[
            {
              required: true,
              message: '??????',
            },
          ]}>
            <Select

              style={{ width: '328px' }}
              options={[
                {
                  label: '??????',
                  value: 0,
                },
                // {
                //   label: '???????????????',
                //   value: 1,
                // },
                {
                  label: '???????????????',
                  value: 2,
                },
                // {
                //   label: '???????????????',
                //   value: 3,
                // },
                {
                  label: '???????????????',
                  value: 4,
                },
                {
                  label: '???????????????',
                  value: 5,
                },
                {
                  label: '???????????????',
                  value: 6,
                },
                {
                  label: '???????????????',
                  value: 7,
                },
              ]}
            ></Select>
          </Form.Item>
          <ProForm.Group>
            <Form.Item label="????????????" name="requireAgeS" style={{ width: '200px' }}>
              <Input style={{ width: '100px' }}></Input>
            </Form.Item>
            -
            <Form.Item name="requireAgeE" style={{ width: '100px' }}>
              <Input></Input>
            </Form.Item>
            <Form.Item style={{ width: '68px' }}>
              <Radio>??????</Radio>
            </Form.Item>
          </ProForm.Group>

          <Form.Item name="experience" label="????????????">
            <Select

              style={{ width: '328px' }}
              options={[
                {
                  label: '??????',
                  value: '??????',
                },
                {
                  label: '3?????????',
                  value: '3?????????',
                },
                {
                  label: '3-5???',
                  value: '3-5???',
                },
                {
                  label: '5-10???',
                  value: '5-10???',
                },
                {
                  label: '10?????????',
                  value: '10?????????',
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item name="requireGender" label="????????????" rules={[
            {
              required: true,
              message: '??????',
            },
          ]}>
            <Radio.Group>
              <Radio value={1}>???</Radio>
              <Radio value={0}>???</Radio>
              <Radio value={2}>??????</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="requireAllTime" label="????????????" rules={[
            {
              required: true,
              message: '??????',
            },
          ]}>
            <Radio.Group>
              <Radio value={1}>???</Radio>
              <Radio value={2}>??????</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="details" label="????????????" rules={[
            {
              required: true,
              message: '??????',
            },
          ]}>
            <TextArea style={{ width: '328px' }}></TextArea>
          </Form.Item>
          {/* <Form.Item name="details" label="????????????" rules={[
            {
              required: true,
              message: '??????',
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
        <Card title="????????????" extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>????????????</Button>}>
          {tags && tags.map((tag, index) => {
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
          })}
        </Card>
        <Modal title="????????????" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
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
              label="?????????"
              name="project"
            >
              <SearchInput></SearchInput>
            </Form.Item>
          </ProForm>
        </Modal>

        <Space>
          <Button
            style={{ marginLeft: '95px' }}
            type="primary"
            loading={btnLoading}
            onClick={() => onSubmit({ state: 1 })}
          >
            ??????
          </Button>
          <Button type="primary" loading={btnLoading} onClick={() => onSubmit({ state: 0 })}>
            ????????????
          </Button>
        </Space>

      </div>
    </PageContainer>
  );
};

export default PCreation;
