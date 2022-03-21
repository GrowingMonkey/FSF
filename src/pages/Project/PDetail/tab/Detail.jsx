import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Divider, Tag, Descriptions, Row, Cascader, Col, Tabs, Button, Select, Space, Modal, Form, message } from 'antd';
import { history } from 'umi';
import StepItem from './components/StepItem';
import { selectPById, selectTPList, selectPTList, applyForProject, delTeamPerson, addTeamPerson, updateProject } from '@/services/project';
import { selectCstById } from '@/services/customer';
import { useEffect } from 'react';
import { useState } from 'react';
import ProjectSearch from '@/components/ProjectSearch';
import { positionList } from '@/utils/Position';
import { cityList } from '@/utils/CityList';
import ProForm, {
    ProFormRadio, ProFormSelect, ProFormText, ProFormDatePicker, ProFormDateTimePicker, ProFormTextArea,
} from '@ant-design/pro-form';
import SearchInput from '@/components/SearchInput';
import { EditOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { TabPane } = Tabs;
const Search = () => {
    const [basicForm, projectForm] = Form.useForm();
    const [project, setProject] = useState({});
    const [custom, setCustom] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);
    const [team, setTeam] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [projectModalVisible, setProjectModalVisible] = useState(false);
    console.clear();
    console.log(history);
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        selectPById({ projectId: query.projectId }).then(res => {
            setProject(res?.data || {});
        })
        selectCstById({ customerId: query.customerId }).then(res => {
            setCustom(res?.data || {});
        })
        selectTPList({ projectId: query.projectId }).then(res => {
            setTeam(res?.data || {});
        })
        getTags();
    }, [history, isRefresh])
    const getTags = () => {
        const { location: { query } } = history;
        selectPTList({ projectId: query.projectId }).then(res => {
            setTags(res?.data?.list || [])
        })
    }
    const onFinish = (values) => {
        const { location: { query } } = history;
        addTeamPerson({ appUserId: values.project.recommenderUserId, appUserName: values.project.recommenderName, projectId: query.projectId }).then(res => {
            message.success(res?.message);
            setIsModalVisible(false);
        })
    }
    const handleDeleteTag = async (removedTag) => {
        const { location: { query } } = history;
        await delTeamPerson({ appUserId: removedTag.userId, projectId: query.projectId }).then(ress => {
            message.info(ress.message || '删除成功');

        })
        // getTages();


    }
    const editFilish = () => {

    }
    const updateData = () => {
        if (isRefresh) {
            setIsRefresh(false);
        } else {
            setIsRefresh(true);
        }
    }
    const projectFilish = (values) => {
        const { location: { query } } = history;
        let params = { ...values, projectId: query.projectId }
        if (values.cityCode) {
            params.cityCode = params.cityCode.join('/')
        }
        updateProject(params).then(res => {
            message.info(res?.message || '修改失败')
            updateData();
        })
    }
    return (
        <>
            <Card title={null} extra={<Button type="primary" size="small" onClick={() => setProjectModalVisible(true)}><EditOutlined /></Button>}>
                <h1>{project.name}<span style={{ marginLeft: '12px', fontSize: '16px', color: 'red' }}>{project.salary}万</span></h1>
                <div>{project.customerName}<Divider type='vertical'></Divider>{custom?.cityCode || ''}<Divider type='vertical'></Divider>{project.experience}<Divider type='vertical'></Divider>{project.requireEdu}</div>
                <Descriptions contentStyle={{ color: '#5e5c5c', fontSize: '14px' }} labelStyle={{ color: '#5e5c5c', fontSize: '14px' }} title={null} column={3}>
                    <Descriptions.Item label="职位编号">{project.projectId}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{project.startTime}</Descriptions.Item>
                    <Descriptions.Item label="更新时间">{project.updateTime}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Space></Space>
            <Row gutter={12} style={{ marginTop: '12px' }}>
                <Col span="17">
                    <Card>
                        <Tabs defaultActiveKey="2">

                            <TabPane
                                tab={'职位信息'}
                                key="1"
                            >
                                <Descriptions title="基本信息" column={2} extra={<Button type="primary" size="small" onClick={() => setEditModalVisible(true)}><EditOutlined /></Button>}>
                                    <Descriptions.Item label="职位类别">{project.job}</Descriptions.Item>
                                    <Descriptions.Item label="招聘人数">{project.recruitNum}</Descriptions.Item>
                                    <Descriptions.Item label="薪资范围">{project.salary}</Descriptions.Item>
                                    <Descriptions.Item label="所属部门">{project?.department}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions title="岗位描述" column={1}>
                                    <Descriptions.Item label="岗位职责">{project.details}</Descriptions.Item>
                                </Descriptions>
                            </TabPane>
                            {/* <TabPane
                                tab={'入职确选人'}
                                key="2"
                            >
                                </TabPane> */}
                        </Tabs>
                    </Card>
                </Col>
                <Col span="7">
                    <Card title="执行团队" extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>新增成员</Button>}>
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
                                    {tag.userName}
                                </Tag>
                            );
                            return tagElem
                        })}
                    </Card>
                </Col>
                <Modal title="加入团队" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                    <ProForm
                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        name="basic"
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
                </Modal>
                <Modal footer={null} onCancel={() => setEditModalVisible(false)} visible={editModalVisible}>
                    <ProForm
                        onFinish={projectFilish}
                        initialValues={{
                            job: project.job,
                            recruitNum: project.recruitNum,
                            salaryStart: project?.salary?.split('-')[0] || '',
                            salaryEnd: project?.salary?.split('-')[1] || '',
                            department: project.department,
                            details: project.details,
                        }}
                        layout="horizontal">
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
                            {/* <Cascader style={{ width: '328px' }} options={positionList} placeholder=""></Cascader> */}
                            <Input style={{ width: '328px' }}></Input>
                        </Form.Item>
                        <Form.Item name="recruitNum" label="招聘人数" help="备注：0为若干">
                            <Input style={{ width: '328px' }}></Input>
                        </Form.Item>
                        <ProForm.Group>
                            <Form.Item name="salaryStart" label="薪资范围">
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
                        <Form.Item name="details" label="岗位描述">
                            <TextArea style={{ width: '328px' }}></TextArea>
                        </Form.Item>
                    </ProForm>
                </Modal>
                <Modal footer={null} onCancel={() => setProjectModalVisible(false)} visible={projectModalVisible}>
                    <ProForm
                        onFinish={projectFilish}
                        form={basicForm}
                        initialValues={{
                            name: project.name || '',
                            cityCode: ('' + project?.cityCode).indexOf('/') > 0 ? project?.cityCode.split('/') : '',
                            experience: +project.experience || '不限',
                            requireEdu: project.requireEdu || '不限'
                        }}
                        layout="horizontal">
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
                            name="cityCode"
                            label="工作地点"
                        >
                            <Cascader style={{ width: '328px' }} options={cityList} placeholder=""></Cascader>
                        </Form.Item>
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
                        <Form.Item name="requireEdu" label="学历要求">
                            <Select
                                style={{ width: '328px' }}
                                options={[
                                    {
                                        label: '不限',
                                        value: 0,
                                    },
                                    {
                                        label: '初中及以上',
                                        value: 1,
                                    },
                                    {
                                        label: '中专及以上',
                                        value: 2,
                                    },
                                    {
                                        label: '高中及以上',
                                        value: 3,
                                    },
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
                    </ProForm>
                </Modal>
            </Row>
        </>


    );
};

export default Search;
