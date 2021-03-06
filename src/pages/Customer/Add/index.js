import { useHistory } from 'react-router-dom';
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
  message,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  addCustomer,
  getCustomerId,
  addContact,
  addCustomerTeam,
  checkCustomer,
} from '../../../services/customer';
import { useState } from 'react';
import RecommenderSearch from './Components/RecommenderSearch';
import UserSearch from './Components/UserSearch';
import { cityList } from '../../../utils/CityList';
import { industryList } from '../../../utils/Industry';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import TextArea from 'antd/lib/input/TextArea';
import SearchInput from '@/components/SearchInput';
import SelfDate from '@/components/SelfDate';
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
                debugger;
                if (teamValues.user && Object.keys(teamValues.user).length > 1) {
                  extraInfo.push(
                    addCustomerTeam({
                      customerId: id,
                      comId: teamValues.user.comId,
                      type: 0,
                      userId: teamValues.user.userId,
                      userName: teamValues.user.name,
                    }),
                  );
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
                  console.log(teamPromises);
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
                  debugger;
                  message.success('??????????????????');
                  console.log(results);
                  form.resetFields();
                  history.push('/customer/list');
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
    companyType: '????????????',
    customerNature: 1,
    customerSize: 2,
  };
  const wrapCol = {
    xs: 24,
    sm: 12,
    lg: 8,
  };
  return (
    <PageContainer>
      <div className={styles['info-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>????????????</div>
          </Col>
          <Col>
            <Space>
              <Button onClick={onReset}>??????</Button>
              <Button type="primary" onClick={onSubmit}>
                ??????
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
              return null;
            },
          }}
          initialValues={{
            operatingStatus: 0
          }}
        >
          <Form.Item
            name="name"
            label="????????????"
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (value.length == 0) {
                    return Promise.reject(new Error('??????????????????'));
                  }
                  let result = await checkCustomer({ customerName: value });
                  if (result.data == 1) {
                    return Promise.reject(new Error('???????????????,???????????????'));
                  }
                  if (value.indexOf('??????????????????') == -1 && value.indexOf('????????????') == -1 && value.indexOf('????????????????????????') == -1) {
                    return Promise.reject(new Error('?????????????????????'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input style={{ width: '422px' }} placeholder="?????????????????????"></Input>
          </Form.Item>
          <ProForm.Group>
            <Form.Item
              name="industryType"
              label="????????????"
              style={{ width: '245px' }}
              rules={[
                {
                  required: true,
                  message: '??????',
                },
              ]}
            >
              <Select options={industryList} style={{ width: '145px' }}></Select>
            </Form.Item>
            <Form.Item name="sourceType" label="????????????" style={{ width: '242px' }}>
              <Select
                options={[
                  {
                    label: '?????????',
                    value: 0,
                  },
                  {
                    label: '????????????',
                    value: 1,
                  },
                  {
                    label: '??????BD',
                    value: 2,
                  },
                  {
                    label: '????????????',
                    value: 3,
                  },
                ]}
                style={{ width: '145px' }}
              ></Select>
            </Form.Item>
          </ProForm.Group>
          <ProForm.Group>
            <Form.Item name="customerSize" label="????????????" style={{ width: '245px' }}>
              <Select
                options={[
                  {
                    label: ' 0-15???',
                    value: 0,
                  },
                  {
                    label: '15-50???',
                    value: 1,
                  },
                  {
                    label: '50-100???',
                    value: 2,
                  },
                  {
                    label: '100-500???',
                    value: 3,
                  },
                  {
                    label: '500-1000???',
                    value: 4,
                  },
                  {
                    label: '1000-10000???',
                    value: 5,
                  },
                  {
                    label: '10000?????????',
                    value: 6,
                  },
                ]}
                style={{ width: '145px' }}
              ></Select>
            </Form.Item>
            <Form.Item name="customerNature" label="????????????" style={{ width: '242px' }}>
              <Select
                options={[
                  { label: '??????', value: 0 },
                  { label: '????????????', value: 1 },
                  { label: '??????', value: 2 },
                  { label: '??????????????????', value: 3 },
                  { label: '?????????????????????', value: 4 },
                  { label: '???????????????', value: 5 },
                  { label: '????????????', value: 6 },
                  { label: '????????????', value: 7 },
                  { label: '???????????????', value: 8 },
                ]}
                style={{ width: '145px' }}
              ></Select>
            </Form.Item>
          </ProForm.Group>
          <Form.Item name="registeredAddress" label="????????????">
            {/* <Cascader
              style={{ width: '422px' }}
              options={cityList}
              placeholder=""
            ></Cascader> */}
            <Input style={{ width: '422px' }} />
          </Form.Item>
          <Form.Item name="state" label="????????????">
            <Radio.Group options={[
              { label: '????????????', value: 0 },
              { label: '????????????', value: 1 },
              { label: '????????????', value: 2 },
            ]}>
            </Radio.Group>
          </Form.Item>
        </ProForm>
      </div>
      <div className={styles['contact-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>???????????????</div>
          </Col>
        </Row>
        <ProForm
          form={contactForm}
          layout={'horizontal'}
          labelCol={{ style: { width: '95.33px' } }}
          wrapperCol={{ style: { width: '422px' } }}
          submitter={{
            render: (props, dom) => {
              return null;
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
                        name={[name, 'name']}
                        fieldKey={[fieldKey, 'name']}
                        style={{ width: '245px' }}
                        label="??????"
                        rules={[
                          {
                            required: true,
                            message: '??????',
                          },
                        ]}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                      <Form.Item
                        name={[name, 'job']}
                        fieldKey={[fieldKey, 'job']}
                        label="??????"
                        style={{ width: '245px' }}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                    </ProForm.Group>
                    <Form.Item name={[name, 'gender']} fieldKey={[fieldKey, 'gender']} label="??????">
                      <Radio.Group
                        defaultValue={0}
                        style={{ width: '422px' }}
                        options={[
                          { label: '??????', value: 0 },
                          { label: '???', value: 1 },
                          { label: '???', value: 2 },
                        ]}
                      ></Radio.Group>
                    </Form.Item>
                    <ProForm.Group>
                      <Form.Item
                        name={[name, 'phone']}
                        fieldKey={[fieldKey, 'phone']}
                        style={{ width: '245px' }}
                        label="??????"
                        rules={[
                          {
                            required: true,
                            message: '??????',
                          },
                        ]}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                      <Form.Item
                        name={[name, 'telphone']}
                        fieldKey={[fieldKey, 'telphone']}
                        label="??????"
                        style={{ width: '245px' }}
                      >
                        <Input style={{ width: '145px' }}></Input>
                      </Form.Item>
                    </ProForm.Group>

                    <Form.Item name={[name, 'email']} fieldKey={[fieldKey, 'email']} label="??????">
                      <Input style={{ width: '224px' }}></Input>
                    </Form.Item>

                    <Form.Item name={[name, 'remark']} fieldKey={[fieldKey, 'remark']} label="??????">
                      <TextArea style={{ width: '422px' }}></TextArea>
                    </Form.Item>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  ???????????????
                </Button>
              </>
            )}
          </Form.List>
        </ProForm>
      </div>
      <div className={styles['team-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>??????????????????</div>
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
              return null;
            },
          }}
        >
          <Form.Item name="user" label="???????????????">
            <UserSearch filedProps={{ allowClear: true, style: { width: '422px' } }}> </UserSearch>
          </Form.Item>
          <Form.Item name="userYes" label="???????????????">
            <UserSearch
              filedProps={{ mode: 'multiple', allowClear: true, style: { width: '422px' } }}
            >
              {' '}
            </UserSearch>
          </Form.Item>

          <Form.Item name="userNo" label="???????????????">
            <UserSearch
              filedProps={{ mode: 'multiple', allowClear: true, style: { width: '422px' } }}
            >
              {' '}
            </UserSearch>
          </Form.Item>
        </ProForm>
      </div>
      <div className={styles['team-container']}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles['page-title']}>????????????????????????</div>
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
              return null;
            },
          }}
        >
          <Form.Item
            name="outName"
            label="????????????"
            rules={[
              {
                required: true,
                message: '??????',
              },
            ]}
          >
            <Input style={{ width: '422px' }}></Input>
          </Form.Item>

          <Form.Item name="introduce" label="????????????">
            <TextArea style={{ width: '422px' }}></TextArea>
          </Form.Item>
        </ProForm>
        <Button type="primary" onClick={onSubmit}>
          ??????
        </Button>
      </div>
    </PageContainer>
  );
};

export default Add;
