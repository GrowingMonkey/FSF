import { useEffect, useState } from "react";
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
    Cascader,
    Space,
    Tag,
    Table,
    Descriptions,
    Popconfirm,
} from "antd";
import { CloseOutlined, LoadingOutlined, EditOutlined } from "@ant-design/icons";

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
import { talentJoinProject, selectTCList, addTalentC } from "@/services/talent";
import ModalCompany from "./ModalCompany";
import styles from "./TalentDetail.less";
import stylesR from './index.less';
import ProjectSearch from "@/components/ProjectSearch";
import { useLocation, history, useRequest } from "umi";
import ProForm, {
    ProFormRadio, ProFormTextArea,
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

const ArticleListContent = ({ data: { content, updatedAt, userName, updateTime, avatar, owner, href } }) => (
    <div className={stylesR.listContent}>
        <div className={stylesR.description}>{content}</div>
        <div className={stylesR.extra}>
            <a href={href}>{userName}</a> ??? <a href={href}>{href}</a>
            <em>{updateTime}</em>??????
    </div>
    </div>
);
let pageNo = 1;
const TalentDetail = () => {

    const { query: { talentId } } = useLocation();
    const { data, reload, run, loading, loadMore, loadingMore } = useRequest(
        (values) => {
            return selectTCList({
                pageNo: pageNo,
                pageSize: 10,
                talentId: talentId,
                ...values
            });
        },
        {
            loadMore: true,
        },
    );
    // const [record, setRecord] = useState(null);
    const [detail, setDetail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [showBuy, setShowBuy] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);
    const [projectVisible, setProjectVisible] = useState(false);
    const [companyVisible, setCompanyVisible] = useState(false);
    const genderTypes = ["??????", "???", "???"];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRecordModalVisible, setIsRecordModalVisible] = useState(false);
    const workStateTypes = ["???????????? ", "?????????", "??????"];
    const isAllTimeTypes = ["???", "???"];
    useEffect(() => {
        selectTalentById({ talentId: talentId }).then(res => {
            const { data } = res;
            // setRecord(data);
            setDetail(data);
            setPhone(data?.phone || '????????????');
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
        str += ' ??? '
        if (item.isNow) {
            str += '??????'
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
            message.info(res?.message || '????????????');
        })
        setIsModalVisible(false)
    }
    const onRecordFinish = (values) => {
        const { location: { query } } = history;
        addTalentC({ talentId: query.talentId, ...values, talentName: detail.name }).then(res => {
            message.info(res?.message || '????????????');
            setIsRecordModalVisible(false);
        })
        run({ pageNo: 1 });
    }
    const formatAddress = (addressCode) => {
        let addressArrays = []
        if (addressCode) {
            addressArrays = addressCode.split('/')
        }
        return addressArrays;
    }
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
                        <LoadingOutlined /> ?????????...
                    </span>
                ) : (
                        '????????????'
                    )}
            </Button>
        </div>
    );
    const formatStr = (it) => {
        console.log(it);
        let str = '';
        switch (+it) {
            case 0:
                str = '?????????';
                break;
            case 1:
                str = '????????????';
                break
            case 2:
                str = '????????????';
                break
            case 3:
                str = '????????????';
                break
            case 4:
                str = '????????????';
                break
            case 5:
                str = '????????????';
                break
            case 6:
                str = '????????????';
                break
            case 7:
                str = '????????????';
                break;

        }
        return str
    }
    const formatEducation = (value) => {
        let str = '';
        switch (+value) {
            case 0:
                str = '??????';
                break;
            case 1:
                str = '????????????';
                break;
            case 2:
                str = '????????????';
                break;
            case 3:
                str = '????????????';
                break;
            case 4:
                str = '????????????';
                break;
            case 5:
                str = '????????????';
                break;
            case 6:
                str = '????????????';
                break;
            case 7:
                str = '???????????????';
                break;
            default:
                str = value;
        }
        return str;
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
                        <Col span={16}>
                            <div className={styles["basic-container"]}>
                                <div className={styles["page-title"]}>???????????? <Button type="primary" size="small" style={{ marginLeft: '18px' }} onClick={() => setIsModalVisible(true)}>????????????</Button><EditOutlined style={{ float: 'right' }}></EditOutlined></div>
                                <Divider></Divider>
                                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={2}>
                                    <Descriptions.Item label="??????">
                                        <Space>
                                            <span>{phone}</span>
                                            {showBuy ? (
                                                <Popconfirm
                                                    placement="topLeft"
                                                    title="?????????????????????????"
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
                                                        ??????????????????
                          </span>
                                                </Popconfirm>
                                            ) : null}
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="??????">
                                        {detail.email}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className={styles["project-container"]} style={{ position: 'relative' }}>
                                <div className={styles["page-title"]}>????????????<span style={{ paddingLeft: '24px', fontSize: '14px', color: '#1890ff' }}>????????????#???{talentId}</span></div>
                                <Divider></Divider>
                                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={2}>
                                    <Descriptions.Item label="??????">
                                        {detail.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="??????">
                                        {formatEducation(detail.education)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="??????">
                                        {detail.age}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="??????">
                                        {genderTypes[detail.gender]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.experience}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.birthday}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.salary}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.domicile}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="?????????">
                                        {detail.location}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="????????????">
                                        {workStateTypes[detail.workSate]}
                                    </Descriptions.Item>
                                    <div style={{ position: 'absolute', top: 95, right: 28, width: '100px', height: '100px', borderRadius: '5px', background: '#ddd' }}>{detail.headUrl ? <PlusOutlined /> : <img src={detail.headUrl} />}</div>
                                </Descriptions>
                                <Descriptions labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }}>
                                    <Descriptions.Item label="????????????">
                                        {detail.introduce}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className={styles["project-container"]}>
                                <div className={styles["page-title"]}>????????????</div>
                                <Divider></Divider>
                                <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                                    <Descriptions.Item label="????????????">
                                        {findAreaText(formatAddress(detail.rcity))}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {`${detail.rindustry ? detail.rindustry : ''}` + `${detail?.rindustryChild ? '/' + detail?.rindustryChild : ''}`}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.job || detail.rjob}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="????????????">
                                        {detail.rsalary || detail.salary}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className={styles["project-container"]}>
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <div className={styles["page-title"]}>????????????</div>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <Button
                                                onClick={() => {
                                                    setCompanyVisible(true);
                                                }}
                                            >
                                                ??????
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
                                                    title="?????????????"
                                                    onConfirm={() => {
                                                        deleteCompany(item.id);
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="text">??????</Button>
                                                </Popconfirm>
                                            </Divider>
                                            <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                                                <Descriptions.Item label="????????????">
                                                    {formatDateStr(item)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.name}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.job}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.industry} {item.industryChild}
                                                </Descriptions.Item>

                                                <Descriptions.Item label="????????????" style={{ whiteSpace: 'pre-line' }}>
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
                                        <div className={styles["page-title"]}>????????????</div>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <Button
                                                onClick={() => {
                                                    setProjectVisible(true);
                                                }}
                                            >
                                                ??????
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
                                                    title="?????????????"
                                                    onConfirm={() => {
                                                        deleteProject(item.id);
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="text">??????</Button>
                                                </Popconfirm>
                                            </Divider>
                                            <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                                                <Descriptions.Item label="????????????">
                                                    {formatDateStr(item)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.name}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.job}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????" style={{ whiteSpace: 'pre-line' }}>
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
                                        <div className={styles["page-title"]}>????????????</div>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <Button
                                                onClick={() => {
                                                    setEducationVisible(true);
                                                }}
                                            >
                                                ??????
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
                                                    title="?????????????"
                                                    onConfirm={() => {
                                                        deleteEducation(item.id);
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="text">??????</Button>
                                                </Popconfirm>
                                            </Divider>
                                            <Descriptions middle='sm' labelStyle={{ width: '95.33px', display: 'flex', fontWeight: 'bold', justifyContent: 'flex-start' }} column={1}>
                                                <Descriptions.Item label="????????????">
                                                    {formatDateStr(item)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.name}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {item.classes}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="????????????">
                                                    {isAllTimeTypes[item.isAllTime]}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                    );
                                })}
                            </div>


                        </Col>
                        <Col span={8}>
                            <div className={styles["basic-container"]}>
                                <div className={styles["page-title"]}>????????????<Button type="primary" size="small" style={{ marginLeft: '18px', float: 'right' }} onClick={() => setIsRecordModalVisible(true)}>????????????</Button></div>
                                <List
                                    size="large"
                                    loading={loading}
                                    style={{ width: '100%' }}
                                    rowKey="id"
                                    itemLayout="vertical"
                                    loadMore={loadMoreDom}
                                    dataSource={data?.list || []}
                                    renderItem={(item) => (
                                        <List.Item
                                            style={{ width: '100%' }}
                                            key={item.id}
                                        >
                                            <List.Item.Meta
                                                style={{ width: '100%' }}
                                                title={
                                                    <a className={styles.listItemMetaTitle}>

                                                    </a>
                                                }
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
                    <Modal title="????????????" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
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
                            <Form.Item name={'customer'} label={"????????????"} >
                                <ProjectSearch />
                            </Form.Item>

                        </ProForm>
                    </Modal>
                    <Modal title="????????????" visible={isRecordModalVisible} footer={null} onCancel={() => setIsRecordModalVisible(false)}>
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
                                label="????????????"
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
                                        label: '????????????',
                                        value: 2,
                                    },
                                    {
                                        label: '????????????',
                                        value: 3,
                                    },
                                    {
                                        label: '????????????',
                                        value: 4,
                                    },
                                    {
                                        label: '????????????',
                                        value: 5,
                                    },
                                    {
                                        label: '????????????',
                                        value: 6,
                                    },
                                    {
                                        label: '????????????',
                                        value: 7,
                                    },
                                ]}
                            />

                            <ProFormTextArea name="content" label="????????????" />
                        </ProForm>
                    </Modal>

                    <div style={{ width: "100%", minHeight: "15px" }}></div>
                </>
            )}
        </div>
    );
};

export default TalentDetail;
