import { useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  List,
  Modal,
  Select,
  Divider,
  Pagination,
  message,
  Typography,
  Cascader,
  Space,
  Tag,
  Table,
  Descriptions,
  Popconfirm,
} from 'antd';
const { Paragraph, Text } = Typography;
import { CloseOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';

import {
  selectTalentById,
  talentProjectList,
  delEDU,
  delEC,
  delEP,
  checkTalentPhone,
} from '../../../../services/talent';
import { industryList } from '@/utils/Industry';
import { cityList } from '@/utils/CityList';
import ModalEducation from './ModalEducation';
import ModalProject from './ModalProject';
import {
  talentJoinProject,
  selectTCList,
  addTalentC,
  talentCheck,
  updateTalent,
} from '@/services/talent';
import ModalCompany from './ModalCompany';
import styles from './TalentDetail.less';
import stylesR from './index.less';
import ProjectSearch from '@/components/ProjectSearch';
import { useLocation, history, useRequest, Link } from 'umi';
import ProForm, {
  ProFormRadio,
  ProFormTextArea,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const findAreaText = (location) => {
  console.log(location, cityList);
  let result = [];
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].value === location[0] + '') {
      result.push(cityList[i].label);
    }
    for (let j = 0; j < cityList[i].children.length; j++) {
      if (cityList[i].children[j].value === location[1] + '') {
        result.push(cityList[i].children[j].label);
      }
      if (Array.isArray(cityList[i].children[j].children)) {
        for (let z = 0; z < cityList[i].children[j].children.length; z++) {
          if (cityList[i].children[j].children[z].value === location[2] + '') {
            result.push(cityList[i].children[j].children[z].label);
          }
        }
      }
    }
  }
  return result;
};

const ArticleListContent = ({
  data: { content, updatedAt, userName, updateTime, avatar, owner, href },
}) => (
    <div className={stylesR.listContent}>
      <div className={stylesR.description}>{content}</div>
      <div className={stylesR.extra}>
        <a href={href}>{userName}</a> 在 <a href={href}>{href}</a>
        <em>{updateTime}</em>创建
    </div>
    </div>
  );
