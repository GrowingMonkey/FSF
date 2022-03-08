import { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Select,
  Divider,
  Pagination,
  message,
  Cascader,
  Space,
  Table,
  Descriptions,
  Popconfirm,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  selectTalentById,
  delEDU,
  delEC,
  delEP,
  checkTalentPhone,
} from "../../../../services/talent";
import { industryList } from "@/utils/Industry";
import { cityList } from "@/utils/CityList";
import ModalEducation from "./ModalEducation";
import ModalProject from "./ModalProject";
import { talentJoinProject } from "@/services/talent";
import ModalCompany from "./ModalCompany";
import styles from "./TalentDetail.less";
import ProjectSearch from "@/components/ProjectSearch";
import { useLocation, history } from "umi";
import ProForm, {
  ProFormRadio,
} from '@ant-design/pro-form';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const findAreaText = (location) => {
  console.log(location, cityList)
  let result = []
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].value === location[0] + '') {
      result.push(cityList[i].label)
    }
    for (let j = 0; j < cityList[i].children.length; j++) {
      if (cityList[i].children[j].value === location[1] + '') {
        result.push(cityList[i].children[j].label)
      }
      if (Array.isArray(cityList[i].children[j].children)) {
        for (let z = 0; z < cityList[i].children[j].children.length; z++) {
          if (
            cityList[i].children[j].children[z].value ===
            location[2] + ''
          ) {
            result.push(cityList[i].children[j].children[z].label)
          }
        }
      }
    }
  }
  return result
}
const TalentDetail = () => {

  const { query: { talentId } } = useLocation();
  // const [record, setRecord] = useState(null);
  const [detail, setDetail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [showBuy, setShowBuy] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [projectVisible, setProjectVisible] = useState(false);
  const [companyVisible, setCompanyVisible] = useState(false);
  const genderTypes = ["未知", "男", "女"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const workStateTypes = ["当前在职 ", "已离职", "失业"];
  const isAllTimeTypes = ["是", "否"];
  useEffect(() => {
    selectTalentById({ talentId: talentId }).then(res => {
      const { data } = res;
      // setRecord(data);
      setDetail(data);
      setPhone(data?.phone || '暂无号码');
      setShowBuy(data?.phone?.split("")?.indexOf("*") !== -1);
    })
  }, [talentId]);
  const onSubmit = () => {
    // if (record) {
    debugger
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
      setShowBuy(data.split("").indexOf("*") !== -1);
    });
  };
  const deleteEducation = (id) => {
    delEDU({ talentId: talentId, id: id }).then(() => {
      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split("").indexOf("*") !== -1);
      });
    });
  };
  const deleteProject = (id) => {
    delEP({ talentId: talentId, id: id }).then(() => {

      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split("").indexOf("*") !== -1);
      });

    });
  };
  const deleteCompany = (id) => {
    delEC({ talentId: talentId, id: id }).then(() => {
      selectTalentById({ talentId: talentId }).then((res) => {
        const { data } = res;
        setDetail(data);
        setPhone(data.phone);
        setShowBuy(data.phone.split("").indexOf("*") !== -1);
      });
    });
  };
  const formatDateStr = (item) => {
    let str = '';

    if (item.startTime) {
      str += item.startTime.split(" ")[0];
    }
    str += ' 至 '
    if (item.isNow) {
      str += '至今'
    } else if (item.endTime) {
      str += item.endTime.split(" ")[0];
    }
    return str
  }
  const onFinish = (values) => {
    const { location: { query } } = history;
    console.log(values);
    // run(values);
    talentJoinProject({ projectId: values.customer.projectId, talentId: query.talentId }).then(res => {
      message.info(res?.message || '加入成功');
    })
    setIsModalVisible(false)
  }
  const formatAddress = (addressCode) => {
    let addressArrays = []
    if (addressCode) {
      addressArrays = addressCode.split('/')
    }
    return addressArrays;
  }
  return (
    <div className={styles["talent-detail"]}>
      <ModalEducation
        visible={educationVisible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        talentId={talentId}
      ></ModalEducation>
      <ModalProject
        visible={projectVisible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        talentId={talentId}
      ></ModalProject>
      <ModalCompany
        visible={companyVisible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        talentId={talentId}
      ></ModalCompany>
      {detail && (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <div className={styles["basic-container"]}>
                <div className={styles["page-title"]}>联系方式 <Button type="primary" size="small" style={{ marginLeft: '18px' }} onClick={() => setIsModalVisible(true)}>加入项目</Button></div>
                <Divider></Divider>
                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={2}>
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
                              paddingLeft: "10px",
                              color: "#1181f8",
                              cursor: "pointer",
                            }}
                          >
                            使用额度查看
                          </span>
                        </Popconfirm>
                      ) : null}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {detail.email}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className={styles["project-container"]} style={{ position: 'relative' }}>
                <div className={styles["page-title"]}>基本信息<span style={{ paddingLeft: '24px', fontSize: '14px', color: '#1890ff' }}>简历编号#：{talentId}</span></div>
                <Divider></Divider>
                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={2}>
                  <Descriptions.Item label="姓名">
                    {detail.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="学历">
                    {detail.education}
                  </Descriptions.Item>
                  <Descriptions.Item label="年龄">
                    {detail.age}
                  </Descriptions.Item>
                  <Descriptions.Item label="性别">
                    {genderTypes[detail.gender]}
                  </Descriptions.Item>
                  <Descriptions.Item label="工作经验">
                    {detail.experience}
                  </Descriptions.Item>
                  <Descriptions.Item label="出生日期">
                    {detail.birthday}
                  </Descriptions.Item>
                  <Descriptions.Item label="目前年薪">
                    {detail.salary}
                  </Descriptions.Item>
                  <Descriptions.Item label="户籍地址">
                    {detail.domicile}
                  </Descriptions.Item>

                  <Descriptions.Item label="现居地">
                    {detail.location}
                  </Descriptions.Item>

                  <Descriptions.Item label="工作状态">
                    {workStateTypes[detail.workSate]}
                  </Descriptions.Item>
                  <div style={{ position: 'absolute', top: 95, right: 28, width: '100px', height: '100px', borderRadius: '5px', background: '#ddd' }}>{detail.headUrl ? <PlusOutlined /> : <img src={detail.headUrl} />}</div>
                </Descriptions>
                <Descriptions labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }}>
                  <Descriptions.Item label="个人介绍">
                    {detail.introduce}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className={styles["project-container"]}>
                <div className={styles["page-title"]}>求职意向</div>
                <Divider></Divider>
                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                  <Descriptions.Item label="期望地点">
                    {findAreaText(formatAddress(detail.rcity))}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望行业">
                    {`${detail.rindustry ? detail.rindustry : ''}` + `${detail?.rindustryChild ? '/' + detail?.rindustryChild : ''}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望岗位">
                    {detail.job || detail.rjob}
                  </Descriptions.Item>
                  <Descriptions.Item label="期望薪资">
                    {detail.rsalary || detail.salary}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className={styles["project-container"]}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles["page-title"]}>工作经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setCompanyVisible(true);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail.experienceCompanies.length > 0 ? null : (
                  <Divider></Divider>
                )}
                {detail.experienceCompanies.map((item) => {
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
                      </Divider>
                      <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                        <Descriptions.Item label="工作时间">
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
                        </Descriptions.Item>

                        <Descriptions.Item label="工作职责" style={{ whiteSpace: 'pre-line' }}>
                          {item.duty}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  );
                })}
              </div>
              <div className={styles["company-container"]}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles["page-title"]}>项目经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setProjectVisible(true);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail.experienceProjects.length > 0 ? null : (
                  <Divider></Divider>
                )}
                {detail.experienceProjects.map((item) => {
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
                      </Divider>
                      <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                        <Descriptions.Item label="项目时间">
                          {formatDateStr(item)}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目名称">
                          {item.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目职务">
                          {item.job}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目职责" style={{ whiteSpace: 'pre-line' }}>
                          {item.duty}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  );
                })}
              </div>
              <div className={styles["education-container"]}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className={styles["page-title"]}>教育经历</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        onClick={() => {
                          setEducationVisible(true);
                        }}
                      >
                        添加
                      </Button>
                    </Space>
                  </Col>
                </Row>
                {detail.experienceEdus.length > 0 ? null : <Divider></Divider>}
                {detail.experienceEdus.map((item) => {
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
                      </Divider>
                      <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
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
                      </Descriptions>
                    </div>
                  );
                })}
              </div>


            </Col>
          </Row>
          <Modal title="加入项目" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
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
              <Form.Item name={'customer'} label={"选择职位"} >
                <ProjectSearch />
              </Form.Item>

            </ProForm>
          </Modal>

          <div style={{ width: "100%", minHeight: "15px" }}></div>
        </>
      )}
    </div>
  );
};

export default TalentDetail;