let pageNo = 1;
const TalentDetail = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const {
    query: { talentId },
  } = useLocation();
  const { data, reload, run, loading, loadMore, loadingMore } = useRequest(
    (values) => {
      return selectTCList({
        pageNo: pageNo,
        pageSize: 10,
        talentId: talentId,
        ...values,
      });
    },
    {
      loadMore: true,
    },
  );
  const [contactForm, basicForm] = Form.useForm();
  const [detailProject, setDetailProject] = useState(null);

  const [EducationData, setEducationData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const [ellipsis, setEllipsis] = useState(true);
  const [phone, setPhone] = useState(null);
  const [showBuy, setShowBuy] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [projectVisible, setProjectVisible] = useState(false);
  const [companyVisible, setCompanyVisible] = useState(false);
  const genderTypes = ['未知', '男', '女'];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecordModalVisible, setIsRecordModalVisible] = useState(false);
  const workStateTypes = ['当前在职 ', '已离职', '失业'];
  const isAllTimeTypes = ['统招', '非统招'];
  useEffect(() => {
    selectTalentById({ talentId: talentId }).then((res) => {
      const { data } = res;
      // setRecord(data);
      console.log(data);
      if (data) {
        setDetail(data);
        setImageUrl(data?.headUrl || '');
        setPhone(data?.phone || '暂无号码');
        setShowBuy(data?.phone?.split('')?.indexOf('*') !== -1);
      }
    });
    talentProjectList({ talentId: talentId }).then(res => {
      const { data } = res;
      // setRecord(data);
      console.log(data);
      setDetailProject(data);
    })
  }, [talentId, isRefresh]);
  const onSubmit = () => {
    // if (record) {
    debugger;
    // console.log(record.name);
    selectTalentById({ talentId: talentId }).then((res) => {
      const { data } = res;
      // console.log(data);
      setDetail(data);
      setPhone(data.phone);
      setEducationVisible(false);
      setProjectVisible(false);
      setCompanyVisible(false);
    });
    // }
  };
  const onCancel = () => {
    setEducationVisible(false);
    setProjectVisible(false);
    setCompanyVisible(false);
  };
  const queryPhone = () => {
    checkTalentPhone({ talentId: talentId }).then((res) => {
      const { data } = res;
      setPhone(data);
      setShowBuy(data.split('').indexOf('*') !== -1);
    });
  };
  const deleteEducation = (id) => {
    delEDU({ talentId: talentId, id: id }).then(() => {
      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        dataa && setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split('').indexOf('*') !== -1);
      });
    });
  };
  const deleteProject = (id) => {
    delEP({ talentId: talentId, id: id }).then(() => {
      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        data && setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split('').indexOf('*') !== -1);
      });
    });
  };
  const deleteCompany = (id) => {
    delEC({ talentId: talentId, id: id }).then(() => {
      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split('').indexOf('*') !== -1);
      });
    });
  };
  const formatDateStr = (item) => {
    let str = '';

    if (item.startTime) {
      str += item.startTime.split(' ')[0];
    }
    str += ' 至 ';
    if (item.isNow) {
      str += '至今';
    } else if (item.endTime) {
      str += item.endTime.split(' ')[0];
    }
    return str;
  };
  const onFinish = (values) => {
    const {
      location: { query },
    } = history;
    console.log(values);
    // run(values);
    talentJoinProject({ projectId: values.customer.projectId, talentId: query.talentId }).then(
      (res) => {
        message.info(res?.message || '加入成功');
      },
    );
    setIsModalVisible(false);
  };
  const onRecordFinish = (values) => {
    const {
      location: { query },
    } = history;
    addTalentC({ talentId: query.talentId, ...values, talentName: detail.name }).then((res) => {
      message.info(res?.message || '加入成功');
      setIsRecordModalVisible(false);
    });
    // run({ pageNo: 1 });
    setTimeout(() => {
      run({ pageNo: 1 });
    }, 500);
  };
  const formatAddress = (addressCode) => {
    let addressArrays = [];
    if (addressCode) {
      addressArrays = addressCode.split('/');
    }
    return addressArrays;
  };
  const loadMoreDom = data?.list.length > 0 && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      <Button
        onClick={() => {
          pageNo = pageNo + 1;
          loadMore();
        }}
        style={{
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
            '加载更多'
          )}
      </Button>
    </div>
  );
  const formatStr = (it) => {
    console.log(it);
    let str = '';
    switch (+it) {
      case 0:
        str = '加入项目';
        break;
      case 1:
        str = '推给客户';
        break;
      case 2:
        str = '';
        break;
      case 3:
        str = '';
        break;
      case 4:
        str = '人选放弃';
        break;
      case 5:
        str = '预约面试';
        break;
      case 6:
        str = '客户面试';
        break;
      case 8:
        str = '确认Offer';
        break;
      case 9:
        str = '成功入职';
        break;
      case 10:
        str = '人选离职';
        break;
      case 21:
        str = '未接听';
        break;
      case 22:
        str = '考虑职位';
        break;
      case 23:
        str = ' 不想变动';
        break;
      case 31:
        str = '无合适岗位';
        break;
      case 99:
        str = ' 其他';
        break;
    }
    return str;
  };
  const formatEducation = (value) => {
    let str = '';
    switch (+value) {
      case 0:
        str = '不限';
        break;
      case 1:
        str = '初中以上';
        break;
      case 2:
        str = '中专以上';
        break;
      case 3:
        str = '高中以上';
        break;
      case 4:
        str = '大专以上';
        break;
      case 5:
        str = '本科以上';
        break;
      case 6:
        str = '硕士以上';
        break;
      case 7:
        str = '博士及以上';
        break;
      default:
        str = value;
    }
    return str;
  };
  const cnkiPhoneAndEmail = (value) => {
    console.log(value);
    //检查手机号或邮箱是否重复
    if (value.phone && value.phone.length == 11) {
      talentCheck(value).then((res) => {
        if (res.data == 1) {
          message.error('该号码已经被注册');
        }
      });
    } else if (value.email && value.email.indexOf('@') > -1) {
      talentCheck(value).then((res) => {
        if (res.data == 1) {
          message.error('该邮箱已经被注册');
        }
      });
    }
  };
  const updateData = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  };
  const basicModalOk = (value) => {
    console.log(value);
    const {
      location: { query },
    } = history;
    updateTalent({ ...value, talentId: query.talentId }).then((res) => {
      message.info(res?.message || '修改失败');
      updateData();
      setBasicModalVisible(false);
      setContactModalVisible(false);
    });
  };

  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className={styles['talent-detail']}>
      <ModalEducation
        visible={educationVisible}
        onSubmit={onSubmit}
        data={EducationData}
        onCancel={onCancel}
        talentId={talentId}
      ></ModalEducation>
      <ModalProject
        visible={projectVisible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        data={projectData}
        talentId={talentId}
      ></ModalProject>
      <ModalCompany
        visible={companyVisible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        data={companyData}
        talentId={talentId}
      ></ModalCompany>
      {detail && (
        <>
          <Row gutter={16}>
            <Col span={16}>
              <div className={styles['basic-container']}>
                <div className={styles['page-title']}>
                  联系方式
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: '18px' }}
                    onClick={() => setIsModalVisible(true)}
                  >
                    加入项目
                  </Button>
                  <EditOutlined
                    style={{ float: 'right' }}
                    onClick={() => setContactModalVisible(true)}
                  ></EditOutlined>
                  <span style={{ marginLeft: '25%', fontSize: '14px', color: '#1890ff' }}>
                    录入人:{detail.userName == 0 ? '系统录入' : detail.userName}
                  </span>
                </div>
                <Divider></Divider>
                <Descriptions
                  middle="sm"
                  labelStyle={{
                    width: '95.33px',
                    display: 'flex',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                  }}
                  column={2}
                >
                  <Descriptions.Item label="电话">
                    <Space>
                      <span>{phone}</span>
                      {showBuy ? (
                        <Popconfirm
                          placement="topLeft"
                          title="确认使用额度查看?"
                          onConfirm={() => {
                            queryPhone();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span
                            style={{
                              paddingLeft: '10px',
                              color: '#1181f8',
                              cursor: 'pointer',
                            }}
                          >
                            使用额度查看
                          </span>
                        </Popconfirm>
                      ) : null}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">{detail.email}</Descriptions.Item>
                </Descriptions>
                <Modal
                  title="联系方式"
                  visible={contactModalVisible}
                  footer={null}
                  onCancel={() => setContactModalVisible(false)}
                >
                  <ProForm
                    onFinish={basicModalOk}
                    form={contactForm}
                    initialValues={{ phone: detail.phone, email: detail.email }}
                    onValuesChange={(changeValues) => cnkiPhoneAndEmail(changeValues)}
                    layout="horizontal"
                  >
                    <ProForm.Group>
                      <ProFormText
                        rules={[
                          {
                            required: true,
                            message: '请输入手机号',
                          },
                        ]}
                        width="sm"
                        name="phone"
                        label="手机号码"
                      />
                      <ProFormText width="sm" name="email" label="邮箱地址" />
                    </ProForm.Group>
                  </ProForm>
                </Modal>
              </div>
              <div className={styles['project-container']} style={{ position: 'relative' }}>
                <div className={styles['page-title']}>
                  基本信息
                  <span style={{ paddingLeft: '24px', fontSize: '14px', color: '#1890ff' }}>
                    简历编号#：{talentId}
                  </span>
                  <EditOutlined
                    style={{ float: 'right' }}
                    onClick={() => setBasicModalVisible(true)}
                  ></EditOutlined>
                  <Link
                    style={{ marginLeft: 40 }}
                    target="_blank"
                    to={'/wordpage/?talentId=' + talentId}
                  >
                    生成简历报告
                  </Link>
                </div>
                <Divider></Divider>
                <Descriptions
                  middle="sm"
                  labelStyle={{
                    width: '95.33px',
                    display: 'flex',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                  }}
                  column={3}
                >
                  <Descriptions.Item label="姓名" style={{ paddingBottom: 0 }}>
                    {detail.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="学历" style={{ paddingBottom: 0 }}>
                    {formatEducation(detail.education)}
                  </Descriptions.Item>
                  <Descriptions.Item label="年龄" style={{ paddingBottom: 0 }}>
                    {detail.age}
                  </Descriptions.Item>
                  <Descriptions.Item label="性别" style={{ paddingBottom: 0 }}>
                    {genderTypes[detail.gender]}
                  </Descriptions.Item>
                  <Descriptions.Item label="工作经验" style={{ paddingBottom: 0 }}>
                    {detail.experience}
                  </Descriptions.Item>
                  <Descriptions.Item label="出生日期" style={{ paddingBottom: 0 }}>
                    {detail.birthday}
                  </Descriptions.Item>
                  <Descriptions.Item label="目前年薪" style={{ paddingBottom: 0 }}>
                    {detail.salary}
                  </Descriptions.Item>
                  <Descriptions.Item label="户籍地址" style={{ paddingBottom: 0 }}>
                    {detail.domicile}
                  </Descriptions.Item>

                  <Descriptions.Item label="现居地" style={{ paddingBottom: 0 }}>
                    {detail.location}
                  </Descriptions.Item>

                  <Descriptions.Item label="工作状态" style={{ paddingBottom: 0 }}>
                    {workStateTypes[detail.workSate]}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望地点" style={{ paddingBottom: 0 }}>
                    {findAreaText(formatAddress(detail.rcity))}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望行业" style={{ paddingBottom: 0 }}>
                    {`${detail.rindustry ? detail.rindustry : ''}` +
                      `${detail?.rindustryChild ? '/' + detail?.rindustryChild : ''}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望岗位" style={{ paddingBottom: 0 }}>
                    {detail.job || detail.rjob}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望薪资" style={{ paddingBottom: 0 }}>
                    {detail.rsalary || detail.salary}
                  </Descriptions.Item>
                  {/* <div style={{ position: 'absolute', top: 95, right: 28, width: '100px', height: '100px', borderRadius: '5px', background: '#ddd' }}>{detail.headUrl ? <PlusOutlined /> : <img src={detail.headUrl} />}</div> */}
                </Descriptions>
                <Descriptions
                  labelStyle={{
                    width: '95.33px',
                    display: 'flex',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Descriptions.Item label="个人介绍">{detail.introduce}</Descriptions.Item>
                </Descriptions>
                <Descriptions
                  labelStyle={{
                    width: '95.33px',
                    display: 'flex',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Descriptions.Item label="已加项目">{detailProject && detailProject.length > 0 ? detailProject.map(da => <Link to={{
                    pathname: '/project/p-detail/detail',
                    search: '?projectId=' + da.projectId + '&customerId=' + data.customerId + '&id=994',
                  }} target="_blank">{da.customerName + '-' + da.projectName}</Link>) : '暂无'}
                  </Descriptions.Item>
                </Descriptions>
                <Modal
                  width={680}
                  title="基本信息"
                  visible={basicModalVisible}
                  footer={null}
                  onCancel={() => setBasicModalVisible(false)}
                >
                  <ProForm
                    onFinish={basicModalOk}
                    form={basicForm}
                    initialValues={{
                      name: detail.name,
                      education: detail.education,
                      age: detail.age,
                      gender: '' + detail.gender,
                      birthday: detail.birthday,
                      experience: detail.experience,
                      salary: detail.salary,
                      domicile: detail.domicile,
                      location: detail.location,
                      workState: detail.workState,
                      introduce: detail.introduce,
                      headUrl: detail.headUrl,
                    }}
                    layout="horizontal"
                  >
                    <ProForm.Group>
                      <ProFormText
                        fieldProps={
                          {
                            // ...formItemLayout,
                          }
                        }
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入人选姓名',
                          },
                        ]}
                        name="name"
                        label="人选姓名"
                      />
                      <ProFormSelect
                        width="sm"
                        name="education"
                        label="最高学历"
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
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        fieldProps={
                          {
                            // ...formItemLayout,
                          }
                        }
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入人选年龄',
                          },
                        ]}
                        name="age"
                        label="人选年龄"
                      />
                      <ProFormRadio.Group
                        label="人选性别"
                        name="gender"
                        labelCol={{
                          style: { textAlign: 'left' },
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
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormDatePicker
                        format={'YYYY-MM-DD'}
                        label="出生日期"
                        width="sm"
                        help="" //备注
                        name="birthday"
                      />
                      <ProFormSelect
                        width="sm"
                        name="experience"
                        label="工作经验"
                        options={[
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
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        label="目前年薪"
                        help="" //备注
                        fieldProps={{
                          prefix: '￥',
                          suffix: '万元',
                        }}
                        width="sm"
                        name="salary"
                      />
                      <ProFormText
                        label="户籍地址"
                        help="" //备注
                        width="sm"
                        name="domicile"
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        label="现居地址"
                        help="" //备注
                        width="sm"
                        name="location"
                      />
                      <ProFormSelect
                        width="sm"
                        name="workState"
                        label="工作状态"
                        options={[
                          { label: '当前在职', value: 0 },
                          { label: '已离职', value: 1 },
                          { label: '失业', value: 2 },
                        ]}
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormTextArea width="sm" name="introduce" label="人选备注" />
                      <ProFormUploadButton
                        icon={null}
                        fieldProps={{
                          listType: 'picture-card',
                          className: 'avatar-uploader',
                          showUploadList: false,
                          customRequest: async (options) => {
                            let result = await upload(options.file, () => { });
                            console.log(result.res.requestUrls[0]);
                            basicForm.setFieldsValue({ headUrl: [result.name] });
                            setImageUrl(
                              result.res.requestUrls[0].split('?')[0] +
                              '?x-oss-process=image/resize,w_100,h_100/quality,q_50',
                            );
                            options.onSuccess(result.res.requestUrls[0], result.res.requestUrls[0]);
                          },
                        }}
                        name="headUrl"
                        label="人选头像"
                        title={
                          imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                          ) : (
                              uploadButton
                            )
                        }
                      />
                    </ProForm.Group>
                  </ProForm>
                </Modal>
              </div>
              {/* <div className={styles["project-container"]}>
                <div className={styles["page-title"]}>求职意向</div>
                <Divider></Divider>
                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                  <Descriptions.Item label="期望地点" style={{ paddingBottom: 0 }}>
                    {findAreaText(formatAddress(detail.rcity))}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望行业" style={{ paddingBottom: 0 }}>
                    {`${detail.rindustry ? detail.rindustry : ''}` + `${detail?.rindustryChild ? '/' + detail?.rindustryChild : ''}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望岗位" style={{ paddingBottom: 0 }}>
                    {detail.job || detail.rjob}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望薪资" style={{ paddingBottom: 0 }}>
                    {detail.rsalary || detail.salary}
                  </Descriptions.Item>
                </Descriptions>
              </div> */}
              <div className={styles['project-container']}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles['page-title']}>工作经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setCompanyVisible(true);
                          setCompanyData(null);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail?.experienceCompanies?.length > 0 ? null : <Divider></Divider>}
                {detail?.experienceCompanies?.map((item) => {
                  return (
                    <div key={item.id}>
                      <Divider orientation="right">
                        <Popconfirm
                          placement="topLeft"
                          title="确认删除?"
                          onConfirm={() => {
                            deleteCompany(item.id);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="text">删除</Button>
                        </Popconfirm>
                        <Button
                          type="link"
                          onClick={() => {
                            setCompanyData(item);
                            setCompanyVisible(true);
                          }}
                        >
                          修改
                        </Button>
                      </Divider>
                      <h3>
                        {' '}
                        <span style={{ color: '#03A9F4' }}>{formatDateStr(item)}</span>·{item.name}·{' '}
                        {item.job} · {item.industry}
                        {item.industryChild}
                      </h3>
                      <Descriptions
                        middle="sm"
                        labelStyle={{
                          width: '95.33px',
                          display: 'flex',
                          fontWeight: 'bold',
                          justifyContent: 'flex-start',
                        }}
                        column={1}
                      >
                        {/* <Descriptions.Item label="工作时间">
                          {formatDateStr(item)}
                        </Descriptions.Item>
                        <Descriptions.Item label="所在公司">
                          {item.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="工作岗位">
                          {item.job}
                        </Descriptions.Item>
                        <Descriptions.Item label="所在行业">
                          {item.industry} {item.industryChild}
                        </Descriptions.Item> */}

                        <Descriptions.Item label="工作职责" style={{ whiteSpace: 'pre-line' }}>
                          <Paragraph
                            ellipsis={
                              ellipsis
                                ? {
                                  rows: 4,
                                  expandable: true,
                                  symbol: '加载更多',
                                }
                                : false
                            }
                          >
                            {' '}
                            {()=>item?.duty?.replace(/\n/g,'<br>')}
                          </Paragraph>
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  );
                })}
              </div>
              <Modal footer={null}></Modal>
              <div className={styles['company-container']}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles['page-title']}>项目经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setProjectVisible(true);
                          setProjectData(null);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail?.experienceProjects?.length > 0 ? null : <Divider></Divider>}
                {detail?.experienceProjects?.map((item) => {
                  return (
                    <div key={item.id}>
                      <Divider orientation="right">
                        <Popconfirm
                          placement="topLeft"
                          title="确认删除?"
                          onConfirm={() => {
                            deleteProject(item.id);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="text">删除</Button>
                        </Popconfirm>
                        <Button
                          type="link"
                          onClick={() => {
                            setProjectData(item);
                            setProjectVisible(true);
                          }}
                        >
                          修改
                        </Button>
                      </Divider>
                      <h3>
                        <span style={{ color: '#03A9F4' }}>{formatDateStr(item)}</span>· {item.name}
                        ·{item.job}
                      </h3>
                      <Descriptions
                        middle="sm"
                        labelStyle={{
                          width: '95.33px',
                          display: 'flex',
                          fontWeight: 'bold',
                          justifyContent: 'flex-start',
                        }}
                        column={1}
                      >
                        {/* <Descriptions.Item label="项目时间">
                          {formatDateStr(item)}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目名称">
                          {item.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目职务">
                          {item.job}
                        </Descriptions.Item> */}
                        <Descriptions.Item label="项目职责" style={{ whiteSpace: 'pre-line' }}>
                          <Paragraph
                            ellipsis={
                              ellipsis
                                ? {
                                  rows: 4,
                                  expandable: true,
                                  symbol: '加载更多',
                                }
                                : false
                            }
                          >
                            {' '}
                            {item.duty}{' '}
                          </Paragraph>
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  );
                })}
              </div>
              <div className={styles['education-container']}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles['page-title']}>教育经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setEducationVisible(true);
                          setEducationData(null);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail?.experienceEdus?.length > 0 ? null : <Divider></Divider>}
                {detail?.experienceEdus?.map((item) => {
                  return (
                    <div key={item.id}>
                      <Divider orientation="right">
                        <Popconfirm
                          placement="topLeft"
                          title="确认删除?"
                          onConfirm={() => {
                            deleteEducation(item.id);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="text">删除</Button>
                        </Popconfirm>
                        <Button
                          type="link"
                          onClick={() => {
                            setEducationData(item);
                            setEducationVisible(true);
                          }}
                        >
                          修改
                        </Button>
                      </Divider>
                      {/* <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                        <Descriptions.Item label="学习时间">
                          {formatDateStr(item)}
                        </Descriptions.Item>
                        <Descriptions.Item label="毕业院校">
                          {item.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="所读专业">
                          {item.classes}
                        </Descriptions.Item>
                        <Descriptions.Item label="是否统招">
                          {isAllTimeTypes[item.isAllTime]}
                        </Descriptions.Item>
                      </Descriptions> */}
                      <h3>
                        <span style={{ color: '#03A9F4' }}>{formatDateStr(item)}</span>—{item.name}{' '}
                        · {item.classes}·{item.education}({isAllTimeTypes[item.isAllTime]})
                      </h3>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col span={8}>
              <div className={styles['basic-container']}>
                <div className={styles['page-title']}>
                  沟通记录
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: '18px', float: 'right' }}
                    onClick={() => setIsRecordModalVisible(true)}
                  >
                    新增沟通
                  </Button>
                </div>
                <List
                  size="large"
                  loading={loading}
                  style={{ width: '100%' }}
                  rowKey="id"
                  itemLayout="vertical"
                  loadMore={loadMoreDom}
                  dataSource={data?.list || []}
                  renderItem={(item) => (
                    <List.Item style={{ width: '100%' }} key={item.id}>
                      <List.Item.Meta
                        style={{ width: '100%' }}
                        title={<a className={styles.listItemMetaTitle}></a>}
                        description={
                          <span>
                            <Tag>{formatStr(item.state)}</Tag>
                          </span>
                        }
                      />

                      <ArticleListContent data={item} />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
          <Modal
            title="加入项目"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
          >
            <ProForm
              hideRequiredMark
              style={{
                margin: 'auto',
                marginTop: 8,
                maxWidth: 600,
              }}
              name="basic"
              layout="horizontal"
              initialValues={{
                public: '1',
              }}
              onFinish={onFinish}
            >
              <Form.Item name={'customer'} label={'选择职位'}>
                <ProjectSearch />
              </Form.Item>
            </ProForm>
          </Modal>
          <Modal
            title="新增沟通"
            visible={isRecordModalVisible}
            maskClosable={false}
            footer={null}
            onCancel={() => setIsRecordModalVisible(false)}
          >
            <ProForm
              hideRequiredMark
              style={{
                margin: 'auto',
                marginTop: 8,
                maxWidth: 600,
              }}
              name="basic"
              layout="horizontal"
              initialValues={{
                public: '1',
              }}
              onFinish={onRecordFinish}
            >
              <ProFormRadio.Group
                name="state"
                label="沟通类型"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                options={[
                  {
                    label: '未接听',
                    value: 21,
                  },
                  {
                    label: '考虑职位',
                    value: 22,
                  },
                  // {
                  //   label: '推给客户',
                  //   value: 1,
                  // },
                  // {
                  //   label: '加入项目',
                  //   value: 0,
                  // },
                  // {
                  //   label: '成功入职',
                  //   value: 9,
                  // },
                  // {
                  //   label: '人选离职',
                  //   value: 10,
                  // },
                  // {
                  //   label: '预约面试',
                  //   value: 5,
                  // },
                  // {
                  //   label: '客户面试',
                  //   value: 6,
                  // },
                  // {
                  //   label: '人选放弃',
                  //   value: 4,
                  // },
                  // {
                  //   label: '确认Offer',
                  //   value: 8,
                  // },
                  {
                    label: '不想变动',
                    value: 23,
                  },
                  {
                    label: '无合适岗位',
                    value: 31,
                  },
                  {
                    label: '其他',
                    value: 99,
                  },
                  // {
                  //   label: '顾问否决',
                  //   value: 7,
                  // },
                ]}
              />

              <ProFormTextArea name="content" label="沟通内容" />
            </ProForm>
          </Modal>

          <div style={{ width: '100%', minHeight: '15px' }}></div>
        </>
      )}
    </div>
  );
};

export default TalentDetail;
